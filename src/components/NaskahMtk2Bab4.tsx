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
import { MODUL_MTK2_BAB4 } from "@/lib/modul-resmi-mtk-2-bab4";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB4.id, kode, indeks);
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

function PosisiSvg({ jenis }: { jenis: "atas" | "depan" | "kiri" }) {
  if (jenis === "atas") {
    return (
      <svg viewBox="0 0 160 110" className="mx-auto h-28 w-40" aria-hidden>
        <ellipse cx="80" cy="88" rx="36" ry="12" fill="#86efac" />
        <circle cx="80" cy="70" r="16" fill="#f9a8d4" stroke="#be185d" strokeWidth="2" />
        <ellipse cx="80" cy="28" rx="18" ry="10" fill="#fde047" stroke="#a16207" strokeWidth="2" />
        <text x="80" y="18" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
          atas
        </text>
        <text x="80" y="106" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
          bawah
        </text>
      </svg>
    );
  }
  if (jenis === "depan") {
    return (
      <svg viewBox="0 0 180 80" className="mx-auto h-20 w-48" aria-hidden>
        <circle cx="48" cy="40" r="16" fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
        <ellipse cx="132" cy="48" rx="22" ry="10" fill="#86efac" stroke="#166534" strokeWidth="2" />
        <text x="48" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
          depan
        </text>
        <text x="132" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
          belakang
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 80" className="mx-auto h-20 w-48" aria-hidden>
      <circle cx="48" cy="44" r="16" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <rect x="118" y="28" width="28" height="36" rx="4" fill="#22c55e" />
      <text x="48" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
        kiri
      </text>
      <text x="132" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
        kanan
      </text>
    </svg>
  );
}

function BarisanPanen() {
  const anak = [
    { nama: "Upe", jenis: "L" },
    { nama: "Lili", jenis: "P" },
    { nama: "Halim", jenis: "L" },
    { nama: "Kira", jenis: "P" },
    { nama: "Malosi", jenis: "L" },
    { nama: "Tika", jenis: "P" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {anak.map((item) => (
        <article key={item.nama} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-2 py-2 text-center">
          <p className="text-2xl" aria-hidden>
            {item.jenis === "L" ? "👦" : "👧"}
          </p>
          <p className="text-xs font-black text-[#1C01A5]">{item.nama}</p>
          <p className="text-[10px] font-bold text-slate-500">{item.jenis === "L" ? "laki-laki" : "perempuan"}</p>
        </article>
      ))}
    </div>
  );
}

function PolaBentuk() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {["🌸", "🟦", "🌸", "🟦", "?"].map((ikon, i) => (
        <span key={`${ikon}-${i}`} className="rounded-xl bg-white px-3 py-2 text-2xl ring-2 ring-amber-200">
          {ikon}
        </span>
      ))}
    </div>
  );
}

function PolaWarna() {
  const warna = ["bg-rose-500", "bg-sky-500", "bg-rose-500", "bg-sky-500", "bg-slate-200"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {warna.map((kelas, i) => (
        <span key={`${kelas}-${i}`} className={`h-10 w-10 rounded-full ${kelas} ring-2 ring-white`} />
      ))}
    </div>
  );
}

function PolaGerak() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-black text-[#1C01A5]">
      {["🙇", "🧍", "🙇", "🧍", "?"].map((ikon, i) => (
        <span key={`${ikon}-${i}`} className="rounded-xl bg-white px-3 py-2 text-2xl ring-2 ring-violet-200">
          {ikon}
        </span>
      ))}
    </div>
  );
}

function PolaSuara() {
  return (
    <p className="text-center text-lg font-black text-[#1C01A5]">👏1 · 👏👏2 · 👏👏👏3 · 👏👏👏👏4 · ?</p>
  );
}

type WarnaPetak = "hijau" | "biru" | "kuning" | "ungu";

type MisiPetak = {
  warna: WarnaPetak;
  misi: string;
  narasi: string;
  mode: "suara" | "kanvas" | "pilih";
  anak?: ReactNode;
  alias: string[];
  labelPertama?: string;
  labelKedua?: string;
  benarPilih?: "pertama" | "kedua";
  bersama: string;
};

const NOMOR_IKAT = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-300 bg-emerald-50",
  biru: "border-sky-300 bg-sky-50",
  kuning: "border-amber-300 bg-amber-50",
  ungu: "border-violet-300 bg-violet-50",
};

const MISI_IKAT: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Atas bawah",
    narasi: "Kupu-kupu di atas bunga. Bunga ada di mana?",
    mode: "suara",
    anak: <PosisiSvg jenis="atas" />,
    alias: ["bawah"],
    bersama: "Kupu-kupu di atas. Jadi bunga di bawah.",
  },
  {
    warna: "biru",
    misi: "Depan belakang",
    narasi: "Ulat ada di belakang siapa?",
    mode: "suara",
    anak: <PosisiSvg jenis="depan" />,
    alias: ["burung"],
    bersama: "Burung di depan. Ulat di belakang burung.",
  },
  {
    warna: "kuning",
    misi: "Tulis kiri",
    narasi: "Burung di kiri rumput. Tuliskan kiri.",
    mode: "kanvas",
    anak: <PosisiSvg jenis="kiri" />,
    alias: ["kiri"],
    bersama: "Burung di kiri. Rumput di kanan. Tulis kiri.",
  },
  {
    warna: "ungu",
    misi: "Kanan Lili",
    narasi: "Siapa di sebelah kanan Lili?",
    mode: "pilih",
    anak: <BarisanPanen />,
    alias: ["pertama"],
    labelPertama: "Halim",
    labelKedua: "Upe",
    benarPilih: "pertama",
    bersama: "Upe, Lili, Halim. Kanan Lili adalah Halim.",
  },
  {
    warna: "hijau",
    misi: "Pola barisan",
    narasi: "Laki-laki, perempuan, laki-laki, perempuan. Setelah perempuan?",
    mode: "suara",
    alias: ["laki-laki", "laki laki"],
    bersama: "Setelah perempuan, berikutnya laki-laki.",
  },
  {
    warna: "kuning",
    misi: "Pola bentuk",
    narasi: "Bunga, segi empat, bunga, segi empat. Tuliskan yang berikutnya.",
    mode: "kanvas",
    anak: <PolaBentuk />,
    alias: ["bunga"],
    bersama: "Setelah segi empat, ulang ke bunga. Tulis bunga.",
  },
  {
    warna: "biru",
    misi: "Pola warna",
    narasi: "Merah, biru, merah, biru. Berikutnya warna apa?",
    mode: "suara",
    anak: <PolaWarna />,
    alias: ["merah"],
    bersama: "Setelah biru, ulang ke merah.",
  },
  {
    warna: "ungu",
    misi: "Pola gerakan",
    narasi: "Membungkuk, berdiri, membungkuk, berdiri. Berikutnya?",
    mode: "pilih",
    anak: <PolaGerak />,
    alias: ["pertama"],
    labelPertama: "Membungkuk",
    labelKedua: "Jongkok",
    benarPilih: "pertama",
    bersama: "Setelah berdiri, ulang membungkuk.",
  },
  {
    warna: "hijau",
    misi: "Kunci Ani",
    narasi: "Ani menyembunyikan kunci di bawah pot paling kanan. Di mana kuncinya?",
    mode: "suara",
    alias: ["bawah", "kanan"],
    bersama: "Di bawah pot yang paling kanan.",
  },
  {
    warna: "kuning",
    misi: "Pola tepuk",
    narasi: "Tepuk 1, 2, 3, 4, lalu ulang. Tuliskan angka setelah 4.",
    mode: "kanvas",
    anak: <PolaSuara />,
    alias: ["1", "satu"],
    bersama: "Setelah 4, pola ulang dari 1. Tulis 1.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiIkatPadi() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_IKAT[aktif];
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
        @keyframes padi-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-8deg) translateY(-2px); }
          70% { transform: rotate(8deg); }
        }
        .padi-goyang { animation: padi-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil mengikat 10 ikat padi. Pilih satu ikat, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🌾
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_IKAT[indeks].warna]
              }`}
              aria-label={`Ikat ${indeks + 1}${selesai ? ", selesai" : ""}`}
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
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · posisi</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · nama</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · tulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · pilih</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang padi {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Ikat {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className={`mt-3 ${kini.petunjuk >= 1 ? "padi-goyang" : ""}`}>{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Daunmu tetap aman. Coba lagi.</p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">Ikat ini sudah rapi. Pilih ikat lain, ya.</p>
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
        soal="1. Kupu-kupu hinggap di atas bunga. Bunga ada di..."
        benar="B"
        umpanBenar="Tepat! Kupu-kupu di atas. Bunga di bawah."
        pesanSalah="Lihat yang di atas. Pasangannya di bawah."
        anak={<PosisiSvg jenis="atas" />}
        pilihan={[
          { huruf: "A", teks: "atas kupu-kupu" },
          { huruf: "B", teks: "bawah kupu-kupu" },
          { huruf: "C", teks: "depan kupu-kupu" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. Burung berjalan di depan ulat. Ulat ada di..."
        benar="A"
        umpanBenar="Benar! Ulat di belakang burung."
        pesanSalah="Yang di depan burung. Yang di belakang ulat."
        anak={<PosisiSvg jenis="depan" />}
        pilihan={[
          { huruf: "A", teks: "belakang burung" },
          { huruf: "B", teks: "atas burung" },
          { huruf: "C", teks: "kiri burung" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="3. Barisan: Upe, Lili, Halim, Kira, Malosi, Tika. Siapa di sebelah kanan Lili?"
        benar="B"
        umpanBenar="Benar! Setelah Lili ada Halim."
        pesanSalah="Baca dari kiri. Upe, Lili, lalu Halim."
        anak={<BarisanPanen />}
        pilihan={[
          { huruf: "A", teks: "Upe" },
          { huruf: "B", teks: "Halim" },
          { huruf: "C", teks: "Kira" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="4. Rumput ada di sebelah kanan burung. Burung ada di sebelah..."
        benar="B"
        umpanBenar="Tepat! Rumput di kanan. Jadi burung di kiri."
        pesanSalah="Kanan dan kiri saling berpasangan."
        anak={<PosisiSvg jenis="kiri" />}
        pilihan={[
          { huruf: "A", teks: "kanan rumput" },
          { huruf: "B", teks: "kiri rumput" },
          { huruf: "C", teks: "atas rumput" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 4)}
        soal="5. Pola barisan: laki-laki, perempuan, laki-laki, perempuan. Setelah Tika (perempuan), berikutnya..."
        benar="B"
        umpanBenar="Benar! Setelah perempuan, ulang ke laki-laki."
        pesanSalah="Pola dua langkah. Lalu perempuan, lalu laki-laki."
        pilihan={[
          { huruf: "A", teks: "perempuan" },
          { huruf: "B", teks: "laki-laki" },
          { huruf: "C", teks: "kupu-kupu" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. Pola taplak: bunga, segi empat, bunga, segi empat. Berikutnya..."
        benar="B"
        umpanBenar="Tepat! Setelah segi empat, ulang ke bunga."
        pesanSalah="Dua langkah. Bunga, segi empat, lalu bunga lagi."
        anak={<PolaBentuk />}
        pilihan={[
          { huruf: "A", teks: "segi empat" },
          { huruf: "B", teks: "bunga" },
          { huruf: "C", teks: "hati" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. Pola kaus: merah, biru, merah, biru. Berikutnya..."
        benar="C"
        umpanBenar="Benar! Setelah biru, ulang ke merah."
        pesanSalah="Merah, biru, merah, biru. Langkah berikutnya merah."
        anak={<PolaWarna />}
        pilihan={[
          { huruf: "A", teks: "kuning" },
          { huruf: "B", teks: "biru" },
          { huruf: "C", teks: "merah" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 7)}
        soal="8. Pola gerakan: membungkuk, berdiri, membungkuk, berdiri. Berikutnya..."
        benar="A"
        umpanBenar="Tepat! Setelah berdiri, ulang membungkuk."
        pesanSalah="Dua gerakan bergantian."
        anak={<PolaGerak />}
        pilihan={[
          { huruf: "A", teks: "membungkuk" },
          { huruf: "B", teks: "jongkok" },
          { huruf: "C", teks: "lari" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 8)}
        soal="9. Ani menyembunyikan kunci di bawah pot paling kanan. Posisi kuncinya..."
        benar="B"
        umpanBenar="Benar! Di bawah pot yang paling kanan."
        pesanSalah="Baca dua kata: bawah dan kanan."
        pilihan={[
          { huruf: "A", teks: "atas pot kiri" },
          { huruf: "B", teks: "bawah pot kanan" },
          { huruf: "C", teks: "depan pintu" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 9)}
        soal="10. Pola tepuk: 1, 2, 3, 4, lalu ulang. Setelah 4 adalah..."
        benar="B"
        umpanBenar="Benar! Pola ulang dari 1."
        pesanSalah="Habis 4, kembali ke awal. Bukan 5."
        anak={<PolaSuara />}
        pilihan={[
          { huruf: "A", teks: "5" },
          { huruf: "B", teks: "1" },
          { huruf: "C", teks: "2" },
        ]}
      />
    </div>
  );
}

export default function NaskahMtk2Bab4({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB4;
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌾🦉☀️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Menunjukkan posisi atas, bawah, depan, belakang, kiri, dan kanan.",
            "Menceritakan posisi benda dengan kalimat pendek.",
            "Mengenali pola bentuk, warna, gerakan, dan suara.",
            "Melanjutkan pola yang berulang.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Posisi Benda"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Waktu panen padi tiba. Kira dan teman-teman membantu Paman di sawah.",
            "Igil mengamati kupu-kupu, burung, dan ayam.",
            "Kita sebut posisinya: atas, bawah, depan, belakang, kiri, kanan.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab4-panen.jpg"
            alt="Kira dan teman-teman membantu Paman memanen padi. Burung hantu Igil di orang-orangan sawah."
          />
          <Dialog nama="Kira" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Padi sudah kuning! Yuk bantu Paman.”
          </Dialog>
          <Dialog nama="Paman" warna="border-lime-300 bg-lime-50">
            “Padi jadi nasi. Jangan disia-siakan, ya.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Aku jaga orang-orangan sawah. Siapa di kanan Lili?”
          </Dialog>
          <BarisanPanen />
          <KuisPilih
            id={idKuis("A", 4)}
            soal="Siapa di sebelah kanan Lili?"
            benar="B"
            umpanBenar="Benar! Setelah Lili ada Halim."
            pesanSalah="Baca dari kiri. Upe, Lili, lalu Halim."
            pilihan={[
              { huruf: "A", teks: "Upe" },
              { huruf: "B", teks: "Halim" },
              { huruf: "C", teks: "Kira" },
            ]}
          />

          <GambarCerita
            src="/doodle-mtk/mtk-2-bab4-posisi.jpg"
            alt="Kupu-kupu di atas bunga, burung di depan ulat, ayam di kiri rumput. Igil menonton di pagar."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kupu-kupu hinggap di atas bunga. Jadi bunga di bawah kupu-kupu.”
          </Dialog>
          <PosisiSvg jenis="atas" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            idKanvas={idKuis("A", 1)}
            pertanyaanSuara="Kupu-kupu di atas bunga. Bunga ada di mana?"
            aliasSuara={["bawah"]}
            petunjukSuara="Ucapkan posisinya."
            pertanyaanKanvas="Tuliskan bawah."
            aliasKanvas={["bawah"]}
            konteksKanvas="Kupu-kupu di atas. Bunga di bawah. Tulis bawah."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Burung jalan di depan ulat.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Ulat di belakang burung. Depan dan belakang selalu berpasangan.”
          </Dialog>
          <PosisiSvg jenis="depan" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="Ulat ada di belakang siapa?"
            aliasSuara={["burung"]}
            petunjukSuara="Ucapkan namanya."
            pertanyaanKanvas="Tuliskan belakang."
            aliasKanvas={["belakang"]}
            konteksKanvas="Ulat di belakang burung. Tulis belakang."
          />
          <Dialog nama="Lili" warna="border-violet-300 bg-violet-50">
            “Ayam di kiri rumput. Rumput di kanan ayam.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kanan dan kiri gambar sesuai posisi kita yang melihat.”
          </Dialog>
          <PosisiSvg jenis="kiri" />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="Rumput ada di sebelah kanan burung. Burung ada di sebelah..."
            benar="B"
            umpanBenar="Tepat! Rumput di kanan. Burung di kiri."
            pesanSalah="Kanan dan kiri saling berpasangan."
            pilihan={[
              { huruf: "A", teks: "kanan rumput" },
              { huruf: "B", teks: "kiri rumput" },
              { huruf: "C", teks: "atas rumput" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab B: Pola"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Enam sekawan berbaris. Laki-laki, perempuan, laki-laki, perempuan.",
            "Hal yang berulang dan teratur dinamakan pola.",
            "Ada pola bentuk, warna, gerakan, dan suara.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab4-pola.jpg"
            alt="Enam teman berbaris di sawah: laki-laki, perempuan, laki-laki, perempuan. Igil di depan barisan."
          />
          <Dialog nama="Halim" warna="border-sky-300 bg-sky-50">
            “Kita berbaris: Upe, Lili, Halim, Kira, Malosi, Tika.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Laki-laki, perempuan, laki-laki, perempuan. Itu pola!”
          </Dialog>
          <KuisSusun
            id={idKuis("B", 4)}
            soal="Susun pola barisan dari yang pertama."
            pool={[
              { kunci: "kira", tampil: "Kira" },
              { kunci: "upe", tampil: "Upe" },
              { kunci: "halim", tampil: "Halim" },
              { kunci: "lili", tampil: "Lili" },
            ]}
            benar={["upe", "lili", "halim", "kira"]}
            umpanBenar="Benar! Upe, Lili, Halim, Kira. Laki-laki, perempuan, lalu ulang."
            pesanSalah="Mulai dari Upe, lalu Lili."
          />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Setelah perempuan, pola barisan berikutnya?"
            aliasSuara={["laki-laki", "laki laki"]}
            petunjukSuara="Ucapkan laki-laki atau perempuan."
            pertanyaanKanvas="Tuliskan laki-laki."
            aliasKanvas={["laki-laki", "laki laki"]}
            konteksKanvas="Setelah perempuan, ulang ke laki-laki."
          />

          <GambarCerita
            src="/doodle-mtk/mtk-2-bab4-warna.jpg"
            alt="Taplak bunga dan segi empat, kaus merah biru, gerakan membungkuk berdiri, dan tepuk tangan. Igil menonton."
          />
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Taplak meja: bunga, segi empat, bunga, segi empat.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Itu pola bentuk. Berikutnya bunga.”
          </Dialog>
          <PolaBentuk />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            idKanvas={idKuis("B", 3)}
            pertanyaanSuara="Bunga, segi empat, bunga, segi empat. Berikutnya?"
            aliasSuara={["bunga"]}
            petunjukSuara="Ucapkan namanya."
            pertanyaanKanvas="Tuliskan bunga."
            aliasKanvas={["bunga"]}
            konteksKanvas="Setelah segi empat, ulang ke bunga."
          />
          <Dialog nama="Malosi" warna="border-orange-300 bg-orange-50">
            “Kausku merah, biru, merah, biru.”
          </Dialog>
          <PolaWarna />
          <KuisPilih
            id={idKuis("B", 5)}
            soal="Pola kaus: merah, biru, merah, biru. Berikutnya..."
            benar="C"
            umpanBenar="Benar! Setelah biru, ulang ke merah."
            pesanSalah="Dua warna bergantian."
            pilihan={[
              { huruf: "A", teks: "kuning" },
              { huruf: "B", teks: "biru" },
              { huruf: "C", teks: "merah" },
            ]}
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Pola gerakan: membungkuk, berdiri, membungkuk, berdiri.”
          </Dialog>
          <PolaGerak />
          <KuisPilih
            id={idKuis("B", 6)}
            soal="Setelah berdiri, gerakan berikutnya..."
            benar="A"
            umpanBenar="Tepat! Ulang membungkuk."
            pesanSalah="Dua gerakan bergantian."
            pilihan={[
              { huruf: "A", teks: "membungkuk" },
              { huruf: "B", teks: "jongkok" },
              { huruf: "C", teks: "lari" },
            ]}
          />
          <Dialog nama="Kira" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Tepuk 1, 2, 3, 4. Lalu ulang dari 1.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Itu pola suara. Setelah 4, bukan 5. Kembali ke 1.”
          </Dialog>
          <PolaSuara />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 7)}
            pertanyaanSuara="Tepuk 1, 2, 3, 4. Setelah 4?"
            aliasSuara={["1", "satu"]}
            petunjukSuara="Ucapkan angkanya."
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌾⭐🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh ikat · posisi, pola, lanjutkan
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiIkatPadi />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Posisi benda: atas, bawah, depan, belakang, kiri, kanan.",
          "Yang di atas berpasangan dengan yang di bawah.",
          "Yang di depan berpasangan dengan yang di belakang.",
          "Kanan dan kiri gambar sesuai posisi kita yang melihat.",
          "Pola adalah hal yang berulang dan teratur.",
          "Ada pola bentuk, pola warna, pola gerakan, dan pola suara.",
          "Pola bisa dilanjutkan. Setelah langkah terakhir, ulang dari awal.",
        ]}
        penutup='Kalimat kunci: “Lihat posisinya, lanjutkan polanya.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Posisi dan Pola
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
          id={idKuisTulisKartu(MODUL_MTK2_BAB4.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Lihat posisinya, lanjutkan polanya."
          alias={kumpulkanAlias(["lihat posisinya", "lanjutkan polanya"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
