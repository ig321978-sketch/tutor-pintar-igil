"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BILANGAN = [
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

const ALIAS_LEBIH_DARI_EMPAT = [5, 6, 7, 8, 9, 10].flatMap((angka) => [
  `4 < ${angka}`,
  `4<${angka}`,
  `${angka} > 4`,
  `${angka}>4`,
]);

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
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
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
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
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
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
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
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
                  ? "bg-[#F0AB00] text-[#1C01A5]"
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

function Dialog({ nama, warna, children }: { nama: string; warna: string; children: ReactNode }) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
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
        <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
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
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-2">
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

      <KuisTulisKartu
        id={idKuis("D", 5)}
        hanyaKanvas
        pertanyaan="6. Berapa kue yang harus ditambahkan ke Piring B agar sama banyak dengan Piring A?"
        alias={kumpulkanAlias(["2", "dua", "tambah 2"])}
        konteks="Piring A 5 kue. Piring B 3 kue. Tambahkan 2 kue."
        visual={
          <div className="grid gap-2 sm:grid-cols-2">
            <p className="rounded-xl bg-[#FFF7ED] px-3 py-2 text-sm font-bold text-[#1C01A5]">
              Piring A · 5
              <IkonUlang ikon="🍪" jumlah={5} ukuran="text-xl" />
            </p>
            <p className="rounded-xl bg-[#F0FDF4] px-3 py-2 text-sm font-bold text-[#1C01A5]">
              Piring B · 3
              <IkonUlang ikon="🍪" jumlah={3} ukuran="text-xl" />
            </p>
          </div>
        }
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

      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="9. Kelompok pertama berjumlah 4. Kelompok kedua lebih banyak, dan tidak lebih dari 10. Tuliskan kedua bilangan dan tandanya. Contoh: 4 < 6."
        alias={kumpulkanAlias(ALIAS_LEBIH_DARI_EMPAT)}
        konteks="Kelompok pertama 4. Kelompok kedua lebih besar dari 4 dan paling banyak 10."
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

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB1;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🧺🐱
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Ayo Membilang sampai dengan 10</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Setelah belajar, siswa dapat:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
            <li>Menghitung benda sampai 10.</li>
            <li>Membaca bilangan 1–10.</li>
            <li>Menulis lambang bilangan 1–10.</li>
            <li>Mencocokkan jumlah benda dengan lambang bilangannya.</li>
            <li>Membandingkan dua kelompok: lebih banyak, lebih sedikit, atau sama banyak.</li>
          </ul>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">Cerita: Piknik Buah Rara dan Bimo</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Taman cerah. Rara dan Bimo duduk di atas tikar. Ada keranjang buah dan Miko si Kucing.
            </p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab1-piknik.jpg"
              alt="Rara dan Bimo duduk di tikar piknik. Ada keranjang buah dan kucing Miko."
            />
          </article>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Bimo, ayo kita hitung buahnya!”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ayo! Kita mulai dari apel.”
          </Dialog>
          <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9F1239]">Piring apel</p>
            <GambarCerita src="/doodle-mtk/mtk-1-bab1-apel.jpg" alt="Piring dengan tiga apel dan angka 3." />
            <IkonUlang ikon="🍎" jumlah={3} ukuran="text-3xl" />
          </article>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Satu, dua, tiga.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ada 3 apel. Lambang bilangannya adalah 3.”
          </Dialog>
          <KuisTulisKartu
            id={idKuis("A", 1)}
            hanyaKanvas
            pertanyaan="Tebalkan angka berikut: 3"
            alias={kumpulkanAlias(["3", "tiga"])}
            konteks="Ada 3 apel. Lambang bilangannya 3."
            visual={
              <p
                className="text-center text-7xl font-black text-transparent"
                style={{ WebkitTextStroke: "3px #1C01A5" }}
                aria-hidden
              >
                3
              </p>
            }
          />
          <article className="rounded-2xl border-2 border-[#F97316]/30 bg-[#FFF7ED] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9A3412]">Jeruk dari keranjang</p>
            <GambarCerita src="/doodle-mtk/mtk-1-bab1-jeruk.jpg" alt="Bimo menuang keranjang. Lima jeruk berjajar dan angka 5." />
            <IkonUlang ikon="🍊" jumlah={5} ukuran="text-3xl" />
          </article>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Sekarang hitung jeruknya.”
          </Dialog>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Satu, dua, tiga, empat, lima.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Benar! Ada 5 jeruk.”
          </Dialog>
          <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#92400E]">Miko membawa pisang</p>
            <GambarCerita src="/doodle-mtk/mtk-1-bab1-pisang.jpg" alt="Miko si kucing di samping empat pisang dan angka 4." />
            <IkonUlang ikon="🍌" jumlah={4} ukuran="text-3xl" />
          </article>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Miko membawa 4 pisang.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ayo kita urutkan jumlah buahnya.”
          </Dialog>
          <ul className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-sm font-black text-[#1C01A5]">
            <li>Apel: 3</li>
            <li>Pisang: 4</li>
            <li>Jeruk: 5</li>
          </ul>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab1-urut.jpg"
            alt="Urutan buah: tiga apel, empat pisang, lima jeruk."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Urutannya adalah 3, 4, 5.”
          </Dialog>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
              <p className="text-xs font-black uppercase text-[#9F1239]">Piring kiri · apel</p>
              <IkonUlang ikon="🍎" jumlah={3} />
            </article>
            <article className="rounded-2xl border-2 border-[#F97316]/30 bg-[#FFF7ED] px-4 py-3">
              <p className="text-xs font-black uppercase text-[#9A3412]">Piring kanan · jeruk</p>
              <IkonUlang ikon="🍊" jumlah={5} />
            </article>
          </div>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Apel atau jeruk yang lebih banyak?”
          </Dialog>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Jeruk lebih banyak daripada apel.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Benar! Lima lebih besar daripada tiga.”
          </Dialog>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab1-banding.jpg"
            alt="Piring kiri tiga apel. Piring kanan lima jeruk. Lima lebih besar dari tiga."
          />
          <p className="text-center text-4xl font-black text-[#1C01A5]">5 &gt; 3</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border-2 border-[#E11D48]/25 bg-[#FFF1F2] px-4 py-3">
              <p className="text-xs font-black uppercase text-[#9F1239]">Stroberi · 4</p>
              <IkonUlang ikon="🍓" jumlah={4} />
            </article>
            <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
              <p className="text-xs font-black uppercase text-[#92400E]">Pisang · 4</p>
              <IkonUlang ikon="🍌" jumlah={4} />
            </article>
          </div>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Stroberi dan pisang sama-sama berjumlah empat.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Berarti jumlahnya sama banyak.”
          </Dialog>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab1-sama.jpg"
            alt="Empat stroberi dan empat pisang. Jumlahnya sama, empat sama dengan empat."
          />
          <p className="text-center text-4xl font-black text-[#1C01A5]">4 = 4</p>
          <p className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">
            Rara dan Bimo berhasil menghitung buah. Mereka juga dapat membaca, menulis, dan membandingkan bilangan.
          </p>
        </div>
        <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("A", 0)}
            pertanyaan="Di atas tikar ada tujuh mangga. Berapa jumlah mangganya?"
            periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh", "7", "ada tujuh mangga"])}
            petunjuk="Dengarkan, hitung, lalu jawab dengan suara."
          />
        </div>
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "A")}
          hanyaKanvas
          pertanyaan="Hitung bintang. Tuliskan lambang bilangannya."
          alias={kumpulkanAlias(["6", "enam"])}
          konteks="Ada 6 bintang. Lambangnya 6."
          visual={<IkonUlang ikon="⭐" jumlah={6} ukuran="text-3xl" />}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🔢🐟🦋
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Ayo Mengenal Bilangan 1–10
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Jumlah</span>
            <span>Nama bilangan</span>
            <span>Lambang</span>
          </div>
          {BILANGAN.map((baris, i) => (
            <div
              key={baris.angka}
              className={`grid grid-cols-3 items-center border-t border-[#F0AB00]/40 px-3 py-2 text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              <span>{Array.from({ length: baris.angka }, () => baris.ikon).join(" ")}</span>
              <span>{baris.nama}</span>
              <span className="text-lg font-black text-[#1C01A5]">{baris.angka}</span>
            </div>
          ))}
        </div>

        <article className="mt-4 rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
          <p className="text-sm font-black text-[#0C4A6E]">Cara Menghitung Benda</p>
          <IkonUlang ikon="🐟" jumlah={6} />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Tunjuk benda satu per satu. Ucapkan: “Satu, dua, tiga, empat, lima, enam.” Benda terakhir menunjukkan jumlah semuanya.
          </p>
          <p className="mt-2 text-lg font-black text-[#1C01A5]">Jumlah ikan = 6</p>
        </article>
        <article className="mt-4 rounded-2xl border-2 border-[#7C3AED]/25 bg-[#F5F3FF] px-4 py-3">
          <p className="text-sm font-black text-[#5B21B6]">Cara Mencocokkan Jumlah dan Angka</p>
          <IkonUlang ikon="🦋" jumlah={4} />
          <p className="mt-2 text-sm font-semibold text-slate-700">Hitung kupu-kupu: 1, 2, 3, 4. Pasangkan dengan angka 4.</p>
          <p className="mt-2 text-lg font-black text-[#1C01A5]">🦋 🦋 🦋 🦋 ↔ 4</p>
        </article>

        <p className="mt-5 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Cara Membandingkan Jumlah</p>
        <div className="mt-3 grid gap-3">
          <article className="rounded-2xl border-2 border-[#16A34A]/30 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#166534]">Lebih banyak</p>
            <p className="mt-2 text-2xl">🐥 🐥 🐥 🐥 🐥 &nbsp;&nbsp; 🐸 🐸 🐸</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Ayam berjumlah 5. Katak berjumlah 3.</p>
            <p className="text-2xl font-black text-[#1C01A5]">5 &gt; 3</p>
            <p className="text-sm font-bold text-slate-700">Ayam lebih banyak daripada katak.</p>
          </article>
          <article className="rounded-2xl border-2 border-[#F97316]/30 bg-[#FFF7ED] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9A3412]">Lebih sedikit</p>
            <p className="mt-2 text-2xl">🚗 🚗 &nbsp;&nbsp; ⚽ ⚽ ⚽ ⚽</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Mobil berjumlah 2. Bola berjumlah 4.</p>
            <p className="text-2xl font-black text-[#1C01A5]">2 &lt; 4</p>
            <p className="text-sm font-bold text-slate-700">Mobil lebih sedikit daripada bola.</p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/25 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9D174D]">Sama banyak</p>
            <p className="mt-2 text-2xl">🌻 🌻 🌻 &nbsp;&nbsp; 🍓 🍓 🍓</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Bunga berjumlah 3. Stroberi berjumlah 3.</p>
            <p className="text-2xl font-black text-[#1C01A5]">3 = 3</p>
            <p className="text-sm font-bold text-slate-700">Bunga dan stroberi sama banyak.</p>
          </article>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black text-[#0F766E]">Cara Mudah Memilih Tanda</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Bayangkan tanda &gt; dan &lt; seperti mulut ikan. Mulut ikan selalu terbuka ke jumlah yang lebih banyak.
          </p>
          <p className="mt-2 text-3xl font-black text-[#1C01A5]">8 &gt; 5</p>
          <p className="text-sm font-bold text-slate-700">Pada contoh itu, mulut terbuka ke arah 8.</p>
        </article>

        <div className="mt-6 space-y-4">
          <KuisCocokAngka />
          <KuisSusun
            id={idKuis("B", 1)}
            soal="Quiz 2. Susun gerbong dari bilangan paling kecil. 🚂"
            pool={[
              { kunci: "6", tampil: "6" },
              { kunci: "4", tampil: "4" },
              { kunci: "5", tampil: "5" },
              { kunci: "2", tampil: "2" },
              { kunci: "3", tampil: "3" },
            ]}
            benar={["2", "3", "4", "5", "6"]}
            umpanBenar="Kereta siap berangkat! Bilangannya sudah berurutan."
            pesanSalah="Mulai dari bilangan paling kecil."
          />
          <KuisPilih
            id={idKuis("B", 2)}
            soal="Quiz 3. Pilih keranjang yang berisi buah paling banyak."
            benar="B"
            umpanBenar="Tepat! Enam lebih banyak daripada lima dan empat."
            pesanSalah="Hitung setiap keranjang. Pilih bilangan terbesar."
            pilihan={[
              { huruf: "A", teks: "Keranjang A · 🍊 🍊 🍊 🍊" },
              { huruf: "B", teks: "Keranjang B · 🍎 🍎 🍎 🍎 🍎 🍎" },
              { huruf: "C", teks: "Keranjang C · 🍐 🍐 🍐 🍐 🍐" },
            ]}
          />
          <div className="border-t-2 border-[#1C01A5]/10 pt-5">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <SoalRekamSuara
              id={idKuis("B", 3)}
              pertanyaan="Ada delapan burung di pohon. Sebutkan bilangan sebelum delapan."
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh", "7"])}
              petunjuk="Dengarkan, lalu jawab dengan suara."
            />
          </div>
          <KuisTulisKartu
            id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "B")}
            hanyaKanvas
            pertanyaan="Tulis jumlah kura-kura, tanda < > atau =, lalu jumlah kelinci. Contoh: 3 < 5."
            alias={kumpulkanAlias(["3 < 5", "3<5", "tiga lebih sedikit daripada lima"])}
            konteks="Kura-kura 3. Kelinci 5. Tiga lebih sedikit daripada lima."
            visual={<div className="text-center text-2xl">🐢 🐢 🐢 &nbsp;&nbsp; 🐰 🐰 🐰 🐰 🐰</div>}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏡🌷🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh petak · menghitung, membaca, menulis, membandingkan
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiKebunAngka />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Ayo Membilang sampai dengan 10
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)} />
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
          <li>Tunjuk satu, sebut satu. Setiap benda hanya dihitung sekali.</li>
          <li>Bilangan terakhir yang disebut adalah jumlah semua benda.</li>
          <li>Urutan bilangan adalah 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.</li>
          <li>Bilangan yang lebih jauh ke kanan pada urutan biasanya lebih besar.</li>
          <li>Lebih banyak berarti jumlahnya lebih besar.</li>
          <li>Lebih sedikit berarti jumlahnya lebih kecil.</li>
          <li>Sama banyak berarti jumlah kedua kelompok sama.</li>
          <li>Mulut tanda &gt; atau &lt; terbuka ke bilangan yang lebih besar.</li>
          <li>Tanda = berarti kedua jumlah sama.</li>
        </ul>
        <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
          Kalimat kunci: “Hitung satu per satu, tulis angkanya, lalu bandingkan jumlahnya.”
        </p>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Hitung satu per satu, tulis angkanya, lalu bandingkan jumlahnya."
          alias={kumpulkanAlias(["hitung satu per satu", "tulis angkanya", "bandingkan jumlahnya"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
