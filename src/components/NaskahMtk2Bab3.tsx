"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB3 } from "@/lib/modul-resmi-mtk-2-bab3";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB3.id, kode, indeks);
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
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk nama untuk menyusun.</p> : null}
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

function BentukSvg({ jenis, label }: { jenis: "segitiga" | "segiempat" | "segilima" | "segienam" | "lingkaran" | "lengkung"; label: string }) {
  const isi =
    jenis === "segitiga" ? (
      <polygon points="40,8 72,68 8,68" fill="#FDE68A" stroke="#1C01A5" strokeWidth="3" />
    ) : jenis === "segiempat" ? (
      <rect x="12" y="12" width="56" height="56" rx="4" fill="#BFDBFE" stroke="#1C01A5" strokeWidth="3" />
    ) : jenis === "segilima" ? (
      <polygon points="40,6 74,32 60,70 20,70 6,32" fill="#FBCFE8" stroke="#1C01A5" strokeWidth="3" />
    ) : jenis === "segienam" ? (
      <polygon points="40,6 70,23 70,57 40,74 10,57 10,23" fill="#FDE047" stroke="#1C01A5" strokeWidth="3" />
    ) : jenis === "lingkaran" ? (
      <circle cx="40" cy="40" r="28" fill="#99F6E4" stroke="#1C01A5" strokeWidth="3" />
    ) : (
      <path d="M14 44 C18 12 62 8 66 36 C70 58 48 72 32 66 C18 60 12 54 14 44 Z" fill="#FECACA" stroke="#1C01A5" strokeWidth="3" />
    );
  return (
    <figure className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
        {isi}
      </svg>
      <figcaption className="text-center text-xs font-black text-[#1C01A5]">{label}</figcaption>
    </figure>
  );
}

type WarnaPetak = "hijau" | "biru" | "kuning" | "ungu";

type MisiPetak = {
  warna: WarnaPetak;
  misi: string;
  narasi: string;
  mode: "suara" | "kanvas" | "pilih";
  bentuk?: "segitiga" | "segiempat" | "segilima" | "segienam" | "lingkaran" | "lengkung";
  angka?: string;
  alias: string[];
  labelPertama?: string;
  labelKedua?: string;
  benarPilih?: "pertama" | "kedua";
  bersama: string;
};

const NOMOR_SISIR = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-300 bg-emerald-50",
  biru: "border-sky-300 bg-sky-50",
  kuning: "border-amber-300 bg-amber-50",
  ungu: "border-violet-300 bg-violet-50",
};

const MISI_SISIR: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Hitung sisi",
    narasi: "Segitiga punya berapa sisi?",
    mode: "suara",
    bentuk: "segitiga",
    alias: ["3", "tiga"],
    bersama: "Igil menghitung: satu, dua, tiga. Segitiga punya 3 sisi.",
  },
  {
    warna: "biru",
    misi: "Nama bentuk",
    narasi: "Bangun 4 sisi namanya segi empat. Berapa sisinya?",
    mode: "suara",
    bentuk: "segiempat",
    alias: ["4", "empat"],
    bersama: "Segi empat punya 4 sisi lurus.",
  },
  {
    warna: "kuning",
    misi: "Tulis sisi",
    narasi: "Tuliskan banyak sisi segi lima.",
    mode: "kanvas",
    bentuk: "segilima",
    alias: ["5", "lima"],
    bersama: "Segi lima punya 5 sisi. Tulis 5.",
  },
  {
    warna: "ungu",
    misi: "Sarang lebah",
    narasi: "Permukaan sarang lebah berbentuk apa?",
    mode: "pilih",
    bentuk: "segienam",
    alias: ["pertama"],
    labelPertama: "Segi enam",
    labelKedua: "Lingkaran",
    benarPilih: "pertama",
    bersama: "Enam sisi lurus. Itu segi enam, bukan lingkaran.",
  },
  {
    warna: "hijau",
    misi: "Lengkung",
    narasi: "Uang logam termasuk bentuk apa?",
    mode: "suara",
    bentuk: "lingkaran",
    alias: ["lingkaran"],
    bersama: "Uang logam bulat sempurna. Namanya lingkaran.",
  },
  {
    warna: "biru",
    misi: "Urai",
    narasi: "Persegi diurai diagonal. Jadi berapa segitiga?",
    mode: "suara",
    bentuk: "segiempat",
    alias: ["2", "dua"],
    bersama: "Satu garis diagonal. Hasilnya 2 segitiga.",
  },
  {
    warna: "kuning",
    misi: "Susun",
    narasi: "Tuliskan 2. Dua segitiga dan satu segi empat jadi rumah.",
    mode: "kanvas",
    alias: ["2", "dua"],
    bersama: "2 segitiga dan 1 segi empat disusun menjadi rumah.",
  },
  {
    warna: "ungu",
    misi: "Dadu",
    narasi: "Dadu berbentuk apa?",
    mode: "pilih",
    alias: ["pertama"],
    labelPertama: "Kubus",
    labelKedua: "Bola",
    benarPilih: "pertama",
    bersama: "Dadu permukaannya segi empat sama. Itu kubus.",
  },
  {
    warna: "hijau",
    misi: "Gelinding",
    narasi: "Benda yang paling mudah menggelinding namanya?",
    mode: "suara",
    bentuk: "lingkaran",
    alias: ["bola"],
    bersama: "Bola punya permukaan lengkung. Mudah menggelinding.",
  },
  {
    warna: "biru",
    misi: "Kaleng",
    narasi: "Kaleng susu berbentuk apa?",
    mode: "suara",
    alias: ["tabung"],
    bersama: "Kaleng itu tabung. Ada permukaan datar dan lengkung.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiSisirMadu() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_SISIR[aktif];
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

  return (
    <div className="mt-4 space-y-4">
      <style>{`
        @keyframes madu-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-10deg) translateY(-3px); }
          70% { transform: rotate(10deg); }
        }
        .madu-goyang { animation: madu-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil mengisi 10 sisir madu. Pilih satu sisir, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🐝
        </span>
        {NOMOR_SISIR.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_SISIR[indeks].warna]
              }`}
              aria-label={`Sisir ${indeks + 1}${selesai ? ", selesai" : ""}`}
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
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · sisi</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · nama</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · tulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · pilih</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang madu {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Sisir {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.bentuk ? (
          <div className={`mt-3 flex justify-center ${kini.petunjuk >= 1 ? "madu-goyang" : ""}`}>
            <BentukSvg jenis={misi.bentuk} label={misi.bentuk === "segiempat" ? "segi empat" : misi.bentuk === "segilima" ? "segi lima" : misi.bentuk === "segienam" ? "segi enam" : misi.bentuk} />
          </div>
        ) : misi.angka ? (
          <p className="mt-3 text-center text-5xl font-black text-[#1C01A5]">{misi.angka}</p>
        ) : null}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Daunmu tetap aman. Coba lagi.</p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">Sisir ini sudah penuh madu. Pilih sisir lain, ya.</p>
        ) : null}
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
            sesudahNilai={(benar) => catat(aktif, benar)}
          />
        ) : null}
        {misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["pertama", "kedua"] as const).map((pilih) => (
              <button
                key={pilih}
                type="button"
                onClick={() => {
                  const benar = pilih === misi.benarPilih;
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                  catat(aktif, benar);
                }}
                className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white hover:bg-[#16017a]"
              >
                {pilih === "pertama" ? misi.labelPertama : misi.labelKedua}
              </button>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function LembarKerja() {
  return (
    <div className="mt-4 space-y-4">
      <KuisPilih
        id={idKuis("D", 0)}
        soal="1. Permukaan sarang lebah punya 6 sisi lurus. Namanya..."
        benar="B"
        umpanBenar="Tepat! Enam sisi lurus. Itu segi enam."
        pesanSalah="Hitung sisinya. Ada 6 sisi."
        anak={<BentukSvg jenis="segienam" label="6 sisi" />}
        pilihan={[
          { huruf: "A", teks: "Segitiga" },
          { huruf: "B", teks: "Segi enam" },
          { huruf: "C", teks: "Lingkaran" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. Segitiga punya sisi sebanyak..."
        benar="A"
        umpanBenar="Benar! Segitiga punya 3 sisi."
        pesanSalah="Hitung sisi lurusnya. Ada 3."
        anak={<BentukSvg jenis="segitiga" label="segitiga" />}
        pilihan={[
          { huruf: "A", teks: "3" },
          { huruf: "B", teks: "4" },
          { huruf: "C", teks: "6" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="3. Lingkaran termasuk..."
        benar="B"
        umpanBenar="Tepat! Lingkaran dibatasi kurva. Itu bentuk lengkung."
        pesanSalah="Lingkaran tidak punya sisi lurus."
        anak={<BentukSvg jenis="lingkaran" label="lingkaran" />}
        pilihan={[
          { huruf: "A", teks: "Segi banyak" },
          { huruf: "B", teks: "Bentuk lengkung" },
          { huruf: "C", teks: "Kubus" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="4. Segi banyak yang punya 5 sisi namanya..."
        benar="A"
        umpanBenar="Benar! 5 sisi = segi lima."
        pesanSalah="Namanya ikut banyak sisi. 5 sisi jadi segi lima."
        anak={<BentukSvg jenis="segilima" label="5 sisi" />}
        pilihan={[
          { huruf: "A", teks: "Segi lima" },
          { huruf: "B", teks: "Segi empat" },
          { huruf: "C", teks: "Segi enam" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 4)}
        soal="5. Uang logam termasuk contoh..."
        benar="C"
        umpanBenar="Tepat! Uang logam bulat sempurna. Itu lingkaran."
        pesanSalah="Uang logam bisa diputar di atas cetakannya. Itu lingkaran."
        pilihan={[
          { huruf: "A", teks: "Segitiga" },
          { huruf: "B", teks: "Kubus" },
          { huruf: "C", teks: "Lingkaran" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. Sebuah persegi diurai dengan satu garis diagonal. Hasilnya..."
        benar="B"
        umpanBenar="Benar! Satu garis dari sudut ke sudut. Jadi 2 segitiga."
        pesanSalah="Tarik garis dari sudut ke sudut. Ada 2 segitiga."
        anak={
          <div className="flex justify-center gap-6">
            <BentukSvg jenis="segiempat" label="diurai" />
            <BentukSvg jenis="segitiga" label="hasil" />
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "2 segi empat" },
          { huruf: "B", teks: "2 segitiga" },
          { huruf: "C", teks: "1 lingkaran" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. Bangun ruang yang semua permukaannya segi empat sama ukurannya..."
        benar="A"
        umpanBenar="Tepat! Kubus permukaannya sama. Balok beda ukuran."
        pesanSalah="Yang sama semua sisinya adalah kubus. Seperti dadu."
        pilihan={[
          { huruf: "A", teks: "Kubus" },
          { huruf: "B", teks: "Balok" },
          { huruf: "C", teks: "Bola" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 7)}
        soal="8. Benda yang paling mudah menggelinding..."
        benar="B"
        umpanBenar="Benar! Bola punya permukaan lengkung. Mudah menggelinding."
        pesanSalah="Coba bayangkan dadu dan bola. Mana yang bergulir?"
        pilihan={[
          { huruf: "A", teks: "Kubus" },
          { huruf: "B", teks: "Bola" },
          { huruf: "C", teks: "Balok" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 8)}
        soal="9. Kaleng susu berbentuk..."
        benar="C"
        umpanBenar="Tepat! Kaleng itu tabung."
        pesanSalah="Kaleng punya tutup lingkaran dan badan lengkung. Itu tabung."
        pilihan={[
          { huruf: "A", teks: "Kerucut" },
          { huruf: "B", teks: "Kubus" },
          { huruf: "C", teks: "Tabung" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 9)}
        soal="10. Igil menyusun 2 lapis balok. Tiap lapis 4 balok. Banyak balok satuan..."
        benar="B"
        umpanBenar="Benar! 4 + 4 = 8."
        pesanSalah="Dua lapis. Tiap lapis 4. 4 + 4 = 8."
        anak={
          <div className="space-y-1 text-center text-2xl" aria-hidden>
            <p>🟦 🟦 🟦 🟦</p>
            <p>🟦 🟦 🟦 🟦</p>
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "14" },
        ]}
      />
    </div>
  );
}

export default function NaskahMtk2Bab3({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB3;
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🐝🍯🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Membedakan segi banyak dan bentuk lengkung.",
            "Menamai segitiga, segi empat, segi lima, segi enam, dan lingkaran.",
            "Mengurai dan menyusun bangun datar.",
            "Menamai kubus, balok, tabung, kerucut, dan bola.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Bangun Datar"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Paman datang ke rumah Upe. Dia membawa madu dan sarang lebah.",
            "Permukaannya punya enam sisi lurus. Igil ikut menghitung.",
            "Kita bedakan segi banyak dan bentuk lengkung.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab3-lebah.jpg"
            alt="Paman membawa sarang lebah dan madu. Upe kagum. Burung hantu Igil menonton di pagar."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Wah, sarang lebah! Bentuknya unik sekali.”
          </Dialog>
          <Dialog nama="Paman" warna="border-lime-300 bg-lime-50">
            “Permukaannya bangun datar. Ada enam sisi.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Satu, dua, tiga, empat, lima, enam. Namanya segi enam.”
          </Dialog>
          <div className="flex justify-center">
            <BentukSvg jenis="segienam" label="segi enam · 6 sisi" />
          </div>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            idKanvas={idKuis("A", 1)}
            pertanyaanSuara="Sarang lebah punya berapa sisi?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 6."
            aliasKanvas={["6", "enam"]}
            konteksKanvas="Enam sisi lurus. Tulis 6."
          />

          <GambarCerita
            src="/doodle-mtk/mtk-2-bab3-sisi.jpg"
            alt="Upe dan Igil mengamati segitiga, segi empat, segi lima, segi enam, dan lingkaran di meja."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kelas 1 sudah kenal segitiga, segi empat, dan lengkung. Hari ini tambah segi lima dan segi enam.”
          </Dialog>
          <p className="text-sm font-semibold text-slate-700">
            Segi banyak dibatasi garis lurus. Garis lurus itu sisi. Bentuk lengkung dibatasi kurva.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BentukSvg jenis="segitiga" label="3 sisi" />
            <BentukSvg jenis="segiempat" label="4 sisi" />
            <BentukSvg jenis="segilima" label="5 sisi" />
            <BentukSvg jenis="segienam" label="6 sisi" />
            <BentukSvg jenis="lingkaran" label="lengkung" />
            <BentukSvg jenis="lengkung" label="kurva" />
          </div>
          <KuisSusun
            id={idKuis("A", 4)}
            soal="Susun nama segi banyak dari sisi paling sedikit."
            pool={[
              { kunci: "lima", tampil: "segi lima" },
              { kunci: "tiga", tampil: "segitiga" },
              { kunci: "enam", tampil: "segi enam" },
              { kunci: "empat", tampil: "segi empat" },
            ]}
            benar={["tiga", "empat", "lima", "enam"]}
            umpanBenar="Benar! 3, 4, 5, lalu 6 sisi."
            pesanSalah="Mulai dari 3 sisi, lalu naik satu-satu."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Teh celup seperti segi lima. Lantai kamar mandi kadang segi enam.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Uang logam diputar di atas cetakannya. Tetap muat. Itu lingkaran. Bulat sempurna.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="Uang logam termasuk bentuk apa?"
            aliasSuara={["lingkaran"]}
            petunjukSuara="Ucapkan namanya."
            pertanyaanKanvas="Tuliskan lingkaran."
            aliasKanvas={["lingkaran"]}
            konteksKanvas="Uang logam bulat sempurna. Tulis lingkaran."
          />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="Segi empat punya berapa sisi?"
            benar="B"
            umpanBenar="Benar! Segi empat punya 4 sisi."
            pesanSalah="Hitung sisi lurusnya. Ada 4."
            anak={<BentukSvg jenis="segiempat" label="segi empat" />}
            pilihan={[
              { huruf: "A", teks: "3" },
              { huruf: "B", teks: "4" },
              { huruf: "C", teks: "5" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab B: Mengurai dan Menyusun Bangun Datar"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Satu bangun bisa diurai jadi beberapa bangun.",
            "Beberapa bangun bisa disusun jadi satu bentuk baru.",
            "Cara mengurai yang berbeda, hasilnya bisa berbeda.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab3-urai.jpg"
            alt="Lili, Upe, dan Igil menggunting kertas rumah menjadi segi empat dan segitiga."
          />
          <Dialog nama="Lili" warna="border-violet-300 bg-violet-50">
            “Aku gunting persegi dari sudut ke sudut.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Itu mengurai. Hasilnya 2 segitiga.”
          </Dialog>
          <p className="text-center text-lg font-black text-[#1C01A5]">1 persegi → 2 segitiga</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Persegi diurai diagonal jadi berapa segitiga?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 2."
            aliasKanvas={["2", "dua"]}
            konteksKanvas="Satu garis diagonal. Hasil 2 segitiga."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Kalau 2 segitiga dan 1 segi empat disusun, jadi rumah!”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Itu menyusun. Banyak jadi satu. Boleh juga jadi bentuk lain, asal rapat.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            idKanvas={idKuis("B", 3)}
            pertanyaanSuara="2 segitiga dan 1 segi empat disusun. Bentuknya sering jadi apa?"
            aliasSuara={["rumah"]}
            petunjukSuara="Ucapkan namanya."
            pertanyaanKanvas="Tuliskan rumah."
            aliasKanvas={["rumah"]}
            konteksKanvas="Atap segitiga, badan segi empat. Tulis rumah."
          />
          <KuisPilih
            id={idKuis("B", 4)}
            soal="Cara mengurai yang berbeda menghasilkan..."
            benar="A"
            umpanBenar="Benar! Garis yang berbeda, hasil bentuknya bisa berbeda."
            pesanSalah="Coba gunting di tempat lain. Hasilnya bisa lain."
            pilihan={[
              { huruf: "A", teks: "bentuk yang bisa berbeda" },
              { huruf: "B", teks: "selalu 2 lingkaran" },
              { huruf: "C", teks: "bangun ruang" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab C: Bangun Ruang"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Bangun datar punya satu permukaan.",
            "Bangun ruang punya lebih dari satu permukaan. Bisa diisi.",
            "Ada yang datar. Ada yang lengkung dan mudah menggelinding.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab3-ruang.jpg"
            alt="Upe, Tika, dan Igil mengelompokkan dadu kubus, kotak susu balok, kaleng tabung, es krim kerucut, dan bola."
          />
          <div className="grid gap-2 sm:grid-cols-5">
            {[
              ["🎲", "Kubus"],
              ["📦", "Balok"],
              ["🥫", "Tabung"],
              ["🍦", "Kerucut"],
              ["⚽", "Bola"],
            ].map(([ikon, nama]) => (
              <article key={nama} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-3 py-3 text-center">
                <p className="text-3xl" aria-hidden>
                  {ikon}
                </p>
                <p className="mt-1 text-xs font-black text-[#1C01A5]">{nama}</p>
              </article>
            ))}
          </div>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Dadu semua sisinya sama. Itu kubus.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kotak susu beda ukuran. Itu balok. Kaleng itu tabung. Es krim itu kerucut. Sepak bola itu bola.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 5)}
            pertanyaanSuara="Dadu berbentuk apa?"
            aliasSuara={["kubus"]}
            petunjukSuara="Ucapkan namanya."
          />
          <KuisTulisKartu
            id={idKuis("B", 6)}
            hanyaKanvas
            rapat
            pertanyaan="Tuliskan bola."
            alias={kumpulkanAlias(["bola"])}
            konteks="Bola mudah menggelinding. Tulis bola."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Aku gelindingkan. Bola jalan. Dadu hanya bergeser.”
          </Dialog>
          <KuisPilih
            id={idKuis("A", 6)}
            soal="Benda yang paling mudah menggelinding..."
            benar="B"
            umpanBenar="Benar! Bola punya permukaan lengkung."
            pesanSalah="Pilih yang bulat sempurna."
            pilihan={[
              { huruf: "A", teks: "Kubus" },
              { huruf: "B", teks: "Bola" },
              { huruf: "C", teks: "Balok" },
            ]}
          />
          <KuisPilih
            id={idKuis("A", 7)}
            soal="Kaleng susu berbentuk..."
            benar="C"
            umpanBenar="Tepat! Kaleng itu tabung."
            pesanSalah="Kaleng punya tutup lingkaran. Itu tabung."
            pilihan={[
              { huruf: "A", teks: "Kerucut" },
              { huruf: "B", teks: "Kubus" },
              { huruf: "C", teks: "Tabung" },
            ]}
          />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 7)}
            pertanyaanSuara="Es krim di atas kerucut. Namanya?"
            aliasSuara={["kerucut"]}
            petunjukSuara="Ucapkan namanya."
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍯🐝🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh sisir · sisi, lengkung, urai, ruang
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiSisirMadu />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Segi banyak dibatasi garis lurus. Garis itu disebut sisi.",
          "3 sisi = segitiga. 4 sisi = segi empat. 5 sisi = segi lima. 6 sisi = segi enam.",
          "Bentuk lengkung dibatasi kurva. Lingkaran bulat sempurna.",
          "Satu bangun bisa diurai menjadi beberapa bangun.",
          "Beberapa bangun bisa disusun menjadi satu bentuk baru.",
          "Bangun datar punya satu permukaan. Bangun ruang punya banyak permukaan dan bisa diisi.",
          "Kubus: permukaan segi empat sama. Balok: segi empat beda ukuran.",
          "Tabung seperti kaleng. Kerucut seperti es krim. Bola mudah menggelinding.",
        ]}
        penutup='Kalimat kunci: “Hitung sisinya, bedakan lengkung, sebut nama ruangnya.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Bentuk di Sekitar Kita
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)}
          />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB3.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Hitung sisinya, bedakan lengkung, sebut nama ruangnya."
          alias={kumpulkanAlias(["hitung sisinya", "lengkung", "nama ruangnya"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
