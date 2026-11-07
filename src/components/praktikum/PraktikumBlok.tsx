"use client";

import Link from "next/link";
import { useState } from "react";
import dataBlok from "@/data/praktikum-blok.json";
import {
  catatPraktikumTerkirim,
  useUjianLulus,
  usePraktikumTerkirim,
} from "@/lib/praktikum-blok";

type Langkah = {
  step_id: string;
  chapter_id: string;
  label: string;
  question: string;
  visual: { emoji: string; count: number };
  options: string[];
};

type Blok = {
  blok_id: string;
  phase_code: string;
  grade: number;
  subject: string;
  title: string;
  points_reward: number;
  chapters: { chapter_id: string; number: number; title: string; href: string }[];
  practicum_task: {
    title: string;
    scenario: string;
    steps: Langkah[];
    question_prompt: string;
    min_words: number;
  };
};

const SEMUA_BLOK = dataBlok.bloks as Blok[];

const KRITERIA = [
  { nama: "Akurasi", persen: 30 },
  { nama: "Sintesis", persen: 25 },
  { nama: "Kemandirian", persen: 20 },
  { nama: "Penalaran", persen: 25 },
];

function bacakan(teks: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(teks);
  u.lang = "id-ID";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function hitungKata(teks: string): number {
  return teks.trim().split(/\s+/).filter(Boolean).length;
}

export default function PraktikumBlok({ blokId }: { blokId: string }) {
  const blok = SEMUA_BLOK.find((b) => b.blok_id === blokId);
  const lulus = useUjianLulus();
  const terkirim = usePraktikumTerkirim(blokId);
  const [jawabanLangkah, setJawabanLangkah] = useState<Record<string, string>>({});
  const [penjelasan, setPenjelasan] = useState("");

  if (!blok) {
    return (
      <main className="mx-auto max-w-3xl p-6 text-indigo-950">
        <p className="font-bold">Praktikum untuk blok ini belum tersedia.</p>
      </main>
    );
  }

  const tugas = blok.practicum_task;
  const siapDibaca = lulus !== null && terkirim !== null;
  const babLulus = new Set(lulus ?? []);
  const jumlahLulus = blok.chapters.filter((b) => babLulus.has(b.chapter_id)).length;
  const terbuka = jumlahLulus === blok.chapters.length;
  const kata = hitungKata(penjelasan);
  const semuaTerjawab = tugas.steps.every((s) => Boolean(jawabanLangkah[s.step_id]));
  const siapKirim = semuaTerjawab && kata >= tugas.min_words;

  const kirim = () => {
    if (!siapKirim) return;
    catatPraktikumTerkirim(blok.blok_id, { jawabanLangkah, penjelasan });
  };

  return (
    <main className="min-h-screen bg-indigo-50/40 pb-16">
      <header className="bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
            {blok.subject} · Kelas {blok.grade} · {blok.phase_code.replace("_", " ")}
          </p>
          <h1 className="mt-2 text-2xl font-black md:text-3xl">{blok.title}</h1>
          <p className="mt-2 text-sm text-indigo-100">
            Satu tugas untuk empat bab sekaligus. Terbit sekali per blok.
          </p>
          <span className="mt-4 inline-block rounded-full bg-amber-400 px-4 py-1.5 text-sm font-black text-indigo-950">
            ⭐ {blok.points_reward} Poin Kualifikasi
          </span>
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-3xl space-y-5 px-4">
        <section className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-indigo-950">Syarat: lulus Ujian 100% di 4 bab</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {blok.chapters.map((b) => {
              const sudah = babLulus.has(b.chapter_id);
              return (
                <li key={b.chapter_id}>
                  <Link
                    href={b.href}
                    className={`igil-tombol flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-sm font-bold ${
                      sudah
                        ? "border-amber-400 bg-amber-50 text-indigo-950"
                        : "border-indigo-100 bg-white text-indigo-950"
                    }`}
                  >
                    <span aria-hidden className="text-lg">{sudah ? "✅" : "🔒"}</span>
                    <span>
                      Bab {b.number}: {b.title}
                      <span className="block text-xs font-semibold text-indigo-700">
                        {sudah ? "Ujian lulus 100%" : "Belum lulus Ujian 100%"}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs font-semibold text-indigo-700">
            Terbuka {siapDibaca ? jumlahLulus : 0} dari {blok.chapters.length} bab.
          </p>
        </section>

        {!siapDibaca ? null : terkirim ? (
          <section className="rounded-3xl border-2 border-amber-400 bg-white p-6 text-center shadow-sm">
            <p className="text-4xl" aria-hidden>📬</p>
            <h2 className="mt-2 text-xl font-black text-indigo-950">Praktikum sudah diserahkan</h2>
            <p className="mt-2 text-sm text-indigo-900">
              Penilaian berjalan satu kali dan nilainya tersembunyi sampai pengumuman akhir bulan.
              Praktikum blok ini tidak bisa dikirim ulang.
            </p>
            <p className="mt-3 text-xs font-semibold text-indigo-700">
              Dikirim {new Date(terkirim.dikirimPada).toLocaleString("id-ID")}
            </p>
          </section>
        ) : !terbuka ? (
          <section className="rounded-3xl border-2 border-dashed border-indigo-200 bg-white p-6 text-center">
            <p className="text-4xl" aria-hidden>🔒</p>
            <h2 className="mt-2 text-lg font-black text-indigo-950">Praktikum masih terkunci</h2>
            <p className="mt-1 text-sm text-indigo-900">
              Lulus Ujian 100% di semua bab di atas, lalu halaman ini terbuka.
            </p>
          </section>
        ) : (
          <>
            <section className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-black text-indigo-950">{tugas.title}</h2>
                <button
                  type="button"
                  onClick={() => bacakan(tugas.scenario)}
                  className="shrink-0 rounded-xl border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-950"
                >
                  🔊 Bacakan
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-indigo-950">{tugas.scenario}</p>
            </section>

            {tugas.steps.map((s, i) => (
              <section key={s.step_id} className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-indigo-700">
                  Langkah {i + 1} · {s.label}
                </p>
                <p className="mt-1 text-base font-bold text-indigo-950">{s.question}</p>
                <p className="mt-2 flex flex-wrap gap-1 text-3xl" aria-hidden>
                  {Array.from({ length: s.visual.count }, (_, k) => (
                    <span key={k}>{s.visual.emoji}</span>
                  ))}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {s.options.map((o) => {
                    const dipilih = jawabanLangkah[s.step_id] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setJawabanLangkah((p) => ({ ...p, [s.step_id]: o }))}
                        aria-pressed={dipilih}
                        className={`rounded-2xl px-3 py-3 text-base font-black ${
                          dipilih
                            ? "border-amber-400 bg-amber-400 text-indigo-950"
                            : "border-indigo-100 bg-white text-indigo-950"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-indigo-700">
                Langkah {tugas.steps.length + 1} · Menjelaskan
              </p>
              <p className="mt-1 text-base font-bold text-indigo-950">{tugas.question_prompt}</p>
              <textarea
                value={penjelasan}
                onChange={(e) => setPenjelasan(e.target.value)}
                rows={5}
                className="mt-3 w-full rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-sm text-indigo-950 outline-none focus:border-amber-400"
                placeholder="Tulis ceritamu di sini."
              />
              <p className="mt-1 text-xs font-semibold text-indigo-700">
                {kata} kata · minimal {tugas.min_words} kata
              </p>
            </section>

            <section className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-black text-indigo-950">Cara penilaian (tersembunyi sampai akhir bulan)</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {KRITERIA.map((k) => (
                  <li key={k.nama} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-950">
                    {k.nama} {k.persen}%
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={!siapKirim}
                onClick={kirim}
                className="mt-4 w-full rounded-2xl border-amber-400 bg-amber-400 py-3.5 text-base font-black text-indigo-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                🚀 Serahkan Praktikum
              </button>
              {!siapKirim ? (
                <p className="mt-2 text-center text-xs font-semibold text-indigo-700">
                  Jawab semua langkah dan tulis penjelasanmu dulu.
                </p>
              ) : null}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
