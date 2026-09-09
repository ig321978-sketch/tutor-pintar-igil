"use client";

import { useRef, useState } from "react";
import { Loader2, Mic, Send } from "lucide-react";
import { HIJAIYAH_30 } from "@/lib/paket-lengkap-materi";
import { kelasTombolUtama } from "@/lib/tema";

type MesinRekam = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
  }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type StatusJawaban = "benar" | "salah" | null;

type SoalHijaiyah = {
  id: string;
  pertanyaan: string;
  dari: number;
  sampai: number;
};

const SOAL: SoalHijaiyah[] = [
  {
    id: "1-10",
    pertanyaan: "1. Sebutkan huruf hijaiyah ke-1 hingga ke-10:",
    dari: 0,
    sampai: 10,
  },
  {
    id: "11-20",
    pertanyaan: "2. Sebutkan huruf hijaiyah ke 11 hingga ke 20:",
    dari: 10,
    sampai: 20,
  },
  {
    id: "21-30",
    pertanyaan: "3. Sebutkan huruf hijaiyah ke 21 hingga ke 30:",
    dari: 20,
    sampai: 30,
  },
];

const ALIAS: Record<string, string[]> = {
  Alif: ["alif", "alef", "alifah"],
  Ba: ["ba", "baa", "be"],
  Ta: ["ta", "taa", "te"],
  Tsa: ["tsa", "tsaa", "sa", "tha", "sa'"],
  Jim: ["jim", "jeem", "jim"],
  Ha: ["ha", "haa", "ha'"],
  Kha: ["kha", "kho", "khaa", "kho'"],
  Dal: ["dal", "daal"],
  Dzal: ["dzal", "zal", "dzaal", "zhal"],
  Ra: ["ra", "raa", "ro"],
  Zai: ["zai", "za", "zay", "zai"],
  Sin: ["sin", "siin"],
  Syin: ["syin", "shin", "syiin", "sin syamsi"],
  Shad: ["shad", "sad", "shod", "sod"],
  Dhad: ["dhad", "dhod", "dad", "dod"],
  Tha: ["tha", "tho", "taa"],
  Zha: ["zha", "zho", "dho"],
  Ain: ["ain", "'ain", "a'in"],
  Ghain: ["ghain", "gain", "ghoin"],
  Fa: ["fa", "faa"],
  Qaf: ["qaf", "qof", "kaf qaf"],
  Kaf: ["kaf", "kof"],
  Lam: ["lam"],
  Mim: ["mim", "miim"],
  Nun: ["nun"],
  Wau: ["wau", "waw", "wauw"],
  "Lam-Alif": ["lam alif", "lamalif", "lam-alif", "laam alif"],
  Hamzah: ["hamzah", "hamza", "hamzah"],
  Ya: ["ya", "yaa", "ye"],
};

function buatMesinRekam(): MesinRekam | null {
  if (typeof window === "undefined") return null;
  const win = window as Window & {
    SpeechRecognition?: new () => MesinRekam;
    webkitSpeechRecognition?: new () => MesinRekam;
  };
  const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
  return Konstruktor ? new Konstruktor() : null;
}

function normalisasi(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z\u0600-\u06FF\s'-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function jawabanBenar(transkrip: string, dari: number, sampai: number): boolean {
  const ucapan = normalisasi(transkrip);
  if (!ucapan) return false;
  const target = HIJAIYAH_30.slice(dari, sampai);
  let ketemu = 0;
  for (const huruf of target) {
    const daftar = ALIAS[huruf.nama] ?? [huruf.nama.toLowerCase()];
    const lambang = huruf.lambang ? normalisasi(huruf.lambang) : "";
    const cocok = daftar.some((nama) => {
      const pola = nama.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(?:^|\\s)${pola}(?:\\s|$)`, "i").test(ucapan);
    });
    if (cocok || (lambang && ucapan.includes(lambang))) ketemu += 1;
  }
  return ketemu >= 8;
}

function SoalRekam({ soal }: { soal: SoalHijaiyah }) {
  const [transkrip, setTranskrip] = useState("");
  const [rekam, setRekam] = useState(false);
  const [status, setStatus] = useState<StatusJawaban>(null);
  const [pesan, setPesan] = useState("");
  const mesinRef = useRef<MesinRekam | null>(null);
  const finalRef = useRef("");

  const hentikan = () => {
    mesinRef.current?.stop();
    mesinRef.current = null;
    setRekam(false);
  };

  const mulaiRekam = () => {
    if (rekam) {
      hentikan();
      return;
    }
    const mesin = buatMesinRekam();
    if (!mesin) {
      setPesan("Browser ini belum mendukung rekam suara. Izinkan mikrofon di Chrome, lalu coba lagi.");
      return;
    }
    setPesan("");
    setStatus(null);
    finalRef.current = transkrip.trim() ? `${transkrip.trim()} ` : "";
    mesin.lang = "id-ID";
    mesin.continuous = true;
    mesin.interimResults = true;
    mesin.onresult = (peristiwa) => {
      let sementara = "";
      for (let i = peristiwa.resultIndex; i < peristiwa.results.length; i++) {
        const bagian = peristiwa.results[i];
        if (bagian.isFinal) {
          finalRef.current += `${bagian[0].transcript} `;
        } else {
          sementara += bagian[0].transcript;
        }
      }
      setTranskrip(`${finalRef.current}${sementara}`.trim());
    };
    mesin.onerror = (peristiwa) => {
      if (peristiwa.error === "not-allowed") {
        setPesan("Izin mikrofon ditolak. Izinkan akses mikrofon, lalu coba lagi.");
      } else if (peristiwa.error !== "no-speech" && peristiwa.error !== "aborted") {
        setPesan("Rekaman terganggu. Coba rekam lagi.");
      }
      setRekam(false);
    };
    mesin.onend = () => {
      setRekam(false);
      mesinRef.current = null;
    };
    try {
      mesinRef.current = mesin;
      mesin.start();
      setRekam(true);
    } catch {
      setPesan("Tidak dapat memulai mikrofon.");
      setRekam(false);
    }
  };

  const kirim = () => {
    hentikan();
    if (!transkrip.trim()) {
      setPesan("Rekam jawabanmu dulu, lalu kirim.");
      setStatus(null);
      return;
    }
    setPesan("");
    setStatus(jawabanBenar(transkrip, soal.dari, soal.sampai) ? "benar" : "salah");
  };

  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-base font-extrabold text-[#1C01A5]">{soal.pertanyaan}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={mulaiRekam}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-extrabold shadow-md ${
            rekam
              ? "bg-rose-500 text-white"
              : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
          }`}
        >
          {rekam ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
          {rekam ? "Berhenti merekam" : "Rekam suara"}
        </button>
        <button
          type="button"
          onClick={kirim}
          className={`${kelasTombolUtama} inline-flex items-center gap-2 rounded-xl px-5 py-3 font-extrabold`}
        >
          <Send className="h-5 w-5" />
          KIRIM JAWABAN
        </button>
        {status === "benar" ? (
          <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-black tracking-wide text-white">
            BENAR
          </span>
        ) : null}
        {status === "salah" ? (
          <span className="rounded-full bg-rose-600 px-4 py-2 text-sm font-black tracking-wide text-white">
            SALAH
          </span>
        ) : null}
      </div>
      {transkrip ? (
        <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700">
          {transkrip}
        </p>
      ) : (
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Ketuk Rekam suara, sebutkan hurufnya, lalu kirim jawaban.
        </p>
      )}
      {pesan ? (
        <p className="mt-2 text-sm font-bold text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}

export default function LatihanSuaraHijaiyah() {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        Hafalkan semua ke 30 huruf hijaiyah, dan jawab pertanyaan ini:
      </p>
      {SOAL.map((soal) => (
        <SoalRekam key={soal.id} soal={soal} />
      ))}
    </div>
  );
}
