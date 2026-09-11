"use client";

import { useRef, useState, type ReactNode } from "react";
import { Loader2, Mic, Send } from "lucide-react";
import { useKuisMateri } from "@/components/KuisMateriContext";
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

function buatMesinRekam(): MesinRekam | null {
  if (typeof window === "undefined") return null;
  const win = window as Window & {
    SpeechRecognition?: new () => MesinRekam;
    webkitSpeechRecognition?: new () => MesinRekam;
  };
  const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
  return Konstruktor ? new Konstruktor() : null;
}

export function normalisasiUcapan(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z\u0600-\u06FF\s'-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ucapanMemuatAlias(transkrip: string, alias: string[]): boolean {
  const ucapan = normalisasiUcapan(transkrip);
  if (!ucapan) return false;
  return alias.some((nama) => {
    const pola = nama.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|\\s)${pola}(?:\\s|$)`, "i").test(ucapan);
  });
}

export default function SoalRekamSuara({
  id,
  pertanyaan,
  periksa,
  petunjuk = "Ketuk Rekam suara, sebutkan jawabannya, lalu kirim.",
}: {
  id?: string;
  pertanyaan: ReactNode;
  periksa: (transkrip: string) => boolean;
  petunjuk?: string;
}) {
  const kuisMateri = useKuisMateri();
  const sudahTuntas = Boolean(id && kuisMateri?.sudahBenar(id));
  const [transkrip, setTranskrip] = useState("");
  const [rekam, setRekam] = useState(false);
  const [status, setStatus] = useState<StatusJawaban>(
    sudahTuntas ? "benar" : null,
  );
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
      setPesan(
        "Browser ini belum mendukung rekam suara. Izinkan mikrofon di Chrome, lalu coba lagi.",
      );
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
    const benar = periksa(transkrip);
    setStatus(benar ? "benar" : "salah");
    if (benar && id) kuisMateri?.tandaiBenar(id);
  };

  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <div className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        {pertanyaan}
      </div>
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
        <p className="mt-3 text-sm font-semibold text-slate-500">{petunjuk}</p>
      )}
      {pesan ? (
        <p className="mt-2 text-sm font-bold text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}
