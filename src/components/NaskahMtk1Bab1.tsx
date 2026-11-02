"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { QuestLangkah, type LangkahQuest } from "@/components/QuestLangkah";
import { BenarSalahTiga, JudulHalaman, SusunTiga, empatHalaman } from "@/components/modul/GigitanQuest";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BILANGAN = [
  { angka: 0, nama: "nol", ikon: "○" },
  { angka: 1, nama: "satu", ikon: "●" },
  { angka: 2, nama: "dua", ikon: "●" },
  { angka: 3, nama: "tiga", ikon: "●" },
  { angka: 4, nama: "empat", ikon: "●" },
  { angka: 5, nama: "lima", ikon: "●" },
  { angka: 6, nama: "enam", ikon: "★" },
  { angka: 7, nama: "tujuh", ikon: "★" },
  { angka: 8, nama: "delapan", ikon: "★" },
  { angka: 9, nama: "sembilan", ikon: "★" },
  { angka: 10, nama: "sepuluh", ikon: "★" },
];

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <p className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </p>
  );
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK1_BAB1.id, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function UmpanBenar({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function KuisPilih({
  id,
  soal,
  pilihan,
  benar,
  anak,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              item.huruf,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function KuisCocokAngka() {
  const kuis = useKuisMateri();
  const baris = [
    { gambar: "🐞 🐞", label: "Kumbang", benar: "2" },
    { gambar: "🍪 🍪 🍪 🍪 🍪", label: "Kue", benar: "5" },
    { gambar: "🎈 🎈 🎈 🎈 🎈 🎈 🎈", label: "Balon", benar: "7" },
  ];
  const pilihan = ["7", "2", "5"];
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = baris.every((item) => pilih[item.label] === item.benar);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("B", 0));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">Quiz 1. Tarik setiap kelompok ke angkanya.</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Pilih angka yang pas untuk setiap kelompok.</p>
      <div className="mt-3 grid gap-3">
        {baris.map((item) => (
          <div key={item.label} className="rounded-xl bg-white px-3 py-3">
            <p className="text-2xl leading-relaxed">{item.gambar}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pilihan.map((angka) => {
                const terpilih = pilih[item.label] === angka;
                const dasar = terpilih
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1C01A5] text-white hover:bg-[#16017a]";
                return (
                  <button
                    key={angka}
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setPilih((lama) => ({ ...lama, [item.label]: angka }));
                    }}
                    className={`rounded-xl px-4 py-2 text-sm font-black ${
                      status
                        ? kelasTombolHasilKuis(pilih[item.label] ?? "", angka, item.benar, dasar)
                        : dasar
                    }`}
                  >
                    {angka}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={baris.map((item) => pilih[item.label]).filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung lagi setiap kelompok, lalu pasangkan angkanya."
        />
        <UmpanBenar status={status} teks="Semua cocok! Kamu menghitung dengan teliti." />
      </div>
    </article>
  );
}

function KuisSusun({
  id,
  soal,
  pool,
  benar,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pool: { kunci: string; tampil: ReactNode }[];
  benar: string[];
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((item) => !susun.includes(item.kunci));
  const periksa = () => {
    const ok = susun.length === benar.length && susun.every((item, indeks) => item === benar[indeks]);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-xl bg-white px-3 py-3">
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk benda untuk menyusun.</p> : null}
        {susun.map((kunci) => {
          const item = pool.find((calon) => calon.kunci === kunci);
          return (
            <span key={kunci} className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white">
              {item?.tampil}
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, item.kunci]);
            }}
            className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
          >
            {item.tampil}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={susun.join(" - ") || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function JudulSubBab({
  judul,
  kelas,
  kelamin,
  naskah,
}: {
  judul: string;
  kelas: string;
  kelamin?: KelaminGuru;
  naskah: string[];
}) {
  return (
    <>
      <h5 className="mt-5 text-left text-base font-black tracking-wide text-[#1C01A5] sm:text-lg">{judul}</h5>
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah([naskah], 2_000, 3_000)} />
      </div>
    </>
  );
}

function Dialog({ nama, warna, children }: { nama: string; warna: string; children: ReactNode }) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <NamaDialog nama={nama} />
      <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

const PETAK_KEBUN = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

type WarnaPetak = "hijau" | "biru" | "kuning" | "ungu";

type MisiPetak = {
  warna: WarnaPetak;
  misi: string;
  narasi: string;
  mode: "suara" | "kanvas" | "pilih";
  ikon: string;
  jumlah: number;
  kananIkon?: string;
  kananJumlah?: number;
  angka?: string;
  alias: string[];
  benarPilih?: "pertama" | "kedua";
  bersama: string;
};

const MISI_KEBUN: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Berapa jumlah bunga?",
    mode: "suara",
    ikon: "🌷",
    jumlah: 5,
    alias: ["5", "lima"],
    bersama: "Kiko menghitung bersama: satu, dua, tiga, empat, lima.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "8",
    alias: ["delapan", "8"],
    bersama: "Kiko membaca bersama: delapan.",
  },
  {
    warna: "kuning",
    misi: "Menulis",
    narasi: "Tulislah lambang bilangan jumlah wortel.",
    mode: "kanvas",
    ikon: "🥕",
    jumlah: 6,
    alias: ["6", "enam"],
    bersama: "Kiko menghitung bersama: satu, dua, tiga, empat, lima, enam.",
  },
  {
    warna: "ungu",
    misi: "Membandingkan",
    narasi: "Pilih kelompok yang lebih banyak.",
    mode: "pilih",
    ikon: "🐝",
    jumlah: 4,
    kananIkon: "🐝",
    kananJumlah: 6,
    alias: ["kedua"],
    benarPilih: "kedua",
    bersama: "Kiko menghitung bersama. Kelompok pertama ada 4. Kelompok kedua ada 6.",
  },
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Berapa jumlah bunga matahari?",
    mode: "suara",
    ikon: "🌻",
    jumlah: 3,
    alias: ["3", "tiga"],
    bersama: "Kiko menghitung bersama: satu, dua, tiga.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "4",
    alias: ["empat", "4"],
    bersama: "Kiko membaca bersama: empat.",
  },
  {
    warna: "kuning",
    misi: "Menulis",
    narasi: "Tulislah lambang bilangan jumlah stroberi.",
    mode: "kanvas",
    ikon: "🍓",
    jumlah: 9,
    alias: ["9", "sembilan"],
    bersama: "Kiko menghitung bersama: satu sampai sembilan.",
  },
  {
    warna: "ungu",
    misi: "Membandingkan",
    narasi: "Pilih kelompok yang lebih banyak.",
    mode: "pilih",
    ikon: "🐥",
    jumlah: 7,
    kananIkon: "🐥",
    kananJumlah: 4,
    alias: ["pertama"],
    benarPilih: "pertama",
    bersama: "Kiko menghitung bersama. Kelompok pertama ada 7. Kelompok kedua ada 4.",
  },
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Berapa jumlah bintang?",
    mode: "suara",
    ikon: "⭐",
    jumlah: 10,
    alias: ["10", "sepuluh"],
    bersama: "Kiko menghitung bersama: satu sampai sepuluh.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "1",
    alias: ["satu", "1"],
    bersama: "Kiko membaca bersama: satu.",
  },
];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-500 bg-emerald-50",
  biru: "border-sky-500 bg-sky-50",
  kuning: "border-amber-400 bg-amber-50",
  ungu: "border-violet-500 bg-violet-50",
};

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function BendaPetak({
  ikon,
  jumlah,
  petunjuk,
}: {
  ikon: string;
  jumlah: number;
  petunjuk: number;
}) {
  if (!ikon || jumlah < 1) return null;
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={`${ikon}-${i}`} className="inline-flex flex-col items-center">
          <span
            className={`text-3xl ${petunjuk >= 1 ? "kebun-goyang" : ""}`}
            style={petunjuk >= 1 ? { animationDelay: `${i * 0.28}s` } : undefined}
          >
            {ikon}
          </span>
          {petunjuk >= 2 ? <span className="mt-1 h-2 w-2 rounded-full bg-[#1C01A5]" aria-hidden /> : null}
        </span>
      ))}
    </div>
  );
}

function MisiKebunAngka() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_KEBUN[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;
  const daun = Object.values(jejak).reduce((jumlah, item) => jumlah + item.daun, 0);

  const catat = (indeks: number, benar: boolean) => {
    setJejak((lama) => {
      const sebelumnya = lama[indeks] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai) return lama;
      if (benar) {
        return {
          ...lama,
          [indeks]: { ...sebelumnya, selesai: true, daun: daunDariPetunjuk(sebelumnya.petunjuk) },
        };
      }
      return {
        ...lama,
        [indeks]: { ...sebelumnya, petunjuk: Math.min(3, sebelumnya.petunjuk + 1) },
      };
    });
  };

  const mintaPetunjuk = () => {
    setJejak((lama) => {
      const sebelumnya = lama[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai || sebelumnya.petunjuk >= 3) return lama;
      return { ...lama, [aktif]: { ...sebelumnya, petunjuk: sebelumnya.petunjuk + 1 } };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <style>{`
        @keyframes kebun-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-14deg) translateY(-3px); }
          70% { transform: rotate(12deg); }
        }
        .kebun-goyang { animation: kebun-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Kiko mengisi 10 petak kebun. Pilih satu petak, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🏡
        </span>
        {PETAK_KEBUN.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_KEBUN[indeks].warna]
              }`}
              aria-label={`Petak ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏆
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm font-black text-[#1C01A5]">
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · menghitung</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · membaca</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · menulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · membandingkan</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang kebun {bintang}/10 · Daun ajaib {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Petak {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Kiko</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.mode === "kanvas" ? null : (
          <>
            {misi.angka ? (
              <p
                className={`mt-3 text-center text-6xl font-black text-[#1C01A5] ${kini.petunjuk >= 1 ? "kebun-goyang" : ""}`}
              >
                {misi.angka}
                {kini.petunjuk >= 2 ? <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#1C01A5]" /> : null}
              </p>
            ) : null}
            {misi.mode === "pilih" ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Kelompok pertama</p>
                  <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
                </div>
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Kelompok kedua</p>
                  <BendaPetak ikon={misi.kananIkon ?? misi.ikon} jumlah={misi.kananJumlah ?? 0} petunjuk={kini.petunjuk} />
                </div>
              </div>
            ) : (
              <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
            )}
          </>
        )}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">
            Belum tepat. Daunmu tetap aman. Coba lagi.
          </p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">
            1 bintang kebun. Daun ajaib {kini.daun} { "🍃".repeat(kini.daun) }
          </p>
        ) : (
          <button
            type="button"
            onClick={mintaPetunjuk}
            className="mt-3 rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-black text-[#1C01A5]"
          >
            Minta petunjuk
          </button>
        )}
        {misi.mode === "suara" ? (
          <div className="mt-3" key={`suara-${aktif}`}>
            <SoalRekamSuara
              id={idKuis("C", aktif)}
              pertanyaan={misi.narasi}
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, misi.alias)}
              petunjuk="Jawab dengan suara, lalu kirim."
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {misi.mode === "kanvas" ? (
          <KuisTulisKartu
            key={`kanvas-${aktif}`}
            id={idKuis("C", aktif)}
            hanyaKanvas
            rapat
            pertanyaan={misi.narasi}
            alias={kumpulkanAlias(misi.alias)}
            konteks={misi.bersama}
            visual={<BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />}
            sesudahNilai={(benar) => catat(aktif, benar)}
          />
        ) : null}
        {misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-2">
            {(
              [
                ["pertama", "Kelompok pertama"],
                ["kedua", "Kelompok kedua"],
              ] as const
            ).map(([huruf, teks]) => (
              <button
                key={huruf}
                type="button"
                onClick={() => {
                  const benar = huruf === misi.benarPilih;
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                  catat(aktif, benar);
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${
                  kini.selesai && huruf === misi.benarPilih
                    ? "bg-emerald-600 text-white"
                    : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
                }`}
              >
                {teks}
              </button>
            ))}
          </div>
        ) : null}
      </article>
      <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Jawaban pertama benar: 3 daun ajaib.</li>
        <li>Benar setelah satu petunjuk: 2 daun ajaib.</li>
        <li>Benar setelah dua petunjuk: 1 daun ajaib.</li>
        <li>Belum tepat tidak mengurangi daun. Kamu boleh mencoba lagi.</li>
      </ul>
      {bintang === 10 ? (
        <div className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-4">
          <KuisTulisKartu
            id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "C")}
            hanyaKanvas
            rapat
            pertanyaan="Tuliskan jumlah bintang kebun yang sudah kamu kumpulkan."
            alias={kumpulkanAlias(["10", "sepuluh"])}
            konteks="Sepuluh petak selesai. Bintang kebun ada 10."
            visual={
              <>
                <p className="text-center text-3xl" aria-hidden>
                  🌷🌼🌻🌺🌹🌸💐
                </p>
                <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">Bunga pelangi tumbuh di kebun Kiko.</p>
              </>
            }
          />
        </div>
      ) : null}
    </div>
  );
}

function LembarKerja() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );
  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-white p-4 sm:grid-cols-2">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="______________________"
          />
        </label>
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Tanggal
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
      </div>

      <KuisPilih
        id={idKuis("D", 0)}
        soal="1. Berapa jumlah ikan? Pilih jawabannya, lalu ucapkan bilangannya."
        benar="B"
        umpanBenar="Hebat! Ada 7 ikan. Tujuh ditulis dengan angka 7."
        pesanSalah="Yuk, tunjuk ikan satu per satu."
        anak={<IkonUlang ikon="🐠" jumlah={7} />}
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "7" },
          { huruf: "C", teks: "8" },
        ]}
      />

      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. Pilih lambang bilangan yang sesuai dengan kue mangkuk ini."
        benar="C"
        umpanBenar="Bagus! Ada 9 kue. Lambangnya angka 9."
        pesanSalah="Hitung kue satu per satu, lalu pilih angkanya."
        anak={<IkonUlang ikon="🧁" jumlah={9} />}
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "9" },
        ]}
      />

      <KuisTulisKartu
        id={idKuis("D", 2)}
        hanyaKanvas
        pertanyaan="3. Tuliskan angka yang hilang pada roket bilangan."
        alias={kumpulkanAlias(["5", "lima"])}
        konteks="Urutan 3, 4, angka hilang, 6, 7. Jawabannya 5."
        visual={<p className="text-center text-lg font-black text-[#1C01A5]">🚀 3 - 4 - _ - 6 - 7</p>}
      />

      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF1F2] p-4">
        <IkonUlang ikon="🍒" jumlah={6} />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          4. Dina berkata, “Ada 5 ceri.” Apakah Dina benar? Jelaskan dengan suara.
        </p>
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan="Apakah hitungan Dina benar?"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["salah", "tidak benar", "tidak tepat", "belum tepat", "keliru"],
              ["6", "enam"],
            ])
          }
          petunjuk="Sebutkan Dina salah atau benar, lalu sebut jumlah cerinya."
        />
      </div>

      <KuisTulisKartu
        id={idKuis("D", 4)}
        hanyaKanvas
        pertanyaan="5. Lengkapi tanda perbandingan. Pilihan: <, >, atau =. Tulis tanda di antara 4 dan 6."
        alias={kumpulkanAlias(["<", "4 < 6", "4<6"])}
        konteks="Bebek 4 lebih sedikit daripada kelinci 6. Tandanya kurang dari."
        visual={<p className="text-center text-lg font-black text-[#1C01A5]">🦆🦆🦆🦆 4 &nbsp;&nbsp; □ &nbsp;&nbsp; 6 🐇🐇🐇🐇🐇🐇</p>}
      />

      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. Piring A punya 5 kue. Piring B punya 3 kue. Berapa kue yang ditambahkan ke Piring B?"
        benar="B"
        umpanBenar="Tepat! 3 + 2 = 5. Tambahkan 2 kue."
        pesanSalah="Hitung selisih 5 dan 3."
        anak={
          <span>
            Piring A <IkonUlang ikon="🍪" jumlah={5} ukuran="text-xl" /> · Piring B{" "}
            <IkonUlang ikon="🍪" jumlah={3} ukuran="text-xl" />
          </span>
        }
        pilihan={[
          { huruf: "A", teks: "1" },
          { huruf: "B", teks: "2" },
          { huruf: "C", teks: "3" },
        ]}
      />

      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. Ada 8 kancing. Cara manakah yang paling baik agar semua kancing dihitung satu kali?"
        benar="B"
        umpanBenar="Tepat! Pindahkan kancing satu per satu sambil menghitung."
        pesanSalah="Pilih cara yang membuat setiap kancing hanya dihitung sekali."
        anak={<IkonUlang ikon="🔴🔵🟡🟢" jumlah={2} ukuran="text-xl" />}
        pilihan={[
          { huruf: "A", teks: "Menghitung dengan sangat cepat." },
          { huruf: "B", teks: "Memindahkan kancing satu per satu sambil menghitung." },
          { huruf: "C", teks: "Menebak jumlah kancing." },
        ]}
      />

      <KuisSusun
        id={idKuis("D", 7)}
        soal="8. Urutkan kotak dari jumlah bintang paling sedikit ke paling banyak."
        pool={[
          { kunci: "A", tampil: "Kotak A · ⭐⭐⭐" },
          { kunci: "B", tampil: "Kotak B · ⭐ × 7" },
          { kunci: "C", tampil: "Kotak C · ⭐ × 5" },
        ]}
        benar={["A", "C", "B"]}
        umpanBenar="Benar! Urutannya Kotak A, Kotak C, lalu Kotak B."
        pesanSalah="Hitung bintang setiap kotak. Mulai dari yang paling sedikit."
      />

      <KuisPilih
        id={idKuis("D", 8)}
        soal="9. Kelompok pertama 4. Kelompok kedua 6. Mana kalimat yang benar?"
        benar="B"
        umpanBenar="Benar! 4 lebih sedikit daripada 6. 4 < 6."
        pesanSalah="Kelompok kedua lebih banyak, jadi tandanya mengarah ke 6."
        pilihan={[
          { huruf: "A", teks: "4 > 6" },
          { huruf: "B", teks: "4 < 6" },
          { huruf: "C", teks: "4 = 6" },
        ]}
      />

      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] p-4">
        <p className="text-sm font-bold text-[#1C01A5]">Rara · 6 balon</p>
        <IkonUlang ikon="🎈" jumlah={6} ukuran="text-xl" />
        <p className="mt-2 text-sm font-bold text-[#1C01A5]">Bimo · 8 balon</p>
        <IkonUlang ikon="🎈" jumlah={8} ukuran="text-xl" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          10. Siapa yang memiliki balon lebih banyak? Berapa selisih jumlah balon mereka?
        </p>
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="Sebutkan namanya dan selisih balonnya."
          periksa={(transkrip) => ucapanMemuat(transkrip, [["bimo"], ["2", "dua"]])}
          petunjuk="Sebutkan siapa yang lebih banyak, lalu sebutkan selisihnya."
        />
      </div>
    </div>
  );
}

const ID1 = MODUL_MTK1_BAB1.id;

function IsiHitung({ kelas = "1 SD", kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan" kelas={kelas} kelamin={kelamin} naskah={["Kita hitung buah satu per satu.", "Setiap buah hanya dihitung sekali."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-piknik.jpg" alt="Rara dan Bimo duduk di tikar piknik. Ada keranjang buah dan Igil." />
        <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">Bimo, ayo kita hitung buahnya!</Dialog>
        <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">Ayo! Kita mulai dari apel.</Dialog>
        <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">Hoo! Aku bantu menghitung.</Dialog>
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-apel.jpg" alt="Piring berisi apel." />
        <IkonUlang ikon="🍎" jumlah={3} ukuran="text-3xl" />
        <KuisAkhirAdegan idSuara={idKuis("A", 2)} pertanyaanSuara="Ada berapa apel di piring?" aliasSuara={["3", "tiga"]} petunjukSuara="Ucapkan angkanya." />
        <KuisTulisKartu id={idKuis("A", 1)} hanyaKanvas pertanyaan="Tebalkan angka berikut: 3" alias={kumpulkanAlias(["3", "tiga"])} konteks="Ada 3 apel. Lambang bilangannya 3." visual={<p className="text-center text-7xl font-black text-transparent" style={{ WebkitTextStroke: "3px #1C01A5" }}>3</p>} />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Hitung, baca, tulis" kepala={["Langkah", "Cara", "Contoh"]} baris={[["Hitung", "tunjuk satu per satu", "buah di piring"], ["Baca", "sebut nama bilangan", "lima, enam, tujuh"], ["Tulis", "tulis lambangnya", "5, 6, 7"]]} kaki="Benda terakhir yang ditunjuk adalah jumlah semuanya." />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-jeruk.jpg" alt="Lima jeruk berjajar di samping keranjang." />
        <IkonUlang ikon="🍊" jumlah={5} ukuran="text-3xl" />
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Ada berapa jeruk dari keranjang?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka banyak jeruk." aliasKanvas={["5", "lima"]} konteksKanvas="Jeruknya ada 5. Lambangnya 5." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-urut.jpg" alt="Tiga apel, empat pisang, dan lima jeruk." />
        <IkonUlang ikon="🍌" jumlah={4} ukuran="text-3xl" />
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Urutan dari yang paling sedikit: tiga, empat, lalu berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Sebutkan angka terakhir." pertanyaanKanvas="Tuliskan urutan 3, 4, 5." aliasKanvas={["3, 4, 5", "3 4 5", "345"]} konteksKanvas="Apel 3, pisang 4, jeruk 5." />
        <p className="text-center text-5xl font-black text-[#1C01A5]">0</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 11)} idKanvas={idKuis("A", 12)} pertanyaanSuara="Piring kosong. Berapa jumlah buahnya?" aliasSuara={["0", "nol"]} petunjukSuara="Ucapkan nol atau angka 0." pertanyaanKanvas="Tuliskan lambang bilangan nol." aliasKanvas={["0", "nol"]} konteksKanvas="Piring kosong. Banyaknya 0. Dibaca nol." />
        <KuisAkhirAdegan idSuara={idKuis("A", 13)} pertanyaanSuara="Bagaimana cara membaca lambang 8?" aliasSuara={["delapan"]} petunjukSuara="Sebutkan nama bilangannya." />
        <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Di atas tikar ada tujuh mangga. Berapa jumlah mangganya?" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh", "7", "ada tujuh mangga"])} petunjuk="Dengarkan, hitung, lalu jawab dengan suara." />
        <KuisCocokAngka />
        <SusunTiga id={idKuis("A", 14)} perintah="Susun dari yang paling sedikit." acak={["Jeruk", "Apel", "Pisang"]} benar={["Apel", "Pisang", "Jeruk"]} umpan="Apel 3, pisang 4, jeruk 5." />
        <BenarSalahTiga id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "Piring kosong dibaca nol.", benar: true }, { teks: "Lambang 8 dibaca enam.", benar: false }, { teks: "Setiap buah dihitung sekali.", benar: true }]} umpan="Lambang 8 dibaca delapan." />
        <SusunTiga id={idKuis("A", 16)} perintah="Susun langkah bilangan." acak={["Tulis", "Hitung", "Baca"]} benar={["Hitung", "Baca", "Tulis"]} umpan="Hitung, baca, lalu tulis." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">0 1 2 3 4 5 6 7 8 9 10</p>
      <KuisTulisKartu id={idKuisTulisKartu(ID1, "A")} hanyaKanvas pertanyaan="Hitung bintang. Tuliskan lambang bilangannya." alias={kumpulkanAlias(["6", "enam"])} konteks="Ada 6 bintang. Lambangnya 6." visual={<IkonUlang ikon="⭐" jumlah={6} ukuran="text-3xl" />} />
      <KuisPilih id={idKuis("A", 17)} soal="Lambang tujuh adalah..." benar="B" umpanBenar="Tujuh ditulis 7." pesanSalah="Ingat nama dan lambangnya." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "8" }]} />
      <KuisPilih id={idKuis("A", 18)} soal="Setelah 4, angka majunya..." benar="A" umpanBenar="4, lalu 5." pesanSalah="Maju bertambah satu." pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "14" }]} />
      <KuisPilih id={idKuis("A", 19)} soal="Tidak ada buah. Lambangnya..." benar="C" umpanBenar="Kosong dibaca nol." pesanSalah="Piring kosong adalah 0." pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "0" }]} />
    </div>
  );
}

function IsiBanding({ kelas = "1 SD", kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Membandingkan Banyak Benda" kelas={kelas} kelamin={kelamin} naskah={["Ada yang lebih banyak.", "Ada yang lebih sedikit. Ada yang sama banyak."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-banding.jpg" alt="Piring apel dan piring jeruk." />
        <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">Apel atau jeruk yang lebih banyak?</Dialog>
        <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">Ayo hitung keduanya.</Dialog>
        <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">Hoo! Lihat piring yang isinya lebih banyak.</Dialog>
        <div className="grid grid-cols-2 gap-2 text-center">
          <IkonUlang ikon="🍎" jumlah={3} />
          <IkonUlang ikon="🍊" jumlah={5} />
        </div>
        <KuisAkhirAdegan idSuara={idKuis("A", 7)} idKanvas={idKuis("A", 8)} pertanyaanSuara="Mana yang lebih banyak, apel atau jeruk?" aliasSuara={["jeruk"]} petunjukSuara="Sebutkan buah yang lebih banyak." pertanyaanKanvas="Tuliskan 5 > 3." aliasKanvas={["5 > 3", "5>3", "lima lebih besar dari tiga"]} konteksKanvas="Lima jeruk lebih banyak daripada tiga apel." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Membandingkan" kepala={["Kata", "Arti", "Tanda"]} baris={[["Lebih banyak", "jumlahnya lebih besar", ">"], ["Lebih sedikit", "jumlahnya lebih kecil", "<"], ["Sama banyak", "jumlahnya sama", "="]]} kaki="Mulut tanda terbuka ke jumlah yang lebih banyak." />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-sama.jpg" alt="Empat stroberi dan empat pisang." />
        <KuisAkhirAdegan idSuara={idKuis("A", 9)} idKanvas={idKuis("A", 10)} pertanyaanSuara="Stroberi dan pisang sama banyak. Masing-masing berapa?" aliasSuara={["4", "empat"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 4 = 4." aliasKanvas={["4 = 4", "4=4", "empat sama dengan empat"]} konteksKanvas="Stroberi 4 dan pisang 4." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🐥🐥🐥🐥🐥 &nbsp; 🐸🐸🐸</p>
        <SusunTiga id={idKuis("A", 20)} perintah="Susun dari yang paling sedikit." acak={["5 ayam", "2 mobil", "4 bola"]} benar={["2 mobil", "4 bola", "5 ayam"]} umpan="2, lalu 4, lalu 5." />
        <BenarSalahTiga id={idKuis("A", 21)} perintah="Pilih benar atau salah." baris={[{ teks: "5 lebih banyak daripada 3.", benar: true }, { teks: "Tanda = berarti jumlahnya beda.", benar: false }, { teks: "Mulut tanda terbuka ke yang lebih banyak.", benar: true }]} umpan="Tanda = berarti sama banyak." />
        <SusunTiga id={idKuis("A", 22)} perintah="Susun tanda dari cerita." acak={["sama", "lebih banyak", "lebih sedikit"]} benar={["lebih sedikit", "sama", "lebih banyak"]} umpan="Sedikit, sama, lalu banyak." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">&lt; &nbsp; &gt; &nbsp; =</p>
      <KuisTulisKartu id={idKuisTulisKartu(ID1, "B")} hanyaKanvas pertanyaan="Tulis jumlah kura-kura, tanda < > atau =, lalu jumlah kelinci. Contoh: 3 < 5." alias={kumpulkanAlias(["3 < 5", "3<5", "tiga lebih sedikit daripada lima"])} konteks="Kura-kura 3. Kelinci 5." visual={<div className="text-center text-2xl">🐢 🐢 🐢 &nbsp;&nbsp; 🐰 🐰 🐰 🐰 🐰</div>} />
      <KuisPilih id={idKuis("B", 2)} soal="Pilih keranjang yang berisi buah paling banyak." benar="B" umpanBenar="Tepat! Enam lebih banyak daripada lima dan empat." pesanSalah="Hitung setiap keranjang." pilihan={[{ huruf: "A", teks: "Keranjang A · 🍊 🍊 🍊 🍊" }, { huruf: "B", teks: "Keranjang B · 🍎 🍎 🍎 🍎 🍎 🍎" }, { huruf: "C", teks: "Keranjang C · 🍐 🍐 🍐 🍐 🍐" }]} />
      <KuisPilih id={idKuis("A", 23)} soal="8 ... 5. Tanda yang tepat..." benar="A" umpanBenar="Mulut terbuka ke 8." pesanSalah="8 lebih besar." pilihan={[{ huruf: "A", teks: ">" }, { huruf: "B", teks: "<" }, { huruf: "C", teks: "=" }]} />
      <KuisPilih id={idKuis("A", 24)} soal="3 bunga dan 3 stroberi. Keduanya..." benar="C" umpanBenar="Jumlahnya sama." pesanSalah="Hitung keduanya." pilihan={[{ huruf: "A", teks: "bunga lebih banyak" }, { huruf: "B", teks: "stroberi lebih banyak" }, { huruf: "C", teks: "sama banyak" }]} />
    </div>
  );
}

function IsiMaju({ kelas = "1 SD", kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab C: Menghitung Maju dan Mundur" kelas={kelas} kelamin={kelamin} naskah={["Maju berjalan dari kecil ke besar.", "Satu, dua, tiga."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-maju.jpg" alt="Igil naik ke dahan. Rara dan Bimo menatap." />
        <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">Aku naik dahan. Hitung maju bersamaku.</Dialog>
        <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">Satu, dua, tiga.</Dialog>
        <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">Lalu angka berikutnya.</Dialog>
        <KuisAkhirAdegan idSuara={idKuis("B", 4)} pertanyaanSuara="Urutan maju: 1, 2, 3, lalu berapa?" aliasSuara={["4", "empat"]} petunjukSuara="Sebutkan bilangan berikutnya." />
        <KuisTulisKartu id={idKuis("B", 10)} hanyaKanvas pertanyaan="Tuliskan 1, 2, 3, 4." alias={kumpulkanAlias(["1, 2, 3, 4", "1 2 3 4"])} konteks="Maju satu per satu." visual={<p className="text-center text-lg font-black text-[#1C01A5]">1 · 2 · 3 · ?</p>} />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Maju dan mundur" kepala={["Arah", "Dari", "Contoh"]} baris={[["Maju", "kecil ke besar", "1, 2, 3"], ["Mundur", "besar ke kecil", "10, 9, 8"], ["Langkah", "satu-satu", "jangan lompat"]]} kaki="Naik dihitung maju. Turun dihitung mundur." />
        <KuisAkhirAdegan idSuara={idKuis("B", 5)} pertanyaanSuara="Saat menghitung mundur, setelah 10 adalah berapa?" aliasSuara={["9", "sembilan"]} petunjukSuara="Sebutkan bilangan yang lebih kecil satu langkah." />
        <KuisTulisKartu id={idKuis("B", 11)} hanyaKanvas pertanyaan="Tuliskan 10, 9, 8." alias={kumpulkanAlias(["10, 9, 8", "10 9 8"])} konteks="Mundur dari sepuluh." visual={<p className="text-center text-lg font-black text-[#1C01A5]">10 · ? · ?</p>} />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-lg font-black text-[#1C01A5]">1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10</p>
        <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Ada delapan burung di pohon. Sebutkan bilangan sebelum delapan." periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh", "7"])} petunjuk="Dengarkan, lalu jawab dengan suara." />
        <KuisSusun id={idKuis("B", 1)} soal="Susun bilangan dari yang kecil ke yang besar." pool={[{ kunci: "6", tampil: "6" }, { kunci: "4", tampil: "4" }, { kunci: "5", tampil: "5" }, { kunci: "2", tampil: "2" }, { kunci: "3", tampil: "3" }]} benar={["2", "3", "4", "5", "6"]} umpanBenar="Benar! 2, 3, 4, 5, 6." pesanSalah="Mulai dari bilangan paling kecil." />
        <KuisSusun id={idKuis("B", 8)} soal="Susun bilangan dari yang besar ke yang kecil." pool={[{ kunci: "8", tampil: "8" }, { kunci: "10", tampil: "10" }, { kunci: "7", tampil: "7" }, { kunci: "9", tampil: "9" }]} benar={["10", "9", "8", "7"]} umpanBenar="Benar! 10, 9, 8, 7." pesanSalah="Mulai dari bilangan paling besar." />
        <BenarSalahTiga id={idKuis("B", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "Maju berarti bertambah.", benar: true }, { teks: "Setelah 10 kalau maju adalah 9.", benar: false }, { teks: "Mundur dari 8 menuju 7.", benar: true }]} umpan="Maju dari 10 menuju 11, tetapi bab ini sampai 10." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">1 … 10</p>
      <KuisPilih id={idKuis("B", 13)} soal="Setelah 6, angka majunya..." benar="B" umpanBenar="6, lalu 7." pesanSalah="Maju bertambah satu." pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "8" }]} />
      <KuisPilih id={idKuis("B", 14)} soal="Sebelum 8 adalah..." benar="A" umpanBenar="Tujuh ada sebelum delapan." pesanSalah="Mundur satu langkah." pilihan={[{ huruf: "A", teks: "7" }, { huruf: "B", teks: "9" }, { huruf: "C", teks: "10" }]} />
      <KuisPilih id={idKuis("B", 15)} soal="10, 9, 8. Angka berikutnya..." benar="C" umpanBenar="Mundur menuju 7." pesanSalah="Mundur berkurang satu." pilihan={[{ huruf: "A", teks: "11" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "7" }]} />
    </div>
  );
}

function IsiPasangan({ kelas = "1 SD", kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab D: Pasangan Bilangan" kelas={kelas} kelamin={kelamin} naskah={["Satu jumlah bisa dipisah jadi dua kelompok.", "Dua kelompok juga bisa digabung."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab1-pasangan.jpg" alt="Rara memegang jeruk di dua tangan." />
        <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">Ada 5 jeruk. Di tangan kiri ada 2.</Dialog>
        <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">Tangan kanan masih ada jeruk.</Dialog>
        <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">Dua kelompok itu pasangan untuk 5.</Dialog>
        <KuisAkhirAdegan idSuara={idKuis("B", 6)} idKanvas={idKuis("B", 7)} pertanyaanSuara="Lima jeruk dipisah menjadi 2 dan berapa?" aliasSuara={["3", "tiga"]} petunjukSuara="Sebutkan kelompok yang satunya." pertanyaanKanvas="Tuliskan pasangan bilangan 2 dan 3." aliasKanvas={["2 dan 3", "2, 3", "2 3"]} konteksKanvas="Lima jeruk dipisah menjadi 2 dan 3." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Pasangan bilangan" kepala={["Jumlah", "Kelompok", "Cek"]} baris={[["5", "2 dan 3", "2 + 3"], ["4", "1 dan 3", "1 + 3"], ["8", "4 dan 4", "4 + 4"]]} kaki="Dua kelompok digabung kembali ke jumlahnya." />
        <KuisAkhirAdegan idSuara={idKuis("A", 25)} idKanvas={idKuis("A", 26)} pertanyaanSuara="4 pisang dipisah. Satu untuk Igil. Di piring sisa berapa?" aliasSuara={["3", "tiga"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 1 dan 3." aliasKanvas={["1 dan 3", "1, 3"]} konteksKanvas="Satu dan tiga adalah pasangan untuk 4." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🍊🍊 &nbsp; 🍊🍊🍊</p>
        <SusunTiga id={idKuis("A", 27)} perintah="Susun pasangan 5 dari yang kecil." acak={["3", "2", "5"]} benar={["2", "3", "5"]} umpan="2 dan 3 menjadi 5." />
        <BenarSalahTiga id={idKuis("A", 28)} perintah="Pilih benar atau salah." baris={[{ teks: "2 dan 3 adalah pasangan untuk 5.", benar: true }, { teks: "4 dan 4 menjadi 6.", benar: false }, { teks: "1 dan 3 adalah pasangan untuk 4.", benar: true }]} umpan="4 + 4 = 8." />
        <SusunTiga id={idKuis("A", 29)} perintah="Susun cara pasangan." acak={["Gabungkan", "Pisahkan", "Hitung jumlah"]} benar={["Hitung jumlah", "Pisahkan", "Gabungkan"]} umpan="Hitung, pisahkan, lalu gabungkan lagi." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">2 + 3 = 5</p>
      <KuisPilih id={idKuis("B", 9)} soal="Mana pasangan bilangan untuk 5?" benar="A" umpanBenar="Tepat! 2 dan 3 bersama-sama menjadi 5." pesanSalah="Jumlahnya harus 5." pilihan={[{ huruf: "A", teks: "2 dan 3" }, { huruf: "B", teks: "4 dan 4" }, { huruf: "C", teks: "1 dan 6" }]} />
      <KuisPilih id={idKuis("A", 30)} soal="1 dan 3 adalah pasangan untuk..." benar="B" umpanBenar="1 + 3 = 4." pesanSalah="Jumlahkan dua kelompok." pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "5" }]} />
      <KuisPilih id={idKuis("A", 31)} soal="4 dan 4 digabung menjadi..." benar="C" umpanBenar="4 + 4 = 8." pesanSalah="Dua kelompok yang sama." pilihan={[{ huruf: "A", teks: "4" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "8" }]} />
    </div>
  );
}

function langkahBab1(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const modul = MODUL_MTK1_BAB1;
  const [kartuA, , kartuC, kartuD] = modul.kartu;
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID1, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID1, "D")];
  const butir = ["Menghitung benda, lalu membaca dan menulis lambangnya, termasuk 0.", "Membandingkan dua kelompok: lebih banyak, lebih sedikit, atau sama banyak.", "Menghitung maju dari kecil ke besar, dan mundur dari besar ke kecil.", "Memisahkan satu jumlah menjadi dua kelompok sebagai pasangan bilangan."];
  const poin = ["Tunjuk satu, sebut satu. Setiap benda hanya dihitung sekali.", "Bilangan terakhir yang disebut adalah jumlah semua benda.", "Urutan bilangan adalah 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.", "Lebih banyak berarti jumlahnya lebih besar.", "Lebih sedikit berarti jumlahnya lebih kecil.", "Sama banyak berarti jumlah kedua kelompok sama.", "Mulut tanda terbuka ke bilangan yang lebih besar.", "Bilangan 0 dibaca nol.", "Menghitung maju dari kecil ke besar. Mundur dari besar ke kecil.", "Satu jumlah dapat dipisah menjadi dua kelompok."];
  const halaman = (Isi: (props: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) => ReactNode, kuis: string[][]) =>
    [0, 1, 2, 3].map((n) => ({ isi: <Isi halaman={n} kelas={kelas} kelamin={kelamin} />, kuis: kuis[n] }));
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Membilang sampai 10" }, "hitung", halaman(IsiHitung, [
      [idKuis("A", 2), idKuis("A", 1)],
      [idKuis("A", 3), idKuis("A", 4)],
      [idKuis("A", 5), idKuis("A", 6), idKuis("A", 11), idKuis("A", 12), idKuis("A", 13), idKuis("A", 0), idKuis("B", 0), idKuis("A", 14), idKuis("A", 15), idKuis("A", 16)],
      [idKuisTulisKartu(ID1, "A"), idKuis("A", 17), idKuis("A", 18), idKuis("A", 19)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Membandingkan" }, "banding", halaman(IsiBanding, [
      [idKuis("A", 7), idKuis("A", 8)],
      [idKuis("A", 9), idKuis("A", 10)],
      [idKuis("A", 20), idKuis("A", 21), idKuis("A", 22)],
      [idKuisTulisKartu(ID1, "B"), idKuis("B", 2), idKuis("A", 23), idKuis("A", 24)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab C", kelompok: "Maju dan mundur" }, "maju", halaman(IsiMaju, [
      [idKuis("B", 4), idKuis("B", 10)],
      [idKuis("B", 5), idKuis("B", 11)],
      [idKuis("B", 3), idKuis("B", 1), idKuis("B", 8), idKuis("B", 12)],
      [idKuis("B", 13), idKuis("B", 14), idKuis("B", 15)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab D", kelompok: "Pasangan bilangan" }, "pasangan", halaman(IsiPasangan, [
      [idKuis("B", 6), idKuis("B", 7)],
      [idKuis("A", 25), idKuis("A", 26)],
      [idKuis("A", 27), idKuis("A", 28), idKuis("A", 29)],
      [idKuis("B", 9), idKuis("A", 30), idKuis("A", 31)],
    ])),
    {
      kode: "misi",
      bagian: "Misi",
      judul: "Misi penjaga kebun",
      kuis: kuisMisi,
      isi: (
        <div className="space-y-3">
          <h4 className="text-center text-lg font-black text-[#1C01A5]">Misi Penjaga Kebun Angka</h4>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
          <MisiKebunAngka />
        </div>
      ),
    },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <p className="text-center text-4xl">🌳🧺🦉</p>
          <h4 className="text-center text-lg font-black text-[#1C01A5]">{kartuA.judul}</h4>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={butir} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)} poin={poin} penutup="Hitung satu per satu, tulis angkanya, bandingkan, lalu cari pasangan bilangannya." />
          <p className="text-sm font-semibold text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    {
      kode: "evaluasi",
      bagian: "Evaluasi",
      judul: "Lembar evaluasi",
      isi: (
        <div className="space-y-4">
          <h4 className="text-center text-lg font-black text-[#1C01A5]">{kartuD.judul}</h4>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
          <LembarKerja />
          <KuisTulisKartu id={idKuisTulisKartu(ID1, "D")} hanyaKanvas pertanyaan="Tuliskan kalimat kunci: Hitung satu per satu, tulis angkanya, lalu bandingkan jumlahnya." alias={kumpulkanAlias(["hitung satu per satu", "tulis angkanya", "bandingkan jumlahnya"])} konteks={kartuD.pengantar} />
        </div>
      ),
      kuis: kuisEvaluasi,
    },
  ];
}

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab1(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab1-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Piknik selesai. Bab ini selesai."
    />
  );
}

