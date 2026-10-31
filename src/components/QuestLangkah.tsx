"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type LangkahQuest = {
  kode: string;
  bagian: string;
  judul: string;
  isi: ReactNode;
  kuis?: string[];
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
  const grup = langkah
    .map((item, urut) => ({ item, urut }))
    .filter((entri) => entri.item.bagian === sekarang?.bagian);
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
            Pos {lokal + 1} dari {grup.length}
          </p>
          <p className="text-xs font-bold text-slate-600">{sekarang.bagian}</p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[#1C01A5]"
            style={{ width: `${((indeks + 1) / langkah.length) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {grup.map((entri, urutLokal) => {
            const aktif = entri.urut === indeks;
            const boleh = entri.urut <= puncak;
            return (
              <button
                key={entri.item.kode}
                type="button"
                disabled={!boleh}
                title={entri.item.judul}
                aria-label={`${entri.item.bagian}, pos ${urutLokal + 1}: ${entri.item.judul}`}
                onClick={() => ke(entri.urut)}
                className={`h-9 min-w-9 shrink-0 rounded-full px-2 text-xs font-black ${
                  aktif
                    ? "bg-[#F0AB00] text-[#1C01A5] ring-2 ring-[#1C01A5]"
                    : boleh
                      ? "bg-[#1C01A5] text-white"
                      : "bg-slate-200 text-slate-400"
                }`}
              >
                {urutLokal + 1}
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
