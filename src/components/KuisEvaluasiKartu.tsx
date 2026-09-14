"use client";

import { useState, type ReactNode } from "react";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";

export function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function idDari(modulId: string, indeks: number) {
  return idKuisKartuResmi(modulId, "D", indeks);
}

export function KuisPilihan({
  modulId,
  indeks,
  soal,
  opsi,
  benar,
}: {
  modulId: string;
  indeks: number;
  soal: string;
  opsi: { kode: string; teks: string }[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idDari(modulId, indeks);
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [pilih, setPilih] = useState("");
  const status = sudah || pilih === benar ? "benar" : pilih ? "salah" : null;

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {opsi.map((item) => (
          <button
            key={item.kode}
            type="button"
            onClick={() => {
              setPilih(item.kode);
              if (item.kode === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${
              pilih === item.kode || (sudah && item.kode === benar)
                ? item.kode === benar
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
                : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
            }`}
          >
            {item.kode}. {item.teks}
          </button>
        ))}
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-sm font-black text-emerald-700">BENAR</p>
      ) : status === "salah" ? (
        <p className="mt-2 text-sm font-black text-rose-600">
          Coba pilih jawaban yang lain.
        </p>
      ) : null}
    </article>
  );
}

export function KuisChip({
  modulId,
  indeks,
  judul,
  opsi,
  benar,
}: {
  modulId: string;
  indeks: number;
  judul: ReactNode;
  opsi: string[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idDari(modulId, indeks);
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [pilih, setPilih] = useState("");
  const status = sudah || pilih === benar ? "benar" : pilih ? "salah" : null;

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <div className="text-sm font-black text-[#1C01A5]">{judul}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {opsi.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setPilih(item);
              if (item === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${
              pilih === item || (sudah && item === benar)
                ? item === benar
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
                : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-sm font-black text-emerald-700">BENAR</p>
      ) : status === "salah" ? (
        <p className="mt-2 text-sm font-black text-rose-600">Coba jawaban lain.</p>
      ) : null}
    </article>
  );
}

export function KuisCocok({
  modulId,
  indeksAwal,
  kiriJudul,
  kananJudul,
  soal,
  jawaban,
}: {
  modulId: string;
  indeksAwal: number;
  kiriJudul: string;
  kananJudul: string;
  soal: { teks: string; benar: string }[];
  jawaban: string[];
}) {
  const kuis = useKuisMateri();
  const [pilihSoal, setPilihSoal] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<Record<number, string>>({});

  const hubungkan = (nilai: string) => {
    if (pilihSoal === null) return;
    const item = soal[pilihSoal];
    setPasangan((sebelum) => ({ ...sebelum, [pilihSoal]: nilai }));
    if (nilai === item.benar) {
      kuis?.tandaiBenar(idDari(modulId, indeksAwal + pilihSoal));
    }
    setPilihSoal(null);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          {kiriJudul}
        </p>
        {soal.map((item, indeks) => {
          const id = idDari(modulId, indeksAwal + indeks);
          const sudah = Boolean(kuis?.sudahBenar(id));
          const pilih = pasangan[indeks];
          const status =
            sudah || pilih === item.benar ? "benar" : pilih ? "salah" : null;
          return (
            <button
              key={item.teks}
              type="button"
              onClick={() => setPilihSoal(indeks)}
              className={`w-full rounded-xl border-2 px-3 py-3 text-left text-sm font-black ${
                pilihSoal === indeks
                  ? "border-[#F0AB00] bg-[#FFF8E8] text-[#1C01A5]"
                  : status === "benar"
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : status === "salah"
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
              }`}
            >
              <span>{item.teks}</span>
              <span className="float-right">
                {sudah || pilih === item.benar ? item.benar : "•"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          {kananJudul}
        </p>
        {jawaban.map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => hubungkan(nilai)}
            className="w-full rounded-xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] px-3 py-3 text-sm font-black text-[#1C01A5] hover:border-[#1C01A5]"
          >
            • {nilai}
          </button>
        ))}
      </div>
    </div>
  );
}

export function KunciGuru({
  butir,
}: {
  butir: string[];
}) {
  const [buka, setBuka] = useState(false);
  return (
    <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] p-4">
      <button
        type="button"
        onClick={() => setBuka((sebelum) => !sebelum)}
        className="text-sm font-black text-[#1C01A5]"
      >
        {buka
          ? "Sembunyikan kunci jawaban"
          : "Lihat kunci jawaban (guru & orang tua)"}
      </button>
      {buka ? (
        <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
          {butir.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
