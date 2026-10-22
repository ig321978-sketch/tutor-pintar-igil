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
import { MODUL_MTK2_BAB5 } from "@/lib/modul-resmi-mtk-2-bab5";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB5.id, kode, indeks);
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
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk urutannya.</p> : null}
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

function MartabakSvg({ jenis }: { jenis: "utuh" | "setengah" | "tidak-sama" | "seperempat" }) {
  if (jenis === "utuh") {
    return (
      <svg viewBox="0 0 160 90" className="mx-auto h-24 w-44" aria-hidden>
        <ellipse cx="80" cy="48" rx="52" ry="28" fill="#b45309" stroke="#78350f" strokeWidth="3" />
        <ellipse cx="80" cy="42" rx="40" ry="18" fill="#fbbf24" />
      </svg>
    );
  }
  if (jenis === "setengah") {
    return (
      <svg viewBox="0 0 180 90" className="mx-auto h-24 w-48" aria-hidden>
        <path d="M20 48 A40 28 0 0 1 100 48 L20 48" fill="#b45309" stroke="#78350f" strokeWidth="3" />
        <path d="M108 48 A40 28 0 0 1 188 48 L108 48" fill="#b45309" stroke="#78350f" strokeWidth="3" />
        <text x="60" y="82" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1C01A5">
          sama
        </text>
        <text x="148" y="82" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1C01A5">
          besar
        </text>
      </svg>
    );
  }
  if (jenis === "tidak-sama") {
    return (
      <svg viewBox="0 0 180 90" className="mx-auto h-24 w-48" aria-hidden>
        <path d="M24 52 L96 20 L96 78 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
        <rect x="108" y="28" width="52" height="44" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <text x="90" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#be123c">
          tidak sama besar
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 140 140" className="mx-auto h-32 w-32" aria-hidden>
      <circle cx="70" cy="70" r="52" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      <line x1="70" y1="18" x2="70" y2="122" stroke="#fff7ed" strokeWidth="4" />
      <line x1="18" y1="70" x2="122" y2="70" stroke="#fff7ed" strokeWidth="4" />
      <path d="M70 70 L70 18 A52 52 0 0 1 122 70 Z" fill="#fbbf24" opacity="0.85" />
    </svg>
  );
}

function KelerengSvg({ mode }: { mode: "empat" | "bagi" }) {
  const titik = mode === "empat" ? [28, 56, 84, 112] : [28, 56];
  return (
    <svg viewBox="0 0 160 70" className="mx-auto h-20 w-44" aria-hidden>
      {titik.map((x, i) => (
        <circle key={x} cx={x} cy="32" r="12" fill={["#38bdf8", "#f472b6", "#a3e635", "#facc15"][i % 4]} stroke="#0f172a" />
      ))}
      {mode === "bagi" ? (
        <>
          <circle cx="108" cy="32" r="12" fill="#38bdf8" stroke="#0f172a" />
          <circle cx="136" cy="32" r="12" fill="#f472b6" stroke="#0f172a" />
          <text x="42" y="62" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
            Upe 2
          </text>
          <text x="122" y="62" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
            Malosi 2
          </text>
        </>
      ) : (
        <text x="80" y="62" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
          4 kelereng
        </text>
      )}
    </svg>
  );
}

function IkanSvg({ sama }: { sama: boolean }) {
  const kiri = sama ? 3 : 4;
  const kanan = sama ? 3 : 2;
  return (
    <div className="flex flex-wrap justify-center gap-4 text-center">
      <p className="rounded-2xl bg-sky-50 px-3 py-2 text-lg" aria-hidden>
        {Array.from({ length: kiri }, () => "🐟").join("")}
        <span className="mt-1 block text-xs font-black text-[#1C01A5]">{kiri} ikan</span>
      </p>
      <p className="rounded-2xl bg-emerald-50 px-3 py-2 text-lg" aria-hidden>
        {Array.from({ length: kanan }, () => "🐟").join("")}
        <span className="mt-1 block text-xs font-black text-[#1C01A5]">{kanan} ikan</span>
      </p>
    </div>
  );
}

function ApelTahap() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3 text-center text-xs font-black text-[#1C01A5]">
      <span>
        <span className="block text-4xl">🍎</span>
        utuh
      </span>
      <span>
        <span className="block text-4xl">🍎</span>
        setengah
      </span>
      <span>
        <span className="block text-3xl">🍏</span>
        seperempat
      </span>
    </div>
  );
}

function LingkaranBagian({ diwarnai }: { diwarnai: 1 | 2 }) {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      <circle cx="60" cy="60" r="48" fill="#fff7ed" stroke="#9a3412" strokeWidth="3" />
      <line x1="60" y1="12" x2="60" y2="108" stroke="#9a3412" strokeWidth="3" />
      <line x1="12" y1="60" x2="108" y2="60" stroke="#9a3412" strokeWidth="3" />
      <path d="M60 60 L60 12 A48 48 0 0 1 108 60 Z" fill="#fbbf24" />
      {diwarnai === 2 ? <path d="M60 60 L108 60 A48 48 0 0 1 60 108 Z" fill="#f59e0b" /> : null}
    </svg>
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

const MISI_MARTABAK: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Dua sama besar",
    narasi: "Martabak dipotong dua sama besar. Tiap potong bernilai apa?",
    mode: "suara",
    anak: <MartabakSvg jenis="setengah" />,
    alias: ["setengah"],
    bersama: "Dua bagian sama besar. Tiap potong setengah.",
  },
  {
    warna: "kuning",
    misi: "Tulis setengah",
    narasi: "Tuliskan setengah.",
    mode: "kanvas",
    anak: <MartabakSvg jenis="setengah" />,
    alias: ["setengah"],
    bersama: "Tulis setengah.",
  },
  {
    warna: "ungu",
    misi: "Tidak sama",
    narasi: "Potongan tidak sama besar. Itu setengah?",
    mode: "pilih",
    anak: <MartabakSvg jenis="tidak-sama" />,
    alias: ["kedua"],
    labelPertama: "Ya, setengah",
    labelKedua: "Bukan setengah",
    benarPilih: "kedua",
    bersama: "Harus sama besar. Kalau tidak sama, bukan setengah.",
  },
  {
    warna: "biru",
    misi: "Kelereng Upe",
    narasi: "Malosi punya 4 kelereng. Setengah untuk Upe. Upe dapat berapa?",
    mode: "suara",
    anak: <KelerengSvg mode="empat" />,
    alias: ["2", "dua"],
    bersama: "Setengah dari 4 adalah 2.",
  },
  {
    warna: "kuning",
    misi: "Tulis 2",
    narasi: "Tuliskan 2.",
    mode: "kanvas",
    anak: <KelerengSvg mode="bagi" />,
    alias: ["2", "dua"],
    bersama: "Upe 2, Malosi 2. Tulis 2.",
  },
  {
    warna: "hijau",
    misi: "Ikan Halim",
    narasi: "6 ikan dibagi dua sama banyak. Setengahnya berapa?",
    mode: "suara",
    anak: <IkanSvg sama />,
    alias: ["3", "tiga"],
    bersama: "Setengah dari 6 ikan adalah 3 ikan.",
  },
  {
    warna: "ungu",
    misi: "Bukan setengah",
    narasi: "6 ikan: 4 di satu ember, 2 di ember lain. Itu setengah?",
    mode: "pilih",
    anak: <IkanSvg sama={false} />,
    alias: ["kedua"],
    labelPertama: "Setengah",
    labelKedua: "Bukan setengah",
    benarPilih: "kedua",
    bersama: "4 dan 2 tidak sama banyak. Bukan setengah.",
  },
  {
    warna: "kuning",
    misi: "Pensil Tika",
    narasi: "Tika punya 8 pensil. Tuliskan setengahnya.",
    mode: "kanvas",
    alias: ["4", "empat"],
    bersama: "Setengah dari 8 adalah 4. Tulis 4.",
  },
  {
    warna: "biru",
    misi: "Empat teman",
    narasi: "Martabak untuk 4 teman. Empat potong sama besar. Tiap orang mendapat apa?",
    mode: "suara",
    anak: <MartabakSvg jenis="seperempat" />,
    alias: ["seperempat"],
    bersama: "Empat bagian sama besar. Tiap potong seperempat.",
  },
  {
    warna: "kuning",
    misi: "Tulis seperempat",
    narasi: "Tuliskan seperempat.",
    mode: "kanvas",
    anak: <LingkaranBagian diwarnai={1} />,
    alias: ["seperempat"],
    bersama: "Satu dari empat bagian sama besar. Tulis seperempat.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiMartabak() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_MARTABAK[aktif];
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
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil memotong 10 martabak. Pilih satu potong, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🥞
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_MARTABAK[indeks].warna]
              }`}
              aria-label={`Potong ${indeks + 1}${selesai ? ", selesai" : ""}`}
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
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · setengah</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · kumpulan</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · tulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · pilih</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Potong {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className="mt-3">{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Daunmu tetap aman. Coba lagi.</p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">Potong ini sudah rapi. Pilih potong lain, ya.</p>
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
          <div className="mt-3" key={`kanvas-${aktif}`}>
            <KuisTulisKartu
              id={idKuis("C", aktif)}
              hanyaKanvas
              pertanyaan={misi.narasi}
              alias={misi.alias}
              konteks={misi.bersama}
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={kini.selesai}
              onClick={() => {
                const benar = misi.benarPilih === "pertama";
                catat(aktif, benar);
                if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
              }}
              className="min-h-12 rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white"
            >
              {misi.labelPertama}
            </button>
            <button
              type="button"
              disabled={kini.selesai}
              onClick={() => {
                const benar = misi.benarPilih === "kedua";
                catat(aktif, benar);
                if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
              }}
              className="min-h-12 rounded-xl bg-amber-500 px-3 py-2 text-sm font-black text-amber-950"
            >
              {misi.labelKedua}
            </button>
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
        soal="Martabak dipotong dua sama besar. Tiap potong bernilai..."
        benar="B"
        umpanBenar="Benar! Dua bagian sama besar itu setengah."
        pesanSalah="Lihat potongannya. Harus dua dan sama besar."
        anak={<MartabakSvg jenis="setengah" />}
        pilihan={[
          { huruf: "A", teks: "seperempat" },
          { huruf: "B", teks: "setengah" },
          { huruf: "C", teks: "utuh" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="Segi empat dipotong dua, tetapi tidak sama besar. Itu..."
        benar="A"
        umpanBenar="Tepat! Tidak sama besar, jadi bukan setengah."
        pesanSalah="Setengah harus sama besar."
        anak={<MartabakSvg jenis="tidak-sama" />}
        pilihan={[
          { huruf: "A", teks: "bukan setengah" },
          { huruf: "B", teks: "setengah" },
          { huruf: "C", teks: "seperempat" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="Malosi punya 4 kelereng. Setengah untuk Upe. Upe mendapat..."
        benar="B"
        umpanBenar="Benar! Setengah dari 4 adalah 2."
        pesanSalah="Bagi 4 kelereng jadi dua kelompok sama banyak."
        anak={<KelerengSvg mode="empat" />}
        pilihan={[
          { huruf: "A", teks: "4 kelereng" },
          { huruf: "B", teks: "2 kelereng" },
          { huruf: "C", teks: "1 kelereng" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="Ada 6 ikan. Dibagi dua tempat sama banyak. Setengahnya..."
        benar="A"
        umpanBenar="Tepat! Setengah dari 6 adalah 3."
        pesanSalah="Dua kelompok harus sama banyak."
        anak={<IkanSvg sama />}
        pilihan={[
          { huruf: "A", teks: "3 ikan" },
          { huruf: "B", teks: "2 ikan" },
          { huruf: "C", teks: "4 ikan" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 4)}
        soal="6 ikan: 4 di satu ember, 2 di ember lain. Itu..."
        benar="C"
        umpanBenar="Benar! 4 dan 2 tidak sama. Bukan setengah."
        pesanSalah="Setengah harus sama banyak."
        anak={<IkanSvg sama={false} />}
        pilihan={[
          { huruf: "A", teks: "setengah" },
          { huruf: "B", teks: "seperempat" },
          { huruf: "C", teks: "bukan setengah" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 5)}
        soal="Tika punya 8 pensil. Setengah pensil Tika..."
        benar="B"
        umpanBenar="Benar! Setengah dari 8 adalah 4."
        pesanSalah="8 pensil jadi dua kelompok sama banyak."
        pilihan={[
          { huruf: "A", teks: "8" },
          { huruf: "B", teks: "4" },
          { huruf: "C", teks: "2" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 6)}
        soal="Martabak untuk Kira, Malosi, Upe, dan Tika. Empat potong sama besar. Tiap orang mendapat..."
        benar="A"
        umpanBenar="Tepat! Empat bagian sama besar itu seperempat."
        pesanSalah="Ada 4 teman. Potong jadi 4."
        anak={<MartabakSvg jenis="seperempat" />}
        pilihan={[
          { huruf: "A", teks: "seperempat" },
          { huruf: "B", teks: "setengah" },
          { huruf: "C", teks: "utuh" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 7)}
        soal="Potong jadi dua sama besar, lalu potong lagi jadi dua sama besar. Dapat..."
        benar="B"
        umpanBenar="Benar! Setengah dipotong lagi jadi seperempat."
        pesanSalah="Potong dua, lalu potong lagi. Jadi empat bagian."
        anak={<ApelTahap />}
        pilihan={[
          { huruf: "A", teks: "setengah" },
          { huruf: "B", teks: "seperempat" },
          { huruf: "C", teks: "utuh" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 8)}
        soal="Lingkaran dibagi 4 sama besar. Satu bagian diwarnai. Bagian diwarnai..."
        benar="B"
        umpanBenar="Tepat! Satu dari empat itu seperempat."
        pesanSalah="Hitung bagian yang sama besar. Ada 4. Satu diwarnai."
        anak={<LingkaranBagian diwarnai={1} />}
        pilihan={[
          { huruf: "A", teks: "setengah" },
          { huruf: "B", teks: "seperempat" },
          { huruf: "C", teks: "utuh" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 9)}
        soal="Lingkaran dibagi 4 sama besar. Dua bagian diwarnai. Bagian diwarnai..."
        benar="A"
        umpanBenar="Benar! Dua dari empat sama dengan setengah."
        pesanSalah="Dua bagian dari empat. Itu setengah."
        anak={<LingkaranBagian diwarnai={2} />}
        pilihan={[
          { huruf: "A", teks: "setengah" },
          { huruf: "B", teks: "seperempat" },
          { huruf: "C", teks: "tiga" },
        ]}
      />
    </div>
  );
}

export default function NaskahMtk2Bab5({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB5;
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🥞🦉☀️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Menunjukkan setengah dari benda utuh.",
            "Menunjukkan setengah dari kumpulan benda.",
            "Menunjukkan seperempat dari benda utuh.",
            "Membedakan potongan sama besar dan tidak sama besar.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Setengah dari Benda Utuh"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Ibu memberi Kira martabak manis. Kira berbagi dengan Tika.",
            "Potong dua sama besar. Tiap potong bernilai setengah.",
            "Kalau tidak sama besar, itu bukan setengah.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-cerita.jpg"
            alt="Kira membawa martabak manis. Tika, Malosi, Upe, dan Igil menunggu di dapur."
          />
          <Dialog nama="Ibu" warna="border-rose-200 bg-rose-50">
            “Ini martabak manis, Kira. Bagi dengan Tika secara adil, ya. Hati-hati dengan pisau anak.”
          </Dialog>
          <Dialog nama="Kira" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Tika juga suka martabak. Aku potong dua sama besar.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Dua bagian sama besar. Tiap potong bernilai setengah.”
          </Dialog>
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-martabak.jpg"
            alt="Kira dan Tika memegang dua potong martabak sama besar. Igil menonton di meja."
          />
          <MartabakSvg jenis="setengah" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            idKanvas={idKuis("A", 1)}
            pertanyaanSuara="Dua bagian sama besar bernilai apa?"
            aliasSuara={["setengah"]}
            petunjukSuara="Ucapkan setengah."
            pertanyaanKanvas="Tuliskan setengah."
            aliasKanvas={["setengah"]}
            konteksKanvas="Martabak dua potong sama besar. Tulis setengah."
          />
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-setengah.jpg"
            alt="Setengah semangka, setengah gelas air, setengah kertas lipat, dan Igil menunjuk."
          />
          <Dialog nama="Tika" warna="border-violet-300 bg-violet-50">
            “Ada juga setengah semangka, setengah gelas air, setengah sendok gula.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Lipat kertas jadi dua sama besar. Itu juga setengah.”
          </Dialog>
          <KuisPilih
            id={idKuis("A", 4)}
            soal="Gambar mana yang menunjukkan setengah?"
            benar="A"
            umpanBenar="Benar! Potongan harus sama besar."
            pesanSalah="Lihat ukurannya. Harus sama."
            anak={
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-center text-xs font-black text-[#1C01A5]">A</p>
                  <MartabakSvg jenis="setengah" />
                </div>
                <div>
                  <p className="text-center text-xs font-black text-[#1C01A5]">B</p>
                  <MartabakSvg jenis="tidak-sama" />
                </div>
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "gambar A, sama besar" },
              { huruf: "B", teks: "gambar B, tidak sama" },
              { huruf: "C", teks: "keduanya setengah" },
            ]}
          />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="Segi empat dipotong dua, tetapi tidak sama besar. Itu..."
            benar="A"
            umpanBenar="Tepat! Bukan setengah."
            pesanSalah="Setengah harus sama besar."
            anak={<MartabakSvg jenis="tidak-sama" />}
            pilihan={[
              { huruf: "A", teks: "bukan setengah" },
              { huruf: "B", teks: "setengah" },
              { huruf: "C", teks: "seperempat" },
            ]}
          />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="Potongan tidak sama besar. Itu setengah?"
            aliasSuara={["bukan", "tidak"]}
            petunjukSuara="Ucapkan bukan atau tidak."
            pertanyaanKanvas="Tuliskan bukan."
            aliasKanvas={["bukan"]}
            konteksKanvas="Tidak sama besar. Tulis bukan."
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <JudulSubBab
          judul="Sub-Bab B: Setengah dari Kumpulan Benda"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Malosi punya 4 kelereng. Upe belum punya.",
            "Setengah dari 4 kelereng adalah 2 kelereng.",
            "Dua kelompok harus sama banyak.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-kelereng.jpg"
            alt="Malosi dan Upe berbagi empat kelereng, dua-dua. Igil menghitung."
          />
          <Dialog nama="Malosi" warna="border-sky-300 bg-sky-50">
            “Aku punya 4 kelereng. Upe belum bawa. Aku beri setengah.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Ambil satu untuk Upe, satu untuk Malosi. Ulang. Habis. Masing-masing 2.”
          </Dialog>
          <KelerengSvg mode="bagi" />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Setengah dari 4 kelereng berapa?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 2."
            aliasKanvas={["2", "dua"]}
            konteksKanvas="Setengah dari 4 adalah 2."
          />
          <Dialog nama="Halim" warna="border-orange-300 bg-orange-50">
            “Ada 6 ikan. Aku masukkan ke dua tempat sama banyak.”
          </Dialog>
          <IkanSvg sama />
          <KuisPilih
            id={idKuis("B", 4)}
            soal="Setengah dari 6 ikan adalah..."
            benar="A"
            umpanBenar="Benar! 3 dan 3. Sama banyak."
            pesanSalah="Bagi 6 jadi dua kelompok sama."
            pilihan={[
              { huruf: "A", teks: "3 ikan" },
              { huruf: "B", teks: "2 ikan" },
              { huruf: "C", teks: "4 ikan" },
            ]}
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kalau 4 ikan di sini, 2 ikan di sana, itu bukan setengah.”
          </Dialog>
          <IkanSvg sama={false} />
          <KuisPilih
            id={idKuis("B", 5)}
            soal="6 ikan: 4 dan 2. Itu..."
            benar="C"
            umpanBenar="Tepat! Tidak sama banyak."
            pesanSalah="Setengah harus sama banyak."
            pilihan={[
              { huruf: "A", teks: "setengah" },
              { huruf: "B", teks: "seperempat" },
              { huruf: "C", teks: "bukan setengah" },
            ]}
          />
          <KuisSusun
            id={idKuis("B", 6)}
            soal="Susun cara Malosi berbagi 4 kelereng."
            pool={[
              { kunci: "sisa", tampil: "Sisa 0. Masing-masing 2." },
              { kunci: "ambil", tampil: "Ambil 1 untuk Upe, 1 untuk Malosi." },
              { kunci: "mulai", tampil: "Ada 4 kelereng." },
            ]}
            benar={["mulai", "ambil", "sisa"]}
            umpanBenar="Benar! Mulai 4, bagi satu-satu, sampai masing-masing 2."
            pesanSalah="Mulai dari ada 4 kelereng."
          />
          <KuisPilih
            id={idKuis("B", 7)}
            soal="Tika punya 8 pensil. Setengah pensil Tika..."
            benar="B"
            umpanBenar="Benar! Setengah dari 8 adalah 4."
            pesanSalah="8 pensil jadi dua kelompok sama."
            pilihan={[
              { huruf: "A", teks: "8" },
              { huruf: "B", teks: "4" },
              { huruf: "C", teks: "2" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab C: Seperempat dari Benda Utuh"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Kira makan martabak bersama Malosi, Upe, dan Tika.",
            "Empat teman. Potong empat sama besar.",
            "Tiap potong bernilai seperempat.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-seperempat.jpg"
            alt="Martabak dipotong empat sama besar. Apel utuh, setengah, seperempat. Igil berkoki."
          />
          <Dialog nama="Kira" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Aku, Malosi, Upe, dan Tika. Empat orang. Potong jadi empat.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Empat bagian sama besar. Tiap potong seperempat.”
          </Dialog>
          <MartabakSvg jenis="seperempat" />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            idKanvas={idKuis("B", 3)}
            pertanyaanSuara="Empat bagian sama besar bernilai apa?"
            aliasSuara={["seperempat"]}
            petunjukSuara="Ucapkan seperempat."
            pertanyaanKanvas="Tuliskan seperempat."
            aliasKanvas={["seperempat"]}
            konteksKanvas="Empat potong sama besar. Tulis seperempat."
          />
          <Dialog nama="Upe" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Potong dulu jadi dua. Lalu potong lagi jadi dua. Dapat seperempat.”
          </Dialog>
          <ApelTahap />
          <KuisPilih
            id={idKuis("B", 8)}
            soal="Potong jadi dua sama besar, lalu potong lagi jadi dua. Dapat..."
            benar="B"
            umpanBenar="Benar! Setengah dipotong lagi jadi seperempat."
            pesanSalah="Dua, lalu dua lagi. Jadi empat bagian."
            pilihan={[
              { huruf: "A", teks: "setengah" },
              { huruf: "B", teks: "seperempat" },
              { huruf: "C", teks: "utuh" },
            ]}
          />
          <LingkaranBagian diwarnai={1} />
          <KuisPilih
            id={idKuis("B", 9)}
            soal="Lingkaran 4 bagian sama besar. Satu diwarnai. Bagian diwarnai..."
            benar="B"
            umpanBenar="Tepat! Satu dari empat itu seperempat."
            pesanSalah="Ada 4 bagian. Satu kuning."
            pilihan={[
              { huruf: "A", teks: "setengah" },
              { huruf: "B", teks: "seperempat" },
              { huruf: "C", teks: "utuh" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🥞⭐🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh potong · setengah, kumpulan, seperempat
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiMartabak />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Setengah: dua bagian sama besar.",
          "Setengah kumpulan: dua kelompok sama banyak.",
          "Seperempat: empat bagian sama besar.",
          "Potongan tidak sama besar bukan setengah.",
          "4 dan 2 bukan setengah dari 6.",
          "Potong dua, lalu potong lagi, dapat seperempat.",
          "Dua dari empat bagian sama besar itu setengah.",
        ]}
        penutup='Kalimat kunci: “Sama besar, sama banyak.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Pecahan
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
          id={idKuisTulisKartu(MODUL_MTK2_BAB5.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Sama besar, sama banyak."
          alias={kumpulkanAlias(["sama besar", "sama banyak"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
