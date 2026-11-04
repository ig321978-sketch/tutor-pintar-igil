"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Nunito } from "next/font/google";
import { normalisasiKelaminGuru, profilGuru } from "@/lib/guru";
import { bacaProgres } from "@/lib/progres";
import { hentikanAudioGuruAktif, mintaAudioTts } from "@/lib/putar-tts-klien";

const fontAnak = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const ENAM_JAM = 6 * 60 * 60 * 1000;
const KUNCI_PETA = "igil-aktivasi-otak-v1";

function halamanGerbang(pathname: string): boolean {
  return pathname === "/ruang-belajar";
}

function bacaPeta(): Record<string, number> {
  try {
    const mentah = window.localStorage.getItem(KUNCI_PETA);
    if (!mentah) return {};
    const data = JSON.parse(mentah) as Record<string, number>;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function perluAktivasi(akun: string): boolean {
  const terakhir = bacaPeta()[akun];
  if (typeof terakhir !== "number") return true;
  return Date.now() - terakhir >= ENAM_JAM;
}

function catatAktivasi(akun: string) {
  const peta = bacaPeta();
  peta[akun] = Date.now();
  window.localStorage.setItem(KUNCI_PETA, JSON.stringify(peta));
}

async function kunciAkun(): Promise<string> {
  try {
    const res = await fetch("/api/auth/saya", { cache: "no-store" });
    const json = (await res.json()) as { masuk?: boolean; id?: string | null };
    if (json.masuk && json.id) return `akun:${json.id}`;
  } catch {
    // Pakai profil siswa bila sesi akun tidak tersedia.
  }
  const profil = bacaProgres().profil;
  const nama = profil.nama.trim().toLowerCase() || "tamu";
  const kelas = profil.kelas.trim().toLowerCase() || "umum";
  return `profil:${nama}|${kelas}`;
}

export default function AktivasiOtakGerbang() {
  const pathname = usePathname();
  const [akun, setAkun] = useState("");
  const [tampil, setTampil] = useState(false);
  const [apel, setApel] = useState<number[]>([]);
  const [jeruk, setJeruk] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const giliran = useRef(0);

  useEffect(() => {
    if (!halamanGerbang(pathname)) {
      setTampil(false);
      return;
    }
    let batal = false;
    void kunciAkun().then((kunci) => {
      if (batal) return;
      setAkun(kunci);
      setTampil(perluAktivasi(kunci));
    });
    return () => {
      batal = true;
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const bicara = (teks: string) => {
    const naskah = teks.replace(/\s+/g, " ").trim();
    if (!naskah) return;
    const urutan = ++giliran.current;
    const profil = bacaProgres().profil;
    const kelamin = normalisasiKelaminGuru(profil.guruKelamin);
    const kelas = profil.kelas.trim() || "1 SD";
    hentikanAudioGuruAktif();
    audioRef.current?.pause();
    void mintaAudioTts(naskah, kelamin, kelas).then((hasil) => {
      if (urutan !== giliran.current) return;
      if (!hasil?.url) {
        const guru = profilGuru(kelas, kelamin);
        const ucapan = new SpeechSynthesisUtterance(naskah);
        ucapan.lang = "id-ID";
        ucapan.rate = guru.laju;
        ucapan.pitch = guru.nada;
        window.speechSynthesis.speak(ucapan);
        return;
      }
      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;
      audio.src = hasil.url;
      void audio.play().catch(() => undefined);
    });
  };

  const selesai = () => {
    if (akun) {
      try {
        catatAktivasi(akun);
      } catch {
        // Mode privat tidak menyimpan jejak.
      }
    }
    audioRef.current?.pause();
    setTampil(false);
    bicara("Otakmu sudah segar dan siap belajar di IGIL.");
  };

  if (!tampil || !halamanGerbang(pathname)) return null;

  const total = apel.length + jeruk.length;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-white text-[#334155] p-4 md:p-8 ${fontAnak.className}`}>
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-between gap-6">
        <div className="w-full space-y-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 rounded-3xl bg-[#1C01A5] p-5 text-white shadow-lg md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0AB00] text-3xl font-black text-[#1C01A5]">
                🦉
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#F0AB00] md:text-sm">
                  Aktivasi otak
                </div>
                <h1 className="text-xl font-black text-white md:text-2xl">
                  Senam Otak &amp; Irama Buah Kebun Kakek
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                bicara(
                  "Selamat datang di IGIL! Sentuh 5 Apel Merah dengan tangan kirimu dan 5 Jeruk Kuning dengan tangan kananmu sambil berhitung lantang!",
                )
              }
              className="shrink-0 rounded-2xl bg-[#F0AB00] px-4 py-2.5 text-xs font-black text-[#1C01A5] md:text-sm"
            >
              Dengarkan Panduan IGIL
            </button>
          </div>

          <div className="w-full overflow-x-auto pb-3">
            <div className="flex min-w-[680px] flex-nowrap gap-5">
              <div className="w-1/2 space-y-4 rounded-3xl border-2 border-[#EF4444] bg-[#FEE2E2] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-[#991B1B] md:text-lg">
                    Tangan Kiri: Sentuh 5 Apel Merah
                  </h2>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#991B1B]">
                    {apel.length} / 5 Apel
                  </span>
                </div>
                <p className="text-xs text-[#334155] md:text-sm">
                  Sentuh buah apel satu per satu untuk mengaktifkan fokus visual dan motorik kirimu!
                </p>
                <div className="flex items-center justify-between gap-2 pt-2">
                  {[1, 2, 3, 4, 5].map((id) => {
                    const aktif = apel.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          if (aktif) return;
                          const next = [...apel, id];
                          setApel(next);
                          bicara(`Apel ${next.length}`);
                        }}
                        className={`flex h-16 w-14 flex-col items-center justify-center rounded-2xl border-2 font-black ${
                          aktif
                            ? "scale-105 border-[#991B1B] bg-[#EF4444] text-white"
                            : "border-[#EF4444] bg-white text-[#334155]"
                        }`}
                      >
                        <span className="text-2xl">🍎</span>
                        <span className="text-xs">{aktif ? id : "?"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-1/2 space-y-4 rounded-3xl border-2 border-[#F59E0B] bg-[#FEF3C7] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-[#92400E] md:text-lg">
                    Tangan Kanan: Sentuh 5 Jeruk Kuning
                  </h2>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#92400E]">
                    {jeruk.length} / 5 Jeruk
                  </span>
                </div>
                <p className="text-xs text-[#334155] md:text-sm">
                  Sentuh buah jeruk satu per satu untuk menyeimbangkan koordinasi otak kanan dan kirimu!
                </p>
                <div className="flex items-center justify-between gap-2 pt-2">
                  {[1, 2, 3, 4, 5].map((id) => {
                    const aktif = jeruk.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          if (aktif) return;
                          const next = [...jeruk, id];
                          setJeruk(next);
                          bicara(`Jeruk ${next.length}`);
                        }}
                        className={`flex h-16 w-14 flex-col items-center justify-center rounded-2xl border-2 font-black ${
                          aktif
                            ? "scale-105 border-[#92400E] bg-[#F59E0B] text-white"
                            : "border-[#F59E0B] bg-white text-[#334155]"
                        }`}
                      >
                        <span className="text-2xl">🍊</span>
                        <span className="text-xs">{aktif ? id : "?"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-[#3B82F6] bg-[#DBEAFE] p-5 sm:flex-row">
          <div className="text-sm font-black text-[#1E3A8A] md:text-base">
            Status aktivasi otak: {total} / 10 buah tersentuh{" "}
            {total === 10
              ? "— Luar biasa! Otak kiri dan kanan siap."
              : "Sentuh buah di atas, atau langsung lanjut belajar."}
          </div>
          <button
            type="button"
            onClick={selesai}
            className="shrink-0 rounded-2xl border-2 border-[#F0AB00] bg-[#1C01A5] px-8 py-3.5 text-base font-black text-[#F0AB00] shadow-md"
          >
            Lanjut belajar
          </button>
        </div>
      </div>
    </div>
  );
}
