"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type LangkahQuest = {
  kode: string;
  bagian: string;
  judul: string;
  isi: ReactNode;
  kuis?: string[];
  tab?: string;
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

function batasHalaman(langkah: LangkahQuest[], indeks: number) {
  const tab = langkah[indeks]?.tab;
  let awal = indeks;
  let akhir = indeks;
  if (!tab) return { awal, akhir };
  while (awal > 0 && langkah[awal - 1]?.tab === tab) awal -= 1;
  while (akhir < langkah.length - 1 && langkah[akhir + 1]?.tab === tab) akhir += 1;
  return { awal, akhir };
}

function kelasTab(aktif: boolean, boleh: boolean) {
  if (aktif) return "bg-white text-indigo-800 shadow-[0_3px_0_#F0AB00]";
  if (boleh) return "bg-white/12 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20";
  return "bg-white/5 text-white/35";
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
  const daftarTab = useRef<HTMLDivElement>(null);
  const sekali = useRef(false);
  const [siap, setSiap] = useState(false);
  const [indeks, setIndeks] = useState(0);
  const [puncak, setPuncak] = useState(0);
  const sekarang = langkah[indeks] ?? langkah[0];
  const { awal: awalHalaman, akhir: akhirHalaman } = batasHalaman(langkah, indeks);
  const halaman = langkah.slice(awalHalaman, akhirHalaman + 1);
  const kuis = halaman.flatMap((item) => item.kuis ?? []);
  const selesai = kuis.length === 0 || kuis.every((id) => sudahBenar(id));
  const utuh = Boolean(sekarang?.tab) && halaman.length > 1;
  const tabUnik = langkah.reduce<string[]>((daftar, item) => {
    if (item.tab && !daftar.includes(item.tab)) daftar.push(item.tab);
    return daftar;
  }, []);

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

  useEffect(() => {
    if (!siap) return;
    const wadah = daftarTab.current;
    const tombol = wadah?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    if (!wadah || !tombol) return;
    const kiri = tombol.getBoundingClientRect().left - wadah.getBoundingClientRect().left + wadah.scrollLeft - (wadah.clientWidth - tombol.offsetWidth) / 2;
    wadah.scrollTo({ left: Math.max(0, kiri), behavior: "smooth" });
  }, [siap, indeks]);

  if (!sekarang) return null;

  const ke = (tujuan: number) => {
    if (tujuan < 0 || tujuan > puncak || tujuan >= langkah.length) return;
    setIndeks(tujuan);
  };

  const lanjut = () => {
    if (!selesai || akhirHalaman >= langkah.length - 1) return;
    const berikut = akhirHalaman + 1;
    setIndeks(berikut);
    setPuncak((lama) => Math.max(lama, berikut));
  };

  return (
    <section ref={akar} className="scroll-mt-24 space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-800 via-indigo-600 to-violet-600 text-white shadow-[0_12px_28px_-14px_rgba(49,46,129,0.85)]">
        <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-[#F0AB00]/30 blur-2xl" />
        <div className="px-4 pb-4 pt-4">
          {(() => {
            const lencana = sekarang.tab || sekarang.bagian;
            const judulKepala = sekarang.kelompok || (utuh ? sekarang.tab : sekarang.judul);
            const beda = lencana.toLowerCase() !== (judulKepala || "").toLowerCase();
            return (
              <>
                {beda ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-amber-200 ring-1 ring-white/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F0AB00]" />
                    {lencana}
                  </p>
                ) : null}
                <p className={`text-2xl font-extrabold tracking-tight text-white ${beda ? "mt-2" : ""}`}>
                  {judulKepala}
                </p>
              </>
            );
          })()}
        </div>
        <div ref={daftarTab} role="tablist" aria-label="Bagian materi" className="flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain border-t border-white/15 px-3 py-2.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/40">
          {tabUnik.map((nama) => {
            const awal = langkah.findIndex((item) => item.tab === nama);
            const boleh = awal >= 0 && awal <= puncak;
            const aktif = sekarang.tab === nama;
            return (
              <button
                key={nama}
                type="button"
                role="tab"
                aria-selected={aktif}
                disabled={!boleh}
                onClick={() => {
                  if (!aktif) ke(awal);
                }}
                className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-black transition disabled:cursor-not-allowed ${kelasTab(aktif, boleh)}`}
              >
                {nama}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-8">
        {halaman.map((item) => (
          <div key={item.kode} className="space-y-3">
            {item.isi}
          </div>
        ))}
      </div>
      {slot ? (
        <div id={slot.id} className={halaman.some((item) => item.kode === slot.padaKode) ? "mt-3" : "hidden"} />
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
          disabled={awalHalaman === 0}
          onClick={() => ke(batasHalaman(langkah, awalHalaman - 1).awal)}
          className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-[#1C01A5] disabled:opacity-40"
        >
          Kembali
        </button>
        {akhirHalaman < langkah.length - 1 ? (
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
