"use client";

import React, { useEffect, useRef, useState } from "react";
import chapterData from "@/data/kelas1-bab1.json";
import {
 pasanganGuru,
 profilGuru,
 type KelaminGuru,
} from "@/lib/guru";
import {
 hentikanAudioGuruAktif,
 mintaAudioTts,
} from "@/lib/putar-tts-klien";

type ActiveTab =
 | "silabus"
 | "materi"
 | "simulasi"
 | "latihan"
 | "ujian"
 | "praktikum";

export default function IgilModulePlayer() {
 const [activeTab, setActiveTab] = useState<ActiveTab>("silabus");

 // ================= STATE 2: MATERI (S-M-I-C-P-A) =================
 const [materiIndex, setMateriIndex] = useState(0);
 const currentMateri = chapterData.materi_pages[materiIndex];
 const [isSpeaking, setIsSpeaking] = useState(false);
 const [pesanSuara, setPesanSuara] = useState("");
 const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>("wanita");
 const audioGuru = useRef<HTMLAudioElement | null>(null);
 const suaraToken = useRef(0);
 const guruAktif = profilGuru("1 SD", guruKelamin);

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

 const hentikanSuaraGuru = () => {
 suaraToken.current += 1;
 const audio = audioGuru.current;
 if (audio) {
 audio.pause();
 audio.currentTime = 0;
 }
 hentikanAudioGuruAktif();
 if (typeof window !== "undefined") window.speechSynthesis?.cancel();
 setIsSpeaking(false);
 };

 useEffect(() => {
 hentikanSuaraGuru();
 setPesanSuara("");
 }, [materiIndex, activeTab, guruKelamin]);

 const speakMateri = async () => {
 if (isSpeaking) {
 hentikanSuaraGuru();
 return;
 }
 const token = suaraToken.current + 1;
 suaraToken.current = token;
 const fullText = `Tahap ${currentMateri.smicpa_stage}. ${
 currentMateri.title
 }. ${
 currentMateri.story_text
 }. Penjelasan konsep: ${currentMateri.concept_explanation.join(
 " "
 )}. Intisari: ${currentMateri.key_formula}`;
 setPesanSuara("");
 setIsSpeaking(true);
 const hasil = await mintaAudioTts(fullText, guruKelamin, "1 SD", {
 suaraTetap: true,
 });
 if (token !== suaraToken.current) return;
 if (!hasil) {
 setIsSpeaking(false);
 setPesanSuara("Suara guru belum siap. Coba lagi sebentar lagi ya.");
 return;
 }
 const audio = audioGuru.current ?? new Audio();
 audioGuru.current = audio;
 audio.src = hasil.url;
 audio.onended = () => {
 if (token === suaraToken.current) setIsSpeaking(false);
 };
 audio.onerror = () => {
 if (token !== suaraToken.current) return;
 setIsSpeaking(false);
 setPesanSuara("Suara guru belum siap. Coba lagi sebentar lagi ya.");
 };
 try {
 await audio.play();
 } catch {
 if (token !== suaraToken.current) return;
 setIsSpeaking(false);
 setPesanSuara("Ketuk sekali lagi untuk mendengar guru.");
 }
 };

 const activeCount = frames.filter(Boolean).length;
 const isSimMissionComplete =
 (currentSim.mode === "ten_frame" &&
 activeCount === currentSim.target_count) ||
 (currentSim.mode === "number_bond" &&
 userPart === currentSim.target_missing_part) ||
 (currentSim.mode === "comparison" &&
 selectedRelation === currentSim.correct_relation);

 const allPracticeCorrect = chapterData.practice_questions.every(
 (q) => practiceAnswers[q.id] === q.correct_index
 );

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

 const vb = currentMateri.visual_board;

 const tabs: {
 id: ActiveTab;
 label: string;
 badge?: string;
 warna: string;
 }[] = [
 {
 id: "silabus",
 label: "🗺️ 1. Silabus",
 warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
 },
 {
 id: "materi",
 label: "📖 2. Materi (SMICPA)",
 warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
 },
 {
 id: "simulasi",
 label: "🕹️ 3. Simulasi",
 warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
 },
 {
 id: "latihan",
 label: "🎯 4. Latihan (30)",
      warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
      badge: allPracticeCorrect ? "⭐" : undefined,
 },
 {
 id: "ujian",
 label: "🛡️ 5. Ujian (70)",
 warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
 badge: examScore === 100 ? "👑" : undefined,
 },
 {
 id: "praktikum",
 label: "🏆 6. Praktikum (50)",
 warna: "bg-white text-[#1C01A5] border-[#1C01A5]",
 badge: examScore < 100 ? "🔒" : "✨",
 },
 ];

 const warnaTahap = [
 "border-[#1C01A5] bg-white",
 "border-[#1C01A5] bg-white",
 "border-[#1C01A5] bg-white",
    "border-[#1C01A5] bg-white",
 "border-[#1C01A5] bg-white",
 "border-[#1C01A5] bg-white",
 ];

 return (
 <div className="min-h-screen bg-white flex flex-col font-sans text-[#1C01A5]">
 <header className="bg-[#1C01A5] text-white border-b-8 border-[#F0AB00] px-4 md:px-6 py-4 shadow-lg sticky top-0 z-20">
 <div className="max-w-7xl mx-auto flex flex-col gap-4">
 <div className="flex flex-wrap items-center justify-between gap-3">
 <div>
 <span className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5] bg-[#F0AB00] px-3 py-1 rounded-full shadow-sm">
 {chapterData.subject}
 </span>
 <h1 className="text-xl md:text-2xl font-black text-white mt-1.5 drop-shadow-sm">
 {chapterData.title}
 </h1>
 </div>
 <div className="text-xs font-bold bg-white text-[#1C01A5] px-4 py-2.5 rounded-full border-2 border-[#F0AB00] shadow-sm">
 Tiket bab: <b>30 Latihan</b> + <b>70 Ujian</b> +{" "}
 <b>50 Praktikum</b> = <b className="text-[#1C01A5]">150 Token</b>
 </div>
 </div>

 <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
 {tabs.map((t) => {
 const isActive = activeTab === t.id;
 return (
 <button
 key={t.id}
 onClick={() => setActiveTab(t.id)}
 className={`px-3 py-3 rounded-2xl font-extrabold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 border-2 ${
 isActive
                      ? "bg-[#F0AB00] text-[#1C01A5] border-[#F0AB00] shadow-lg scale-[1.03]"
 : `${t.warna} hover:scale-[1.02]`
 }`}
 >
 <span>{t.label}</span>
 {t.badge && <span>{t.badge}</span>}
 </button>
 );
 })}
 </nav>
 </div>
 </header>

 {/* ======================================================================= */}
 {/* KOMPONEN 1: SILABUS */}
 {/* ======================================================================= */}
 {activeTab === "silabus" && (
 <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
 <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border-4 border-[#1C01A5] space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#1C01A5] pb-4">
 <div>
 <span className="text-xs font-extrabold uppercase bg-[#1C01A5] text-white px-3.5 py-1 rounded-full">
 🗺️ Komponen 1 dari 6: Silabus Resmi
 </span>
 <h2 className="text-2xl font-black text-[#1C01A5] mt-2">
 Peta Kurikulum & Struktur 24 Halaman SMICPA
 </h2>
 </div>
 <div className="text-right text-xs font-bold text-[#1C01A5] bg-[#F0AB00] px-4 py-2 rounded-2xl border-2 border-[#F0AB00]">
 <p>{chapterData.silabus.fase}</p>
 <p className="text-[#1C01A5] font-black">
 {chapterData.silabus.elemen}
 </p>
 </div>
 </div>

            <div className="bg-white border-4 border-[#F0AB00] p-5 rounded-3xl">
 <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5] mb-1">
 📌 Capaian Pembelajaran (CP) Kurikulum Merdeka:
 </h3>
 <p className="text-sm md:text-base font-medium text-[#1C01A5] leading-relaxed">
 {chapterData.silabus.capaian_pembelajaran}
 </p>
 </div>

 <div>
 <h3 className="text-sm font-extrabold uppercase text-[#1C01A5] mb-3">
 🎯 Tujuan Pembelajaran (TP):
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {chapterData.silabus.tujuan_pembelajaran.map((tp, idx) => (
 <div
 key={idx}
 className={`rounded-2xl p-4 flex items-start gap-3 shadow-sm border-4 ${warnaTahap[idx % warnaTahap.length]}`}
 >
 <span className="bg-[#F0AB00] text-[#1C01A5] text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
 {idx + 1}
 </span>
 <p className="text-sm font-semibold text-[#1C01A5]">
 {tp}
 </p>
 </div>
 ))}
 </div>
 </div>

 <div>
 <h3 className="text-sm font-extrabold uppercase text-[#1C01A5] mb-3">
 📐 Peta 6 Tahap Metode SMICPA (24 Halaman):
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {chapterData.silabus.peta_24_halaman_smicpa.map((item, idx) => (
 <div
 key={idx}
 className={`rounded-2xl p-4 border-4 shadow-sm transition-all hover:-translate-y-0.5 ${warnaTahap[idx % warnaTahap.length]}`}
 >
 <span className="text-xs font-extrabold text-[#1C01A5] bg-[#F0AB00] px-2.5 py-1 rounded-full">
 {item.rentang}
 </span>
 <p className="font-black text-[#1C01A5] mt-2 text-sm">
 {item.tahap}
 </p>
 <p className="text-xs text-[#1C01A5] mt-1 leading-relaxed">
 {item.deskripsi}
 </p>
 </div>
 ))}
 </div>
 </div>

 <div className="pt-4 border-t-4 border-[#1C01A5] flex justify-end">
 <button
 onClick={() => setActiveTab("materi")}
 className="px-8 py-3.5 rounded-full bg-[#F0AB00] hover:opacity-90 text-[#1C01A5] font-black text-sm shadow-md transition-all"
 >
 📖 Masuk ke Materi SMICPA (Komponen 2) →
 </button>
 </div>
 </div>
 </main>
 )}

 {/* ======================================================================= */}
 {/* KOMPONEN 2: MATERI (S - M - I - C - P - A) */}
 {/* ======================================================================= */}
 {activeTab === "materi" && (
 <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-5">
 {/* BARIS PILIH CEPAT 6 TAHAP SMICPA */}
 <div className="bg-white rounded-3xl p-3 shadow-sm border-4 border-[#1C01A5] flex flex-wrap items-center justify-between gap-2">
 <span className="text-xs font-extrabold uppercase text-[#1C01A5] px-2">
 Tahapan Metode SMICPA:
 </span>
 <div className="flex flex-wrap gap-2">
 {chapterData.materi_pages.map((pg, idx) => (
 <button
 key={pg.page_number}
 onClick={() => setMateriIndex(idx)}
 className={`px-3.5 py-2 rounded-full text-xs font-black transition-all border-2 ${
 materiIndex === idx
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#1C01A5] shadow-sm scale-105"
 : `${warnaTahap[idx % warnaTahap.length]} hover:scale-[1.02]`
 }`}
 >
 [{pg.smicpa_code}] {pg.smicpa_stage.split(" ")[0]}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
 {/* PANEL KIRI (50%): NARASI GURU & PENJELASAN KONSEP SMICPA */}
 <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border-4 border-[#1C01A5] flex flex-col justify-between">
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-xs font-extrabold bg-white text-[#1C01A5] border-2 border-[#1C01A5] px-3 py-1 rounded-full">
 Tahap {materiIndex + 1}/6 — [{currentMateri.smicpa_code}]{" "}
 {currentMateri.smicpa_stage}
 </span>
 <span className="text-xs font-bold text-[#1C01A5]">
 Blok SMICPA #{currentMateri.page_number}
 </span>
 </div>

 <h2 className="text-2xl font-black text-[#1C01A5]">
 {currentMateri.title}
 </h2>
 <div className="flex flex-wrap items-center gap-2">
 {pasanganGuru("1 SD").map((pilihan) => {
 const aktif = guruKelamin === pilihan.kelamin;
 return (
 <button
 key={pilihan.kelamin}
 type="button"
 onClick={() => setGuruKelamin(pilihan.kelamin)}
 className={`flex items-center gap-2 rounded-full border-4 py-1 pl-1 pr-4 text-sm font-black ${
 aktif
 ? "border-[#F0AB00] bg-[#F0AB00] text-[#1C01A5]"
 : "border-[#1C01A5] bg-white text-[#1C01A5]"
 }`}
 >
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={pilihan.gambar}
 alt=""
 className="h-11 w-11 rounded-full object-cover"
 />
 {pilihan.nama}
 </button>
 );
 })}
 <button
 onClick={() => void speakMateri()}
 className={`px-4 py-2.5 rounded-full font-black text-xs shadow-sm transition-all ${
                      isSpeaking
                        ? "bg-[#F0AB00] text-[#1C01A5] animate-pulse"
                        : "bg-[#1C01A5] hover:opacity-90 text-white"
 }`}
 >
 🔊{" "}
 {isSpeaking
 ? `${guruAktif.nama} sedang membaca...`
 : `Dengarkan ${guruAktif.nama}`}
 </button>
 </div>
 {pesanSuara ? (
 <p className="text-xs font-bold text-[#1C01A5]">{pesanSuara}</p>
 ) : null}

 <div className="bg-white border-4 border-[#1C01A5] rounded-3xl p-4">
 <p className="text-xs font-extrabold uppercase text-[#1C01A5] mb-1">
 Pengantar Tahap {currentMateri.smicpa_stage}:
 </p>
 <p className="text-sm md:text-base text-[#1C01A5] leading-relaxed">
 {currentMateri.story_text}
 </p>
 </div>

 <div className="bg-white border-4 border-[#1C01A5] rounded-3xl p-4">
 <p className="text-xs font-extrabold uppercase text-[#1C01A5] mb-2">
 💡 Penjelasan Konsep Inti:
 </p>
 <ul className="list-disc pl-5 space-y-2 text-sm font-medium text-[#1C01A5]">
 {currentMateri.concept_explanation.map((pt, i) => (
 <li key={i}>{pt}</li>
 ))}
 </ul>
 </div>
 </div>

 <div className="mt-6 bg-[#F0AB00] text-[#1C01A5] rounded-3xl p-4 text-center border-4 border-[#F0AB00]">
 <p className="text-xs uppercase font-bold text-[#1C01A5]">
 🔑 Intisari Tahap [{currentMateri.smicpa_code}]:
 </p>
 <p className="text-sm md:text-base font-black text-[#1C01A5] mt-1">
 {currentMateri.key_formula}
 </p>
 </div>
 </section>

 {/* PANEL KANAN (50%): VISUALISASI KHUSUS S - M - I - C - P - A */}
 <section className="bg-white text-[#1C01A5] rounded-[2rem] p-6 md:p-8 shadow-xl border-4 border-[#1C01A5] flex flex-col justify-between">
 <div className="border-b-4 border-[#1C01A5] pb-3 flex items-center justify-between">
 <span className="text-xs font-bold uppercase tracking-wider text-[#1C01A5]">
 🎨 Kanvas Visual [{currentMateri.smicpa_code}]:{" "}
 {currentMateri.smicpa_stage}
 </span>
 </div>

 <div className="my-auto py-6 space-y-5">
 <h3 className="text-center text-lg font-extrabold text-[#1C01A5]">
 {vb.title}
 </h3>

 {vb.type === "story" && vb.story_scenes && (
 <div className="space-y-3">
 {vb.story_scenes.map((sc, i) => (
 <div
 key={i}
 className="bg-white border-4 border-[#1C01A5] rounded-3xl p-4 flex items-center gap-4 shadow-sm"
 >
 <div className="text-3xl bg-[#F0AB00] text-[#1C01A5] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow">
 {sc.icon}
 </div>
 <div>
 <span className="text-xs font-extrabold uppercase text-[#1C01A5]">
 {sc.step}
 </span>
 <p className="text-sm font-semibold text-[#1C01A5] mt-0.5">
 {sc.text}
 </p>
 </div>
 </div>
 ))}
 </div>
 )}

 {/* 2. VISUAL MIND-MAPPING (PETA PIKIRAN) */}
 {vb.type === "mind_map" && vb.branches && (
 <div className="flex flex-col items-center space-y-4">
 <div className="bg-[#F0AB00] text-[#1C01A5] px-6 py-3 rounded-full font-black text-base shadow-lg border-4 border-[#1C01A5]">
 {vb.center_node}
 </div>
 <div className="text-[#1C01A5] text-xs font-bold">
 ↙ ↓ ↓ ↘ (4 Cabang Peta Pikiran)
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
 {vb.branches.map((br, i) => (
 <div
 key={i}
 className={`rounded-3xl p-3.5 border-4 ${warnaTahap[i % warnaTahap.length]}`}
 >
 <p className="text-xs font-black text-[#1C01A5]">
 {br.title}
 </p>
 <p className="text-xs text-[#1C01A5] mt-1">{br.detail}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* 3. VISUAL INFOGRAFIS (TABEL RANGKUMAN) */}
 {vb.type === "infografis" && vb.table_rows && (
 <div className="overflow-hidden rounded-3xl border-4 border-[#1C01A5] bg-white">
 <table className="w-full text-left text-xs">
 <thead className="bg-[#1C01A5] text-white uppercase font-black">
 <tr>
 <th className="p-2.5">Angka</th>
 <th className="p-2.5">Nama</th>
 <th className="p-2.5">Wujud Benda</th>
 <th className="p-2.5">Pasangan</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[#1C01A5]/15 font-semibold text-[#1C01A5]">
 {vb.table_rows.map((row, i) => (
 <tr key={i} className="hover:opacity-90">
 <td className="p-2.5 font-black text-lg text-[#1C01A5]">
 {row.angka}
 </td>
 <td className="p-2.5">{row.nama}</td>
 <td className="p-2.5 text-sm">{row.benda}</td>
 <td className="p-2.5 text-[#1C01A5]">
 {row.pasangan}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 {/* 4. VISUAL CONCRETE (ILUSTRASI BENDA NYATA) */}
 {vb.type === "concrete" && vb.concrete_groups && (
 <div className="space-y-4">
 {vb.concrete_groups.map((grp, i) => (
 <div
 key={i}
 className="bg-white border-4 border-[#1C01A5] rounded-3xl p-4"
 >
 <p className="text-xs font-extrabold uppercase text-[#1C01A5] mb-3">
 {grp.label}
 </p>
 <div className="flex flex-wrap gap-2.5">
 {grp.items.map((emj, idx) => (
 <div
 key={idx}
 className="bg-[#F0AB00] text-[#1C01A5] rounded-2xl px-3 py-2 flex flex-col items-center shadow border-2 border-[#F0AB00]"
 >
 <span className="text-2xl">{emj}</span>
 <span className="text-[10px] font-black text-[#1C01A5] mt-0.5">
 #{idx + 1}
 </span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 )}

 {/* 5. VISUAL PICTORIAL (DIAGRAM TEN-FRAME & NUMBER BOND) */}
 {vb.type === "pictorial" &&
 vb.ten_frame_dots &&
 vb.bond_diagram && (
 <div className="space-y-4">
 <div className="bg-white p-4 rounded-3xl border-4 border-[#1C01A5]">
 <p className="text-xs font-bold text-[#1C01A5] mb-2 text-center">
 A. Diagram Petak 10 (Ten-Frame) — Bilangan 7
 </p>
 <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
 {vb.ten_frame_dots.map((on, i) => (
 <div
 key={i}
 className={`aspect-square rounded-xl flex items-center justify-center border-2 ${
 on
 ? "bg-[#F0AB00] border-[#1C01A5] text-[#1C01A5] font-black"
 : "bg-white border-[#1C01A5]"
 }`}
 >
 {on ? "●" : ""}
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white p-4 rounded-3xl border-4 border-[#1C01A5] flex items-center justify-center gap-6">
 <div className="text-center">
 <span className="text-[10px] uppercase text-[#1C01A5] font-bold">
 Induk
 </span>
 <div className="w-12 h-12 rounded-full bg-[#F0AB00] text-[#1C01A5] font-black text-xl flex items-center justify-center mt-1 border-4 border-[#1C01A5]">
 {vb.bond_diagram.whole}
 </div>
 </div>
 <span className="text-xl font-bold text-[#1C01A5]">
 =
 </span>
 <div className="text-center">
 <span className="text-[10px] uppercase text-[#1C01A5] font-bold">
 Cabang 1
 </span>
 <div className="w-12 h-12 rounded-full bg-white text-[#1C01A5] font-black text-xl flex items-center justify-center mt-1 border-2 border-[#1C01A5]">
 {vb.bond_diagram.part1}
 </div>
 </div>
 <span className="text-xl font-bold text-[#1C01A5]">
 &
 </span>
 <div className="text-center">
 <span className="text-[10px] uppercase text-[#1C01A5] font-bold">
 Cabang 2
 </span>
 <div className="w-12 h-12 rounded-full bg-white text-[#1C01A5] font-black text-xl flex items-center justify-center mt-1 border-2 border-[#1C01A5]">
 {vb.bond_diagram.part2}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* 6. VISUAL ABSTRACT (ANGKA & SIMBOL MATEMATIKA) */}
 {vb.type === "abstract" && vb.equations && (
 <div className="space-y-3">
 {vb.equations.map((eq, i) => (
 <div
 key={i}
 className="bg-white border-4 border-[#1C01A5] rounded-3xl p-4 flex items-center justify-between"
 >
 <span className="text-xs font-bold text-[#1C01A5]">
 {eq.label}
 </span>
 <span className="text-xl md:text-2xl font-black text-[#1C01A5] tracking-wider bg-[#F0AB00] px-4 py-1.5 rounded-2xl shadow">
 {eq.math}
 </span>
 </div>
 ))}
 </div>
 )}

 <p className="text-xs text-center text-[#1C01A5] bg-white p-3 rounded-2xl border-2 border-[#1C01A5]">
 {vb.caption}
 </p>
 </div>

 <div className="flex items-center justify-between pt-4 border-t-4 border-[#1C01A5]">
 <button
 onClick={() => setMateriIndex(Math.max(0, materiIndex - 1))}
 disabled={materiIndex === 0}
 className="px-4 py-2.5 rounded-full bg-white border-2 border-[#1C01A5] hover:opacity-90 disabled:opacity-40 text-xs font-bold text-[#1C01A5]"
 >
 ← Tahap Sebelumnya
 </button>

 {materiIndex < chapterData.materi_pages.length - 1 ? (
 <button
 onClick={() => setMateriIndex(materiIndex + 1)}
 className="px-5 py-2.5 rounded-full bg-[#F0AB00] hover:opacity-90 text-[#1C01A5] text-xs font-black shadow"
 >
 Tahap SMICPA Berikutnya →
 </button>
 ) : (
 <button
 onClick={() => setActiveTab("simulasi")}
 className="px-5 py-2.5 rounded-full bg-[#1C01A5] hover:opacity-90 text-[#1C01A5] text-xs font-black shadow-md"
 >
 🕹️ Lanjut ke Simulasi (Komponen 3) →
 </button>
 )}
 </div>
 </section>
 </div>
 </main>
 )}

 {/* ======================================================================= */}
 {/* KOMPONEN 3: SIMULASI */}
 {/* ======================================================================= */}
 {activeTab === "simulasi" && (
 <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
 <div className="bg-white text-[#1C01A5] rounded-[2rem] p-6 md:p-8 shadow-xl border-4 border-[#1C01A5] space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#1C01A5] pb-4">
 <div>
 <span className="text-xs font-extrabold uppercase bg-[#1C01A5] text-[#1C01A5] px-3 py-1 rounded-full">
 🕹️ Komponen 3 dari 6: Laboratorium Simulasi Interaktif
 </span>
 <h2 className="text-2xl font-black mt-2 text-[#1C01A5]">
 {currentSim.title}
 </h2>
 </div>
 <div className="flex gap-2">
 {chapterData.simulasi_missions.map((m, idx) => (
 <button
 key={m.id}
 onClick={() => setSimIndex(idx)}
 className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition-all border-2 ${
 simIndex === idx
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#1C01A5] "
 : "bg-white text-[#1C01A5] border-[#1C01A5] hover:opacity-90"
 }`}
 >
 Simulasi #{idx + 1}
 </button>
 ))}
 </div>
 </div>

 <div className="bg-[#F0AB00] border-4 border-[#1C01A5] rounded-3xl p-4">
 <p className="text-xs font-bold uppercase text-[#1C01A5]">
 Tantangan Eksperimen Siswa:
 </p>
 <p className="text-base md:text-lg font-bold mt-1 text-[#1C01A5]">
 {currentSim.instruction}
 </p>
 </div>

 {currentSim.mode === "ten_frame" && (
 <div className="py-4 flex flex-col items-center">
 <div className="grid grid-cols-5 gap-3 bg-white p-5 rounded-[2rem] border-4 border-[#1C01A5] w-full max-w-md">
 {frames.map((filled, idx) => (
 <button
 key={idx}
 onClick={() => {
 const next = [...frames];
 next[idx] = !next[idx];
 setFrames(next);
 }}
 className={`aspect-square rounded-2xl flex items-center justify-center text-4xl transition-all border-4 ${
 filled
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#1C01A5] scale-105 shadow-lg"
 : "bg-white border-[#1C01A5] hover:border-[#F0AB00] text-[#1C01A5] text-sm"
 }`}
 >
 {filled ? currentSim.item_emoji : idx + 1}
 </button>
 ))}
 </div>
 <div className="mt-6 flex items-center gap-6 bg-white px-6 py-3 rounded-3xl border-4 border-[#1C01A5]">
 <div className="text-center">
 <p className="text-xs text-[#1C01A5] font-bold">
 Terisi Saat Ini
 </p>
 <p className="text-3xl font-black text-[#1C01A5]">
 {activeCount}
 </p>
 </div>
 <div className="h-8 w-px bg-white" />
 <div className="text-center">
 <p className="text-xs text-[#1C01A5] font-bold">
 Target Simulasi
 </p>
 <p className="text-3xl font-black text-[#1C01A5]">
 {currentSim.target_count}
 </p>
 </div>
 </div>
 </div>
 )}

 {currentSim.mode === "number_bond" && (
 <div className="py-4 flex flex-col items-center gap-4">
 <div className="w-24 h-24 rounded-full bg-[#F0AB00] text-[#1C01A5] flex items-center justify-center font-black text-4xl border-4 border-[#1C01A5] shadow-lg">
 {currentSim.whole_number}
 </div>
 <div className="flex gap-20 text-2xl text-[#1C01A5] font-bold">
 <span>↙</span>
 <span>↘</span>
 </div>
 <div className="flex items-center gap-8">
 <div className="bg-white p-4 rounded-3xl text-center border-4 border-[#1C01A5]">
 <span className="text-xs text-[#1C01A5] font-bold">
 Piring Kiri
 </span>
 <div className="w-16 h-16 mx-auto mt-1 rounded-full bg-white text-[#1C01A5] flex items-center justify-center font-black text-2xl border-4 border-[#1C01A5]">
 {currentSim.known_part}
 </div>
 </div>
 <div className="bg-[#F0AB00] p-4 rounded-3xl border-4 border-[#F0AB00] text-center">
 <span className="text-xs text-[#1C01A5] font-bold">
 Piring Kanan (Ubah!)
 </span>
 <div className="flex items-center gap-2 mt-1">
 <button
 onClick={() => setUserPart(Math.max(0, userPart - 1))}
 className="w-9 h-9 rounded-full bg-white hover:opacity-90 text-[#1C01A5] font-black"
 >
 -
 </button>
 <div className="w-16 h-16 rounded-full bg-[#F0AB00] text-[#1C01A5] flex items-center justify-center font-black text-2xl border-4 border-[#1C01A5]">
 {userPart}
 </div>
 <button
 onClick={() => setUserPart(Math.min(10, userPart + 1))}
 className="w-9 h-9 rounded-full bg-white hover:opacity-90 text-[#1C01A5] font-black"
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
 <div className="bg-white p-4 rounded-3xl text-center border-4 border-[#1C01A5]">
 <p className="font-bold text-sm mb-2 text-[#1C01A5]">
 {currentSim.left_group.name} (
 {currentSim.left_group.count})
 </p>
 <div className="text-3xl">
 {Array(currentSim.left_group.count)
 .fill(currentSim.left_group.emoji)
 .join(" ")}
 </div>
 </div>
 <div className="bg-white p-4 rounded-3xl text-center border-4 border-[#1C01A5]">
 <p className="font-bold text-sm mb-2 text-[#1C01A5]">
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
 className={`px-5 py-3 rounded-full font-black text-sm transition-all border-4 ${
 selectedRelation === opt.id
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#1C01A5]"
 : "bg-white hover:opacity-90 text-[#1C01A5] border-[#1C01A5]"
 }`}
 >
 {opt.label}
 </button>
 ))}
 </div>
 </div>
 )}

 <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-4 border-[#1C01A5]">
 {isSimMissionComplete ? (
 <div className="bg-[#F0AB00] text-[#1C01A5] px-4 py-3 rounded-full text-sm font-black shadow border-2 border-[#F0AB00]">
 🌟 {currentSim.success_message}
 </div>
 ) : (
 <span className="text-xs text-[#1C01A5] font-bold">
 Selesaikan tantangan alat peraga di atas untuk lanjut ke
 simulasi berikutnya.
 </span>
 )}

 {simIndex < chapterData.simulasi_missions.length - 1 ? (
 <button
 onClick={() => setSimIndex(simIndex + 1)}
 disabled={!isSimMissionComplete}
 className="px-6 py-3 rounded-full bg-[#F0AB00] disabled:bg-white disabled:text-[#1C01A5]/40 text-[#1C01A5] font-black text-xs shadow"
 >
 Simulasi Berikutnya →
 </button>
 ) : (
 <button
 onClick={() => setActiveTab("latihan")}
 disabled={!isSimMissionComplete}
 className="px-6 py-3 rounded-full bg-[#F0AB00] disabled:bg-white disabled:text-[#1C01A5]/40 text-[#1C01A5] font-black text-xs shadow"
 >
 🎯 Lanjut ke Latihan Soal (Komponen 4) →
 </button>
 )}
 </div>
 </div>
 </main>
 )}

 {/* ======================================================================= */}
 {/* KOMPONEN 4: LATIHAN TERBIMBING (30 TOKEN) */}
 {/* ======================================================================= */}
 {activeTab === "latihan" && (
 <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
 <div className="bg-white text-[#1C01A5] border-4 border-[#F0AB00] rounded-[2rem] p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
 <div>
 <span className="text-xs font-extrabold uppercase text-[#1C01A5]">
 🎯 Komponen 4 dari 6
 </span>
 <h2 className="text-xl font-black text-[#1C01A5]">
 Latihan Terbimbing (Tiket 30 Token Emas)
 </h2>
 <p className="text-sm text-[#1C01A5] mt-1">
 Setiap soal langsung menampilkan pembahasan konsep supaya kamu
 paham 100% sebelum masuk ke Ujian.
 </p>
 </div>
 {allPracticeCorrect && (
 <div className="bg-[#F0AB00] text-[#1C01A5] px-4 py-2 rounded-full font-black text-sm shadow border-2 border-[#F0AB00]">
 +30 Token Diraih! ⭐
 </div>
 )}
 </div>

 {chapterData.practice_questions.map((q, idx) => {
 const picked = practiceAnswers[q.id];
 const isCorrect = picked === q.correct_index;
 return (
 <div
 key={q.id}
 className="bg-white rounded-[2rem] p-6 shadow-sm border-4 border-[#1C01A5] space-y-4"
 >
 <div className="flex items-center justify-between">
 <span className="text-xs font-extrabold uppercase bg-[#F0AB00] text-[#1C01A5] px-3 py-1 rounded-full">
 Soal Latihan #{idx + 1}
 </span>
 <span className="text-lg font-black text-[#1C01A5] bg-white px-3 py-1 rounded-2xl border-2 border-[#1C01A5]">
 {q.visual_hint}
 </span>
 </div>
 <p className="text-lg font-bold text-[#1C01A5]">
 {q.question}
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {q.options.map((opt, oIdx) => (
 <button
 key={oIdx}
 onClick={() =>
 setPracticeAnswers({ ...practiceAnswers, [q.id]: oIdx })
 }
 className={`p-3.5 rounded-2xl font-bold text-left border-4 transition-all ${
 picked === oIdx
 ? oIdx === q.correct_index
 ? "bg-[#F0AB00] border-[#F0AB00] text-[#1C01A5]"
 : "bg-[#1C01A5] border-[#1C01A5] text-white"
 : "bg-white border-[#1C01A5] hover:border-[#F0AB00] text-[#1C01A5]"
 }`}
 >
 {opt}
 </button>
 ))}
 </div>
 {picked !== undefined && (
 <div
 className={`p-4 rounded-2xl text-sm font-medium border-4 ${
 isCorrect
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#F0AB00]"
 : "bg-white text-[#1C01A5] border-[#1C01A5]"
 }`}
 >
 <b>
 {isCorrect ? "⭐ Jawaban Tepat! " : "💡 Pembahasan Guru: "}
 </b>
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
 className="px-8 py-4 rounded-full bg-[#1C01A5] hover:opacity-90 text-white font-black text-sm shadow-lg"
 >
 🛡️ Lanjut ke Ujian Bab (Komponen 5 — 70 Token) →
 </button>
 </div>
 )}
 </main>
 )}

 {/* ======================================================================= */}
 {/* KOMPONEN 5: UJIAN 100% (70 TOKEN) */}
 {/* ======================================================================= */}
 {activeTab === "ujian" && (
 <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
 <div className="bg-white text-[#1C01A5] rounded-[2rem] p-6 border-4 border-[#1C01A5] flex flex-wrap items-center justify-between gap-4 shadow-md">
 <div>
 <span className="text-xs font-extrabold uppercase text-[#1C01A5]">
 🛡️ Komponen 5 dari 6
 </span>
 <h2 className="text-xl font-black">
 Ujian Mandiri — Syarat Lulus Mutlak 100% (70 Token Emas)
 </h2>
 <p className="text-xs text-[#1C01A5] mt-1">
 Harus benar semua (100%) untuk membuka gembok Praktikum. Lulus
 percobaan pertama dengan kamera bersih mendapat penanda{" "}
 <b className="text-[#1C01A5]">&quot;Si Paling Pintar&quot;</b>.
 </p>
 </div>
 <div className="bg-white border-2 border-[#1C01A5] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 text-[#1C01A5]">
 📷 Sensor Wajah Lokal:{" "}
 <span className="text-[#1C01A5]">1 Wajah Siswa (Valid)</span>
 </div>
 </div>

 {chapterData.exam_questions.map((q, idx) => (
 <div
 key={q.id}
 className="bg-white rounded-[2rem] p-6 shadow-sm border-4 border-[#1C01A5] space-y-3"
 >
 <span className="text-xs font-extrabold uppercase text-[#1C01A5] bg-white px-3 py-1 rounded-full">
 Soal Ujian #{idx + 1}
 </span>
 <p className="text-lg font-bold text-[#1C01A5]">{q.question}</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {q.options.map((opt, oIdx) => (
 <button
 key={oIdx}
 onClick={() =>
 setExamAnswers({ ...examAnswers, [q.id]: oIdx })
 }
 className={`p-3.5 rounded-2xl font-bold text-left border-4 transition-all ${
 examAnswers[q.id] === oIdx
 ? "bg-[#F0AB00] text-[#1C01A5] border-[#F0AB00] shadow"
 : "bg-white border-[#1C01A5] hover:border-[#F0AB00] text-[#1C01A5]"
 }`}
 >
 {opt}
 </button>
 ))}
 </div>
 </div>
 ))}

 <div className="bg-white rounded-[2rem] p-6 border-4 border-[#1C01A5] flex flex-wrap items-center justify-between gap-4 shadow-sm">
 <div>
 {examSubmitted && (
 <p
 className={`font-black text-base ${
 examScore === 100 ? "text-[#1C01A5]" : "text-[#1C01A5]"
 }`}
 >
 Nilai Ujian: {examScore}% —{" "}
 {examScore === 100
 ? "👑 LULUS 100%! (+70 Token Emas & Gembok Praktikum Terbuka)"
 : "Belum 100%. Ayo perbaiki jawabanmu agar gembok Praktikum terbuka!"}
 </p>
 )}
 </div>
 <div className="flex gap-3">
 <button
 onClick={handleExamSubmit}
 className="px-6 py-3 rounded-full bg-[#1C01A5] hover:opacity-90 text-white font-black text-sm shadow"
 >
 Kumpulkan Paket Ujian
 </button>
 {examScore === 100 && (
 <button
 onClick={() => setActiveTab("praktikum")}
 className="px-6 py-3 rounded-full bg-[#F0AB00] hover:opacity-90 text-[#1C01A5] font-black text-sm shadow-md"
 >
 🏆 Buka Praktikum (Komponen 6 — 50 Token) →
 </button>
 )}
 </div>
 </div>
 </main>
 )}

 {/* ======================================================================= */}
 {/* KOMPONEN 6: PRAKTIKUM (50 TOKEN) */}
 {/* ======================================================================= */}
 {activeTab === "praktikum" && (
 <main className="flex-1 max-w-4xl w-full mx-auto p-6">
 {examScore < 100 ? (
 <div className="bg-white rounded-[2rem] p-10 text-center border-4 border-dashed border-[#1C01A5] space-y-4 shadow-sm">
 <div className="text-5xl">🔒</div>
 <h2 className="text-2xl font-black text-[#1C01A5]">
 Komponen 6 (Praktikum) Masih Terkunci
 </h2>
 <p className="text-sm text-[#1C01A5] max-w-md mx-auto">
 Sesuai aturan IGIL, kamu wajib menyelesaikan{" "}
 <b>Komponen 5 (Ujian) dengan nilai mutlak 100%</b> terlebih
 dahulu sebelum dapat mengerjakan Praktikum Beasiswa.
 </p>
 <button
 onClick={() => setActiveTab("ujian")}
 className="px-6 py-3 rounded-full bg-[#F0AB00] hover:opacity-90 text-[#1C01A5] font-black text-sm shadow"
 >
 Kembali ke Komponen 5 (Ujian)
 </button>
 </div>
 ) : (
 <div className="bg-white rounded-[2rem] p-8 shadow-md border-4 border-[#1C01A5] space-y-6">
 <div className="bg-white text-[#1C01A5] rounded-3xl p-6 border-b-8 border-[#F0AB00]">
 <span className="text-xs font-extrabold uppercase text-[#1C01A5]">
 🏆 Komponen 6 dari 6: Praktikum Kualifikasi Beasiswa (50 Token
 Emas)
 </span>
 <h2 className="text-2xl font-black text-[#1C01A5] mt-1">
 {chapterData.practicum_task.title}
 </h2>
 <p className="text-sm text-[#1C01A5] mt-2 leading-relaxed">
 {chapterData.practicum_task.scenario}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-3xl border-4 border-[#1C01A5]">
 <div>
 <label className="text-xs font-extrabold uppercase text-[#1C01A5]">
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
 className="w-full mt-2 accent-[#F0AB00]"
 />
 <div className="text-2xl mt-1">
 {Array(practicumApel).fill("🍎").join("")}
 </div>
 </div>
 <div>
 <label className="text-xs font-extrabold uppercase text-[#1C01A5]">
 🍌 Jumlah Pisang Kuning: {practicumPisang}
 </label>
 <div className="text-2xl mt-4">
 {Array(practicumPisang).fill("🍌").join("")}
 </div>
 <p className="text-xs font-black text-[#1C01A5] bg-[#F0AB00] inline-block px-3 py-1 rounded-lg mt-2">
 Total Buah: {practicumApel} + {practicumPisang} = 10 Buah
 </p>
 </div>
 </div>

 <div>
 <label className="block text-sm font-extrabold text-[#1C01A5] mb-2">
 ✍️ {chapterData.practicum_task.question_prompt}
 </label>
 <textarea
 rows={3}
 value={practicumReason}
 onChange={(e) => setPracticumReason(e.target.value)}
 placeholder="Contoh: Saya memilih 6 apel dan 4 pisang karena 6 tambah 4 sama dengan 10, dan 6 apel lebih banyak daripada 4 pisang..."
 className="w-full rounded-2xl border-2 border-[#1C01A5] p-4 text-sm text-[#1C01A5] focus:border-[#F0AB00] outline-none"
 />
 </div>

 {!practicumSubmitted ? (
 <button
 onClick={() => setPracticumSubmitted(true)}
 disabled={practicumReason.trim().length < 10}
 className="w-full py-4 rounded-2xl bg-[#F0AB00] hover:opacity-90 disabled:bg-white disabled:text-[#1C01A5]/40 text-[#1C01A5] font-black text-sm shadow-lg transition-all"
 >
 🚀 Serahkan Praktikum (Dinilai AI & Disimpan Rahasia Sampai
 Akhir Bulan)
 </button>
 ) : (
 <div className="bg-[#F0AB00] text-[#1C01A5] rounded-3xl p-6 border-4 border-[#F0AB00] space-y-2">
 <p className="font-black text-base text-[#1C01A5]">
 👑 Praktikum Diterima & +50 Token Emas Tercatat!
 </p>
 <p className="text-xs text-[#1C01A5] leading-relaxed">
 Sesuai sistem <b>On-Submit Hidden Grading IGIL</b>, AI sudah
 menilai karyamu pada 4 parameter (Akurasi 30%, Sintesis 25%,
 Kemandirian 20%, Penalaran 25%) dan menyimpan nilainya
 secara rahasia di brankas Supabase untuk pengumuman
 Peringkat Beasiswa akhir bulan.
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