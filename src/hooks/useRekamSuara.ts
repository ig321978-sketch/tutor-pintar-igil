"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type MesinRekam = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult:
    | ((event: {
        resultIndex: number;
        results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
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

export function useRekamSuara(onTranskrip: (teks: string) => void) {
  const [rekam, setRekam] = useState(false);
  const [pesan, setPesan] = useState("");
  const mesinRef = useRef<MesinRekam | null>(null);
  const finalRef = useRef("");
  const rekamRef = useRef(false);
  const onTranskripRef = useRef(onTranskrip);
  onTranskripRef.current = onTranskrip;

  const hentikan = useCallback(() => {
    mesinRef.current?.stop();
    mesinRef.current = null;
    rekamRef.current = false;
    setRekam(false);
  }, []);

  useEffect(() => () => hentikan(), [hentikan]);

  const mulaiAtauBerhenti = useCallback(
    (teksAwal = "") => {
      if (rekamRef.current) {
        hentikan();
        return;
      }
      const mesin = buatMesinRekam();
      if (!mesin) {
        setPesan(
          "Browser ini belum mendukung rekam suara. Izinkan mikrofon di Chrome, atau ketik pertanyaannya.",
        );
        return;
      }
      setPesan("");
      finalRef.current = teksAwal.trim() ? `${teksAwal.trim()} ` : "";
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
        onTranskripRef.current(`${finalRef.current}${sementara}`.trim());
      };
      mesin.onerror = (peristiwa) => {
        if (peristiwa.error === "not-allowed") {
          setPesan(
            "Izin mikrofon ditolak. Izinkan akses mikrofon, lalu coba lagi, atau ketik pertanyaannya.",
          );
        } else if (
          peristiwa.error !== "no-speech" &&
          peristiwa.error !== "aborted"
        ) {
          setPesan(
            "Rekaman terganggu. Coba rekam lagi atau ketik pertanyaannya.",
          );
        }
        rekamRef.current = false;
        setRekam(false);
      };
      mesin.onend = () => {
        rekamRef.current = false;
        setRekam(false);
        mesinRef.current = null;
      };
      try {
        mesinRef.current = mesin;
        mesin.start();
        rekamRef.current = true;
        setRekam(true);
      } catch {
        setPesan("Tidak dapat memulai mikrofon. Ketik pertanyaannya saja.");
        rekamRef.current = false;
        setRekam(false);
      }
    },
    [hentikan],
  );

  return { rekam, pesan, setPesan, mulaiAtauBerhenti, hentikan };
}
