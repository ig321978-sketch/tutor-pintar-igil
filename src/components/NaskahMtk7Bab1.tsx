"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import { useKuisMateri } from "@/components/KuisMateriContext";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK7_BAB1 } from "@/lib/modul-resmi-mtk-7-bab1";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { useState, type ReactNode } from "react";

const ID = MODUL_MTK7_BAB1.id;

type Soal = {
  tanya: string;
  pilihan: string[];
  benar: string;
  umpan: string;
};

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikan(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 900,
  }));
}

function Pilih({ id, nomor, soal }: { id: string; nomor: number; soal: Soal }) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, soal.benar);
  const huruf = ["A", "B", "C", "D"];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-800">
        {nomor}. {soal.tanya}
      </p>
      <div className="mt-3 grid gap-2">
        {soal.pilihan.map((teks, indeks) => {
          const kode = huruf[indeks] ?? "";
          return (
            <button
              key={kode}
              type="button"
              onClick={() => {
                setPilih(kode);
                if (kode === soal.benar) kuis?.tandaiBenar(id);
              }}
              className={`rounded-xl px-3 py-2 text-left text-sm font-semibold ${kelasTombolHasilKuis(
                pilih,
                kode,
                soal.benar,
                "bg-[#1C01A5] text-white hover:bg-[#16017a]",
              )}`}
            >
              {kode}. {teks}
            </button>
          );
        })}
      </div>
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah="Hitung lagi, lalu pilih jawaban lain." />
      {status === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">{soal.umpan}</p> : null}
    </article>
  );
}

function Subbab({
  kode,
  judul,
  penjelasan,
  contoh,
  soal,
  kelas,
  kelamin,
}: {
  kode: string;
  judul: string;
  penjelasan: string[];
  contoh: ReactNode;
  soal: Soal[];
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-base font-black text-[#1C01A5]">{judul}</h3>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan(penjelasan)} />
      <div className="space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        {penjelasan.map((kalimat) => (
          <p key={kalimat}>{kalimat}</p>
        ))}
      </div>
      {contoh}
      <div className="space-y-3">
        <p className="text-sm font-black text-[#1C01A5]">Soal subbab</p>
        {soal.map((item, indeks) => (
          <Pilih key={item.tanya} id={idKuis(kode, indeks)} nomor={indeks + 1} soal={item} />
        ))}
      </div>
    </section>
  );
}

function Contoh({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <div className="mt-2 space-y-1 text-sm font-semibold text-slate-800">
        {baris.map((teks) => (
          <p key={teks}>{teks}</p>
        ))}
      </div>
    </div>
  );
}

const SOAL_A: Soal[] = [
  {
    tanya: "Sebuah kapal menyelam 80 meter di bawah permukaan laut. Penulisan yang tepat adalah...",
    pilihan: ["80", "−80", "0", "180"],
    benar: "B",
    umpan: "Di bawah permukaan laut ditulis negatif, yaitu −80.",
  },
  {
    tanya: "Manakah yang nilainya lebih besar?",
    pilihan: ["−12", "−5", "Keduanya sama", "Tidak dapat dibandingkan"],
    benar: "B",
    umpan: "−5 berada di kanan −12, jadi nilainya lebih besar.",
  },
  {
    tanya: "Tanda yang tepat untuk −40 ... 15 adalah...",
    pilihan: [">", "<", "=", "≥"],
    benar: "B",
    umpan: "−40 berada di kiri 15, jadi −40 < 15.",
  },
  {
    tanya: "Urutan dari yang terkecil ke yang terbesar untuk 4, −9, 0, dan −2 adalah...",
    pilihan: ["4, 0, −2, −9", "−9, −2, 0, 4", "−2, −9, 0, 4", "0, −2, 4, −9"],
    benar: "B",
    umpan: "Dari kiri ke kanan: −9, −2, 0, 4.",
  },
  {
    tanya: "Lawan penjumlahan dari −7 adalah...",
    pilihan: ["−7", "0", "7", "14"],
    benar: "C",
    umpan: "(−7) + 7 = 0.",
  },
  {
    tanya: "Bilangan yang terletak di sebelah kiri nol pada garis bilangan disebut...",
    pilihan: ["Bilangan bulat positif", "Bilangan bulat negatif", "Bilangan prima", "Bilangan pecahan"],
    benar: "B",
    umpan: "Sebelah kiri nol adalah bilangan bulat negatif.",
  },
  {
    tanya: "Dua kota bersuhu −6°C dan −1°C. Kota yang lebih dingin bersuhu...",
    pilihan: ["−1°C", "−6°C", "0°C", "Keduanya sama dingin"],
    benar: "B",
    umpan: "−6 lebih kecil daripada −1, jadi udaranya lebih dingin.",
  },
  {
    tanya: "Bilangan 0 termasuk...",
    pilihan: [
      "Bilangan bulat positif",
      "Bilangan bulat negatif",
      "Bilangan bulat, bukan positif dan bukan negatif",
      "Bukan bilangan bulat",
    ],
    benar: "C",
    umpan: "Nol adalah bilangan bulat. Nol bukan positif dan bukan negatif.",
  },
  {
    tanya: "Bilangan dengan nilai paling besar di antara −20, −3, 1, dan −15 adalah...",
    pilihan: ["−20", "−3", "1", "−15"],
    benar: "C",
    umpan: "1 adalah satu-satunya bilangan positif pada pilihan itu.",
  },
  {
    tanya: "Saldo tabungan bertambah Rp75.000. Notasi yang tepat adalah...",
    pilihan: ["−75.000", "0", "75.000", "−750"],
    benar: "C",
    umpan: "Penambahan saldo ditulis positif, yaitu 75.000.",
  },
];

const SOAL_B: Soal[] = [
  {
    tanya: "Hasil (−8) + 3 adalah...",
    pilihan: ["−11", "−5", "5", "11"],
    benar: "B",
    umpan: "−8 + 3 = −5.",
  },
  {
    tanya: "Hasil 6 + (−9) adalah...",
    pilihan: ["15", "3", "−3", "−15"],
    benar: "C",
    umpan: "6 + (−9) = −3.",
  },
  {
    tanya: "Hasil (−4) − (−7) adalah...",
    pilihan: ["−11", "−3", "3", "11"],
    benar: "C",
    umpan: "(−4) − (−7) = (−4) + 7 = 3.",
  },
  {
    tanya: "Hasil (−5) × (−6) adalah...",
    pilihan: ["−30", "−11", "11", "30"],
    benar: "D",
    umpan: "Dua bilangan negatif dikalikan menghasilkan positif: 30.",
  },
  {
    tanya: "Hasil 12 ÷ (−3) adalah...",
    pilihan: ["−4", "4", "−9", "9"],
    benar: "A",
    umpan: "Pembagian beda tanda menghasilkan negatif: −4.",
  },
  {
    tanya: "Hasil (−2) + 5 + (−8) adalah...",
    pilihan: ["−15", "11", "−5", "1"],
    benar: "C",
    umpan: "(−2) + 5 = 3, lalu 3 + (−8) = −5.",
  },
  {
    tanya: "Perkiraan yang paling masuk akal untuk −48 + 53 adalah...",
    pilihan: ["Sekitar −100", "Sekitar 0", "Sekitar 100", "Sekitar −50"],
    benar: "B",
    umpan: "−48 dekat −50 dan 53 dekat 50. Hasilnya dekat 0.",
  },
  {
    tanya: "Seseorang berutang Rp200.000, lalu membayar Rp80.000. Sisa utang ditulis...",
    pilihan: ["120.000", "−120.000", "−280.000", "80.000"],
    benar: "B",
    umpan: "−200.000 + 80.000 = −120.000. Utang yang tersisa tetap negatif.",
  },
  {
    tanya: "Jawaban benar bernilai 4 dan jawaban salah bernilai −1. Ada 8 benar dan 3 salah. Total nilainya...",
    pilihan: ["35", "29", "11", "−29"],
    benar: "B",
    umpan: "8 × 4 = 32 dan 3 × (−1) = −3. Jadi 32 + (−3) = 29.",
  },
  {
    tanya: "Dalam 6 bulan, pengikut sebuah kanal berkurang 360, sama banyak tiap bulan. Perubahan tiap bulan adalah...",
    pilihan: ["60", "−60", "−360", "6"],
    benar: "B",
    umpan: "360 ÷ 6 = 60. Karena berkurang, perubahannya −60.",
  },
];

const SOAL_C: Soal[] = [
  {
    tanya: "Yang merupakan faktor dari 12 adalah...",
    pilihan: ["5", "8", "6", "9"],
    benar: "C",
    umpan: "12 ÷ 6 = 2, jadi 6 adalah faktor 12.",
  },
  {
    tanya: "Pasangan yang hasil kalinya −18 adalah...",
    pilihan: ["2 dan 9", "−3 dan 6", "−2 dan −9", "4 dan 5"],
    benar: "B",
    umpan: "(−3) × 6 = −18.",
  },
  {
    tanya: "Faktorisasi prima dari 36 adalah...",
    pilihan: ["2 × 3", "2² × 3²", "6 × 6", "4 × 9"],
    benar: "B",
    umpan: "36 = 4 × 9 = 2² × 3².",
  },
  {
    tanya: "FPB dari 18 dan 24 adalah...",
    pilihan: ["6", "12", "72", "3"],
    benar: "A",
    umpan: "18 = 2 × 3² dan 24 = 2³ × 3. FPB-nya 2 × 3 = 6.",
  },
  {
    tanya: "KPK dari 6 dan 8 adalah...",
    pilihan: ["2", "14", "24", "48"],
    benar: "C",
    umpan: "6 = 2 × 3 dan 8 = 2³. KPK-nya 2³ × 3 = 24.",
  },
  {
    tanya: "FPB dari 12, 18, dan 30 adalah...",
    pilihan: ["3", "6", "12", "180"],
    benar: "B",
    umpan: "Faktor persekutuan terbesar dari ketiganya adalah 6.",
  },
  {
    tanya: "KPK dari 4, 6, dan 8 adalah...",
    pilihan: ["2", "12", "24", "48"],
    benar: "C",
    umpan: "4 = 2², 6 = 2 × 3, dan 8 = 2³. KPK-nya 2³ × 3 = 24.",
  },
  {
    tanya: "Yang merupakan faktor dari −12 adalah...",
    pilihan: ["5", "−4", "8", "7"],
    benar: "B",
    umpan: "(−4) × 3 = −12.",
  },
  {
    tanya: "KPK dari 15 dan 20 adalah...",
    pilihan: ["5", "30", "60", "300"],
    benar: "C",
    umpan: "15 = 3 × 5 dan 20 = 2² × 5. KPK-nya 2² × 3 × 5 = 60.",
  },
  {
    tanya: "Lampu A menyala tiap 10 menit dan lampu B tiap 15 menit. Keduanya menyala bersama lagi setelah...",
    pilihan: ["5 menit", "30 menit", "150 menit", "25 menit"],
    benar: "B",
    umpan: "KPK dari 10 dan 15 adalah 30 menit.",
  },
];

export default function NaskahMtk7Bab1({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h2 className="text-center text-xl font-black text-[#1C01A5]">Bab 1: Bilangan Bulat</h2>
        <p className="text-center text-sm font-semibold text-slate-600">Kelas 7 SMP</p>
        <TombolVoiceMateriPai1
          kelas={kelas}
          kelamin={kelamin}
          cuplikan={cuplikan(MODUL_MTK7_BAB1.kartu[0]?.voice[0] ?? [])}
        />
        <div className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700">
          <p>Setelah bab ini, kamu dapat:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>menjelaskan bilangan bulat pada garis bilangan</li>
            <li>membandingkan dan mengurutkan bilangan bulat</li>
            <li>menghitung penjumlahan, pengurangan, perkalian, dan pembagian</li>
            <li>menentukan faktor, faktorisasi prima, FPB, dan KPK</li>
          </ul>
        </div>
        <p className="text-center font-mono text-sm font-bold tracking-wide text-[#1C01A5]">
          −5 −4 −3 −2 −1 0 1 2 3 4 5
        </p>
        <p className="text-center text-xs font-semibold text-slate-500">Nilai bertambah ke kanan.</p>
      </header>

      <Subbab
        kode="A"
        judul="A. Memahami Bilangan Bulat"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={[
          "Bilangan bulat terdiri dari bilangan negatif, nol, dan bilangan positif.",
          "Pada garis bilangan, bilangan di kanan selalu lebih besar.",
          "Makin jauh suatu bilangan negatif dari nol, makin kecil nilainya.",
          "Lawan suatu bilangan adalah bilangan yang jumlahnya dengan bilangan itu sama dengan nol.",
        ]}
        contoh={
          <Contoh
            judul="Contoh"
            baris={["−8 berada di kiri −3.", "Jadi −8 < −3.", "Suhu −8°C lebih dingin daripada −3°C."]}
          />
        }
        soal={SOAL_A}
      />

      <Subbab
        kode="B"
        judul="B. Operasi Hitung Bilangan Bulat"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={[
          "Mengurangi sebuah bilangan sama dengan menambah lawannya.",
          "Penjumlahan boleh ditukar urutannya. Pengurangan tidak boleh ditukar urutannya.",
          "Perkalian dan pembagian dua bilangan sejenis menghasilkan bilangan positif.",
          "Perkalian dan pembagian dua bilangan yang beda tanda menghasilkan bilangan negatif.",
        ]}
        contoh={
          <Contoh
            judul="Contoh"
            baris={["(−3) + 8 = 5.", "5 − (−2) = 5 + 2 = 7.", "(−4) × (−3) = 12."]}
          />
        }
        soal={SOAL_B}
      />

      <Subbab
        kode="C"
        judul="C. Faktor Bilangan Bulat"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={[
          "Faktor adalah bilangan yang membagi habis bilangan itu.",
          "Bilangan negatif juga memiliki faktor negatif.",
          "Faktorisasi prima menuliskan bilangan sebagai hasil kali bilangan prima.",
          "FPB memakai pangkat prima yang terkecil. KPK memakai pangkat prima yang terbesar.",
        ]}
        contoh={
          <Contoh
            judul="Contoh"
            baris={["12 = 2² × 3.", "FPB dari 8 dan 12 adalah 4.", "KPK dari 3 dan 4 adalah 12."]}
          />
        }
        soal={SOAL_C}
      />

      <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
        <h3 className="text-base font-black text-[#1C01A5]">Intisari</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold leading-relaxed text-slate-700">
          <li>Bilangan bulat: negatif, nol, dan positif. Nilai bertambah ke kanan.</li>
          <li>a − b = a + (−b).</li>
          <li>Hasil kali atau hasil bagi sejenis bertanda positif. Beda tanda bertanda negatif.</li>
          <li>FPB adalah faktor persekutuan terbesar. KPK adalah kelipatan persekutuan terkecil.</li>
        </ul>
      </section>
    </div>
  );
}
