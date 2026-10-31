"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type LangkahQuest = {
  kode: string;
  bagian: string;
  judul: string;
  isi: ReactNode;
  kuis?: string[];
  golongan?: string;
  kelompok?: string;
};

function indeksUjung(langkah: LangkahQuest[], sudahBenar: (id: string) => boolean) {
  for (let i = 0; i < langkah.length; i += 1) {
    const kuis = langkah[i].kuis ?? [];
    if (kuis.some((id) => !sudahBenar(id))) return i;
  }
  return Math.max(0, langkah.length - 1);
}

function angkaAman(nilai: unknown) {
  const angka = typeof nilai === "number" ? nilai : Number(nilai);
  if (!Number.isInteger(angka) || angka < 0) return 0;
  return angka;
}

const URUTAN_GOLONGAN = ["Tujuan Pembelajaran", "Sub-bab", "Misi", "Poin Penting", "Evaluasi"];

function indeksAwal(langkah: LangkahQuest[], cocok: (item: LangkahQuest) => boolean) {
  return langkah.findIndex((item) => cocok(item));
}

function kelasTab(aktif: boolean, boleh: boolean) {
  if (aktif) return "bg-[#F0AB00] text-[#1C01A5] ring-2 ring-[#1C01A5]";
  if (boleh) return "bg-white text-[#1C01A5] ring-2 ring-[#1C01A5]";
  return "bg-slate-200 text-slate-400";
}

export function QuestLangkah({
  simpan,
  langkah,
  sudahBenar,
  slot,
}: {
  simpan: string;
  langkah: LangkahQuest[];
  sudahBenar: (id: string) => boolean;
  slot?: { id: string; padaKode: string };
}) {
  const akar = useRef<HTMLElement>(null);
  const sekali = useRef(false);
  const [siap, setSiap] = useState(false);
  const [indeks, setIndeks] = useState(0);
  const [puncak, setPuncak] = useState(0);
  const sekarang = langkah[indeks] ?? langkah[0];
  const kuis = sekarang?.kuis ?? [];
  const selesai = kuis.length === 0 || kuis.every((id) => sudahBenar(id));
  const adaGolongan = langkah.some((item) => item.golongan);
  const golonganAktif = sekarang?.golongan || sekarang?.bagian || "";
  const dalamGolongan = langkah
    .map((item, urut) => ({ item, urut }))
    .filter((entri) => (entri.item.golongan || entri.item.bagian) === golonganAktif);
  const kelompokUnik = dalamGolongan.reduce<string[]>((daftar, entri) => {
    const nama = entri.item.kelompok;
    if (nama && !daftar.includes(nama)) daftar.push(nama);
    return daftar;
  }, []);
  const halaman = sekarang?.kelompok
    ? dalamGolongan.filter((entri) => entri.item.kelompok === sekarang.kelompok)
    : dalamGolongan;
  const grup = adaGolongan ? halaman : dalamGolongan;
  const lokal = Math.max(0, grup.findIndex((entri) => entri.urut === indeks));

  useEffect(() => {
    if (sekali.current) return;
    sekali.current = true;
    try {
      const mentah = sessionStorage.getItem(simpan);
      if (mentah) {
        const data = JSON.parse(mentah) as { indeks?: number; puncak?: number };
        const ujung = indeksUjung(langkah, sudahBenar);
        const puncakAwal = Math.min(angkaAman(data.puncak), ujung, langkah.length - 1);
        const indeksAwal = Math.min(angkaAman(data.indeks), puncakAwal);
        setPuncak(puncakAwal);
        setIndeks(indeksAwal);
      }
    } catch {
      /* pos tetap di awal */
    }
    setSiap(true);
  }, [langkah, simpan, sudahBenar]);

  useEffect(() => {
    if (!siap) return;
    sessionStorage.setItem(simpan, JSON.stringify({ indeks, puncak }));
  }, [siap, simpan, indeks, puncak]);

  useEffect(() => {
    if (!siap) return;
    akar.current?.scrollIntoView({ block: "start" });
  }, [siap, indeks]);

  if (!sekarang) return null;

  const ke = (tujuan: number) => {
    if (tujuan < 0 || tujuan > puncak || tujuan >= langkah.length) return;
    setIndeks(tujuan);
  };

  const keGolongan = (nama: string) => {
    ke(indeksAwal(langkah, (item) => item.golongan === nama));
  };

  const keKelompok = (nama: string) => {
    ke(indeksAwal(langkah, (item) => item.golongan === golonganAktif && item.kelompok === nama));
  };

  const lanjut = () => {
    if (!selesai) return;
    const berikut = Math.min(langkah.length - 1, indeks + 1);
    setIndeks(berikut);
    setPuncak((lama) => Math.max(lama, berikut));
  };

  return (
    <section ref={akar} className="scroll-mt-24 space-y-4">
      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
            {adaGolongan ? golonganAktif : `Pos ${lokal + 1} dari ${grup.length}`}
          </p>
          <p className="text-xs font-bold text-slate-600">{adaGolongan ? sekarang.kelompok || sekarang.judul : sekarang.bagian}</p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[#1C01A5]"
            style={{ width: `${((indeks + 1) / langkah.length) * 100}%` }}
          />
        </div>
        {adaGolongan ? (
          <div role="tablist" aria-label="Jenis bagian" className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {URUTAN_GOLONGAN.filter((nama) => langkah.some((item) => item.golongan === nama)).map((nama) => {
              const awal = indeksAwal(langkah, (item) => item.golongan === nama);
              const boleh = awal >= 0 && awal <= puncak;
              const aktif = nama === golonganAktif;
              return (
                <button
                  key={nama}
                  type="button"
                  role="tab"
                  aria-selected={aktif}
                  disabled={!boleh}
                  onClick={() => {
                    if (!aktif) keGolongan(nama);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${kelasTab(aktif, boleh)}`}
                >
                  {nama}
                </button>
              );
            })}
          </div>
        ) : null}
        {adaGolongan && kelompokUnik.length > 1 ? (
          <div role="tablist" aria-label="Sub-bab" className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {kelompokUnik.map((nama) => {
              const awal = indeksAwal(langkah, (item) => item.golongan === golonganAktif && item.kelompok === nama);
              const boleh = awal >= 0 && awal <= puncak;
              const aktif = nama === sekarang.kelompok;
              return (
                <button
                  key={nama}
                  type="button"
                  role="tab"
                  aria-selected={aktif}
                  disabled={!boleh}
                  onClick={() => {
                    if (!aktif) keKelompok(nama);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${kelasTab(aktif, boleh)}`}
                >
                  {nama}
                </button>
              );
            })}
          </div>
        ) : null}
        <div role="tablist" aria-label="Halaman pos" className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {grup.map((entri) => {
            const aktif = entri.urut === indeks;
            const boleh = entri.urut <= puncak;
            return (
              <button
                key={entri.item.kode}
                type="button"
                role="tab"
                aria-selected={aktif}
                disabled={!boleh}
                title={entri.item.judul}
                aria-label={`${entri.item.golongan || entri.item.bagian}: ${entri.item.judul}`}
                onClick={() => ke(entri.urut)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${kelasTab(aktif, boleh)}`}
              >
                {adaGolongan ? entri.item.judul : entri.urut + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-base font-black text-[#1C01A5]">{sekarang.judul}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Langkah {indeks + 1} dari {langkah.length}
        </p>
      </div>
      <div key={sekarang.kode} className="space-y-3">
        {sekarang.isi}
      </div>
      {slot ? (
        <div id={slot.id} className={sekarang.kode === slot.padaKode ? "mt-3" : "hidden"} />
      ) : null}
      {kuis.length > 0 && selesai ? (
        <p className="text-sm font-bold text-emerald-800">Pos ini selesai. Lanjut kalau sudah siap.</p>
      ) : null}
      {kuis.length > 0 && !selesai ? (
        <p className="text-sm font-semibold text-slate-600">Selesaikan pos ini, lalu lanjut.</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={indeks === 0}
          onClick={() => ke(indeks - 1)}
          className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-[#1C01A5] disabled:opacity-40"
        >
          Kembali
        </button>
        {indeks < langkah.length - 1 ? (
          <button
            type="button"
            disabled={!selesai}
            onClick={lanjut}
            className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white disabled:opacity-40"
          >
            Lanjut
          </button>
        ) : (
          <p className="text-sm font-black text-emerald-800">Perjalanan dermaga selesai.</p>
        )}
      </div>
    </section>
  );
}
