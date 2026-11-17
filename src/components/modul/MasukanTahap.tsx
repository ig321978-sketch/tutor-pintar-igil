"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  hentikanSuaraGuruModul,
  ucapkanGuruModul,
} from "@/lib/suara-guru-modul";
import {
  JENIS_MASUKAN,
  LABEL_JENIS,
  babDariAlamat,
  pesanMasukan,
  rapikanIsi,
  type JenisMasukan,
} from "@/lib/masukan";

/**
 * Tombol rekam dan kirim suara Pertanyaan, Kritik, dan Saran di bawah tombol Buka setiap kartu Tahap.
 * Rekam memakai Web Speech id-ID (gratis); AI menjawab dan jawabannya dibacakan suara perangkat (gratis).
 * Kritik dan Saran diteruskan ke admin sebagai teks (halaman /kotak-masukan). Satu akun satu kali per hari:
 * status hari ini dibagi ke semua kartu, jadi setelah mengirim di satu kartu, kartu lain ikut terkunci.
 */

type Status = {
  muat: boolean;
  /** belum_masuk / belum_siap / galat: fitur tidak bisa dipakai saat ini. */
  info: "belum_masuk" | "belum_siap" | "galat" | null;
  sudah: boolean;
  jenis?: JenisMasukan;
  tahap?: string;
  jawaban?: string | null;
};

let keadaan: Status = { muat: true, info: null, sudah: false };
let diambil = false;
const pendengar = new Set<() => void>();
const ubah = (s: Status) => {
  keadaan = s;
  pendengar.forEach((f) => f());
};
function ambilStatus() {
  if (diambil) return;
  diambil = true;
  fetch("/api/masukan", { cache: "no-store" })
    .then((r) => r.json())
    .then((j: Record<string, unknown>) => {
      if (j.status === "ok")
        ubah({
          muat: false,
          info: null,
          sudah: j.sudah === true,
          jenis: j.jenis as JenisMasukan,
          tahap: j.tahap as string,
          jawaban: (j.jawaban as string) ?? null,
        });
      else
        ubah({
          muat: false,
          info:
            j.status === "belum_masuk"
              ? "belum_masuk"
              : j.status === "belum_siap"
                ? "belum_siap"
                : "galat",
          sudah: false,
        });
    })
    .catch(() => ubah({ muat: false, info: "galat", sudah: false }));
}
const langgan = (f: () => void) => {
  pendengar.add(f);
  return () => {
    pendengar.delete(f);
  };
};
const STATUS_SERVER: Status = { muat: true, info: null, sudah: false };

type MesinDengar = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult:
    | ((e: {
        resultIndex: number;
        results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
      }) => void)
    | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};
function buatMesin(): MesinDengar | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => MesinDengar;
    webkitSpeechRecognition?: new () => MesinDengar;
  };
  const K = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return K ? new K() : null;
}

const bicara = (t: string) => ucapkanGuruModul(t, { seragam: true });

export function MasukanTahap({ tahap }: { tahap: string }) {
  const s = useSyncExternalStore(
    langgan,
    () => keadaan,
    () => STATUS_SERVER,
  );
  const bab = babDariAlamat(usePathname());
  const [buka, setBuka] = useState(false);
  const [jenis, setJenis] = useState<JenisMasukan>("pertanyaan");
  const [teks, setTeks] = useState("");
  const [rekam, setRekam] = useState(false);
  const [tanpaMik, setTanpaMik] = useState(false);
  const [kirim, setKirim] = useState(false);
  const [pesan, setPesan] = useState("");
  const [jawaban, setJawaban] = useState<string | null>(null);
  const mesin = useRef<MesinDengar | null>(null);
  const awal = useRef("");

  useEffect(() => {
    if (buka) ambilStatus();
  }, [buka]);
  useEffect(
    () => () => {
      try {
        mesin.current?.abort();
      } catch {
        /* Mesin sudah berhenti. */
      }
    },
    [],
  );

  const berhenti = () => {
    try {
      mesin.current?.stop();
    } catch {
      /* Mesin sudah berhenti. */
    }
    mesin.current = null;
    setRekam(false);
  };

  const mulaiRekam = () => {
    if (rekam) {
      berhenti();
      return;
    }
    const m = buatMesin();
    if (!m) {
      setTanpaMik(true);
      setPesan(
        "Peramban ini belum bisa merekam suara. Ketik saja di kotak, lalu kirim.",
      );
      return;
    }
    hentikanSuaraGuruModul();
    awal.current = teks ? `${teks} ` : "";
    m.lang = "id-ID";
    m.continuous = true;
    m.interimResults = true;
    m.onresult = (e) => {
      let akhir = "";
      let sementara = "";
      for (let i = 0; i < e.results.length; i += 1) {
        const r = e.results[i];
        if (r.isFinal) akhir += `${r[0].transcript} `;
        else sementara += r[0].transcript;
      }
      setTeks(rapikanIsi(`${awal.current}${akhir}${sementara}`));
    };
    m.onerror = (e) => {
      if (e.error === "aborted") return;
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setTanpaMik(true);
        setPesan(
          "Mikrofon belum diizinkan. Izinkan mikrofon, atau ketik saja di kotak.",
        );
      } else if (e.error === "no-speech")
        setPesan("Belum terdengar. Tekan Rekam, lalu bicara.");
      else setPesan("Rekaman terganggu. Coba rekam lagi.");
      setRekam(false);
      mesin.current = null;
    };
    m.onend = () => {
      setRekam(false);
      mesin.current = null;
    };
    try {
      mesin.current = m;
      m.start();
      setRekam(true);
      setPesan("");
    } catch {
      setTanpaMik(true);
      setPesan("Mikrofon tidak bisa dipakai. Ketik saja di kotak.");
    }
  };

  const kirimMasukan = async () => {
    berhenti();
    const isi = rapikanIsi(teks);
    if (isi.length < 2) {
      setPesan("Rekam dulu suaramu, lalu kirim.");
      return;
    }
    setKirim(true);
    setPesan("Mengirim...");
    try {
      const r = await fetch("/api/masukan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jenis, bab, tahap, isi }),
      });
      const j = (await r.json()) as {
        status?: string;
        jawaban?: string;
        diteruskan?: boolean;
        pesan?: string;
      };
      if (j.status === "ok" && j.jawaban) {
        setJawaban(j.jawaban);
        setPesan(
          j.diteruskan
            ? `${LABEL_JENIS[jenis].nama}mu sudah dikirim ke tim IGIL.`
            : "",
        );
        ubah({
          muat: false,
          info: null,
          sudah: true,
          jenis,
          tahap,
          jawaban: j.jawaban,
        });
        bicara(j.jawaban);
      } else if (j.status === "sudah") {
        ubah({ ...keadaan, sudah: true });
        setPesan(pesanMasukan("Sudah mengirim"));
      } else if (j.status === "belum_masuk")
        setPesan(pesanMasukan("Masuk diperlukan"));
      else if (j.status === "belum_siap")
        setPesan("Fitur ini belum aktif di server.");
      else setPesan(j.pesan ?? pesanMasukan(""));
    } catch {
      setPesan(pesanMasukan(""));
    } finally {
      setKirim(false);
    }
  };

  const jawabTampil = jawaban ?? (s.sudah ? s.jawaban : null);

  const tutup = () => {
    berhenti();
    hentikanSuaraGuruModul();
    setBuka(false);
  };
  useEffect(() => {
    if (!buka) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
    // Hanya saat panel dibuka atau ditutup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buka]);

  const tombol = (
    <button
      type="button"
      onClick={() => setBuka(true)}
      data-uji="masukan-buka"
      aria-haspopup="dialog"
      className="mt-2 flex min-h-[48px] w-full items-center justify-center gap-1 rounded-full border-2 border-dashed border-[#1C01A5]/50 bg-white px-2 text-center text-[11px] font-black leading-tight text-[#1C01A5] shadow-[0_2px_0_rgba(28,1,165,0.15)]"
    >
      <span aria-hidden="true">{"\u{1F3A4}"}</span> Tanya, Kritik, Saran
    </button>
  );
  if (!buka || typeof document === "undefined") return tombol;

  const panel = (
    <div
      className="fixed inset-0 z-[195] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Tutup"
        className="absolute inset-0 bg-[#1C01A5]/60 backdrop-blur-[2px]"
        onClick={tutup}
      />
      <div
        className="relative z-[1] max-h-[90vh] w-full max-w-sm space-y-3 overflow-y-auto rounded-3xl border-4 border-[#FFE566] bg-[#F8F7FF] p-4 shadow-[0_12px_40px_rgba(28,1,165,0.45)]"
        data-uji="masukan-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`Pertanyaan, kritik, dan saran untuk tahap ${tahap}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-base font-black text-[#1C01A5]">
              {"\u{1F3A4}"} Tanya, Kritik, Saran
            </p>
            <p className="text-xs font-bold text-[#1C01A5]/70">Tahap {tahap}</p>
          </div>
          <button
            type="button"
            onClick={tutup}
            className="shrink-0 rounded-full border-2 border-[#FFE566] bg-[#FFE566] px-3 py-1.5 text-sm font-black text-[#1C01A5]"
          >
            {"\u{2715}"} Tutup
          </button>
        </div>

        {s.muat ? (
          <p className="text-xs font-bold text-[#1C01A5]/70">Memeriksa...</p>
        ) : s.info === "belum_masuk" ? (
          <p className="text-sm font-bold text-[#B45309]">
            Masuk dulu ke akun supaya bisa bertanya.
          </p>
        ) : s.info === "belum_siap" ? (
          <p className="text-sm font-bold text-[#B45309]">
            Fitur ini belum aktif di server.
          </p>
        ) : s.info === "galat" ? (
          <p className="text-sm font-bold text-[#B45309]">
            Server belum bisa dihubungi. Coba lagi nanti.
          </p>
        ) : s.sudah && !jawaban ? (
          <p className="text-xs font-bold text-[#1C01A5]">
            Kamu sudah mengirim{" "}
            {s.jenis ? LABEL_JENIS[s.jenis].nama.toLowerCase() : "masukan"} hari
            ini{s.tahap ? ` (tahap ${s.tahap})` : ""}. Coba lagi besok, ya.
          </p>
        ) : jawaban ? null : (
          <>
            <div
              className="grid grid-cols-3 gap-1"
              role="radiogroup"
              aria-label="Jenis masukan"
            >
              {JENIS_MASUKAN.map((j) => (
                <button
                  key={j}
                  type="button"
                  role="radio"
                  aria-checked={jenis === j}
                  onClick={() => setJenis(j)}
                  className={`min-h-[56px] rounded-2xl border-2 px-1 text-sm font-black leading-tight ${jenis === j ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/70"}`}
                >
                  <span aria-hidden="true">{LABEL_JENIS[j].ikon}</span>
                  <br />
                  {LABEL_JENIS[j].nama}
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-[#1C01A5]/80">
              {LABEL_JENIS[jenis].ajakan} Tekan Rekam, lalu bicara.
            </p>
            <button
              type="button"
              onClick={mulaiRekam}
              disabled={kirim}
              aria-pressed={rekam}
              className={`flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full border-4 text-base font-black ${rekam ? "animate-pulse border-[#DC2626] bg-[#FECACA] text-[#991B1B]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
            >
              <span aria-hidden="true">
                {rekam ? "\u{23F9}\u{FE0F}" : "\u{1F534}"}
              </span>
              {rekam ? "Berhenti merekam" : teks ? "Rekam lagi" : "Rekam suara"}
            </button>
            {teks || tanpaMik ? (
              <textarea
                value={teks}
                onChange={(e) => setTeks(e.target.value.slice(0, 600))}
                rows={3}
                aria-label="Isi yang terekam"
                placeholder="Tulis di sini..."
                className="w-full rounded-xl border-2 border-[#1C01A5]/30 bg-white p-2 text-sm font-bold text-[#1C01A5]"
              />
            ) : null}
            <div className="flex gap-1.5">
              {teks ? (
                <button
                  type="button"
                  onClick={() => setTeks("")}
                  disabled={kirim}
                  className="min-h-[44px] rounded-full border-2 border-[#1C01A5]/40 bg-white px-3 text-[11px] font-black text-[#1C01A5]"
                >
                  Hapus
                </button>
              ) : null}
              <button
                type="button"
                onClick={kirimMasukan}
                disabled={kirim || rapikanIsi(teks).length < 2}
                className="min-h-[52px] flex-1 rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-3 text-base font-black text-[#FFE566] disabled:opacity-40"
              >
                {"\u{1F4E8}"} {kirim ? "Mengirim..." : "Kirim"}
              </button>
            </div>
            <p className="text-xs font-bold text-[#1C01A5]/60">
              Hanya bisa mengirim satu kali setiap hari.
            </p>
          </>
        )}

        {jawabTampil ? (
          <div className="space-y-1.5 rounded-xl border-2 border-[#16A34A] bg-[#F0FDF4] p-2">
            <p className="text-[11px] font-black text-[#15803D]">
              {"\u{1F4AC}"} Jawaban guru IGIL:
            </p>
            <p className="text-sm font-bold leading-snug text-[#14532D]">
              {jawabTampil}
            </p>
            <button
              type="button"
              onClick={() => bicara(jawabTampil)}
              className="min-h-[40px] rounded-full border-2 border-[#16A34A] bg-white px-3 text-[11px] font-black text-[#15803D]"
            >
              {"\u{1F50A}"} Dengar jawaban
            </button>
          </div>
        ) : null}

        {pesan ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm font-black text-[#B45309]"
          >
            {pesan}
          </p>
        ) : null}
      </div>
    </div>
  );
  return (
    <>
      {tombol}
      {createPortal(panel, document.body)}
    </>
  );
}
