"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import { useKuisMateri } from "@/components/KuisMateriContext";
import type { LangkahQuest } from "@/components/QuestLangkah";

const NAMA_HALAMAN = ["Cerita", "Infografis", "Pictorial", "Lambang"] as const;

export function JudulHalaman({ n }: { n: 1 | 2 | 3 | 4 }) {
  return <p className="text-lg font-black text-[#1C01A5]">Halaman {n} · {NAMA_HALAMAN[n - 1]}</p>;
}

export function empatHalaman(
  meta: { tab: string; kelompok: string },
  kode: string,
  halaman: { isi: ReactNode; kuis: string[] }[],
): LangkahQuest[] {
  return halaman.map((item, indeks) => ({
    kode: `${kode}-${indeks + 1}`,
    bagian: meta.tab,
    judul: meta.kelompok,
    halaman: String(indeks + 1),
    kuis: item.kuis,
    isi: item.isi,
    tab: meta.tab,
    kelompok: meta.kelompok,
  }));
}

export function SusunTiga({
  id,
  perintah,
  acak,
  benar,
  umpan,
}: {
  id: string;
  perintah: string;
  acak: string[];
  benar: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [urut, setUrut] = useState<string[]>([]);
  const sisa = acak.filter((item) => !urut.includes(item));
  const tepat = urut.length === benar.length && urut.every((item, indeks) => item === benar[indeks]);
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">{perintah}</p>
      <p className="mt-2 text-lg font-black text-[#1C01A5]">{urut.join(" · ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              const berikut = [...urut, item];
              setUrut(berikut);
              if (berikut.length === benar.length && berikut.every((nilai, indeks) => nilai === benar[indeks])) kuis?.tandaiBenar(id);
            }}
            className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
          >
            {item}
          </button>
        ))}
      </div>
      {urut.length === benar.length ? <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba urutan yang lain." /> : null}
      {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
      {urut.length > 0 && !tepat ? (
        <button type="button" onClick={() => setUrut([])} className="mt-3 text-sm font-black text-[#1C01A5]">Ulangi</button>
      ) : null}
    </article>
  );
}

export function BenarSalahTiga({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { teks: string; benar: boolean }[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<(boolean | null)[]>(() => baris.map(() => null));
  const lengkap = pilih.every((item) => item !== null);
  const tepat = lengkap && baris.every((item, indeks) => pilih[indeks] === item.benar);
  const pilihBaris = (indeks: number, nilai: boolean) => {
    const berikut = pilih.map((lama, urut) => (urut === indeks ? nilai : lama));
    setPilih(berikut);
    if (berikut.every((item) => item !== null) && baris.every((item, urut) => berikut[urut] === item.benar)) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-black text-amber-950">{perintah}</p>
      <div className="mt-3 space-y-2">
        {baris.map((item, indeks) => (
          <div key={item.teks} className="rounded-xl bg-white px-3 py-2">
            <p className="text-sm font-semibold text-slate-700">{item.teks}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((nilai) => (
                <button
                  key={String(nilai)}
                  type="button"
                  onClick={() => pilihBaris(indeks, nilai)}
                  className={`rounded-full px-3 py-1 text-sm font-black ${pilih[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-amber-100 text-[#1C01A5]"}`}
                >
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {lengkap ? <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Baca lagi satu per satu." /> : null}
      {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
    </article>
  );
}
