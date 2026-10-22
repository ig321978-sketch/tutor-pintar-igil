"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB6 } from "@/lib/modul-resmi-mtk-2-bab6";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB6.id, kode, indeks);
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
            className={`min-h-12 rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
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

function KuisCocok({
  id,
  soal,
  baris,
  label,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  baris: { id: string; tampil: ReactNode; benar: string }[];
  label: string[];
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = baris.every((item) => pilih[item.id] === item.benar);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-sky-50 p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 grid gap-3">
        {baris.map((item) => (
          <div key={item.id} className="rounded-xl bg-white px-3 py-3">
            <div className="text-sm font-black text-[#1C01A5]">{item.tampil}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {label.map((teks) => {
                const terpilih = pilih[item.id] === teks;
                const dasar = terpilih ? "bg-emerald-500 text-white" : "bg-[#1C01A5] text-white hover:bg-[#16017a]";
                return (
                  <button
                    key={teks}
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setPilih((lama) => ({ ...lama, [item.id]: teks }));
                    }}
                    className={`min-h-12 rounded-xl px-4 py-2 text-sm font-black ${
                      status ? kelasTombolHasilKuis(pilih[item.id] ?? "", teks, item.benar, dasar) : dasar
                    }`}
                  >
                    {teks}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={baris.map((item) => pilih[item.id]).filter(Boolean).join(" · ") || undefined}
          pesanSalah={pesanSalah}
        />
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
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk dari yang paling ringan.</p> : null}
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
            className="min-h-12 rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
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
          className="min-h-12 rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]">
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

function KuisBenarSalah({
  id,
  soal,
  benar,
  anak,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  benar: "benar" | "salah";
  anak?: ReactNode;
  umpanBenar: string;
  pesanSalah: string;
}) {
  return (
    <KuisPilih
      id={id}
      soal={soal}
      benar={benar === "benar" ? "A" : "B"}
      anak={anak}
      umpanBenar={umpanBenar}
      pesanSalah={pesanSalah}
      pilihan={[
        { huruf: "A", teks: "Benar" },
        { huruf: "B", teks: "Salah" },
      ]}
    />
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

function AdeganStasiun({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(180deg,#dbeafe_0%,#93c5fd_55%,#1d4ed8_100%)] px-3 py-4">
      <p className="absolute bottom-2 left-2 text-4xl" aria-hidden>
        🦉🧢
      </p>
      <div className="pl-14 text-white">{children}</div>
    </div>
  );
}

function Timbangan({
  kiri,
  kanan,
  sikap = "kiri-turun",
}: {
  kiri: string;
  kanan: string;
  sikap?: "kiri-turun" | "kanan-turun" | "lurus";
}) {
  const miring = sikap === "lurus" ? 0 : sikap === "kiri-turun" ? 14 : -14;
  return (
    <svg viewBox="0 0 220 130" className="mx-auto h-28 w-52" aria-hidden>
      <ellipse cx="110" cy="122" rx="36" ry="6" fill="#1e3a8a" opacity="0.25" />
      <rect x="104" y="70" width="12" height="48" rx="2" fill="#92400e" />
      <g transform={`rotate(${miring} 110 68)`}>
        <line x1="28" y1="68" x2="192" y2="68" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
        <rect x="18" y="74" width="52" height="28" rx="6" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
        <rect x="150" y="74" width="52" height="28" rx="6" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
        <text x="44" y="93" textAnchor="middle" fontSize="16">
          {kiri}
        </text>
        <text x="176" y="93" textAnchor="middle" fontSize="16">
          {kanan}
        </text>
      </g>
      <circle cx="110" cy="68" r="7" fill="#1d4ed8" />
    </svg>
  );
}

function JamDinding({ jam, menit = 12, label }: { jam: number; menit?: number; label?: string }) {
  const sudutJam = ((jam % 12) / 12) * 360 - 90;
  const sudutMenit = ((menit % 12) / 12) * 360 - 90;
  const radJam = (sudutJam * Math.PI) / 180;
  const radMenit = (sudutMenit * Math.PI) / 180;
  return (
    <svg viewBox="0 0 120 130" className="mx-auto h-32 w-28" aria-hidden>
      <circle cx="60" cy="60" r="52" fill="#fff" stroke="#1C01A5" strokeWidth="4" />
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        return (
          <text key={n} x={60 + 40 * Math.cos(a)} y={64 + 40 * Math.sin(a)} textAnchor="middle" fontSize="9" fontWeight="800" fill="#1C01A5">
            {n}
          </text>
        );
      })}
      <line x1="60" y1="60" x2={60 + 34 * Math.cos(radMenit)} y2={60 + 34 * Math.sin(radMenit)} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="60" x2={60 + 22 * Math.cos(radJam)} y2={60 + 22 * Math.sin(radJam)} stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill="#1C01A5" />
      {label ? (
        <text x="60" y="126" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1C01A5">
          {label}
        </text>
      ) : null}
    </svg>
  );
}

function KuisTambahKelereng() {
  const kuis = useKuisMateri();
  const [tambah, setTambah] = useState(0);
  const [pilih, setPilih] = useState("");
  const kanan = 4 + tambah;
  const lurus = kanan === 7;
  const status: StatusJawabanKuis = pilih ? (pilih === "B" && lurus ? "benar" : "salah") : null;
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Nampan kiri: nanas = 7 kelereng. Nampan kanan sudah 4. Ketuk +1 kelereng sampai lurus. Berapa yang kamu tambah?</p>
      <Timbangan kiri="🍍" kanan={"🔵".repeat(Math.min(kanan, 8))} sikap={lurus ? "lurus" : "kiri-turun"} />
      <p className="text-center text-sm font-black text-[#1C01A5]">Kanan: {kanan} kelereng</p>
      <button
        type="button"
        onClick={() => {
          setTambah((n) => {
            const next = Math.min(6, n + 1);
            if (next + 4 === 7 && pilih === "B") kuis?.tandaiBenar(idKuis("B", 6));
            return next;
          });
        }}
        className="mt-2 min-h-12 rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-amber-950"
      >
        + 1 Kelereng
      </button>
      <div className="mt-3 grid gap-2">
        {[
          { huruf: "A", teks: "2" },
          { huruf: "B", teks: "3" },
          { huruf: "C", teks: "4" },
        ].map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === "B" && lurus) kuis?.tandaiBenar(idKuis("B", 6));
            }}
            className={`min-h-12 rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, "B", "bg-[#1C01A5] text-white")}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah="7 kurang 4 sama dengan 3." />
        <UmpanBenar status={status} teks="Benar! Tambah 3 kelereng supaya 4 menjadi 7." />
      </div>
    </article>
  );
}

function KuisSortirDurasi() {
  const kuis = useKuisMateri();
  const kunci: Record<string, "Sebentar" | "Lama"> = {
    sepatu: "Sebentar",
    film: "Lama",
    bersin: "Sebentar",
    pantai: "Lama",
  };
  const kartu = [
    { id: "sepatu", tampil: "Mengikat tali sepatu" },
    { id: "film", tampil: "Menonton film" },
    { id: "bersin", tampil: "Bersin" },
    { id: "pantai", tampil: "Berlibur ke pantai" },
  ];
  const [wadah, setWadah] = useState<Record<string, "Sebentar" | "Lama" | "">>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = kartu.every((item) => wadah[item.id] === kunci[item.id]);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("B", 9));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Tarik kartu ke keranjang Sebentar atau Lama.</p>
      {kartu.map((item) => (
        <div key={item.id} className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-sky-50 px-3 py-2">
          <span className="text-sm font-black text-[#1C01A5]">{item.tampil}</span>
          {(["Sebentar", "Lama"] as const).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setStatus(null);
                setWadah((lama) => ({ ...lama, [item.id]: label }));
              }}
              className={`min-h-12 rounded-xl px-3 text-xs font-black ${
                wadah[item.id] === label ? "bg-emerald-500 text-white" : "bg-[#1C01A5] text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ))}
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Bersin dan ikat sepatu sebentar. Film dan liburan lama." />
        <UmpanBenar status={status} teks="Tepat! Dua sebentar, dua lama." />
      </div>
    </article>
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
  pilihan?: { huruf: string; teks: string }[];
  benarHuruf?: string;
  bersama: string;
};

const NOMOR_IKAT = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-300 bg-emerald-50",
  biru: "border-sky-300 bg-sky-50",
  kuning: "border-amber-300 bg-amber-50",
  ungu: "border-violet-300 bg-violet-50",
};

const MISI_KERETA: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Karung beras",
    narasi: "Gerbong kiri berisi 1 karung beras = 8 balok. Pilih paket kanan agar kereta lurus!",
    mode: "pilih",
    anak: <Timbangan kiri="🌾" kanan="📦" sikap="kiri-turun" />,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "Paket A: 5 balok" },
      { huruf: "B", teks: "Paket B: 8 balok" },
      { huruf: "C", teks: "Paket C: 3 balok" },
    ],
    benarHuruf: "B",
    bersama: "Sama-sama 8 balok. Timbangan lurus.",
  },
  {
    warna: "biru",
    misi: "Kotak merah dan biru",
    narasi: "Timbangan miring ke kiri. Kiri kotak merah, kanan kotak biru. Kotak mana yang lebih ringan?",
    mode: "pilih",
    anak: <Timbangan kiri="🟥" kanan="🟦" sikap="kiri-turun" />,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "Kotak merah" },
      { huruf: "B", teks: "Kotak biru" },
    ],
    benarHuruf: "B",
    bersama: "Nampan yang naik lebih ringan. Itu kotak biru.",
  },
  {
    warna: "ungu",
    misi: "Jam keberangkatan 05.00",
    narasi: "Kereta berangkat pukul 05.00. Ketuk kartu jam yang jarum pendeknya di 5 dan jarum panjangnya di 12.",
    mode: "pilih",
    anak: (
      <div className="grid grid-cols-3 gap-2">
        <JamDinding jam={3} label="A" />
        <JamDinding jam={5} label="B" />
        <JamDinding jam={8} label="C" />
      </div>
    ),
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "Kartu A" },
      { huruf: "B", teks: "Kartu B pukul 05.00" },
      { huruf: "C", teks: "Kartu C" },
    ],
    benarHuruf: "B",
    bersama: "Pendek di 5, panjang di 12. Pukul lima tepat.",
  },
  {
    warna: "kuning",
    misi: "Tugas Dodi",
    narasi: "Dodi punya 2 tugas: meniup peluit, atau mengemudikan kereta antar kota. Mana yang lebih lama?",
    mode: "pilih",
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "Meniup peluit kereta" },
      { huruf: "B", teks: "Mengemudikan kereta antar kota" },
    ],
    benarHuruf: "B",
    bersama: "Meniup peluit sebentar. Mengemudi antar kota lama.",
  },
  {
    warna: "hijau",
    misi: "Dua apel",
    narasi: "1 apel = 2 kelereng. Tika menaruh 2 apel di nampan kiri. Berapa kelereng di kanan?",
    mode: "pilih",
    anak: <Timbangan kiri="🍎🍎" kanan="🔵?" sikap="kiri-turun" />,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "2 kelereng" },
      { huruf: "B", teks: "4 kelereng" },
      { huruf: "C", teks: "6 kelereng" },
    ],
    benarHuruf: "B",
    bersama: "2 kali 2 sama dengan 4 kelereng.",
  },
  {
    warna: "biru",
    misi: "Perjalanan 2 jam",
    narasi: "Kereta berangkat pukul 07.00, tiba pukul 09.00. Owi berkata perjalanannya 2 jam. Benar atau salah?",
    mode: "pilih",
    anak: (
      <div className="grid grid-cols-2 gap-2">
        <JamDinding jam={7} label="07.00" />
        <JamDinding jam={9} label="09.00" />
      </div>
    ),
    alias: ["A"],
    pilihan: [
      { huruf: "A", teks: "Benar" },
      { huruf: "B", teks: "Salah" },
    ],
    benarHuruf: "A",
    bersama: "9 kurang 7 sama dengan 2 jam.",
  },
  {
    warna: "ungu",
    misi: "Pukul sebelas",
    narasi: "Jam stasiun: jarum pendek di 11, jarum panjang di 12. Pukul berapa? Ucapkan ke mikrofon!",
    mode: "suara",
    anak: <JamDinding jam={11} label="stasiun" />,
    alias: ["11", "sebelas", "pukul sebelas", "jam sebelas"],
    bersama: "Pendek di 11, panjang di 12. Pukul sebelas tepat.",
  },
  {
    warna: "kuning",
    misi: "Paket A atau B",
    narasi: "Paket A 9 kelereng, Paket B 4 kelereng. Paket mana yang lebih berat? Ucapkan ke mikrofon!",
    mode: "suara",
    anak: <p className="text-center text-sm font-black text-[#1C01A5]">A = 🔵🔵🔵🔵🔵🔵🔵🔵🔵 · B = 🔵🔵🔵🔵</p>,
    alias: ["a", "paket a", "sembilan"],
    bersama: "9 lebih besar dari 4. Paket A lebih berat.",
  },
  {
    warna: "hijau",
    misi: "Berat labu",
    narasi: "Nampan kiri labu, nampan kanan 7 balok, posisi seimbang. Tuliskan angka berat labu!",
    mode: "kanvas",
    anak: <Timbangan kiri="🎃" kanan="🪵🪵🪵🪵🪵🪵🪵" sikap="lurus" />,
    alias: ["7", "tujuh"],
    bersama: "Timbangan lurus. Labu = 7 balok.",
  },
  {
    warna: "biru",
    misi: "Kegiatan sebentar",
    narasi: "Lingkari kegiatan yang lebih sebentar, lalu tulis A. A: memakai kacamata. B: berkebun seharian.",
    mode: "kanvas",
    anak: <p className="text-center text-3xl">A 👓 · B 🌱🌞</p>,
    alias: ["a", "kacamata", "memakai"],
    bersama: "Memakai kacamata sebentar. Berkebun seharian lama.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiKereta() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_KERETA[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;

  const catat = (indeks: number, benar: boolean) => {
    setJejak((lama) => {
      const sebelumnya = lama[indeks] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai) return lama;
      if (benar) {
        return { ...lama, [indeks]: { ...sebelumnya, selesai: true, daun: daunDariPetunjuk(sebelumnya.petunjuk) } };
      }
      return { ...lama, [indeks]: { ...sebelumnya, petunjuk: Math.min(3, sebelumnya.petunjuk + 1) } };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Kapten IGIL di 10 misi. Muatan harus seimbang. Jam harus tepat.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🚂
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`min-h-12 rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_KERETA[indeks].warna]
              }`}
              aria-label={`Misi ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏅
        </span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">Lencana masinis {bintang}/10</p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Misi {aktif + 1} · {misi.misi}
        </p>
        <NamaDialog nama="Kapten IGIL" />
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className="mt-3">{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p> : null}
        {kini.petunjuk > 0 && !kini.selesai ? <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Coba lagi, ya.</p> : null}
        {kini.selesai ? <p className="mt-3 text-sm font-black text-emerald-800">Kereta stabil! Pilih misi lain.</p> : null}
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
              alias={kumpulkanAlias(misi.alias)}
              konteks={misi.bersama}
              sesudahNilai={(benar) => catat(aktif, benar)}
              visual={misi.anak}
            />
          </div>
        ) : null}
        {misi.mode === "pilih" && misi.pilihan && misi.benarHuruf ? (
          <div className="mt-3 grid gap-2">
            {misi.pilihan.map((item) => (
              <button
                key={item.huruf}
                type="button"
                disabled={kini.selesai}
                onClick={() => {
                  const benar = item.huruf === misi.benarHuruf;
                  catat(aktif, benar);
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                }}
                className="min-h-12 rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white"
              >
                {item.huruf}. {item.teks}
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
        soal="Timbangan 1: semangka turun, nanas naik. Timbangan 2: nanas turun, apel naik. Urutan dari paling berat ke paling ringan..."
        benar="A"
        umpanBenar="Benar! Semangka lebih berat dari nanas. Nanas lebih berat dari apel."
        pesanSalah="Yang turun lebih berat. Susun dari yang paling turun."
        anak={
          <div className="grid gap-2 sm:grid-cols-2">
            <Timbangan kiri="🍉" kanan="🍍" sikap="kiri-turun" />
            <Timbangan kiri="🍍" kanan="🍎" sikap="kiri-turun" />
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "Semangka - Nanas - Apel" },
          { huruf: "B", teks: "Apel - Nanas - Semangka" },
          { huruf: "C", teks: "Nanas - Semangka - Apel" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="1 kotak susu = 5 kelereng. 1 roti = 2 kelereng. Keduanya di nampan kiri. Berapa kelereng di kanan agar lurus?"
        benar="C"
        umpanBenar="Benar! 5 tambah 2 sama dengan 7."
        pesanSalah="Jumlahkan 5 dan 2."
        anak={<Timbangan kiri="🥛🍞" kanan="🔵?" sikap="kiri-turun" />}
        pilihan={[
          { huruf: "A", teks: "3 kelereng" },
          { huruf: "B", teks: "5 kelereng" },
          { huruf: "C", teks: "7 kelereng" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="Dodi mulai belajar saat jarum pendek di 3 dan jarum panjang di 12. Selesai 1 jam kemudian. Jarum pendek di angka..."
        benar="B"
        umpanBenar="Benar! Pukul 3 tambah 1 jam = pukul 4."
        pesanSalah="Tambah 1 jam dari angka 3."
        anak={<JamDinding jam={3} label="mulai 03.00" />}
        pilihan={[
          { huruf: "A", teks: "Angka 2" },
          { huruf: "B", teks: "Angka 4" },
          { huruf: "C", teks: "Angka 12" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="Balon udara besar naik ke atas. Batu kecil turun ke bawah. Pernyataan yang benar..."
        benar="B"
        umpanBenar="Benar! Yang turun lebih berat, meskipun ukurannya kecil."
        pesanSalah="Jangan tertipu ukuran. Lihat nampan yang turun."
        anak={<Timbangan kiri="🎈" kanan="🪨" sikap="kanan-turun" />}
        pilihan={[
          { huruf: "A", teks: "Balon lebih berat karena ukurannya besar" },
          { huruf: "B", teks: "Batu kecil lebih berat daripada balon besar" },
          { huruf: "C", teks: "Balon dan batu sama berat" },
        ]}
      />
      <KuisCocok
        id={idKuis("D", 4)}
        soal="Cocokkan situasi dengan kesimpulannya."
        baris={[
          { id: "tidur", tampil: "⏳ Tidur malam 8 jam vs gosok gigi 2 menit", benar: "Tidur malam lebih lama" },
          { id: "pensil", tampil: "⚖️ Buku 6 balok vs pensil 1 balok", benar: "Pensil lebih ringan" },
          { id: "jam6", tampil: "🕕 Pendek di 6, panjang di 12", benar: "Pukul 06.00 tepat" },
        ]}
        label={["Tidur malam lebih lama", "Pensil lebih ringan", "Pukul 06.00 tepat"]}
        umpanBenar="Semua cocok!"
        pesanSalah="Cocokkan satu per satu."
      />
      <KuisBenarSalah
        id={idKuis("D", 5)}
        soal='Jam: jarum pendek di 12, jarum panjang di 6. Tika berkata, "Ini pukul 6 tepat." Apakah Tika benar?'
        benar="salah"
        anak={<JamDinding jam={12} menit={6} label="bukan 6 tepat" />}
        umpanBenar="Salah. Pukul 6 tepat: pendek di 6, panjang di 12."
        pesanSalah="Jarum panjang di 6 bukan pukul 6 tepat."
      />
      <div>
        <p className="text-sm font-semibold text-slate-700">Melon = 10 kelereng. Mangga = 4 kelereng. Berapa selisihnya? Ucapkan ke mikrofon!</p>
        <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">10 − 4 = ?</p>
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="Hitung 10 dikurangi 4, lalu ucapkan jawabannya."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["6", "enam"])}
          petunjuk="Ucapkan enam."
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Jam stasiun: jarum pendek di 2, jarum panjang di 12. Pukul berapa?</p>
        <JamDinding jam={2} label="stasiun" />
        <SoalRekamSuara
          id={idKuis("D", 7)}
          pertanyaan="Pukul berapakah yang ditunjukkan jam stasiun? Jawab dengan suaramu."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["2", "dua", "pukul dua", "jam dua"])}
          petunjuk="Ucapkan dua atau pukul dua."
        />
      </div>
      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="Robot = 9 kelereng. Nampan kanan sudah 5. Berapa kelereng lagi supaya jadi 9? Tuliskan angkanya."
        alias={kumpulkanAlias(["4", "empat"])}
        konteks="9 kurang 5 sama dengan 4."
        visual={<Timbangan kiri="🤖" kanan="🔵🔵🔵🔵🔵" sikap="kiri-turun" />}
      />
      <KuisTulisKartu
        id={idKuis("D", 9)}
        hanyaKanvas
        pertanyaan="Kereta berangkat pukul 10 tepat. Jarum panjang sudah di 12. Gambar jarum pendek ke angka 10, lalu tuliskan 10."
        alias={kumpulkanAlias(["10", "sepuluh", "10.00"])}
        konteks="Pendek ke 10, panjang di 12. Pukul 10 tepat."
        visual={<JamDinding jam={12} label="gambar jarum ke 10" />}
      />
    </div>
  );
}

export default function NaskahMtk2Bab6({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB6;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚂⚖️🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Sub-Bab 6.1: Membandingkan Berat Benda"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Halo petugas cilik! Bersama Kapten IGIL, kita akan belajar membandingkan berat benda menggunakan jungkat-jungkit dan timbangan dua lengan.",
            "Ingat ya: benda yang lebih berat akan membuat lengan timbangan turun ke bawah, sedangkan benda yang lebih ringan akan naik ke atas!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab6-cerita.jpg"
            alt="Jungkat-jungkit: semangka besar turun di kiri, apel kecil naik di kanan. Kapten IGIL di kiri bawah."
          />
          <AdeganStasiun>
            <p className="text-sm font-semibold">
              Kantor Pos Ekspedisi. Di tengah ada timbangan kayu. Nampan kiri: paket kotak besi turun. Nampan kanan: paket bantal kapas naik.
            </p>
          </AdeganStasiun>
          <Timbangan kiri="📦" kanan="🧸" sikap="kiri-turun" />
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Kapten IGIL, aku mau mengangkat paket ini ke kereta, tapi kok yang kotak besi susah sekali diangkat ya?”
          </Dialog>
          <Dialog nama="Dodi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Lihat timbangannya! Nampan kotak besi turun ke bawah, sedangkan nampan bantal kapas naik tinggi ke atas!”
          </Dialog>
          <Dialog nama="Kapten IGIL" warna="border-sky-300 bg-sky-50">
            “Itu tandanya Paket Kotak Besi lebih berat daripada Paket Bantal Kapas! Kalau berat keduanya sama, lengan timbangannya akan sejajar lurus.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            pertanyaanSuara="Pada timbangan jungkat-jungkit, benda yang lebih berat akan bergerak ke arah mana: turun ke bawah atau naik ke atas?"
            aliasSuara={["turun", "bawah"]}
            petunjukSuara="Ucapkan turun ke bawah."
          />
          <KuisTulisKartu
            id={idKuis("A", 1)}
            hanyaKanvas
            pertanyaan="Lingkari buah yang LEBIH BERAT, lalu tuliskan namanya."
            alias={kumpulkanAlias(["pepaya"])}
            konteks="Nampan yang turun lebih berat. Itu pepaya."
            visual={
              <div>
                <Timbangan kiri="🍈" kanan="🍊" sikap="kiri-turun" />
                <p className="text-center text-xs font-black text-[#1C01A5]">Kiri pepaya · kanan jeruk</p>
              </div>
            }
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 6.2: Mengukur Berat dengan Satuan Tak Baku"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Kita bisa mengukur berapa berat suatu benda menggunakan benda lain yang ukurannya sama, seperti kelereng atau balok kayu kecil.",
            "Saat kedua lengan timbangan sejajar lurus, jumlah kelereng di sebelahnya menunjukkan berat benda tersebut!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab6-kelereng.jpg"
            alt="Timbangan seimbang. Kiri mobil-mobilan kayu. Kanan enam kelereng biru. Kapten IGIL di kiri bawah."
          />
          <AdeganStasiun>
            <p className="text-sm font-semibold">Meja Kantor Pos. Timbangan lurus. Kiri: 1 mobil-mobilan kayu. Kanan: 6 kelereng biru.</p>
          </AdeganStasiun>
          <Timbangan kiri="🚗" kanan="🔵🔵🔵🔵🔵🔵" sikap="lurus" />
          <Dialog nama="Dodi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Kapten IGIL, bagaimana cara tahu berapa berat mobil-mobilan kayu ini kalau kita belum pakai timbangan angka?”
          </Dialog>
          <Dialog nama="Kapten IGIL" warna="border-sky-300 bg-sky-50">
            “Kita masukkan kelereng satu per satu ke nampan kanan sampai timbangannya seimbang lurus! Coba hitung, ada 6 kelereng. Artinya, berat 1 mobil-mobilan sama dengan 6 kelereng!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            pertanyaanSuara="Jika 1 kotak pensil seimbang dengan 4 kelereng, maka berat kotak pensil itu sama dengan berapa kelereng?"
            aliasSuara={["4", "empat"]}
            petunjukSuara="Ucapkan empat."
          />
          <KuisTulisKartu
            id={idKuis("A", 3)}
            hanyaKanvas
            pertanyaan="Timbangan lurus. Kiri boneka beruang, kanan 8 balok. Tuliskan Berat Boneka = ? balok."
            alias={kumpulkanAlias(["8", "delapan"])}
            konteks="Timbangan lurus. Boneka = 8 balok."
            visual={<Timbangan kiri="🧸" kanan="🪵🪵🪵🪵 🪵🪵🪵🪵" sikap="lurus" />}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 6.3: Membaca Jam dan Durasi Waktu"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Di stasiun kereta, kita harus tepat waktu! Pada jam dinding, jarum pendek menunjuk angka jam, dan jarum panjang di angka 12 menunjukkan waktu tepat.",
            "Kita juga bisa membandingkan kegiatan mana yang berlangsung lebih lama dan lebih sebentar!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab6-jam.jpg"
            alt="Jam stasiun pukul delapan tepat. Jarum pendek di 8, jarum panjang di 12. Burung hantu di atas jam."
          />
          <AdeganStasiun>
            <p className="text-sm font-semibold">Peron stasiun. Jam besar menunjuk pukul 08.00. Burung hantu Owi bertengger di atas jam.</p>
          </AdeganStasiun>
          <JamDinding jam={8} label="Pukul 08.00" />
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Owi, kereta ekspres berangkat pukul berapa ya?”
          </Dialog>
          <Dialog nama="Owi" warna="border-amber-200 bg-amber-50">
            “Lihat jam stasiun! Jarum panjang menunjuk angka 12 dan jarum pendek menunjuk angka 8. Itu dibaca Pukul Delapan Tepat!”
          </Dialog>
          <Dialog nama="Kapten IGIL" warna="border-sky-300 bg-sky-50">
            “Ayo cepat naik. Mencuci tangan cuma sebentar, tapi perjalanan kereta kita akan berlangsung lama!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 4)}
            pertanyaanSuara="Pada jam dinding, jarum manakah yang menunjuk angka jam: jarum pendek atau jarum panjang?"
            aliasSuara={["pendek", "jarum pendek"]}
            petunjukSuara="Ucapkan jarum pendek."
          />
          <KuisTulisKartu
            id={idKuis("A", 5)}
            hanyaKanvas
            pertanyaan="Jam ini jarum panjang di 12, jarum pendek di 4. Tuliskan pukul berapa tepat."
            alias={kumpulkanAlias(["4", "empat", "04.00", "4.00"])}
            konteks="Pendek di 4, panjang di 12. Pukul 4 tepat."
            visual={<JamDinding jam={4} label="Pukul ?" />}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan stasiun</p>
        <div className="space-y-3">
          <KuisPilih
            id={idKuis("A", 6)}
            soal="Ketuk hewan yang membuat jungkat-jungkit turun ke bawah."
            benar="A"
            umpanBenar="Benar! Gajah kecil lebih berat. Nampannya turun."
            pesanSalah="Hewan yang lebih berat membuat nampan turun."
            anak={<Timbangan kiri="🐘" kanan="🐰" sikap="kiri-turun" />}
            pilihan={[
              { huruf: "A", teks: "Gajah kecil" },
              { huruf: "B", teks: "Kelinci" },
            ]}
          />
          <KuisCocok
            id={idKuis("A", 7)}
            soal="Pasangkan benda dengan berat kelerengnya."
            baris={[
              { id: "apel", tampil: "🍎 Apel", benar: "3 kelereng" },
              { id: "buku", tampil: "📘 Buku", benar: "5 kelereng" },
              { id: "sepatu", tampil: "👟 Sepatu", benar: "9 kelereng" },
            ]}
            label={["3 kelereng", "5 kelereng", "9 kelereng"]}
            umpanBenar="Apel 3, buku 5, sepatu 9."
            pesanSalah="Cocokkan satu per satu."
          />
          <KuisBenarSalah
            id={idKuis("A", 8)}
            soal='Jam: jarum pendek di 10, jarum panjang di 12. Tertulis "Sekarang Pukul 12 Tepat". Benar atau salah?'
            benar="salah"
            anak={<JamDinding jam={10} label="bukan 12" />}
            umpanBenar="Salah. Pendek di 10 berarti pukul 10 tepat."
            pesanSalah="Jarum pendek menunjuk jam. Itu angka 10."
          />
          <KuisSusun
            id={idKuis("A", 9)}
            soal="Susun dari yang paling ringan ke paling berat."
            pool={[
              { kunci: "tas", tampil: "Tas 10 kelereng" },
              { kunci: "pensil", tampil: "Pensil 1 kelereng" },
              { kunci: "botol", tampil: "Tempat minum 4 kelereng" },
            ]}
            benar={["pensil", "botol", "tas"]}
            umpanBenar="Pensil, tempat minum, lalu tas."
            pesanSalah="Mulai dari angka kelereng yang paling kecil."
          />
          <KuisPilih
            id={idKuis("A", 10)}
            soal="Ketuk kegiatan yang memerlukan waktu LEBIH LAMA."
            benar="B"
            umpanBenar="Benar! Tidur malam sampai pagi lebih lama daripada menguap."
            pesanSalah="Menguap sebentar. Tidur malam lama."
            anak={<p className="text-center text-3xl">A 😮 · B 😴🌙</p>}
            pilihan={[
              { huruf: "A", teks: "Menguap / berkedip" },
              { huruf: "B", teks: "Tidur malam sampai pagi" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📊⚖️🕒
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Infografis 1: Aturan Timbangan Dua Lengan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Lihat tiga posisi timbangan ini! Kalau miring ke bawah artinya lebih berat, kalau naik ke atas artinya lebih ringan, dan kalau mendatar lurus artinya kedua benda sama berat!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganStasiun>
            <p className="text-sm font-black">⬇️ Turun = lebih berat · ⬆️ Naik = lebih ringan · ↔️ Lurus = sama berat</p>
          </AdeganStasiun>
          <div className="grid gap-2 sm:grid-cols-3">
            <Timbangan kiri="🍉" kanan="🍓" sikap="kiri-turun" />
            <Timbangan kiri="🍓" kanan="🍉" sikap="kanan-turun" />
            <Timbangan kiri="🍎" kanan="🍏" sikap="lurus" />
          </div>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            pertanyaanSuara="Jika dua benda di timbangan posisinya lurus sejajar, artinya berat kedua benda itu bagaimana?"
            aliasSuara={["sama", "sama berat"]}
            petunjukSuara="Ucapkan sama berat."
          />
          <KuisTulisKartu
            id={idKuis("B", 1)}
            hanyaKanvas
            pertanyaan="Tas kiri turun, topi kanan naik. Tuliskan nama benda yang lebih ringan."
            alias={kumpulkanAlias(["topi"])}
            konteks="Nampan yang naik lebih ringan. Itu topi."
            visual={<Timbangan kiri="👜" kanan="🎩" sikap="kiri-turun" />}
          />
        </div>

        <JudulSubBab
          judul="Infografis 2: Mengukur Berat dengan Kelereng"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Semakin banyak jumlah kelereng yang dibutuhkan untuk menyeimbangkan suatu benda, berarti benda tersebut semakin berat!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <p className="text-sm font-black text-[#1C01A5]">Berat 1 benda = jumlah kelereng saat timbangan lurus</p>
          <p className="text-sm font-semibold text-slate-700">🍌 Pisang = 3 kelereng · 🥭 Mangga = 5 kelereng</p>
          <p className="text-sm font-semibold text-slate-700">Mangga lebih berat karena 5 lebih besar dari 3. Selisih 5 − 3 = 2.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            pertanyaanSuara="Pisang beratnya 3 kelereng, mangga beratnya 5 kelereng. Buah apakah yang lebih berat?"
            aliasSuara={["mangga"]}
            petunjukSuara="Ucapkan mangga."
          />
          <KuisTulisKartu
            id={idKuis("B", 3)}
            hanyaKanvas
            pertanyaan="Berapa selisih kelereng antara mangga 5 dan pisang 3? Tuliskan angkanya."
            alias={kumpulkanAlias(["2", "dua"])}
            konteks="5 kurang 3 sama dengan 2."
            visual={<p className="text-center text-lg font-black text-[#1C01A5]">5 − 3 = ?</p>}
          />
        </div>

        <JudulSubBab
          judul="Infografis 3: Membaca Jam dan Lama Kegiatan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Ingat rumus membaca jam bulat: lihat ke mana jarum pendek menunjuk saat jarum panjang ada di angka 12.",
            "Untuk kegiatan sehari-hari, bandingkan mana yang selesai dalam hitungan detik dan mana yang butuh waktu berjam-jam.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <p className="text-sm font-black text-[#1C01A5]">Jarum panjang di 12 + jarum pendek di X → pukul X tepat</p>
          <p className="text-sm font-semibold text-slate-700">⚡ Sebentar: minum air, memakai topi, mencuci tangan.</p>
          <p className="text-sm font-semibold text-slate-700">⏳ Lama: belajar di sekolah, tidur malam, memasak nasi.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 4)}
            pertanyaanSuara="Mencuci tangan dan belajar di sekolah, kegiatan manakah yang waktunya lebih sebentar?"
            aliasSuara={["cuci", "mencuci", "tangan"]}
            petunjukSuara="Ucapkan mencuci tangan."
          />
          <KuisTulisKartu
            id={idKuis("B", 5)}
            hanyaKanvas
            pertanyaan="Jarum panjang sudah di 12. Gambar jarum pendek ke angka 9, lalu tuliskan 9."
            alias={kumpulkanAlias(["9", "sembilan", "09.00"])}
            konteks="Pendek ke 9. Pukul 9 tepat."
            visual={<JamDinding jam={12} label="gambar ke 9" />}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan infografis</p>
        <div className="space-y-3">
          <KuisTambahKelereng />
          <KuisCocok
            id={idKuis("B", 7)}
            soal="Cocokkan jam dengan kegiatannya."
            baris={[
              { id: "enam", tampil: <JamDinding jam={6} label="jam" />, benar: "Sarapan" },
              { id: "dua-belas", tampil: <JamDinding jam={12} label="jam" />, benar: "Makan siang" },
              { id: "sembilan", tampil: <JamDinding jam={9} label="jam" />, benar: "Tidur malam" },
            ]}
            label={["Sarapan", "Makan siang", "Tidur malam"]}
            umpanBenar="06 sarapan, 12 makan siang, 09 tidur malam."
            pesanSalah="Lihat jarum pendeknya."
          />
          <KuisPilih
            id={idKuis("B", 8)}
            soal="Jika semangka lebih berat dari melon, dan melon lebih berat dari jeruk, buah mana yang paling berat?"
            benar="A"
            umpanBenar="Semangka paling berat."
            pesanSalah="Ikuti rantai: semangka > melon > jeruk."
            anak={<p className="text-center text-3xl">🍉 &gt; 🍈 &gt; 🍊</p>}
            pilihan={[
              { huruf: "A", teks: "Semangka" },
              { huruf: "B", teks: "Melon" },
              { huruf: "C", teks: "Jeruk" },
            ]}
          />
          <KuisSortirDurasi />
          <KuisPilih
            id={idKuis("B", 10)}
            soal="Tiga jam diklaim pukul 03.00. Ketuk jam yang BENAR."
            benar="B"
            umpanBenar="Benar! Pendek di 3, panjang di 12."
            pesanSalah="Cari jarum pendek di 3 dan jarum panjang di 12."
            anak={
              <div className="grid grid-cols-3 gap-2">
                <JamDinding jam={12} menit={3} label="A" />
                <JamDinding jam={3} label="B" />
                <JamDinding jam={9} label="C" />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Jam A, jarum terbalik" },
              { huruf: "B", teks: "Jam B, pendek di 3" },
              { huruf: "C", teks: "Jam C, pendek di 9" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚂⭐🏅
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Sepuluh misi · lencana masinis emas</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiKereta />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Pada timbangan, benda yang lebih berat turun ke bawah, benda yang lebih ringan naik ke atas, dan benda yang sama berat posisinya lurus sejajar.",
          "Berat benda dapat diukur dengan menghitung jumlah kelereng atau balok saat timbangan seimbang lurus.",
          "Saat jarum panjang di angka 12, lihat angka yang ditunjuk jarum pendek untuk mengetahui pukul berapa tepat.",
          "Bedakan kegiatan yang sebentar dan yang lama.",
        ]}
        penutup='Kalimat kunci: “Turun lebih berat. Lurus sama berat. Pendek menunjuk jam.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Tantangan Para Juara · Berat dan Waktu</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB6.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Turun lebih berat."
          alias={kumpulkanAlias(["turun", "lebih berat"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
