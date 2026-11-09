"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanTiga, RakitTiga } from "./mesin-k3b1";
import { PitaDari, PitaSusun } from "./dasar-k3b3";
import { MeteranSambung, MeteranSvg } from "./diagram-k3b3";
import {
  HURUF, PETA_KONSEP_QB, RONDE_BENARSALAH_QB, RONDE_CERITA_QB, RONDE_DETEKTIF_QB, RONDE_HITUNG_CB, RONDE_HITUNG_PB, RONDE_JODOH_CB, RONDE_JODOH_PB, RONDE_JODOH_QB, RONDE_KALIMAT_PB, RONDE_KETUK_CB,
  RONDE_LANGKAH_PB, RONDE_MEMORI_CB, RONDE_MEMORI_PB, RONDE_MEMORI_QB, RONDE_METER_CB, RONDE_METER_QB, RONDE_PAPAN_CB, RONDE_PAPAN_PB, RONDE_PAPAN_QB, RONDE_PILAH_PB, RONDE_RAKIT_CB, RONDE_SAMBUNG_PB,
  RONDE_SEMUA_CB, RONDE_SEMUA_PB, RONDE_SENTI_CB, RONDE_SENTI_QB, RONDE_SUSUNKATA_QB, RONDE_TABEL_PB, RONDE_URUT_CB, jawabCerita, kalimatKonversi, labelMC, nilaiMC, opsiCerita, opsiCm, opsiCm50, opsiMCm,
  opsiMeterKeCm, pasMeter, teksCm, teksMeterCm, titik, urutTampil, urutanTetap, opsiAngka, type UkuranMC,
} from "./data-k3b3";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B3B } from "./infografis-k3b3";
import { SUB_B33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 3 Sub-Bab B: Hubungan Antarsatuan Baku Panjang. Tiga puluh       */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Rakit Pita  2 Hitung  3 Meter ke Cm  4 Cm ke Meter  5 Jodohkan   */
/*            6 Memori  7 Ketuk Panjang  8 Ketuk Sama  9 Papan  10 Urutkan       */
/*  Picture  11 Hitung Garis  12 Kalimat  13 Jodohkan  14 Memori  15 Tabel        */
/*           16 Ketuk Sama  17 Pilah  18 Langkah  19 Papan  20 Sambung            */
/*  Abstract 21 Meter ke Cm  22 Cm ke M dan Cm  23 Papan  24 Jodohkan  25 Memori  */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata       */
/* Naskah: naskah-k3b3.ts (SUB_B33). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_B33.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang hubungan antarsatuan baku panjang. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B3BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B33} judul="Meter dan Sentimeter" suaraInfo={SUARA_INFO} visual={visualInfografisK3B3B()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const PETUNJUK_METER = "Belum tepat. Ingat 1 meter sama dengan 100 sentimeter.";
const ketPita = (n: number) => {
  const r = Math.floor(n / 100);
  const p = Math.floor((n % 100) / 10);
  const s = n % 10;
  return `Hitung: ${r * 100} + ${p * 10} + ${s} = ${n}, jadi panjang pita ${n} cm, yaitu ${teksMeterCm(n)}.`;
};
const ketGaris = (n: number) => `Batang berhenti di ${n} cm, yaitu ${teksMeterCm(n)}.`;

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[340px]">{children}</div>;

const Soal = ({ teks }: { teks: string }) => <p className="rounded-2xl bg-[#FFF7CC] px-3 py-2 text-center text-2xl font-black leading-snug text-[#1C01A5]">{teks}</p>;

const BIN_METER = [
  { id: "pas", label: "Pas dalam meter", warna: "#BBF7D0" },
  { id: "sisa", label: "Bersisa sentimeter", warna: "#FDE68A" },
];

const pitaMC = (u: UkuranMC) => <PitaDari cm={nilaiMC(u)} />;

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitPitaB(d: PropsLangkah) {
  return Kartu(d, 0, "k3b3b-rakitpita", "Baca panjang pita yang diminta. Tambah potongan meter, sepuluh sentimeter, dan sentimeter sampai tepat. Tekan Periksa.", RONDE_RAKIT_CB.length, "Rakit semua pitanya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit panjang pita" teks="Satu meter sama dengan seratus sentimeter. Rakit pita dari potongan meter, sepuluh sentimeter, dan sentimeter. Lalu tekan periksa." />
      <RakitTiga
        key={r}
        soal={RONDE_RAKIT_CB[r].map((n) => ({
          n,
          tanya: `Rakit pita sepanjang ${teksCm(n)}.`,
          nama: ["meter", "potong 10 cm", "sentimeter"] as [string, string, string],
          tampil: (a, b, c) => <PitaSusun r={a} p={b} s={c} />,
          pesan: ketPita(n),
        }))}
        onBeres={beres}
        pesanBeres="Semua pita sudah kamu rakit dengan tepat."
      />
    </>
  ));
}

function KartuHitungPitaB(d: PropsLangkah) {
  return Kartu(d, 1, "k3b3b-hitungpita", "Lihat potongan pita. Hitung panjangnya dalam sentimeter, lalu pilih jawabannya.", RONDE_HITUNG_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung panjang pita" teks="Satu potong merah adalah satu meter, sama dengan seratus sentimeter. Satu potong biru adalah sepuluh sentimeter. Hitung panjang pita dalam sentimeter." />
      <PilihBertahap
        key={r}
        soal={RONDE_HITUNG_CB[r].map((n, i): SoalBertahap => {
          const o = opsiCm(n, r * 2 + i);
          return {
            visual: <PitaDari cm={n} />,
            tanya: "Berapa sentimeter panjang pita ini?",
            opsi: o.map(teksCm),
            jawab: o.indexOf(n),
            petunjuk: `${PETUNJUK_METER} Satu potong biru adalah 10 cm dan satu potong kuning adalah 1 cm.`,
            pesan: ketPita(n),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua panjang pita sudah kamu hitung."
      />
    </>
  ));
}

function KartuMeterKeCmB(d: PropsLangkah) {
  return Kartu(d, 2, "k3b3b-meterkecm", "Lihat potongan pita sepanjang beberapa meter. Ubah ke sentimeter, lalu pilih jawabannya.", RONDE_METER_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ubah meter ke sentimeter" teks="Tiap potong merah adalah satu meter, sama dengan seratus sentimeter. Hitung banyak potongan, lalu kalikan dengan seratus." />
      <PilihBertahap
        key={r}
        soal={RONDE_METER_CB[r].map((m, i): SoalBertahap => {
          const o = opsiMeterKeCm(m, r * 2 + i);
          return {
            visual: <PitaSusun r={m} p={0} s={0} />,
            tanya: `${m} m = ... cm`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: `${PETUNJUK_METER} Kalikan banyak meter dengan 100.`,
            pesan: `${m} m = ${m} × 100 cm = ${teksCm(m * 100)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua meter sudah kamu ubah menjadi sentimeter."
      />
    </>
  ));
}

function KartuSentiKeMeterB(d: PropsLangkah) {
  return Kartu(d, 3, "k3b3b-sentikemeter", "Lihat potongan pita. Ubah panjangnya dari sentimeter ke meter, lalu pilih jawabannya.", RONDE_SENTI_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ubah sentimeter ke meter" teks="Seratus sentimeter sama dengan satu meter. Hitung berapa kali seratus ada pada panjang pita itu. Itulah banyak meternya." />
      <PilihBertahap
        key={r}
        soal={RONDE_SENTI_CB[r].map((cm, i): SoalBertahap => {
          const m = cm / 100;
          const o = opsiAngka(m, r * 2 + i);
          return {
            visual: <PitaDari cm={cm} />,
            tanya: `${teksCm(cm)} = ... m`,
            opsi: o.map((n) => `${n} m`),
            jawab: o.indexOf(m),
            petunjuk: `${PETUNJUK_METER} Bagi panjang pita dengan 100.`,
            pesan: `${teksCm(cm)} : 100 = ${m} m.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua sentimeter sudah kamu ubah menjadi meter."
      />
    </>
  ));
}

function KartuJodohPitaB(d: PropsLangkah) {
  return Kartu(d, 4, "k3b3b-jodohpita", "Ketuk satu pita di kiri, lalu ketuk panjangnya di kanan.", RONDE_JODOH_CB.length, "Jodohkan semua pitanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CB[r];
    const kanan = ro.map((cm) => ({ id: `c${cm}`, label: teksCm(cm), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan pita dan panjang" teks="Hitung panjang tiap pita dalam sentimeter. Jodohkan dengan panjang yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((cm, i) => ({ id: `c${cm}`, label: `Pita ${HURUF[i]}`, isi: <PitaDari cm={cm} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((cm) => [`c${cm}`, `c${cm}`]))}
          petunjuk={() => "Belum cocok. Potong merah 100 cm, potong biru 10 cm, potong kuning 1 cm. Jumlahkan semuanya."}
          onBeres={beres}
          pesanBeres="Semua pita sudah cocok dengan panjangnya."
        />
      </>
    );
  });
}

function KartuMemoriPitaB(d: PropsLangkah) {
  return Kartu(d, 5, "k3b3b-memoripita", "Balik dua kartu. Cari gambar pita dan panjangnya.", RONDE_MEMORI_CB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori pita dan panjang" teks="Balik dua kartu. Cari kartu gambar pita dan kartu panjangnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CB[r].map((cm, i) => ({ id: `c${cm}`, a: <PitaDari cm={cm} />, labelA: `pita ${HURUF[i]}`, b: <Numeral n={teksCm(cm)} kelas="text-2xl" />, labelB: teksCm(cm) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukPanjangB(d: PropsLangkah) {
  return Kartu(d, 6, "k3b3b-ketukpanjang", "Hitung panjang tiap pita. Ketuk pita yang panjangnya sama dengan ukuran yang disebut.", RONDE_KETUK_CB.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (
      <>
        <IgilBicara pendek="Ketuk pita dengan panjang" teks="Hitung panjang tiap pita. Ketuk pita yang panjangnya sama dengan ukuran yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((cm, i) => ({ id: `c${cm}`, label: `Pita ${HURUF[i]}`, isi: <PitaDari cm={cm} /> }))}
          soal={ro.tanya.map((t) => ({ tanya: `Ketuk pita yang panjangnya ${teksMeterCm(t)}.`, jawab: `c${t}`, petunjuk: "Belum tepat. Hitung potongan meter, sepuluh sentimeter, dan sentimeter pada pita.", pesan: ketPita(t) }))}
          onBeres={beres}
          pesanBeres="Semua pita sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaSamaB(d: PropsLangkah) {
  return Kartu(d, 7, "k3b3b-semuasama", "Ketuk semua pita yang sama panjang dengan ukuran acuan. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    const tanya = `Ketuk semua pita yang sama panjang dengan ${teksCm(ro.acuan)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang sama" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((u) => {
            const cocok = nilaiMC(u) === ro.acuan;
            return {
              id: labelMC(u),
              label: labelMC(u),
              isi: (
                <div className="min-w-0 max-w-[60%] shrink-0">
                  {pitaMC(u)}
                </div>
              ),
              benar: cocok,
              penjelasan: `${labelMC(u)} = ${teksCm(nilaiMC(u))}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua pita yang sama panjang sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPapanSentiB(d: PropsLangkah) {
  return Kartu(d, 8, "k3b3b-papansenti", "Ubah ukuran pita menjadi sentimeter. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CB.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan sentimeter" teks="Satu meter sama dengan seratus sentimeter. Ubah ukuran pita menjadi sentimeter. Tulis ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_CB[r].map((u) => ({
          visual: pitaMC(u),
          tanya: `${labelMC(u)} = ... cm. Isi papan dengan sentimeternya.`,
          jawab: nilaiMC(u),
          petunjuk: `${PETUNJUK_METER} Ubah meternya menjadi sentimeter, lalu tambahkan sisanya.`,
          pesan: `${labelMC(u)} = ${u[0] * 100} cm + ${u[1]} cm = ${nilaiMC(u)} cm.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutPitaB(d: PropsLangkah) {
  return Kartu(d, 9, "k3b3b-urutpita", "Hitung panjang tiap pita. Ketuk pita satu per satu dari yang paling pendek atau paling panjang.", RONDE_URUT_CB.length, "Urutkan semua pitanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const ids = ro.item.map((cm) => `c${cm}`);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map((cm) => `c${cm}`);
    const awal = ro.dari === "kecil" ? "terpendek" : "terpanjang";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Hitung panjang tiap pita. Lalu urutkan pita menurut panjangnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            return {
              id,
              label: `Pita ${HURUF[i]}`,
              isi: (
                <Lebar w={170}>
                  <PitaDari cm={ro.item[i]} />
                </Lebar>
              ),
            };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terpanjang" : "terpendek"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung panjang tiap pita.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuHitungGarisB(d: PropsLangkah) {
  return Kartu(d, 10, "k3b3b-hitunggaris", "Lihat batang pada garis meteran. Hitung panjangnya dalam sentimeter, lalu pilih jawabannya.", RONDE_HITUNG_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung garis meteran" teks="Garis panjang menunjukkan satu meter, sama dengan seratus sentimeter. Garis pendek di antaranya lima puluh sentimeter. Hitung panjang batang." />
      <PilihBertahap
        key={r}
        soal={RONDE_HITUNG_PB[r].map((cm, i): SoalBertahap => {
          const o = opsiCm50(cm, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <MeteranSvg cm={cm} meter={4} />
              </Penuh>
            ),
            tanya: "Berapa sentimeter panjang batang?",
            opsi: o.map(teksCm),
            jawab: o.indexOf(cm),
            petunjuk: `${PETUNJUK_METER} Garis pendek di antara dua meter adalah 50 cm.`,
            pesan: ketGaris(cm),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua panjang batang sudah kamu hitung."
      />
    </>
  ));
}

function KartuKalimatUbahB(d: PropsLangkah) {
  return Kartu(d, 11, "k3b3b-kalimatubah", "Lihat batang pada garis meteran. Lengkapi tiap kalimat dengan angka yang tepat.", RONDE_KALIMAT_PB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const cm = RONDE_KALIMAT_PB[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat ubah satuan" teks="Lihat batang pada garis meteran. Lengkapi kalimat tentang meter dan sentimeter dengan angka yang tepat." />
        <Penuh>
          <MeteranSvg cm={cm} meter={3} />
        </Penuh>
        <IsiKalimatGame key={r} kalimat={kalimatKonversi(cm, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuJodohGarisB(d: PropsLangkah) {
  return Kartu(d, 12, "k3b3b-jodohgaris", "Ketuk satu garis meteran di kiri, lalu ketuk ukurannya di kanan.", RONDE_JODOH_PB.length, "Jodohkan semua garisnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PB[r];
    const kanan = ro.map((cm) => ({ id: `c${cm}`, label: teksMeterCm(cm), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan garis dan ukuran" teks="Baca panjang tiap batang pada garis meteran. Jodohkan dengan ukuran dalam meter dan sentimeter." />
        <PasangKartu
          key={r}
          kiri={ro.map((cm, i) => ({ id: `c${cm}`, label: `Garis ${HURUF[i]}`, isi: <MeteranSvg cm={cm} meter={4} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((cm) => [`c${cm}`, `c${cm}`]))}
          petunjuk={() => "Belum cocok. Garis bertanda angka meter adalah 100 cm, 200 cm, dan seterusnya. Garis pendek di antaranya 50 cm."}
          onBeres={beres}
          pesanBeres="Semua garis sudah cocok dengan ukurannya."
        />
      </>
    );
  });
}

function KartuMemoriGarisB(d: PropsLangkah) {
  return Kartu(d, 13, "k3b3b-memorigaris", "Balik dua kartu. Cari garis meteran dan ukurannya.", RONDE_MEMORI_PB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori garis dan ukuran" teks="Balik dua kartu. Cari kartu garis meteran dan kartu ukurannya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PB[r].map((cm, i) => ({ id: `c${cm}`, a: <MeteranSvg cm={cm} meter={4} ringkas />, labelA: `garis ${HURUF[i]}`, b: <Numeral n={teksMeterCm(cm)} kelas="text-2xl" />, labelB: teksMeterCm(cm) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelUkurB(d: PropsLangkah) {
  return Kartu(d, 14, "k3b3b-tabelukur", "Ketuk baris tabel, lalu ketuk kartu ukuran yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PB[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel ubah ukuran" teks="Ketuk baris tabel, lalu ketuk kartu ukuran yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Ingat 1 m = 100 cm. Hitung lagi ${b.label}.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaUkuranB(d: PropsLangkah) {
  return Kartu(d, 15, "k3b3b-semuaukuran", "Ketuk semua garis yang sama panjang dengan ukuran acuan. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    const tanya = `Ketuk semua garis yang sama dengan ${teksCm(ro.acuan)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang sama" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((u) => {
            const cocok = nilaiMC(u) === ro.acuan;
            return {
              id: labelMC(u),
              label: labelMC(u),
              isi: (
                <Lebar w={180}>
                  <MeteranSvg cm={nilaiMC(u)} meter={5} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `${labelMC(u)} = ${teksCm(nilaiMC(u))}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua garis yang sama sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahMeterB(d: PropsLangkah) {
  return Kartu(d, 16, "k3b3b-pilahmeter", "Seret atau ketuk tiap ukuran ke kotak: pas dalam meter, atau bersisa sentimeter.", RONDE_PILAH_PB.length, "Pilah semua ukurannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah ukuran" teks="Bila ukuran sentimeter dapat dibagi seratus tanpa sisa, panjangnya pas dalam meter. Bila ada sisa, panjangnya bersisa sentimeter. Pilah tiap ukuran." />
      <Sortir
        key={r}
        lebarItem={90}
        kolomBin={2}
        item={urutanKe(RONDE_PILAH_PB[r].length, r).map((i) => {
          const cm = RONDE_PILAH_PB[r][i];
          return {
            id: `c${cm}`,
            label: teksCm(cm),
            bin: pasMeter(cm) ? "pas" : "sisa",
            petunjuk: `Belum tepat. Bagi ${teksCm(cm)} dengan 100. ${pasMeter(cm) ? "Tidak ada sisa." : "Masih ada sisa."}`,
            ucapan: `${teksCm(cm)} sama dengan ${teksMeterCm(cm)}, ${pasMeter(cm) ? "pas dalam meter" : "bersisa sentimeter"}.`,
          };
        })}
        bin={BIN_METER}
        onBeres={beres}
        pesanBeres="Semua ukuran sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuLangkahUbahB(d: PropsLangkah) {
  return Kartu(d, 17, "k3b3b-langkahubah", "Ketuk langkah-langkah mengubah satuan satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PB.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_LANGKAH_PB[r];
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
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulailah dengan menulis ukurannya, lalu ingat hubungan meter dan sentimeter."}
          onBeres={beres}
          pesanBeres="Urutan langkah sudah benar."
        />
      </>
    );
  });
}

function KartuPapanGarisB(d: PropsLangkah) {
  return Kartu(d, 18, "k3b3b-papangaris", "Baca panjang batang pada garis meteran. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_PB.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan sentimeter dari garis" teks="Baca panjang batang pada garis meteran. Tulis ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_PB[r].map((cm) => ({
          visual: (
            <Penuh>
              <MeteranSvg cm={cm} meter={4} />
            </Penuh>
          ),
          tanya: "Isi papan dengan panjang batang dalam sentimeter.",
          jawab: cm,
          petunjuk: `${PETUNJUK_METER} Garis pendek di antara dua meter adalah 50 cm.`,
          pesan: ketGaris(cm),
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuSambungGarisB(d: PropsLangkah) {
  return Kartu(d, 19, "k3b3b-sambunggaris", "Dua batang disambung pada garis meteran. Hitung panjang gabungannya, lalu pilih jawabannya.", RONDE_SAMBUNG_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Sambung dua garis" teks="Batang merah lalu batang biru disambung pada garis meteran. Hitung panjang tiap batang, lalu jumlahkan." />
      <PilihBertahap
        key={r}
        soal={RONDE_SAMBUNG_PB[r].map(([a, b], i): SoalBertahap => {
          const s = a + b;
          const o = opsiCm50(s, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <MeteranSambung a={a} b={b} meter={4} />
              </Penuh>
            ),
            tanya: "Berapa sentimeter panjang gabungan kedua batang?",
            opsi: o.map(teksCm),
            jawab: o.indexOf(s),
            petunjuk: "Belum tepat. Baca panjang batang merah dan batang biru dari garis meteran, lalu jumlahkan.",
            pesan: `${a} cm + ${b} cm = ${s} cm, yaitu ${teksMeterCm(s)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua panjang gabungan sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuMeterKeCmQB(d: PropsLangkah) {
  return Kartu(d, 20, "k3b3b-meterkecmq", "Ubah meter ke sentimeter. Pilih hasil yang benar dari tiga pilihan.", RONDE_METER_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah meter ke sentimeter" teks="Satu meter sama dengan seratus sentimeter. Kalikan banyak meter dengan seratus. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_METER_QB[r].map((m, i): SoalBertahap => {
          const o = opsiMeterKeCm(m, r * 2 + i);
          return {
            visual: <Soal teks={`${m} m = ... cm`} />,
            tanya: `${m} m = ... cm`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: `${PETUNJUK_METER} Kalikan banyak meter dengan 100.`,
            pesan: `${m} m = ${m} × 100 cm = ${teksCm(m * 100)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua meter sudah kamu ubah menjadi sentimeter."
      />
    </>
  ));
}

function KartuSentiKeMCmQB(d: PropsLangkah) {
  return Kartu(d, 21, "k3b3b-sentikemcm", "Ubah sentimeter menjadi meter dan sentimeter. Pilih hasil yang benar.", RONDE_SENTI_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah sentimeter ke meter dan sentimeter" teks="Ambil seratus sentimeter sebagai satu meter. Sisanya tetap sentimeter. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_SENTI_QB[r].map((cm, i): SoalBertahap => {
          const o = opsiMCm(cm, r * 2 + i);
          const m = Math.floor(cm / 100);
          return {
            visual: <Soal teks={`${cm} cm = ... m ... cm`} />,
            tanya: `${cm} cm = ... m ... cm`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Ambil banyak ratusan sebagai meter, sisanya tetap sentimeter.",
            pesan: `${cm} cm = ${m * 100} cm + ${cm % 100} cm = ${m} m ${cm % 100} cm.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua ukuran sudah kamu ubah."
      />
    </>
  ));
}

function KartuPapanUbahQB(d: PropsLangkah) {
  return Kartu(d, 22, "k3b3b-papanubah", "Ubah ukuran menjadi sentimeter. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_QB.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Papan ubah satuan" teks="Ubah meter dan sentimeter menjadi sentimeter. Tulis ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_QB[r].map((u) => ({
          visual: <Soal teks={`${labelMC(u)} = ... cm`} />,
          tanya: "Isi papan dengan sentimeternya.",
          jawab: nilaiMC(u),
          petunjuk: `${PETUNJUK_METER} Ubah meternya menjadi sentimeter, lalu tambahkan sisanya.`,
          pesan: `${labelMC(u)} = ${u[0] * 100} cm + ${u[1]} cm = ${nilaiMC(u)} cm.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuJodohUkuranQB(d: PropsLangkah) {
  return Kartu(d, 23, "k3b3b-jodohukuran", "Ketuk satu ukuran di kiri, lalu ketuk ukuran yang sama di kanan.", RONDE_JODOH_QB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QB[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan ukuran" teks="Satu meter sama dengan seratus sentimeter. Jodohkan ukuran dengan ukuran yang sama panjangnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => "Belum cocok. Ubah kedua ukuran ke sentimeter, lalu bandingkan."}
          onBeres={beres}
          pesanBeres="Semua ukuran sudah cocok dengan pasangannya."
        />
      </>
    );
  });
}

function KartuMemoriUkuranQB(d: PropsLangkah) {
  return Kartu(d, 24, "k3b3b-memoriukuran", "Balik dua kartu. Cari dua ukuran yang sama panjangnya.", RONDE_MEMORI_QB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori ukuran" teks="Balik dua kartu. Cari dua cara menulis ukuran panjang yang sama." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QB[r].map((p, i) => ({ id: `m${i}`, a: <Numeral n={p.a} kelas="text-2xl" />, labelA: p.a, b: <Numeral n={p.b} kelas="text-2xl" />, labelB: p.b }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahB(d: PropsLangkah) {
  return Kartu(d, 25, "k3b3b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang meter dan sentimeter dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifB(d: PropsLangkah) {
  return Kartu(d, 26, "k3b3b-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (
      <>
        <CatatanPensil pendek="Detektif satuan panjang" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(titik), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaB(d: PropsLangkah) {
  return Kartu(d, 27, "k3b3b-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QB.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QB[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaMeterB(d: PropsLangkah) {
  return Kartu(d, 28, "k3b3b-ceritameter", "Baca soal cerita. Hitung ukurannya, lalu pilih jawabannya.", RONDE_CERITA_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QB[r].map((c, i) => {
      const o = opsiCerita(c, r * 2 + i);
      const j = jawabCerita(c);
      const pesan =
        c.jenis === "+"
          ? `${teksMeterCm(c.a)} + ${teksMeterCm(c.b)}: jumlahkan meter dengan meter dan sentimeter dengan sentimeter. Hasilnya ${teksMeterCm(j)}.`
          : c.jenis === "−"
            ? `${teksMeterCm(c.a)} − ${teksMeterCm(c.b)}: kurangkan meter dengan meter dan sentimeter dengan sentimeter. Sisanya ${teksMeterCm(j)}.`
            : `${teksCm(c.a)} : 100 = ${titik(c.a / 100)} m.`;
      return {
        tanya: c.teks,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: c.jenis === "u" ? "Belum tepat. Untuk mengubah sentimeter ke meter, bagilah dengan 100." : "Belum tepat. Hitung meter dengan meter dan sentimeter dengan sentimeter, lalu periksa lagi.",
        pesan,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita satuan panjang" teks="Baca soal cerita dengan teliti. Tentukan apakah ukurannya dijumlahkan, dikurangkan, atau diubah satuannya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataB(d: PropsLangkah) {
  return Kartu(d, 29, "k3b3b-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata satuan panjang" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QB[r].kata} pengecoh={RONDE_SUSUNKATA_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuRakitPitaB, KartuHitungPitaB, KartuMeterKeCmB, KartuSentiKeMeterB, KartuJodohPitaB, KartuMemoriPitaB, KartuKetukPanjangB, KartuSemuaSamaB, KartuPapanSentiB, KartuUrutPitaB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuHitungGarisB, KartuKalimatUbahB, KartuJodohGarisB, KartuMemoriGarisB, KartuTabelUkurB, KartuSemuaUkuranB, KartuPilahMeterB, KartuLangkahUbahB, KartuPapanGarisB, KartuSambungGarisB].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuMeterKeCmQB, KartuSentiKeMCmQB, KartuPapanUbahQB, KartuJodohUkuranQB, KartuMemoriUkuranQB, KartuBenarSalahB, KartuDetektifB, KartuPetaB, KartuCeritaMeterB, KartuSusunKataB].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🎀", nama: "CONCRETE", cara: "Rakit pita dari meter dan senti!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat garis meteran", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B3B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Meter, sentimeter, dan bilangan", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B33} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
