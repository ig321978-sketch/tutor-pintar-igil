"use client";

import React, { useState, useEffect } from "react";
import chapterData from "@/data/kelas1-bab1.json";

type ActiveTab =
  | "silabus"
  | "materi"
  | "simulasi"
  | "latihan"
  | "ujian"
  | "praktikum";

export default function IgilModulePlayer() {
  // Navigasi 6 Komponen Resmi Modul IGIL
  const [activeTab, setActiveTab] = useState<ActiveTab>("silabus");

  // ================= STATE 2: MATERI =================
  const [materiIndex, setMateriIndex] = useState(0);
  const currentMateri = chapterData.materi_pages[materiIndex];
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ================= STATE 3: SIMULASI =================
  const [simIndex, setSimIndex] = useState(0);
  const currentSim = chapterData.simulasi_missions[simIndex];
  const [frames, setFrames] = useState<boolean[]>(Array(10).fill(false));
  const [userPart, setUserPart] = useState<number>(0);
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);

  // ================= STATE 4: LATIHAN (30 TOKEN) =================
  const [practiceAnswers, setPracticeAnswers] = useState<{
    [key: number]: number;
  }>({});

  // ================= STATE 5: UJIAN 100% (70 TOKEN) =================
  const [examAnswers, setExamAnswers] = useState<{ [key: number]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // ================= STATE 6: PRAKTIKUM (50 TOKEN) =================
  const [practicumApel, setPracticumApel] = useState<number>(6);
  const [practicumPisang, setPracticumPisang] = useState<number>(4);
  const [practicumReason, setPracticumReason] = useState<string>("");
  const [practicumSubmitted, setPracticumSubmitted] = useState(false);

  // Reset alat peraga setiap kali pindah misi Simulasi
  useEffect(() => {
    if (!currentSim) return;
    if (currentSim.mode === "ten_frame") {
      setFrames(
        Array(10)
          .fill(false)
          .map((_, idx) => idx < (currentSim.initial_count || 0))
      );
    } else if (currentSim.mode === "number_bond") {
      setUserPart(0);
    } else if (currentSim.mode === "comparison") {
      setSelectedRelation(null);
    }
  }, [simIndex, currentSim]);

  // Hentikan suara saat pindah halaman Materi atau pindah Tab
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [materiIndex, activeTab]);

  // Fungsi Suara Guru Bahasa Indonesia di Tab Materi
  const speakMateri = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const fullText = `${currentMateri.title}. ${
      currentMateri.story_text
    }. Penjelasan konsep: ${currentMateri.concept_explanation.join(
      " "
    )}. Rumus kunci: ${currentMateri.key_formula}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "id-ID";
    utterance.rate = 0.92;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Cek penyelesaian misi di Tab Simulasi
  const activeCount = frames.filter(Boolean).length;
  const isSimMissionComplete =
    (currentSim.mode === "ten_frame" &&
      activeCount === currentSim.target_count) ||
    (currentSim.mode === "number_bond" &&
      userPart === currentSim.target_missing_part) ||
    (currentSim.mode === "comparison" &&
      selectedRelation === currentSim.correct_relation);

  // Cek apakah semua soal Latihan sudah benar
  const allPracticeCorrect = chapterData.practice_questions.every(
    (q) => practiceAnswers[q.id] === q.correct_index
  );

  // Penilaian Ujian 100%
  const handleExamSubmit = () => {
    let correct = 0;
    chapterData.exam_questions.forEach((q) => {
      if (examAnswers[q.id] === q.correct_index) correct++;
    });
    const pct = Math.round(
      (correct / chapterData.exam_questions.length) * 100
    );
    setExamScore(pct);
    setExamSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* ================= HEADER & 6 TAB KOMPONEN UTAMA IGIL ================= */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {chapterData.subject}
              </span>
              <h1 className="text-xl font-black text-slate-900 mt-1">
                {chapterData.title}
              </h1>
            </div>
            <div className="text-xs font-bold bg-slate-100 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200">
              Tiket Kualifikasi Bab: <b>30 Latihan</b> + <b>70 Ujian</b> +{" "}
              <b>50 Praktikum</b> = <b>150 Token</b>
            </div>
          </div>

          {/* BARIS 6 KOMPONEN: SILABUS | MATERI | SIMULASI | LATIHAN | UJIAN | PRAKTIKUM */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveTab("silabus")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "silabus"
                  ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              🗺️ 1. Silabus
            </button>

            <button
              onClick={() => setActiveTab("materi")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "materi"
                  ? "bg-indigo-600 text-white shadow-md scale-[1.02]"
                  : "bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200"
              }`}
            >
              📖 2. Materi
            </button>

            <button
              onClick={() => setActiveTab("simulasi")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "simulasi"
                  ? "bg-sky-600 text-white shadow-md scale-[1.02]"
                  : "bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200"
              }`}
            >
              🕹️ 3. Simulasi
            </button>

            <button
              onClick={() => setActiveTab("latihan")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "latihan"
                  ? "bg-amber-500 text-slate-950 shadow-md scale-[1.02]"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300"
              }`}
            >
              🎯 4. Latihan (30) {allPracticeCorrect && "✅"}
            </button>

            <button
              onClick={() => setActiveTab("ujian")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "ujian"
                  ? "bg-emerald-600 text-white shadow-md scale-[1.02]"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300"
              }`}
            >
              🛡️ 5. Ujian (70) {examScore === 100 && "🌟"}
            </button>

            <button
              onClick={() => setActiveTab("praktikum")}
              className={`px-3 py-2.5 rounded-xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "praktikum"
                  ? "bg-purple-600 text-white shadow-md scale-[1.02]"
                  : "bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300"
              }`}
            >
              🏆 6. Praktikum (50) {examScore < 100 && "🔒"}
            </button>
          </nav>
        </div>
      </header>

      {/* ======================================================================= */}
      {/* KOMPONEN 1: SILABUS (PETA KURIKULUM MERDEKA & ALUR 24 HALAMAN SMICPA)   */}
      {/* ======================================================================= */}
      {activeTab === "silabus" && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase bg-slate-900 text-white px-3 py-1 rounded-full">
                  🗺️ Komponen 1 dari 6: Silabus Resmi
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  Peta Kurikulum & Capaian Pembelajaran Bab 1
                </h2>
              </div>
              <div className="text-right text-xs font-bold text-slate-500">
                <p>{chapterData.silabus.fase}</p>
                <p className="text-indigo-600">{chapterData.silabus.elemen}</p>
              </div>
            </div>

            {/* Capaian Pembelajaran (CP) */}
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-2xl">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 mb-1">
                📌 Capaian Pembelajaran (CP) Kurikulum Merdeka:
              </h3>
              <p className="text-sm md:text-base font-medium text-slate-800 leading-relaxed">
                {chapterData.silabus.capaian_pembelajaran}
              </p>
            </div>

            {/* Tujuan Pembelajaran (TP) */}
            <div>
              <h3 className="text-sm font-extrabold uppercase text-slate-700 mb-3">
                🎯 Tujuan Pembelajaran (TP) yang Wajib Dikuasai Siswa:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chapterData.silabus.tujuan_pembelajaran.map((tp, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3"
                  >
                    <span className="bg-indigo-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800">{tp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Peta Arsitektur 24 Halaman SMICPA */}
            <div>
              <h3 className="text-sm font-extrabold uppercase text-slate-700 mb-3">
                📐 Peta Distribusi 24 Halaman Metode SMICPA:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {chapterData.silabus.peta_24_halaman_smicpa.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-slate-200 rounded-2xl p-4 hover:border-indigo-400 transition-all"
                  >
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      {item.rentang}
                    </span>
                    <p className="font-black text-slate-900 mt-2 text-sm">
                      {item.tahap}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveTab("materi")}
                className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md"
              >
                📖 Mulai Pelajari Materi (Komponen 2) →
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ======================================================================= */}
      {/* KOMPONEN 2: MATERI (PENJELASAN GURU, CERITA & PAPAN ILUSTRASI KONSEP)   */}
      {/* ======================================================================= */}
      {activeTab === "materi" && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Kiri: Penjelasan Guru & Rumus Kunci */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-indigo-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    📖 Komponen 2: Materi [{currentMateri.smicpa_code}]
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Bagian {materiIndex + 1} / {chapterData.materi_pages.length}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-black text-slate-900">
                    {currentMateri.title}
                  </h2>
                  <button
                    onClick={speakMateri}
                    className={`shrink-0 px-4 py-2 rounded-2xl font-bold text-xs shadow-sm ${
                      isSpeaking
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    🔊 {isSpeaking ? "Membacakan..." : "Suara Guru"}
                  </button>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-xs font-extrabold uppercase text-amber-800 mb-1">
                    Cerita Kontekstual:
                  </p>
                  <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                    {currentMateri.story_text}
                  </p>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                  <p className="text-xs font-extrabold uppercase text-sky-900 mb-2">
                    💡 Penjelasan Konsep Guru:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm font-medium text-slate-800">
                    {currentMateri.concept_explanation.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-indigo-950 text-white rounded-2xl p-4 text-center">
                <p className="text-xs uppercase font-bold text-indigo-300">
                  🔑 Intisari / Rumus Kunci:
                </p>
                <p className="text-base font-black text-amber-300 mt-1">
                  {currentMateri.key_formula}
                </p>
              </div>
            </section>

            {/* Kanan: Papan Ilustrasi Visual Materi */}
            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-lg flex flex-col justify-between">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  🖼️ Papan Visualisasi Materi SMICPA
                </span>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                  {currentMateri.smicpa_stage}
                </span>
              </div>

              <div className="my-auto py-8 text-center space-y-6">
                <h3 className="text-lg font-extrabold text-amber-300">
                  {currentMateri.visual_board.title}
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-3 bg-white/10 p-6 rounded-3xl border border-white/15">
                  {currentMateri.visual_board.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 rounded-2xl bg-white text-slate-900 font-black text-xl shadow-md"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-sm text-indigo-100 max-w-md mx-auto leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                  {currentMateri.visual_board.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setMateriIndex(Math.max(0, materiIndex - 1))}
                  disabled={materiIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold"
                >
                  ← Materi Sebelumnya
                </button>

                {materiIndex < chapterData.materi_pages.length - 1 ? (
                  <button
                    onClick={() => setMateriIndex(materiIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-xs font-black"
                  >
                    Materi Berikutnya →
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab("simulasi")}
                    className="px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 text-xs font-black shadow-md"
                  >
                    🕹️ Lanjut ke Simulasi Interaktif (Komponen 3) →
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>
      )}

      {/* ======================================================================= */}
      {/* KOMPONEN 3: SIMULASI (LABORATORIUM ALAT PERAGA INTERAKTIF MANDIRI)      */}
      {/* ======================================================================= */}
      {activeTab === "simulasi" && (
        <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
          <div className="bg-gradient-to-br from-sky-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase bg-sky-400 text-slate-950 px-3 py-1 rounded-full">
                  🕹️ Komponen 3 dari 6: Laboratorium Simulasi Interaktif
                </span>
                <h2 className="text-2xl font-black mt-2">{currentSim.title}</h2>
              </div>
              <div className="flex gap-2">
                {chapterData.simulasi_missions.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSimIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                      simIndex === idx
                        ? "bg-amber-400 text-slate-950"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Simulasi #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Instruksi Misi Simulasi */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-sky-300">
                Tantangan Eksperimen Siswa:
              </p>
              <p className="text-base md:text-lg font-bold mt-1">
                {currentSim.instruction}
              </p>
            </div>

            {/* AREA INTERAKTIF SIMULASI */}
            {currentSim.mode === "ten_frame" && (
              <div className="py-4 flex flex-col items-center">
                <div className="grid grid-cols-5 gap-3 bg-white/10 p-5 rounded-3xl border-2 border-white/20 w-full max-w-md">
                  {frames.map((filled, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const next = [...frames];
                        next[idx] = !next[idx];
                        setFrames(next);
                      }}
                      className={`aspect-square rounded-2xl flex items-center justify-center text-4xl transition-all border-2 ${
                        filled
                          ? "bg-white text-slate-900 border-amber-400 scale-105 shadow-lg"
                          : "bg-slate-800/70 border-white/20 hover:border-white/50 text-white/40 text-sm"
                      }`}
                    >
                      {filled ? currentSim.item_emoji : idx + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-6 bg-white/10 px-6 py-3 rounded-2xl">
                  <div className="text-center">
                    <p className="text-xs text-sky-200 font-bold">
                      Terisi Saat Ini
                    </p>
                    <p className="text-3xl font-black text-amber-400">
                      {activeCount}
                    </p>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="text-center">
                    <p className="text-xs text-sky-200 font-bold">
                      Target Simulasi
                    </p>
                    <p className="text-3xl font-black text-emerald-400">
                      {currentSim.target_count}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentSim.mode === "number_bond" && (
              <div className="py-4 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-4xl border-4 border-white">
                  {currentSim.whole_number}
                </div>
                <div className="flex gap-20 text-2xl text-sky-300 font-bold">
                  <span>↙</span>
                  <span>↘</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="bg-white/10 p-4 rounded-3xl text-center">
                    <span className="text-xs text-sky-200 font-bold">
                      Piring Kiri
                    </span>
                    <div className="w-16 h-16 mx-auto mt-1 rounded-full bg-indigo-500 flex items-center justify-center font-black text-2xl">
                      {currentSim.known_part}
                    </div>
                  </div>
                  <div className="bg-white/15 p-4 rounded-3xl border-2 border-emerald-400 text-center">
                    <span className="text-xs text-emerald-300 font-bold">
                      Piring Kanan (Ubah!)
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => setUserPart(Math.max(0, userPart - 1))}
                        className="w-9 h-9 rounded-xl bg-rose-500 font-black"
                      >
                        -
                      </button>
                      <div className="w-16 h-16 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black text-2xl">
                        {userPart}
                      </div>
                      <button
                        onClick={() => setUserPart(Math.min(10, userPart + 1))}
                        className="w-9 h-9 rounded-xl bg-emerald-500 font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSim.mode === "comparison" &&
              currentSim.left_group &&
              currentSim.right_group && (
                <div className="py-4 flex flex-col items-center gap-5">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                    <div className="bg-white/10 p-4 rounded-2xl text-center">
                      <p className="font-bold text-sm mb-2">
                        {currentSim.left_group.name} (
                        {currentSim.left_group.count})
                      </p>
                      <div className="text-3xl">
                        {Array(currentSim.left_group.count)
                          .fill(currentSim.left_group.emoji)
                          .join(" ")}
                      </div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl text-center">
                      <p className="font-bold text-sm mb-2">
                        {currentSim.right_group.name} (
                        {currentSim.right_group.count})
                      </p>
                      <div className="text-3xl">
                        {Array(currentSim.right_group.count)
                          .fill(currentSim.right_group.emoji)
                          .join(" ")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { id: "LEBIH_BANYAK", label: "Lebih Banyak (>)" },
                      { id: "SAMA_DENGAN", label: "Sama Dengan (=)" },
                      { id: "LEBIH_SEDIKIT", label: "Lebih Sedikit (<)" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedRelation(opt.id)}
                        className={`px-5 py-3 rounded-xl font-bold text-sm ${
                          selectedRelation === opt.id
                            ? "bg-amber-400 text-slate-950 ring-2 ring-white"
                            : "bg-white/15 text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Status Penyelesaian Simulasi */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
              {isSimMissionComplete ? (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-4 py-3 rounded-2xl text-sm font-bold">
                  🌟 {currentSim.success_message}
                </div>
              ) : (
                <span className="text-xs text-sky-200">
                  Selesaikan tantangan alat peraga di atas untuk lanjut ke
                  simulasi berikutnya.
                </span>
              )}

              {simIndex < chapterData.simulasi_missions.length - 1 ? (
                <button
                  onClick={() => setSimIndex(simIndex + 1)}
                  disabled={!isSimMissionComplete}
                  className="px-6 py-3 rounded-xl bg-amber-400 disabled:bg-white/10 disabled:text-white/30 text-slate-950 font-black text-xs"
                >
                  Simulasi Berikutnya →
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab("latihan")}
                  disabled={!isSimMissionComplete}
                  className="px-6 py-3 rounded-xl bg-amber-400 disabled:bg-white/10 disabled:text-white/30 text-slate-950 font-black text-xs"
                >
                  🎯 Lanjut ke Latihan Soal (Komponen 4) →
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ======================================================================= */}
      {/* KOMPONEN 4: LATIHAN TERBIMBING (30 TOKEN — DENGAN PEMBAHASAN)           */}
      {/* ======================================================================= */}
      {activeTab === "latihan" && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase text-amber-800">
                🎯 Komponen 4 dari 6
              </span>
              <h2 className="text-xl font-black text-amber-950">
                Latihan Terbimbing (Tiket 30 Token)
              </h2>
              <p className="text-sm text-amber-800 mt-1">
                Setiap soal langsung menampilkan pembahasan konsep supaya kamu
                paham 100% sebelum masuk ke Ujian.
              </p>
            </div>
            {allPracticeCorrect && (
              <div className="bg-emerald-600 text-white px-4 py-2 rounded-2xl font-black text-sm">
                +30 Token Diraih! ✅
              </div>
            )}
          </div>

          {chapterData.practice_questions.map((q, idx) => {
            const picked = practiceAnswers[q.id];
            const isCorrect = picked === q.correct_index;
            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase bg-slate-100 px-3 py-1 rounded-full">
                    Soal Latihan #{idx + 1}
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    {q.visual_hint}
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-900">{q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() =>
                        setPracticeAnswers({ ...practiceAnswers, [q.id]: oIdx })
                      }
                      className={`p-3.5 rounded-2xl font-bold text-left border-2 transition-all ${
                        picked === oIdx
                          ? oIdx === q.correct_index
                            ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                            : "bg-rose-50 border-rose-400 text-rose-900"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {picked !== undefined && (
                  <div
                    className={`p-4 rounded-2xl text-sm font-medium ${
                      isCorrect
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                        : "bg-amber-50 text-amber-900 border border-amber-300"
                    }`}
                  >
                    <b>{isCorrect ? "✅ Benar! " : "💡 Pembahasan Guru: "}</b>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {allPracticeCorrect && (
            <div className="text-right">
              <button
                onClick={() => setActiveTab("ujian")}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg"
              >
                🛡️ Lanjut ke Ujian Bab (Komponen 5 — 70 Token) →
              </button>
            </div>
          )}
        </main>
      )}

      {/* ======================================================================= */}
      {/* KOMPONEN 5: UJIAN 100% + INTEGRITAS KAMERA (70 TOKEN)                   */}
      {/* ======================================================================= */}
      {activeTab === "ujian" && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
          <div className="bg-emerald-900 text-white rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-emerald-300">
                🛡️ Komponen 5 dari 6
              </span>
              <h2 className="text-xl font-black">
                Ujian Mandiri — Syarat Lulus Mutlak 100% (70 Token)
              </h2>
              <p className="text-xs text-emerald-200 mt-1">
                Harus benar semua (100%) untuk membuka gembok Praktikum. Lulus
                percobaan pertama dengan kamera bersih mendapat penanda{" "}
                <b>&quot;Si Paling Pintar&quot;</b>.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2">
              📷 Sensor Wajah Lokal:{" "}
              <span className="text-emerald-300">1 Wajah Siswa (Valid)</span>
            </div>
          </div>

          {chapterData.exam_questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3"
            >
              <span className="text-xs font-extrabold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Soal Ujian #{idx + 1}
              </span>
              <p className="text-lg font-bold text-slate-900">{q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() =>
                      setExamAnswers({ ...examAnswers, [q.id]: oIdx })
                    }
                    className={`p-3.5 rounded-2xl font-bold text-left border-2 ${
                      examAnswers[q.id] === oIdx
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              {examSubmitted && (
                <p
                  className={`font-black text-base ${
                    examScore === 100 ? "text-emerald-700" : "text-rose-600"
                  }`}
                >
                  Nilai Ujian: {examScore}% —{" "}
                  {examScore === 100
                    ? "LULUS 100%! (+70 Token & Gembok Praktikum Terbuka 🌟)"
                    : "Belum 100%. Ayo perbaiki jawabanmu agar gembok Praktikum terbuka!"}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExamSubmit}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm"
              >
                Kumpulkan Paket Ujian
              </button>
              {examScore === 100 && (
                <button
                  onClick={() => setActiveTab("praktikum")}
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm"
                >
                  🏆 Buka Praktikum (Komponen 6 — 50 Token) →
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ======================================================================= */}
      {/* KOMPONEN 6: PRAKTIKUM (50 TOKEN — ON-SUBMIT HIDDEN GRADING)             */}
      {/* ======================================================================= */}
      {activeTab === "praktikum" && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6">
          {examScore < 100 ? (
            <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-slate-300 space-y-4">
              <div className="text-5xl">🔒</div>
              <h2 className="text-2xl font-black text-slate-900">
                Komponen 6 (Praktikum) Masih Terkunci
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Sesuai aturan IGIL, kamu wajib menyelesaikan{" "}
                <b>Komponen 5 (Ujian) dengan nilai mutlak 100%</b> terlebih
                dahulu sebelum dapat mengerjakan Praktikum Beasiswa.
              </p>
              <button
                onClick={() => setActiveTab("ujian")}
                className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm"
              >
                Kembali ke Komponen 5 (Ujian)
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-md border-2 border-purple-200 space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                <span className="text-xs font-extrabold uppercase text-purple-700">
                  🏆 Komponen 6 dari 6: Praktikum Kualifikasi Beasiswa (50
                  Token)
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  {chapterData.practicum_task.title}
                </h2>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  {chapterData.practicum_task.scenario}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">
                    🍎 Jumlah Apel Merah: {practicumApel}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={9}
                    value={practicumApel}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPracticumApel(val);
                      setPracticumPisang(10 - val);
                    }}
                    className="w-full mt-2"
                  />
                  <div className="text-2xl mt-1">
                    {Array(practicumApel).fill("🍎").join("")}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">
                    🍌 Jumlah Pisang Kuning: {practicumPisang}
                  </label>
                  <div className="text-2xl mt-4">
                    {Array(practicumPisang).fill("🍌").join("")}
                  </div>
                  <p className="text-xs font-bold text-indigo-700 mt-2">
                    Total Buah: {practicumApel} + {practicumPisang} = 10 Buah
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                  ✍️ {chapterData.practicum_task.question_prompt}
                </label>
                <textarea
                  rows={3}
                  value={practicumReason}
                  onChange={(e) => setPracticumReason(e.target.value)}
                  placeholder="Contoh: Saya memilih 6 apel dan 4 pisang karena 6 tambah 4 sama dengan 10, dan 6 apel lebih banyak daripada 4 pisang..."
                  className="w-full rounded-2xl border-2 border-slate-300 p-4 text-sm focus:border-purple-600 outline-none"
                />
              </div>

              {!practicumSubmitted ? (
                <button
                  onClick={() => setPracticumSubmitted(true)}
                  disabled={practicumReason.trim().length < 10}
                  className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-black text-sm shadow-lg"
                >
                  🚀 Serahkan Praktikum (Dinilai AI & Disimpan Rahasia Sampai
                  Akhir Bulan)
                </button>
              ) : (
                <div className="bg-purple-900 text-white rounded-2xl p-5 space-y-2">
                  <p className="font-black text-base text-amber-300">
                    ✅ Praktikum Diterima & +50 Token Tercatat!
                  </p>
                  <p className="text-xs text-purple-200 leading-relaxed">
                    {practicumApel} apel merah dan {practicumPisang} pisang
                    kuning. Jumlahnya 10, dan apel lebih banyak. Alasanmu
                    tersimpan di perangkat ini.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      )}
    </div>
  );
}