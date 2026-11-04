"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Nunito } from "next/font/google";
import { bacaProgres } from "@/lib/progres";

const fontAnak = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const ENAM_JAM = 6 * 60 * 60 * 1000;
const KUNCI_PETA = "igil-aktivasi-otak-v1";

type IdMain = "berkata" | "kartu" | "balon";

const PILIHAN_MAIN: { id: IdMain; nama: string }[] = [
  { id: "berkata", nama: "IGIL Berkata" },
  { id: "kartu", nama: "Kartu Kembar" },
  { id: "balon", nama: "Jaga Balon" },
];

let audioCtx: AudioContext | null = null;

function bunyi(hz: number, dur = 0.14) {
  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  if (!audioCtx) audioCtx = new AudioCtx();
  void audioCtx.resume();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(hz, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + dur);
}

function halamanGerbang(pathname: string): boolean {
  return pathname === "/ruang-belajar";
}

type JejakSesi = {
  waktu: number;
  main: number;
};

function bacaPeta(): Record<string, JejakSesi> {
  try {
    const mentah = window.localStorage.getItem(KUNCI_PETA);
    if (!mentah) return {};
    const data = JSON.parse(mentah) as Record<string, unknown>;
    if (!data || typeof data !== "object") return {};
    const peta: Record<string, JejakSesi> = {};
    for (const [akun, nilai] of Object.entries(data)) {
      const jejak = normalisasiJejak(nilai);
      if (jejak) peta[akun] = jejak;
    }
    return peta;
  } catch {
    return {};
  }
}

function normalisasiJejak(nilai: unknown): JejakSesi | null {
  if (typeof nilai === "number" && Number.isFinite(nilai)) {
    return { waktu: nilai, main: -1 };
  }
  if (!nilai || typeof nilai !== "object") return null;
  const waktu = (nilai as { waktu?: unknown }).waktu;
  const main = (nilai as { main?: unknown }).main;
  if (typeof waktu !== "number" || !Number.isFinite(waktu)) return null;
  if (typeof main !== "number" || !Number.isInteger(main)) return null;
  return { waktu, main };
}

function perluAktivasi(akun: string): boolean {
  const jejak = bacaPeta()[akun];
  if (!jejak) return true;
  return Date.now() - jejak.waktu >= ENAM_JAM;
}

function mainSesiIni(akun: string): IdMain {
  const terakhir = bacaPeta()[akun]?.main ?? -1;
  const indeks = (terakhir + 1) % PILIHAN_MAIN.length;
  return PILIHAN_MAIN[indeks].id;
}

function catatAktivasi(akun: string, main: IdMain) {
  const peta = bacaPeta();
  const indeks = PILIHAN_MAIN.findIndex((item) => item.id === main);
  peta[akun] = { waktu: Date.now(), main: indeks < 0 ? 0 : indeks };
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

const GERAKAN = [
  { id: "bintang", nama: "Tepuk bintang", emoji: "⭐" },
  { id: "lompat", nama: "Lompat", emoji: "🦘" },
  { id: "putar", nama: "Putar", emoji: "🌀" },
  { id: "duduk", nama: "Duduk", emoji: "🪑" },
] as const;

type IdGerakan = (typeof GERAKAN)[number]["id"];

type Perintah = {
  berkata: boolean;
  gerakan: IdGerakan;
};

function perintahBaru(sebelum?: Perintah): Perintah {
  let berikutnya: Perintah = {
    berkata: Math.random() < 0.55,
    gerakan: GERAKAN[Math.floor(Math.random() * GERAKAN.length)].id,
  };
  let jaga = 0;
  while (
    sebelum &&
    berikutnya.berkata === sebelum.berkata &&
    berikutnya.gerakan === sebelum.gerakan &&
    jaga < 6
  ) {
    berikutnya = {
      berkata: Math.random() < 0.55,
      gerakan: GERAKAN[Math.floor(Math.random() * GERAKAN.length)].id,
    };
    jaga += 1;
  }
  return berikutnya;
}

function jawabanBerkataBenar(perintah: Perintah, pilihan: string) {
  if (perintah.berkata) return pilihan === perintah.gerakan;
  return pilihan === "diam";
}

function MainBerkata() {
  const hidup = useRef(true);
  const timer = useRef(0);
  const kunci = useRef(false);
  const awal = useRef(perintahBaru());
  const perintahRef = useRef(awal.current);
  const rondeRef = useRef(1);
  const [perintah, setPerintah] = useState(awal.current);
  const [ronde, setRonde] = useState(1);
  const [tepat, setTepat] = useState(0);
  const [hasil, setHasil] = useState<"benar" | "salah" | null>(null);
  const [pilihan, setPilihan] = useState<string | null>(null);
  const [selesaiMain, setSelesaiMain] = useState(false);

  useEffect(() => {
    hidup.current = true;
    return () => {
      hidup.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const gerakan = GERAKAN.find((item) => item.id === perintah.gerakan) ?? GERAKAN[0];

  const pilih = (id: string) => {
    if (kunci.current || selesaiMain) return;
    kunci.current = true;
    const benar = jawabanBerkataBenar(perintahRef.current, id);
    setPilihan(id);
    setHasil(benar ? "benar" : "salah");
    if (benar) setTepat((nilai) => nilai + 1);
    bunyi(benar ? 680 : 170, benar ? 0.1 : 0.16);
    timer.current = window.setTimeout(() => {
      if (!hidup.current) return;
      setHasil(null);
      setPilihan(null);
      kunci.current = false;
      if (rondeRef.current >= 5) {
        setSelesaiMain(true);
        bunyi(784, 0.18);
        return;
      }
      rondeRef.current += 1;
      setRonde(rondeRef.current);
      const next = perintahBaru(perintahRef.current);
      perintahRef.current = next;
      setPerintah(next);
    }, 700);
  };

  const ulang = () => {
    window.clearTimeout(timer.current);
    const next = perintahBaru();
    perintahRef.current = next;
    rondeRef.current = 1;
    kunci.current = false;
    setPerintah(next);
    setRonde(1);
    setTepat(0);
    setHasil(null);
    setPilihan(null);
    setSelesaiMain(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-[#334155] md:text-base">
        Ada tulisan IGIL berkata? Tiru gerakannya. Tidak ada? Tekan Diam.
      </p>
      <div className="rounded-3xl bg-[#1C01A5] px-5 py-6 text-center text-white">
        <p className={`text-sm font-black ${perintah.berkata ? "text-[#F0AB00]" : "text-white/70"}`}>
          {perintah.berkata ? "IGIL berkata" : "Tidak ada kata ajaib"}
        </p>
        <p className="mt-2 text-5xl" aria-hidden>
          {gerakan.emoji}
        </p>
        <p className="mt-1 text-2xl font-black">{gerakan.nama}</p>
        <p className="mt-3 text-xs font-bold text-white/80">
          Giliran {ronde} dari 5 · Tepat {tepat}
        </p>
      </div>
      {selesaiMain ? (
        <div className="rounded-3xl bg-[#7FCB96]/30 px-4 py-5 text-center">
          <p className="text-lg font-black text-[#1C01A5]">Permainan selesai. Asyik!</p>
          <button
            type="button"
            onClick={ulang}
            className="mt-3 rounded-2xl bg-[#F0AB00] px-5 py-2.5 text-sm font-black text-[#1C01A5]"
          >
            Main lagi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {GERAKAN.map((item) => {
            const aktif = pilihan === item.id;
            const warna =
              aktif && hasil === "benar"
                ? "border-[#1C01A5] bg-[#7FCB96]"
                : aktif && hasil === "salah"
                  ? "border-[#1C01A5] bg-[#E98989]"
                  : "border-[#1C01A5]/20 bg-white";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => pilih(item.id)}
                className={`rounded-2xl border-2 px-3 py-4 text-base font-black text-[#1C01A5] ${warna}`}
              >
                <span className="mr-1 text-2xl" aria-hidden>
                  {item.emoji}
                </span>
                {item.nama}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => pilih("diam")}
            className={`col-span-2 rounded-2xl border-2 px-3 py-4 text-base font-black text-[#1C01A5] ${
              pilihan === "diam" && hasil === "benar"
                ? "border-[#1C01A5] bg-[#7FCB96]"
                : pilihan === "diam" && hasil === "salah"
                  ? "border-[#1C01A5] bg-[#E98989]"
                  : "border-[#1C01A5] bg-[#F0AB00]"
            }`}
          >
            Diam
          </button>
        </div>
      )}
      {hasil && !selesaiMain ? (
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {hasil === "benar" ? "Tepat!" : "Hampir! Lihat lagi kata ajaibnya."}
        </p>
      ) : null}
    </div>
  );
}

const HEWAN = [
  { id: "burung", nama: "Burung hantu", emoji: "🦉" },
  { id: "kucing", nama: "Kucing", emoji: "🐱" },
  { id: "katak", nama: "Katak", emoji: "🐸" },
  { id: "ikan", nama: "Ikan", emoji: "🐟" },
] as const;

type KartuHewan = {
  kunci: string;
  hewan: (typeof HEWAN)[number]["id"];
  nama: string;
  emoji: string;
};

function dekBaru(): KartuHewan[] {
  const dek: KartuHewan[] = HEWAN.flatMap((hewan) =>
    [0, 1].map((salinan) => ({
      kunci: `${hewan.id}-${salinan}`,
      hewan: hewan.id,
      nama: hewan.nama,
      emoji: hewan.emoji,
    })),
  );
  for (let i = dek.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const simpan = dek[i];
    dek[i] = dek[j];
    dek[j] = simpan;
  }
  return dek;
}

function MainKartu() {
  const hidup = useRef(true);
  const timer = useRef(0);
  const [kartu, setKartu] = useState<KartuHewan[]>(() => dekBaru());
  const [terbuka, setTerbuka] = useState<string[]>([]);
  const [cocok, setCocok] = useState<string[]>([]);
  const [kunci, setKunci] = useState(false);

  useEffect(() => {
    hidup.current = true;
    return () => {
      hidup.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const menang = cocok.length === kartu.length;

  const buka = (item: KartuHewan) => {
    if (kunci || cocok.includes(item.kunci) || terbuka.includes(item.kunci)) return;
    const berikutnya = [...terbuka, item.kunci];
    setTerbuka(berikutnya);
    bunyi(520, 0.08);
    if (berikutnya.length < 2) return;
    const [a, b] = berikutnya;
    const kartuA = kartu.find((kartuItem) => kartuItem.kunci === a);
    const kartuB = kartu.find((kartuItem) => kartuItem.kunci === b);
    const sama = Boolean(kartuA && kartuB && kartuA.hewan === kartuB.hewan);
    setKunci(true);
    timer.current = window.setTimeout(() => {
      if (!hidup.current) return;
      if (sama) {
        setCocok((daftar) => [...daftar, a, b]);
        bunyi(740, 0.12);
      }
      setTerbuka([]);
      setKunci(false);
    }, sama ? 380 : 750);
  };

  const acakLagi = () => {
    window.clearTimeout(timer.current);
    setKartu(dekBaru());
    setTerbuka([]);
    setCocok([]);
    setKunci(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-[#334155] md:text-base">
        Buka dua kartu. Cari gambar hewan yang sama.
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {kartu.map((item) => {
          const muka = terbuka.includes(item.kunci) || cocok.includes(item.kunci);
          return (
            <button
              key={item.kunci}
              type="button"
              onClick={() => buka(item)}
              aria-label={muka ? item.nama : "Kartu tertutup"}
              className={`flex h-20 items-center justify-center rounded-2xl border-2 text-3xl sm:h-24 ${
                muka
                  ? "border-[#F0AB00] bg-white"
                  : "border-[#1C01A5] bg-[#1C01A5] text-[#F0AB00]"
              }`}
            >
              {muka ? item.emoji : "★"}
            </button>
          );
        })}
      </div>
      {menang ? (
        <div className="rounded-3xl bg-[#7FCB96]/30 px-4 py-4 text-center">
          <p className="text-lg font-black text-[#1C01A5]">Semua kembar ketemu!</p>
          <button
            type="button"
            onClick={acakLagi}
            className="mt-3 rounded-2xl bg-[#F0AB00] px-5 py-2.5 text-sm font-black text-[#1C01A5]"
          >
            Acak lagi
          </button>
        </div>
      ) : (
        <p className="text-center text-sm font-bold text-[#334155]">
          Pasangan ketemu: {cocok.length / 2} dari 4
        </p>
      )}
    </div>
  );
}

function MainBalon() {
  const y = useRef(6);
  const jatuhRef = useRef(false);
  const [posisi, setPosisi] = useState(6);
  const [tepukan, setTepukan] = useState(0);
  const [jatuh, setJatuh] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lalu = performance.now();
    const loop = (now: number) => {
      const detik = Math.min(0.05, (now - lalu) / 1000);
      lalu = now;
      if (!jatuhRef.current) {
        y.current += 9 * detik;
        if (y.current >= 72) {
          y.current = 72;
          jatuhRef.current = true;
          setJatuh(true);
          bunyi(120, 0.22);
        }
        setPosisi(y.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tepuk = () => {
    if (jatuhRef.current) return;
    y.current = Math.max(0, y.current - 24);
    setPosisi(y.current);
    setTepukan((nilai) => nilai + 1);
    bunyi(560, 0.07);
  };

  const ulang = () => {
    y.current = 6;
    jatuhRef.current = false;
    setPosisi(6);
    setTepukan(0);
    setJatuh(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-[#334155] md:text-base">
        Tepuk balon supaya tetap melayang. Jangan sampai jatuh.
      </p>
      <div className="relative h-80 overflow-hidden rounded-3xl bg-[#EEF2FF]">
        <button
          type="button"
          onClick={tepuk}
          disabled={jatuh}
          aria-label="Tepuk balon"
          className="absolute inset-0"
        />
        <div
          className="pointer-events-none absolute left-1/2 w-24 -translate-x-1/2"
          style={{ top: `${posisi}%` }}
        >
          <div className="relative mx-auto h-24 w-20 rounded-full bg-[#E98989] shadow-md">
            <span className="absolute left-3 top-3 h-5 w-3 rounded-full bg-white/70" />
          </div>
          <div className="mx-auto -mt-1 h-3 w-3 rotate-45 bg-[#E98989]" />
          <div className="mx-auto h-12 w-px bg-[#334155]/30" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-[#1C01A5]/10" />
        <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-[#1C01A5]">
          Tepukan {tepukan}
        </p>
        {jatuh ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80">
            <p className="text-lg font-black text-[#1C01A5]">Balon jatuh.</p>
            <button
              type="button"
              onClick={ulang}
              className="rounded-2xl bg-[#F0AB00] px-5 py-2.5 text-sm font-black text-[#1C01A5]"
            >
              Main lagi
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AktivasiOtakGerbang() {
  const pathname = usePathname();
  const [akun, setAkun] = useState("");
  const [tampil, setTampil] = useState(false);
  const [main, setMain] = useState<IdMain>("berkata");

  useEffect(() => {
    if (!halamanGerbang(pathname)) {
      setTampil(false);
      return;
    }
    let batal = false;
    void kunciAkun().then((kunci) => {
      if (batal) return;
      setAkun(kunci);
      setMain(mainSesiIni(kunci));
      setTampil(perluAktivasi(kunci));
    });
    return () => {
      batal = true;
    };
  }, [pathname]);

  const selesai = () => {
    if (akun) {
      try {
        catatAktivasi(akun, main);
      } catch {
        // Mode privat tidak menyimpan jejak.
      }
    }
    setTampil(false);
  };

  if (!tampil || !halamanGerbang(pathname)) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-white text-[#334155] ${fontAnak.className}`}>
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <div className="flex items-center gap-3 rounded-3xl bg-[#1C01A5] p-5 text-white shadow-lg">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0AB00] text-3xl" aria-hidden>
              🦉
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#F0AB00]">Aktivasi otak</p>
              <h1 className="text-xl font-black text-white md:text-2xl">Main santai sebelum belajar</h1>
              <p className="mt-1 text-sm font-bold text-white/80">
                {PILIHAN_MAIN.find((item) => item.id === main)?.nama}. Bukan soal pelajaran.
              </p>
            </div>
          </div>

          {main === "berkata" ? <MainBerkata /> : null}
          {main === "kartu" ? <MainKartu /> : null}
          {main === "balon" ? <MainBalon /> : null}
        </div>
      </div>
      <div className="border-t border-[#1C01A5]/10 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm font-bold text-[#1C01A5]">Boleh berhenti kapan saja, lalu lanjut belajar.</p>
          <button
            type="button"
            onClick={selesai}
            className="shrink-0 rounded-2xl border-2 border-[#F0AB00] bg-[#1C01A5] px-8 py-3.5 text-base font-black text-[#F0AB00]"
          >
            Lanjut belajar
          </button>
        </div>
      </div>
    </div>
  );
}
