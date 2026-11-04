"use client";

import { Coins } from "lucide-react";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { bacaProgres } from "@/lib/progres";
import { subbabBukuSiswa } from "@/lib/subbab-buku-siswa";

const TOKEN_SOAL_LATIHAN = 5;
const TOKEN_SOAL_EVALUASI = 10;
const MAKS_TOKEN_LATIHAN = 50;
const MAKS_TOKEN_EVALUASI = 100;
const HARGA_TOKEN_RP = 500;

type KonteksDompet = {
  judul: string;
  kepalaSendiri: boolean;
  setJudul: (judul: string) => void;
  setKepalaSendiri: (nilai: boolean) => void;
};

const Konteks = createContext<KonteksDompet | null>(null);

function samaTeks(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function sesiBabIni() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const kelas = params.get("kelas") ?? "";
  const mapel = params.get("mapel") ?? "";
  const materi = params.get("materi") ?? "";
  return (
    bacaProgres().sesi.find(
      (item) => samaTeks(item.kelas, kelas) && samaTeks(item.mapel, mapel) && samaTeks(item.materi, materi),
    ) ?? null
  );
}

function tokenLatihanBabIni() {
  if (typeof window === "undefined") return 0;
  const sesi = sesiBabIni();
  if (!sesi) return 0;
  const jawaban = bacaProgres().jawabanKuis[sesi.id] ?? {};
  let jumlah = 0;
  sesi.kunciJawaban.forEach((huruf, indeks) => {
    const kunci = huruf.trim().toUpperCase().replace(/[^ABCD]/g, "").charAt(0);
    const pilih = (jawaban[String(indeks + 1)] ?? "").trim().toUpperCase().charAt(0);
    if (kunci && pilih === kunci) jumlah += TOKEN_SOAL_LATIHAN;
  });
  return Math.min(MAKS_TOKEN_LATIHAN, jumlah);
}

function tokenEvaluasiBabIni() {
  const sesi = sesiBabIni();
  if (!sesi) return 0;
  const sudah = new Set(sesi.kuisMateriSelesai.filter((id) => /-D-[0-9]$/.test(id)));
  return Math.min(MAKS_TOKEN_EVALUASI, sudah.size * TOKEN_SOAL_EVALUASI);
}

export function useTokenBab() {
  const [versi, setVersi] = useState(0);
  useEffect(() => {
    const segar = () => setVersi((n) => n + 1);
    window.addEventListener("focus", segar);
    window.addEventListener("storage", segar);
    return () => {
      window.removeEventListener("focus", segar);
      window.removeEventListener("storage", segar);
    };
  }, []);
  void versi;
  return tokenLatihanBabIni() + tokenEvaluasiBabIni();
}

function judulBab(materi: string) {
  return materi.replace(/^bab\s*\d+\s*[:.\-–]\s*/i, "").trim() || materi;
}

function judulSubbab(item: string) {
  return item.replace(/^sub-bab\s+[a-z0-9]+\s*[:.\-–]\s*/i, "").replace(/^[a-z]\.\s+/i, "").trim();
}

export function judulAwalDompet(kelas: string, mapel: string, materi: string) {
  const pelajaran = subbabBukuSiswa(kelas, mapel, materi)
    .map(judulSubbab)
    .filter((item) => item && !/^(misi|poin penting|lembar evaluasi|review)\b/i.test(item));
  return pelajaran[0] || judulBab(materi);
}

export function PenyediaDompetMateri({
  judulAwal,
  children,
}: {
  judulAwal: string;
  children: ReactNode;
}) {
  const [judul, setJudul] = useState(judulAwal);
  const [kepalaSendiri, setKepalaSendiri] = useState(false);
  return (
    <Konteks.Provider value={{ judul, kepalaSendiri, setJudul, setKepalaSendiri }}>
      {children}
    </Konteks.Provider>
  );
}

export function useJudulDompetMateri(judul: string) {
  const setJudul = useContext(Konteks)?.setJudul;
  useLayoutEffect(() => {
    if (!setJudul || !judul) return;
    setJudul(judul);
  }, [setJudul, judul]);
}

export function useKepalaDompetSendiri() {
  const setKepalaSendiri = useContext(Konteks)?.setKepalaSendiri;
  useLayoutEffect(() => {
    if (!setKepalaSendiri) return;
    setKepalaSendiri(true);
    return () => setKepalaSendiri(false);
  }, [setKepalaSendiri]);
}

export function BalokDompet({ judul }: { judul: string }) {
  const token = useTokenBab();
  return (
    <div className="bg-[linear-gradient(115deg,#1C01A5_0%,#4c1d95_58%,#5b21b6_100%)] px-4 pb-4 pt-4">
      <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border-2 border-amber-400/80 bg-indigo-950/90 px-4 py-1.5 shadow-inner" aria-label={`Perolehan ${token} token`}>
        <Coins className="h-8 w-8 shrink-0 animate-bounce text-amber-400" aria-hidden />
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">
            Dompet Bab Ini (Maks 150)
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-black text-amber-400">{token} Token</span>
            <span className="text-xs font-bold text-emerald-400">
              (= Rp {(token * HARGA_TOKEN_RP).toLocaleString("id-ID")})
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">{judul}</p>
    </div>
  );
}

export function KepalaDompetMateri() {
  const ctx = useContext(Konteks);
  if (!ctx || ctx.kepalaSendiri || !ctx.judul.trim()) return null;
  return (
    <div className="relative -mx-4 mb-4 w-[calc(100%+2rem)] overflow-hidden">
      <BalokDompet judul={ctx.judul} />
    </div>
  );
}
