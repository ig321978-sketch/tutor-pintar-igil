"use client";

import { BookOpen, School } from "lucide-react";
import DaftarLengkapMateri from "@/components/DaftarLengkapMateri";
import { adaHurufArab } from "@/lib/huruf-arab";
import {
  tampilkanBarisWebsite,
  type BarisInfografis,
  type NaskahInfografis,
  type SisiInfografis,
} from "@/lib/infografis-kelas1";

const WARNA = [
  { kepala: "bg-[#1D4ED8]", tepi: "border-[#1D4ED8]", arti: "bg-[#DBEAFE]" },
  { kepala: "bg-[#15803D]", tepi: "border-[#15803D]", arti: "bg-[#DCFCE7]" },
  { kepala: "bg-[#7C3AED]", tepi: "border-[#7C3AED]", arti: "bg-[#EDE9FE]" },
  { kepala: "bg-[#C2410C]", tepi: "border-[#C2410C]", arti: "bg-[#FFEDD5]" },
  { kepala: "bg-[#0F766E]", tepi: "border-[#0F766E]", arti: "bg-[#CCFBF1]" },
  { kepala: "bg-[#B91C1C]", tepi: "border-[#B91C1C]", arti: "bg-[#FEE2E2]" },
  { kepala: "bg-[#D97706]", tepi: "border-[#D97706]", arti: "bg-[#FEF3C7]" },
  { kepala: "bg-[#1C01A5]", tepi: "border-[#1C01A5]", arti: "bg-[#EEE9FF]" },
];

function KotakSisi({
  sisi,
  warna,
}: {
  sisi: SisiInfografis;
  warna: (typeof WARNA)[number];
}) {
  return (
    <div className={`min-w-0 flex-1 rounded-2xl border-2 bg-white ${warna.tepi}`}>
      <p
        className={`px-3 py-2 text-center text-sm font-black tracking-wide text-white sm:text-base ${warna.kepala} ${adaHurufArab(sisi.nama) ? "font-arab" : "uppercase"}`}
        dir={adaHurufArab(sisi.nama) ? "rtl" : undefined}
        lang={adaHurufArab(sisi.nama) ? "ar" : undefined}
      >
        {sisi.nama || "Kotak"}
      </p>
      {sisi.artinya ? (
        <p className={`px-3 py-1.5 text-center text-xs font-extrabold text-slate-800 ${warna.arti}`}>
          Artinya: {sisi.artinya}
        </p>
      ) : null}
      {sisi.isi ? (
        <p
          className={`px-3 py-3 text-center font-bold leading-snug text-slate-800 ${
            adaHurufArab(sisi.isi)
              ? "font-arab text-4xl sm:text-5xl"
              : "text-base"
          }`}
          dir={adaHurufArab(sisi.isi) ? "rtl" : undefined}
          lang={adaHurufArab(sisi.isi) ? "ar" : undefined}
        >
          {sisi.isi}
        </p>
      ) : null}
    </div>
  );
}

export function BarisPoster({ item, indeks }: { item: BarisInfografis; indeks: number }) {
  const kiri = WARNA[indeks % WARNA.length];
  const kanan = WARNA[(indeks + 1) % WARNA.length];
  const tengah = WARNA[(indeks + 2) % WARNA.length];

  return (
    <div className="min-w-0 space-y-2">
      {item.judul ? (
        <p
          className={`text-sm font-black tracking-wide text-[#1C01A5] ${adaHurufArab(item.judul) ? "font-arab" : "uppercase"}`}
        >
          {item.judul}
        </p>
      ) : null}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <KotakSisi sisi={item.kiri} warna={kiri} />
        {item.tengah ? (
          <>
            <p className="text-center text-xl font-black text-[#1C01A5] sm:px-1">↔</p>
            <KotakSisi sisi={item.tengah} warna={tengah} />
          </>
        ) : null}
        {item.kanan ? (
          <>
            <p className="text-center text-xl font-black text-[#1C01A5] sm:px-1">↔</p>
            <KotakSisi sisi={item.kanan} warna={kanan} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function InfografisKelas1({ data }: { data: NaskahInfografis }) {
  return (
    <div className="space-y-5">
    <section className="rounded-[2rem] border-4 border-[#1C01A5]/20 bg-[#FBF6EA] px-3 py-5 shadow-inner sm:px-5 sm:py-7">
      <header className="mb-6 flex items-center justify-center gap-3 text-center">
        <BookOpen className="hidden h-8 w-8 shrink-0 text-[#F0AB00] sm:block" />
        <h3
          className={`text-xl font-black leading-tight tracking-wide text-[#1C01A5] sm:text-2xl ${adaHurufArab(data.judul) ? "font-arab" : "uppercase"}`}
        >
          {data.judul}
        </h3>
        <School className="hidden h-8 w-8 shrink-0 text-[#1C01A5] sm:block" />
      </header>
      <div className="space-y-5">
        {data.baris.filter(tampilkanBarisWebsite).map((item, indeks) => (
          <BarisPoster key={`${item.nomor}-${item.judul}`} item={item} indeks={indeks} />
        ))}
      </div>
    </section>
    {data.lengkap?.length ? <DaftarLengkapMateri data={data.lengkap} /> : null}
    </div>
  );
}
