"use client";

import { Coins } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { bacaProgres } from "@/lib/progres";

const TOKEN_SOAL_LATIHAN = 5;
const TOKEN_SOAL_EVALUASI = 10;
const MAKS_TOKEN_LATIHAN = 50;
const MAKS_TOKEN_EVALUASI = 100;
const HARGA_TOKEN_RP = 500;

function samaTeks(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function tokenLatihanBabIni() {
  if (typeof window === "undefined") return 0;
  const params = new URLSearchParams(window.location.search);
  const kelas = params.get("kelas") ?? "";
  const mapel = params.get("mapel") ?? "";
  const materi = params.get("materi") ?? "";
  const data = bacaProgres();
  const sesi = data.sesi.find(
    (item) => samaTeks(item.kelas, kelas) && samaTeks(item.mapel, mapel) && samaTeks(item.materi, materi),
  );
  if (!sesi) return 0;
  const jawaban = data.jawabanKuis[sesi.id] ?? {};
  let jumlah = 0;
  sesi.kunciJawaban.forEach((huruf, indeks) => {
    const kunci = huruf.trim().toUpperCase().replace(/[^ABCD]/g, "").charAt(0);
    const pilih = (jawaban[String(indeks + 1)] ?? "").trim().toUpperCase().charAt(0);
    if (kunci && pilih === kunci) jumlah += TOKEN_SOAL_LATIHAN;
  });
  return Math.min(MAKS_TOKEN_LATIHAN, jumlah);
}

export type LangkahQuest = {
  kode: string;
  bagian: string;
  judul: string;
  isi: ReactNode;
  kuis?: string[];
  tab?: string;
  kelompok?: string;
  bebas?: boolean;
  halaman?: string;
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

function kunciHalaman(item?: LangkahQuest) {
  if (!item?.tab) return "";
  return item.halaman ? `${item.tab}::${item.halaman}` : item.tab;
}

function batasHalaman(langkah: LangkahQuest[], indeks: number) {
  const kunci = kunciHalaman(langkah[indeks]);
  let awal = indeks;
  let akhir = indeks;
  if (!kunci) return { awal, akhir };
  while (awal > 0 && kunciHalaman(langkah[awal - 1]) === kunci) awal -= 1;
  while (akhir < langkah.length - 1 && kunciHalaman(langkah[akhir + 1]) === kunci) akhir += 1;
  return { awal, akhir };
}

function kelasTab(aktif: boolean, boleh: boolean) {
  if (aktif) return "bg-[#1C01A5] text-white shadow-[0_3px_0_#F0AB00]";
  if (boleh) return "bg-white/70 text-indigo-700 ring-1 ring-inset ring-indigo-200/80 hover:bg-white";
  return "bg-white/75 text-indigo-500";
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
  const [tokenLatihan, setTokenLatihan] = useState(0);
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
        const indeksMentah = Math.min(angkaAman(data.indeks), langkah.length - 1);
        const indeksAwal = langkah[indeksMentah]?.bebas ? indeksMentah : Math.min(indeksMentah, puncakAwal);
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
    const segarkan = () => setTokenLatihan(tokenLatihanBabIni());
    segarkan();
    window.addEventListener("focus", segarkan);
    window.addEventListener("storage", segarkan);
    return () => {
      window.removeEventListener("focus", segarkan);
      window.removeEventListener("storage", segarkan);
    };
  }, []);

  useEffect(() => {
    if (!siap) return;
    const wadah = daftarTab.current;
    const tombol = wadah?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    if (!wadah || !tombol) return;
    const kiri = tombol.getBoundingClientRect().left - wadah.getBoundingClientRect().left + wadah.scrollLeft - (wadah.clientWidth - tombol.offsetWidth) / 2;
    wadah.scrollTo({ left: Math.max(0, kiri), behavior: "smooth" });
  }, [siap, indeks]);

  if (!sekarang) return null;

  const tokenEvaluasi = Math.min(
    MAKS_TOKEN_EVALUASI,
    langkah.reduce((jumlah, item) => {
      if (item.bagian !== "Evaluasi") return jumlah;
      const kuisItem = item.kuis ?? [];
      if (kuisItem.length === 0 || kuisItem.some((id) => !sudahBenar(id))) return jumlah;
      return jumlah + TOKEN_SOAL_EVALUASI;
    }, 0),
  );
  const perolehanToken = tokenLatihan + tokenEvaluasi;

  const ke = (tujuan: number) => {
    if (tujuan < 0 || tujuan >= langkah.length) return;
    if (!langkah[tujuan]?.bebas && tujuan > puncak) return;
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
      <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden rounded-none bg-gradient-to-br from-[#eef2ff] via-[#ece8ff] to-[#f7f3ff] text-[#1C01A5] shadow-[0_10px_24px_-18px_rgba(67,56,202,0.55)]">
        <div className="bg-[linear-gradient(115deg,#1C01A5_0%,#4c1d95_58%,#5b21b6_100%)] px-4 pb-4 pt-4">
          <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border-2 border-amber-400/80 bg-indigo-950/90 px-4 py-1.5 shadow-inner" aria-label={`Perolehan ${perolehanToken} token`}>
            <Coins className="h-8 w-8 shrink-0 animate-bounce text-amber-400" aria-hidden />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                Dompet Bab Ini (Maks 150)
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-black text-amber-400">{perolehanToken} Token</span>
                <span className="text-xs font-bold text-emerald-400">
                  (= Rp {(perolehanToken * HARGA_TOKEN_RP).toLocaleString("id-ID")})
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">
            {sekarang.kelompok || (utuh ? sekarang.tab : sekarang.judul)}
          </p>
        </div>
        <div ref={daftarTab} role="tablist" aria-label="Bagian materi" className="flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain border-t border-indigo-100 px-3 py-2.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-300/70">
          {tabUnik.map((nama) => {
            const awal = langkah.findIndex((item) => item.tab === nama);
            const boleh = awal >= 0 && (langkah[awal]?.bebas || awal <= puncak);
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
