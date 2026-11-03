"use client";
import React, { useState, useEffect } from "react";
import chapterData from "@/data/kelas1-bab1.json";
export default function IgilModulePlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPage = chapterData.pages[currentIndex];
  // State untuk mode Ten-Frame
  const [frames, setFrames] = useState<boolean[]>(Array(10).fill(false));
  // State untuk mode Number Bond
  const [userPart, setUserPart] = useState<number>(0);
  // State untuk mode Comparison
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  // Status suara
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Reset kanvas setiap pindah halaman
  useEffect(() => {
    if (currentPage.canvas_mode === "ten_frame") {
      const initial = Array(10)
        .fill(false)
        .map((_, idx) => idx < (currentPage.initial_count || 0));
      setFrames(initial);
    } else if (currentPage.canvas_mode === "number_bond") {
      setUserPart(0);
    } else if (currentPage.canvas_mode === "comparison") {
      setSelectedRelation(null);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex, currentPage]);
  // Hitung apakah halaman saat ini sudah diselesaikan dengan benar oleh anak
  const activeCount = frames.filter(Boolean).length;
  const isTaskComplete =
    (currentPage.canvas_mode === "ten_frame" &&
      activeCount === currentPage.target_count) ||
    (currentPage.canvas_mode === "number_bond" &&
      userPart === currentPage.target_missing_part) ||
    (currentPage.canvas_mode === "comparison" &&
      selectedRelation === currentPage.correct_relation);
  // Fungsi Pembaca Suara Bahasa Indonesia (Biaya Rp 0)
  const speakText = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${currentPage.title}. ${currentPage.story_text} ${currentPage.instruction}`
    );
    utterance.lang = "id-ID";
    utterance.rate = 0.92;
    utterance.pitch = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  // Handler klik kotak Ten-Frame
  const toggleFrame = (index: number) => {
    const updated = [...frames];
    updated[index] = !updated[index];
    setFrames(updated);
  };
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* HEADER ATAS: Info Bab, Progres & Tiket Token Bulanan */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {chapterData.subject}
          </span>
          <h1 className="text-lg font-extrabold text-slate-900 mt-1">
            {chapterData.title}
          </h1>
        </div>
        {/* Indikator Tiket Kualifikasi Bulanan (30 / 70 / 50) */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <div className="bg-amber-50 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-lg">
            🎯 Latihan: {chapterData.tokens_reward.practice} Token
          </div>
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-lg">
            🛡️ Ujian 100%: {chapterData.tokens_reward.exam} Token
          </div>
          <div className="bg-purple-50 border border-purple-300 text-purple-800 px-3 py-1.5 rounded-lg">
            🏆 Praktikum: {chapterData.tokens_reward.practicum} Token
          </div>
        </div>
      </header>
      {/* BILAH PROGRES HALAMAN */}
      <div className="bg-slate-200 h-2.5 w-full">
        <div
          className="bg-indigo-600 h-2.5 transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / chapterData.pages.length) * 100}%`,
          }}
        />
      </div>
      {/* AREA UTAMA: KANVAS BELAH 50/50 */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ================= PANEL KIRI (50%): CERITA & INSTRUKSI SMICPA ================= */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-indigo-100 flex flex-col justify-between">
          <div>
            {/* Badge Tahap SMICPA */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                📐 Tahap SMICPA: {currentPage.stage_label}
              </span>
              <span className="text-sm font-bold text-slate-400">
                Halaman {currentPage.page_number} / {chapterData.total_pages} *(Sampel {chapterData.pages.length} Hlm)*
              </span>
            </div>
            {/* Judul Halaman & Tombol Suara */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {currentPage.title}
              </h2>
              <button
                onClick={speakText}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 ${
                  isSpeaking
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                🔊 {isSpeaking ? "Membacakan..." : "Dengarkan"}
              </button>
            </div>
            {/* Kotak Cerita Kontekstual */}
            <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-5 mb-6 text-lg leading-relaxed text-slate-800">
              {currentPage.story_text}
            </div>
            {/* Kotak Tugas Interaktif */}
            <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-1">
                Tugasmu di Kanvas Kanan:
              </p>
              <p className="text-base md:text-lg font-bold text-indigo-950">
                {currentPage.instruction}
              </p>
            </div>
          </div>
          {/* Umpan Balik Ketika Selesai */}
          <div className="mt-6">
            {isTaskComplete ? (
              <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 rounded-2xl p-4 flex items-center gap-3 animate-bounce">
                <span className="text-3xl">🌟</span>
                <div>
                  <p className="font-extrabold text-base">Tugas Halaman Selesai!</p>
                  <p className="text-sm font-medium">{currentPage.success_feedback}</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <p className="text-sm font-semibold">
                  Selesaikan aktivitas di kanvas sebelah kanan untuk membuka tombol <b>Lanjut</b>.
                </p>
              </div>
            )}
          </div>
        </section>
        {/* ================= PANEL KANAN (50%): KANVAS ALAT PERAGA INTERAKTIF ================= */}
        <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              🎨 Kanvas Interaktif Siswa (50/50)
            </span>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-semibold">
              Sentuh & Eksplorasi Mandiri
            </span>
          </div>
          {/* --- MODE 1: TEN-FRAME (BINGKAI 10) --- */}
          {currentPage.canvas_mode === "ten_frame" && (
            <div className="my-auto py-6 flex flex-col items-center">
              <div className="grid grid-cols-5 gap-3 md:gap-4 bg-white/10 p-4 md:p-6 rounded-3xl border-2 border-white/20 w-full max-w-md">
                {frames.map((filled, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleFrame(idx)}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-4xl md:text-5xl transition-all duration-200 border-2 ${
                      filled
                        ? "bg-white text-slate-900 border-amber-400 scale-105 shadow-lg"
                        : "bg-slate-800/70 border-white/20 hover:border-white/50"
                    }`}
                  >
                    {filled ? currentPage.item_emoji : ""}
                  </button>
                ))}
              </div>
              {/* Indikator Angka Konkret -> Abstrak */}
              <div className="mt-8 flex items-center gap-6 bg-white/10 px-6 py-4 rounded-2xl border border-white/15">
                <div className="text-center">
                  <p className="text-xs text-indigo-200 uppercase font-bold">
                    Jumlah {currentPage.item_name}
                  </p>
                  <p className="text-4xl font-black text-amber-400 mt-1">
                    {activeCount}
                  </p>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-xs text-indigo-200 uppercase font-bold">
                    Target Tugas
                  </p>
                  <p className="text-4xl font-black text-emerald-400 mt-1">
                    {currentPage.target_count}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* --- MODE 2: NUMBER BOND (PASANGAN BILANGAN) --- */}
          {currentPage.canvas_mode === "number_bond" && (
            <div className="my-auto py-6 flex flex-col items-center gap-6">
              {/* Lingkaran Induk (Whole) */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase font-bold text-indigo-300 mb-1">
                  Jumlah Seluruhnya
                </span>
                <div className="w-24 h-24 rounded-full bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black text-4xl shadow-lg border-4 border-white">
                  {currentPage.whole_number}
                </div>
              </div>
              {/* Garis Cabang */}
              <div className="flex items-center justify-center gap-20 text-indigo-300 font-bold text-2xl">
                <span>↙</span>
                <span>↘</span>
              </div>
              {/* Dua Lingkaran Bagian (Parts) */}
              <div className="flex items-center justify-center gap-8 md:gap-14">
                {/* Piring 1 (Sudah Diketahui) */}
                <div className="flex flex-col items-center bg-white/10 p-4 rounded-3xl border border-white/20">
                  <span className="text-xs text-indigo-200 font-bold mb-2">
                    Piring Pertama
                  </span>
                  <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-3xl border-4 border-indigo-200">
                    {currentPage.known_part}
                  </div>
                  <div className="mt-2 text-lg">
                    {Array(currentPage.known_part)
                      .fill(currentPage.item_emoji)
                      .join("")}
                  </div>
                </div>
                {/* Piring 2 (Interaktif Diisi Anak) */}
                <div className="flex flex-col items-center bg-white/15 p-4 rounded-3xl border-2 border-emerald-400">
                  <span className="text-xs text-emerald-300 font-bold mb-2">
                    Piring Kedua (Isi!)
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setUserPart(Math.max(0, userPart - 1))}
                      className="w-10 h-10 rounded-xl bg-rose-500 hover:bg-rose-600 font-black text-xl active:scale-95"
                    >
                      -
                    </button>
                    <div className="w-20 h-20 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black text-3xl border-4 border-white">
                      {userPart}
                    </div>
                    <button
                      onClick={() => setUserPart(Math.min(10, userPart + 1))}
                      className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-black text-xl active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-2 text-lg min-h-[28px]">
                    {Array(userPart).fill(currentPage.item_emoji).join("")}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* --- MODE 3: COMPARISON (PERBANDINGAN VISUAL) --- */}
          {currentPage.canvas_mode === "comparison" &&
            currentPage.left_group &&
            currentPage.right_group && (
              <div className="my-auto py-6 flex flex-col items-center gap-6">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/10 p-5 rounded-3xl border border-white/20 text-center">
                    <p className="text-sm font-bold text-indigo-200 mb-2">
                      {currentPage.left_group.name} ({currentPage.left_group.count})
                    </p>
                    <div className="text-3xl leading-relaxed tracking-widest">
                      {Array(currentPage.left_group.count)
                        .fill(currentPage.left_group.emoji)
                        .join(" ")}
                    </div>
                  </div>
                  <div className="bg-white/10 p-5 rounded-3xl border border-white/20 text-center">
                    <p className="text-sm font-bold text-indigo-200 mb-2">
                      {currentPage.right_group.name} ({currentPage.right_group.count})
                    </p>
                    <div className="text-3xl leading-relaxed tracking-widest">
                      {Array(currentPage.right_group.count)
                        .fill(currentPage.right_group.emoji)
                        .join(" ")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {[
                    { id: "LEBIH_BANYAK", label: "Lebih Banyak (>)" },
                    { id: "SAMA_DENGAN", label: "Sama Dengan (=)" },
                    { id: "LEBIH_SEDIKIT", label: "Lebih Sedikit (<)" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedRelation(opt.id)}
                      className={`px-5 py-3 rounded-2xl font-extrabold text-sm transition-all active:scale-95 ${
                        selectedRelation === opt.id
                          ? "bg-amber-400 text-slate-950 ring-4 ring-white"
                          : "bg-white/15 hover:bg-white/25 text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          {/* Footer Kanvas */}
          <div className="text-center text-xs text-indigo-300 border-t border-white/10 pt-3">
            Metode SMICPA IGIL — Anak memahami konsep konkret sebelum menghafal rumus abstrak.
          </div>
        </section>
      </main>
      {/* NAVIGASI BAWAH (TERKUNCI SEBELUM TUGAS SELESAI) */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-2xl font-bold text-sm border-2 border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition-all"
          >
            ← Halaman Sebelumnya
          </button>
          <div className="flex items-center gap-2">
            {chapterData.pages.map((_, idx) => (
              <span
                key={idx}
                className={`h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-indigo-600"
                    : idx < currentIndex
                    ? "w-3 bg-emerald-500"
                    : "w-3 bg-slate-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentIndex(
                Math.min(chapterData.pages.length - 1, currentIndex + 1)
              )
            }
            disabled={!isTaskComplete || currentIndex === chapterData.pages.length - 1}
            className={`px-8 py-3 rounded-2xl font-extrabold text-sm shadow-md transition-all ${
              isTaskComplete
                ? "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {currentIndex === chapterData.pages.length - 1
              ? "✅ Lanjut ke 10 Soal Latihan (30 Token)"
              : "Halaman Berikutnya →"}
          </button>
        </div>
      </footer>
    </div>
  );
}
