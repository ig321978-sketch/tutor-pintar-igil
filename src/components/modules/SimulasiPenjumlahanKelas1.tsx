"use client";
import React, { useState } from "react";
export default function SimulasiPenjumlahanKelas1({ onBenar }: { onBenar?: () => void }) {
  // State untuk jumlah apel di Kereta A dan Kereta B (Maksimal total 10)
  const [applesA, setApplesA] = useState<number>(3);
  const [applesB, setApplesB] = useState<number>(2);
  
  // State tebakan siswa
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<{ status: "idle" | "correct" | "incorrect"; message: string }>({
    status: "idle",
    message: "",
  });
  const correctAnswer = applesA + applesB;
  // Handler tombol kirim jawaban
  const handleCheck = () => {
    const num = parseInt(userAnswer, 10);
    if (isNaN(num)) {
      setFeedback({ status: "incorrect", message: "Masukkan angka yang benar ya! 😊" });
      return;
    }
    if (num === correctAnswer) {
      setFeedback({
        status: "correct",
        message: `🎉 Hore! Hebat sekali! ${applesA} ditambah ${applesB} hasilnya adalah ${correctAnswer}! Bintang untukmu! ⭐`,
      });
      onBenar?.();
    } else {
      setFeedback({
        status: "incorrect",
        message: `❌ Belum tepat. Ayo hitung ulang semua apelnya bersama-sama!`,
      });
    }
  };
  // Handler tombol soal baru / acak
  const handleRandomize = () => {
    const newA = Math.floor(Math.random() * 5) + 1; // 1 sampai 5
    const newB = Math.floor(Math.random() * 4) + 1; // 1 sampai 4 (total max 9)
    setApplesA(newA);
    setApplesB(newB);
    setUserAnswer("");
    setFeedback({ status: "idle", message: "" });
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-sky-50 to-indigo-50 rounded-3xl border-2 border-indigo-200 shadow-lg text-slate-800">
      {/* Header Simulasi */}
      <div className="text-center pb-4 border-b border-indigo-100">
        <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          Lab Simulasi Interaktif • Matematika Kelas 1 SD
        </span>
        <h2 className="text-2xl font-black text-indigo-900 mt-2">
          🚂 Kereta Penjumlahan: Menggabungkan Buah Apel!
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Masinis Kancil membawa dua gerbong penuh buah apel. Hitung jumlah seluruh apel saat kedua gerbong digabungkan!
        </p>
      </div>
      {/* Area Visual Kereta & Apel */}
      <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Gerbong A */}
        <div className="bg-white p-4 rounded-2xl border-2 border-emerald-400 shadow-sm flex flex-col items-center min-w-[140px]">
          <div className="text-xs font-black text-emerald-800 uppercase mb-2">Gerbong A</div>
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[110px] min-h-[50px] items-center">
            {Array.from({ length: applesA }).map((_, i) => (
              <span key={i} className="text-2xl animate-bounce">🍎</span>
            ))}
          </div>
          <div className="mt-3 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full font-black text-sm">
            {applesA} Apel
          </div>
        </div>
        {/* Simbol Plus (+) */}
        <div className="text-4xl font-black text-indigo-600">＋</div>
        {/* Gerbong B */}
        <div className="bg-white p-4 rounded-2xl border-2 border-rose-400 shadow-sm flex flex-col items-center min-w-[140px]">
          <div className="text-xs font-black text-rose-800 uppercase mb-2">Gerbong B</div>
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[110px] min-h-[50px] items-center">
            {Array.from({ length: applesB }).map((_, i) => (
              <span key={i} className="text-2xl animate-pulse">🍎</span>
            ))}
          </div>
          <div className="mt-3 bg-rose-100 text-rose-900 px-3 py-1 rounded-full font-black text-sm">
            {applesB} Apel
          </div>
        </div>
        {/* Simbol Sama Dengan (=) */}
        <div className="text-4xl font-black text-indigo-600">＝</div>
        {/* Kotak Hasil Gabungan */}
        <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-md flex flex-col items-center min-w-[140px]">
          <div className="text-xs font-black text-indigo-200 uppercase mb-2">Total Gabungan</div>
          <div className="flex flex-wrap gap-1 justify-center max-w-[110px] min-h-[50px] items-center">
            {feedback.status === "correct" ? (
              Array.from({ length: correctAnswer }).map((_, i) => (
                <span key={i} className="text-xl">🍎</span>
              ))
            ) : (
              <span className="text-3xl font-black text-amber-300">❓</span>
            )}
          </div>
          <div className="mt-3 bg-indigo-800 text-indigo-100 px-3 py-1 rounded-full font-black text-sm">
            {feedback.status === "correct" ? `${correctAnswer} Apel` : "?? Apel"}
          </div>
        </div>
      </div>
      {/* Panel Interaksi & Input Jawaban */}
      <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center space-y-4">
        <div className="text-base font-extrabold text-slate-700">
          Berapa jumlah total seluruh apel di atas?
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={10}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="?"
            className="w-20 h-16 text-center text-3xl font-black border-2 border-indigo-300 rounded-2xl focus:outline-none focus:border-indigo-600 bg-indigo-50/50"
          />
          <button
            onClick={handleCheck}
            className="px-6 h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-2xl shadow transition active:scale-95"
          >
            Periksa Jawaban ➔
          </button>
        </div>
        {/* Feedback Pesan Animasi */}
        {feedback.status !== "idle" && (
          <div
            className={`w-full p-4 rounded-xl text-center text-sm font-extrabold ${
              feedback.status === "correct"
                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                : "bg-rose-100 text-rose-900 border border-rose-300"
            }`}
          >
            {feedback.message}
          </div>
        )}
        {/* Tombol Acak Soal Baru */}
        <div className="pt-2">
          <button
            onClick={handleRandomize}
            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition"
          >
            🎲 Acak Latihan Soal Baru
          </button>
        </div>
      </div>
    </div>
  );
}
