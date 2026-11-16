"use client";

import { useMemo, useRef, useState } from "react";
import { buatAcak } from "@/lib/modul-kedua/acak";
import type { CatatanButir, DataModul, PetaNode } from "@/lib/modul-kedua/tipe";
import type { HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";
import { useSeretan } from "./useSeretan";

/** Tahap M (Mind-Mapping): peta konsep interaktif. Jelajahi node, lalu "lengkapi peta" dengan menyeret label. */

const JUDUL_KELOMPOK: Record<PetaNode["jenis"], string> = {
  inti: "Konsep inti",
  prasyarat: "⬅ Yang sudah kamu tahu (prasyarat)",
  subkonsep: "Cabang konsep",
  lanjutan: "➡ Materi berikutnya",
  kehidupan: "🌏 Di kehidupan nyata",
};
const WARNA: Record<PetaNode["jenis"], string> = {
  inti: "border-indigo-900 bg-indigo-700 text-white",
  prasyarat: "border-sky-500 bg-sky-100 text-sky-950",
  subkonsep: "border-emerald-600 bg-emerald-100 text-emerald-950",
  lanjutan: "border-violet-500 bg-violet-100 text-violet-950",
  kehidupan: "border-orange-500 bg-orange-100 text-orange-950",
};
const URUTAN: PetaNode["jenis"][] = ["prasyarat", "inti", "subkonsep", "lanjutan", "kehidupan"];

const kini = () => performance.now();

export default function TahapPeta({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const { node, lengkapi } = data.peta;
  const [langkah, setLangkah] = useState<"jelajah" | "lengkapi">("jelajah");
  const [dibuka, setDibuka] = useState<string[]>([]);
  const [aktif, setAktif] = useState<string | null>(null);
  const [terpasang, setTerpasang] = useState<Record<string, string>>({});
  const [pilihan, setPilihan] = useState<string | null>(null);
  const [umpan, setUmpan] = useState("");
  const percobaan = useRef<Record<string, number>>({});
  const mulai = useRef(0);

  const bank = useMemo(() => buatAcak(benih).kocok(lengkapi), [benih, lengkapi]);
  const sisa = bank.filter((id) => !Object.values(terpasang).includes(id));
  const peta = (id: string) => node.find((n) => n.id === id)!;

  function coba(idLabel: string, idKotak: string) {
    if (terpasang[idKotak]) return;
    if (mulai.current === 0) mulai.current = kini();
    percobaan.current[idLabel] = (percobaan.current[idLabel] ?? 0) + 1;
    if (idLabel === idKotak) {
      const baru = { ...terpasang, [idKotak]: idLabel };
      setTerpasang(baru);
      setPilihan(null);
      setUmpan(`Tepat! ${peta(idLabel).penjelasan}`);
      if (Object.keys(baru).length === lengkapi.length) {
        const detik = Math.round((kini() - mulai.current) / 1000);
        const butir: CatatanButir[] = lengkapi.map((id) => ({
          idSoal: `peta-${id}`,
          gen: "peta-lengkapi",
          level: "Dasar",
          kognitif: "knowing",
          elemen: "membilang",
          benar: true,
          percobaan: Math.min(percobaan.current[id] ?? 1, 3),
          petunjuk: 0,
          detik: Math.round(detik / lengkapi.length),
        }));
        saatSelesai({ butir, detik });
      }
    } else {
      setUmpan(`Belum cocok. "${peta(idLabel).label}" termasuk ${JUDUL_KELOMPOK[peta(idLabel).jenis].replace(/^\S+ /, "").toLowerCase()}. Coba kotak yang lain.`);
    }
  }

  const { ikat, bayangan } = useSeretan({ saatLepas: coba, saatKetuk: (id) => setPilihan((p) => (p === id ? null : id)) });

  const kotak = (n: PetaNode) => {
    const kosong = langkah === "lengkapi" && lengkapi.includes(n.id) && !terpasang[n.id];
    if (kosong)
      return (
        <button
          key={n.id}
          type="button"
          data-target={n.id}
          onClick={() => pilihan && coba(pilihan, n.id)}
          className="min-h-14 rounded-2xl border-4 border-dashed border-rose-500 bg-rose-50 px-3 py-2 text-base font-black text-rose-600"
        >
          ❓ kotak kosong
        </button>
      );
    return (
      <button
        key={n.id}
        type="button"
        onClick={() => {
          setAktif(n.id);
          setDibuka((d) => (d.includes(n.id) ? d : [...d, n.id]));
        }}
        className={`min-h-14 rounded-2xl border-4 px-3 py-2 text-base font-black ${WARNA[n.jenis]} ${aktif === n.id ? "ring-4 ring-amber-400" : ""}`}
      >
        {n.label}
      </button>
    );
  };

  const nodeAktif = aktif ? peta(aktif) : null;

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-black text-indigo-950">M: Peta Konsep 🗺️</h2>
      <p className="text-base font-bold text-indigo-900">
        {langkah === "jelajah"
          ? "Ketuk kotak mana saja untuk membaca penjelasannya. Buka paling sedikit empat kotak."
          : "Ada kotak kosong. Seret label ke kotak yang tepat, atau ketuk label lalu ketuk kotaknya."}
      </p>

      <div className="space-y-3 rounded-3xl border-4 border-indigo-300 bg-white p-3">
        {URUTAN.map((j) => (
          <div key={j}>
            <p className="mb-1 text-xs font-black uppercase tracking-wide text-indigo-700">{JUDUL_KELOMPOK[j]}</p>
            <div className={`flex flex-wrap gap-2 ${j === "inti" ? "justify-center" : ""}`}>
              {node
                .filter((n) => n.jenis === j)
                .map((n) => kotak(n))}
            </div>
            {j !== "kehidupan" ? <p className="text-center text-xl text-indigo-400">⬇</p> : null}
          </div>
        ))}
      </div>

      {langkah === "jelajah" && nodeAktif ? (
        <div className="space-y-2 rounded-3xl border-4 border-amber-400 bg-amber-50 p-3">
          <p className="text-lg font-black text-indigo-950">{nodeAktif.label}</p>
          <p className="text-base font-bold text-indigo-900">{nodeAktif.penjelasan}</p>
          <p className="text-base font-bold text-emerald-800">Contoh: {nodeAktif.contoh}</p>
          <TombolSuara teks={`${nodeAktif.label}. ${nodeAktif.penjelasan} Contoh: ${nodeAktif.contoh}`} kecil />
        </div>
      ) : null}

      {langkah === "jelajah" ? (
        <button
          type="button"
          disabled={dibuka.length < 4}
          onClick={() => setLangkah("lengkapi")}
          className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white disabled:opacity-40"
        >
          {dibuka.length < 4 ? `Buka ${4 - dibuka.length} kotak lagi` : "Lengkapi peta ➜"}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 rounded-3xl border-4 border-rose-300 bg-rose-50 p-3">
            {sisa.length === 0 ? <span className="font-black text-emerald-800">Semua label sudah terpasang 🎉</span> : null}
            {sisa.map((id) => (
              <div
                key={id}
                {...ikat(id, peta(id).label)}
                className={`flex min-h-14 select-none items-center rounded-2xl border-4 px-3 py-2 text-base font-black ${pilihan === id ? "border-amber-500 bg-amber-200" : "border-indigo-900 bg-white"} text-indigo-950`}
              >
                {peta(id).label}
              </div>
            ))}
          </div>
          {umpan ? (
            <p role="status" className="rounded-2xl border-4 border-amber-300 bg-amber-50 p-3 text-base font-bold text-indigo-950">
              {umpan}
            </p>
          ) : null}
        </div>
      )}
      {bayangan}
    </section>
  );
}
