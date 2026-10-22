"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TutorEventType =
  | "OBJECT_REMOVED"
  | "ZERO_REMAINING"
  | "FROG_JUMP_COMPLETED"
  | "COMPARE_DIFFERENCE"
  | "QUIZ_ANSWERED"
  | "QUIZ_COMPLETED";

export type TutorEventPayload = {
  pesan: string;
  [kunci: string]: unknown;
};

export type TutorEventMasuk = {
  waktu: string;
  jenis: string;
  payload: TutorEventPayload;
};

type TabLab = "ambil" | "katak" | "banding" | "kuis";

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "ambil", ikon: "🍎", label: "Ambil Benda" },
  { id: "katak", ikon: "🐸", label: "Lompat Katak" },
  { id: "banding", ikon: "🐰", label: "Bandingkan Selisih" },
  { id: "kuis", ikon: "⭐", label: "Kuis" },
];

const SOAL_KUIS = [
  {
    id: "q1",
    tanya: "Ada 8 balon. 3 balon pecah. Berapa balon yang masih utuh?",
    hint: "Hitung balon yang masih utuh. Jangan hitung yang pecah.",
    kunci: "5",
    opsi: ["4", "5", "6"],
  },
  {
    id: "q2",
    tanya: "Katak mulai di angka 9, lalu lompat mundur 4 langkah. Di angka berapa ia mendarat?",
    hint: "Tiap lompat ke kiri mengurangi 1. Dari 9 ke 8, 7, 6, lalu 5.",
    kunci: "5",
    opsi: ["4", "5", "6"],
  },
  {
    id: "q3",
    tanya: "Ada 5 kucing dan 3 mangkuk susu. Berapa yang tidak mendapat pasangan?",
    hint: "Pasangkan satu-satu. Yang tidak berpasangan itulah selisihnya.",
    kunci: "2",
    opsi: ["1", "2", "3"],
  },
  {
    id: "q4",
    tanya: "Angka berapa yang hilang? 6 − ? = 2",
    hint: "Dari 6, berapa yang harus diambil supaya sisa 2?",
    kunci: "4",
    opsi: ["3", "4", "5"],
  },
] as const;

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const ucap = new SpeechSynthesisUtterance(teks);
  ucap.lang = "id-ID";
  ucap.rate = 0.92;
  window.speechSynthesis.speak(ucap);
}

function clamp(nilai: number, min: number, max: number) {
  return Math.max(min, Math.min(max, nilai));
}

function ApelSvg({ coret = false, ukuran = 44 }: { coret?: boolean; ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 44 44" aria-hidden>
      <ellipse cx="22" cy="25" rx="14" ry="15" fill="#EF4444" stroke="#991b1b" strokeWidth="2" />
      <path d="M22 12 C22 7 27 6 29 9" stroke="#166534" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="16" cy="20" rx="3.2" ry="4.2" fill="#fecaca" />
      {coret ? <line x1="7" y1="8" x2="37" y2="36" stroke="#334155" strokeWidth="3.2" strokeLinecap="round" /> : null}
    </svg>
  );
}

function KatakSvg({ ukuran = 36 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 40 40" aria-hidden>
      <ellipse cx="20" cy="24" rx="14" ry="11" fill="#22C55E" stroke="#14532d" strokeWidth="2" />
      <circle cx="12" cy="14" r="6" fill="#4ADE80" stroke="#14532d" strokeWidth="2" />
      <circle cx="28" cy="14" r="6" fill="#4ADE80" stroke="#14532d" strokeWidth="2" />
      <circle cx="12" cy="14" r="2.2" fill="#0f172a" />
      <circle cx="28" cy="14" r="2.2" fill="#0f172a" />
      <ellipse cx="20" cy="27" rx="5" ry="2.4" fill="#166534" />
    </svg>
  );
}

function KelinciSvg({ ukuran = 40 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 40 40" aria-hidden>
      <ellipse cx="14" cy="10" rx="4" ry="10" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <ellipse cx="22" cy="10" rx="4" ry="10" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <circle cx="20" cy="24" r="11" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
      <circle cx="16" cy="22" r="1.8" fill="#0f172a" />
      <circle cx="24" cy="22" r="1.8" fill="#0f172a" />
      <ellipse cx="20" cy="27" rx="3" ry="2" fill="#FB7185" />
    </svg>
  );
}

function WortelSvg({ ukuran = 36 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 36 36" aria-hidden>
      <path d="M18 8 L28 30 H8 Z" fill="#F97316" stroke="#9a3412" strokeWidth="2" />
      <path d="M18 4 L14 10 H22 Z" fill="#22C55E" stroke="#166534" strokeWidth="1.6" />
    </svg>
  );
}

function BalonSvg({ pecah = false, ukuran = 36 }: { pecah?: boolean; ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 36 40" aria-hidden>
      {pecah ? (
        <>
          <path d="M10 8 L18 16 L8 20 L16 24 L10 32" stroke="#94a3b8" strokeWidth="2" fill="none" />
          <path d="M26 8 L18 16 L28 20 L20 24 L26 32" stroke="#94a3b8" strokeWidth="2" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="18" cy="16" rx="11" ry="13" fill="#38BDF8" stroke="#0369a1" strokeWidth="2" />
          <path d="M18 29 L16 34 H20 Z" fill="#0369a1" />
        </>
      )}
    </svg>
  );
}

function KucingSvg({ ukuran = 36 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 36 36" aria-hidden>
      <path d="M8 14 L12 6 L16 14 Z" fill="#F59E0B" stroke="#92400e" strokeWidth="1.6" />
      <path d="M20 14 L24 6 L28 14 Z" fill="#F59E0B" stroke="#92400e" strokeWidth="1.6" />
      <circle cx="18" cy="20" r="11" fill="#FBBF24" stroke="#92400e" strokeWidth="2" />
      <circle cx="14" cy="18" r="1.7" fill="#0f172a" />
      <circle cx="22" cy="18" r="1.7" fill="#0f172a" />
      <path d="M15 24 Q18 26 21 24" stroke="#92400e" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function MangkukSvg({ ukuran = 36 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 36 36" aria-hidden>
      <ellipse cx="18" cy="14" rx="12" ry="5" fill="#FEF3C7" stroke="#92400e" strokeWidth="2" />
      <path d="M6 14 Q8 28 18 28 Q28 28 30 14" fill="#F59E0B" stroke="#92400e" strokeWidth="2" />
    </svg>
  );
}

function TombolAngka({
  label,
  onKurang,
  onTambah,
  nilai,
  min,
  max,
}: {
  label: string;
  onKurang: () => void;
  onTambah: () => void;
  nilai: number;
  min: number;
  max: number;
}) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onKurang}
          disabled={nilai <= min}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-2xl font-black text-white disabled:opacity-40"
          aria-label={`Kurangi ${label}`}
        >
          −
        </button>
        <p className="min-w-10 text-center text-3xl font-black text-indigo-800">{nilai}</p>
        <button
          type="button"
          onClick={onTambah}
          disabled={nilai >= max}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-black text-white disabled:opacity-40"
          aria-label={`Tambah ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function BingkaiSepuluh({
  awal,
  diambil,
}: {
  awal: number;
  diambil: number;
}) {
  const sisa = Math.max(0, awal - diambil);
  return (
    <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/70 p-3">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-indigo-600">Bingkai 10</p>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, i) => {
          const terpakai = i < awal;
          const sisaTitik = i < sisa;
          const diambilTitik = terpakai && !sisaTitik;
          return (
            <div
              key={i}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-slate-300 bg-white"
            >
              {sisaTitik ? (
                <span className="h-6 w-6 rounded-full bg-rose-500 shadow-sm" />
              ) : diambilTitik ? (
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="h-6 w-6 rounded-full bg-slate-300" />
                  <span className="absolute h-0.5 w-7 rotate-45 bg-slate-600" />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KalimatMatematika({ a, b, hasil }: { a: number; b: number; hasil: number }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-amber-200 bg-amber-50 px-3 py-3">
      <p className="w-full text-center text-[11px] font-bold uppercase tracking-widest text-amber-700">Kalimat Matematika</p>
      <span className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-black text-white">{a}</span>
      <span className="text-3xl font-black text-rose-500">−</span>
      <span className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-rose-500 text-2xl font-black text-white">{b}</span>
      <span className="text-3xl font-black text-slate-500">=</span>
      <span className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-black text-white">{hasil}</span>
    </div>
  );
}

export default function SimulasiMtk1Bab3({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("ambil");
  const [tampilBingkai, setTampilBingkai] = useState(true);
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanLayar, setPesanLayar] = useState("Ambil apel, lompat mundur, atau pasangkan. IGIL akan ikut bicara.");
  const sudahLulus = useRef(false);

  const [awalApel, setAwalApel] = useState(7);
  const [diKeranjang, setDiKeranjang] = useState<number[]>([]);

  const [awalKatak, setAwalKatak] = useState(8);
  const [lompatKatak, setLompatKatak] = useState(3);
  const [posisiKatak, setPosisiKatak] = useState(8);
  const [jejak, setJejak] = useState<{ dari: number; ke: number; n: number }[]>([]);
  const [katakJalan, setKatakJalan] = useState(false);

  const [kelinci, setKelinci] = useState(6);
  const [wortel, setWortel] = useState(4);
  const [terpasang, setTerpasang] = useState(false);

  const [kalimatKuis, setKalimatKuis] = useState({ a: 8, b: 3, hasil: 5 });

  const kirimEvent = useCallback(
    (jenis: TutorEventType, payload: TutorEventPayload, bicara = true) => {
      setLog((lama) => [{ waktu: jamSekarang(), jenis, payload }, ...lama].slice(0, 12));
      setPesanLayar(payload.pesan);
      onTutorEvent?.(jenis, payload);
      if (bicara) ucapkan(payload.pesan);
    },
    [onTutorEvent],
  );

  const tandaiSelesai = useCallback(
    (catatan: string) => {
      if (sudahLulus.current) return;
      sudahLulus.current = true;
      kirimEvent("QUIZ_COMPLETED", { pesan: catatan });
      onBenar?.();
    },
    [kirimEvent, onBenar],
  );

  const kalimat = useMemo(() => {
    if (tab === "ambil") {
      const b = diKeranjang.length;
      return { a: awalApel, b, hasil: awalApel - b };
    }
    if (tab === "katak") {
      const b = awalKatak - posisiKatak;
      return { a: awalKatak, b, hasil: posisiKatak };
    }
    if (tab === "banding") {
      const besar = Math.max(kelinci, wortel);
      const kecil = Math.min(kelinci, wortel);
      return { a: besar, b: kecil, hasil: besar - kecil };
    }
    return kalimatKuis;
  }, [tab, awalApel, diKeranjang, awalKatak, posisiKatak, kelinci, wortel, kalimatKuis]);

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-rose-100 bg-white shadow-xl shadow-rose-100/50">
      <style>{`
        @keyframes igil-pulse-ambil {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @keyframes igil-katak-loncat {
          0% { transform: translateY(0); }
          40% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }
        .igil-pulse-ambil { animation: igil-pulse-ambil 0.35s ease-out; }
        .igil-katak-loncat { animation: igil-katak-loncat 0.4s ease-out; }
      `}</style>

      <div className="bg-gradient-to-r from-rose-500 to-orange-400 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Pengurangan sampai dengan 10</h2>
        <p className="mt-1 text-sm text-rose-50">Ambil, lompat mundur, dan bandingkan sisa bersama IGIL.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-rose-50 p-2 sm:grid-cols-4">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-sm font-bold transition ${
              tab === item.id ? "bg-white text-rose-700 shadow-sm" : "text-rose-500 hover:bg-white/60"
            }`}
          >
            <span className="font-normal" aria-hidden>{item.ikon}</span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-gradient-to-b from-white to-orange-50/40 p-4 sm:p-5">
        <p className="min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          <span className="font-normal">🦉</span> {pesanLayar}
        </p>

        <KalimatMatematika a={kalimat.a} b={kalimat.b} hasil={kalimat.hasil} />

        <button
          type="button"
          onClick={() => setTampilBingkai((n) => !n)}
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 px-4 text-sm font-bold ${
            tampilBingkai ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          {tampilBingkai ? "🔢 Tampilkan Bingkai 10: NYALA" : "Tampilkan Bingkai 10: MATI"}
        </button>

        {tampilBingkai ? <BingkaiSepuluh awal={kalimat.a} diambil={kalimat.b} /> : null}

        {tab === "ambil" ? (
          <TabAmbil
            awal={awalApel}
            setAwal={setAwalApel}
            diKeranjang={diKeranjang}
            setDiKeranjang={setDiKeranjang}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "katak" ? (
          <TabKatak
            awal={awalKatak}
            setAwal={setAwalKatak}
            lompat={lompatKatak}
            setLompat={setLompatKatak}
            posisi={posisiKatak}
            setPosisi={setPosisiKatak}
            jejak={jejak}
            setJejak={setJejak}
            jalan={katakJalan}
            setJalan={setKatakJalan}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "banding" ? (
          <TabBanding
            kelinci={kelinci}
            setKelinci={setKelinci}
            wortel={wortel}
            setWortel={setWortel}
            terpasang={terpasang}
            setTerpasang={setTerpasang}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "kuis" ? (
          <TabKuis kirimEvent={kirimEvent} onLulus={tandaiSelesai} onKalimat={setKalimatKuis} />
        ) : null}
      </div>

      <div className="border-t-2 border-slate-200 bg-slate-900 p-4 text-slate-100">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-widest text-amber-300">Simulasi Log Tutor IGIL</p>
          <button
            type="button"
            onClick={() => setLog([])}
            className="min-h-12 rounded-xl bg-slate-700 px-3 text-xs font-bold text-white hover:bg-slate-600"
          >
            Hapus log
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada event. Lakukan aksi di lab, pesan `onTutorEvent` akan muncul di sini.</p>
        ) : (
          <ul className="max-h-44 space-y-2 overflow-y-auto pr-1">
            {log.map((baris, i) => (
              <li key={`${baris.waktu}-${baris.jenis}-${i}`} className="rounded-xl bg-slate-800 px-3 py-2">
                <p className="text-[11px] font-bold text-emerald-300">
                  {baris.waktu} · {baris.jenis}
                </p>
                <p className="text-sm text-slate-100">{baris.payload.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TabAmbil({
  awal,
  setAwal,
  diKeranjang,
  setDiKeranjang,
  kirimEvent,
}: {
  awal: number;
  setAwal: (n: number) => void;
  diKeranjang: number[];
  setDiKeranjang: (n: number[] | ((lama: number[]) => number[])) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const sudahNol = useRef(false);
  const apelMeja = Array.from({ length: awal }, (_, i) => i).filter((id) => !diKeranjang.includes(id));

  const ubahAwal = (n: number) => {
    setAwal(n);
    setDiKeranjang([]);
    sudahNol.current = false;
  };

  const pindahKeKeranjang = (id: number) => {
    if (diKeranjang.includes(id)) return;
    const berikutnya = [...diKeranjang, id];
    setDiKeranjang(berikutnya);
    const remaining = awal - berikutnya.length;
    kirimEvent("OBJECT_REMOVED", {
      pesan: `Kamu mengambil ${berikutnya.length} apel dari ${awal} apel. Lihat di meja dan Bingkai 10, sekarang tersisa ${remaining} apel!`,
      initial: awal,
      removed: berikutnya.length,
      remaining,
    });
    if (remaining === 0 && !sudahNol.current) {
      sudahNol.current = true;
      kirimEvent("ZERO_REMAINING", {
        pesan: "Wah, semua apelnya masuk ke keranjang! Kalau dikurangi sampai habis, sisanya adalah 0.",
        initial: awal,
        removed: awal,
        remaining: 0,
      });
    }
  };

  const kembalikan = (id: number) => {
    setDiKeranjang((lama) => lama.filter((x) => x !== id));
    sudahNol.current = false;
  };

  return (
    <div className="space-y-4">
      <TombolAngka
        label="Jumlah Apel Awal"
        nilai={awal}
        min={1}
        max={10}
        onKurang={() => ubahAwal(clamp(awal - 1, 1, 10))}
        onTambah={() => ubahAwal(clamp(awal + 1, 1, 10))}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-lime-200 bg-lime-50 p-3">
          <p className="mb-2 text-center text-sm font-bold text-lime-800">Meja apel</p>
          <div className="grid grid-cols-5 gap-2">
            {apelMeja.map((id) => (
              <button
                key={id}
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/apel", String(id))}
                onClick={() => pindahKeKeranjang(id)}
                className="igil-pulse-ambil flex h-12 w-full items-center justify-center rounded-2xl bg-white shadow-sm"
                aria-label={`Ambil apel ${id + 1}`}
              >
                <ApelSvg />
              </button>
            ))}
            {apelMeja.length === 0 ? (
              <p className="col-span-5 py-6 text-center text-sm font-semibold text-lime-700">Meja kosong.</p>
            ) : null}
          </div>
        </div>

        <div
          className="rounded-3xl border-2 border-amber-300 bg-amber-100 p-3"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = Number(e.dataTransfer.getData("text/apel"));
            if (!Number.isNaN(id)) pindahKeKeranjang(id);
          }}
        >
          <p className="mb-2 text-center text-sm font-bold text-amber-900">Keranjang</p>
          <div className="grid grid-cols-5 gap-2">
            {diKeranjang.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => kembalikan(id)}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-white/80"
                aria-label={`Kembalikan apel ${id + 1}`}
              >
                <ApelSvg coret />
              </button>
            ))}
            {diKeranjang.length === 0 ? (
              <p className="col-span-5 py-6 text-center text-sm font-semibold text-amber-800">Ketuk apel di meja, atau tarik ke sini.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabKatak({
  awal,
  setAwal,
  lompat,
  setLompat,
  posisi,
  setPosisi,
  jejak,
  setJejak,
  jalan,
  setJalan,
  kirimEvent,
}: {
  awal: number;
  setAwal: (n: number) => void;
  lompat: number;
  setLompat: (n: number) => void;
  posisi: number;
  setPosisi: (n: number) => void;
  jejak: { dari: number; ke: number; n: number }[];
  setJejak: (n: { dari: number; ke: number; n: number }[]) => void;
  jalan: boolean;
  setJalan: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const timer = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timer.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    timer.current.forEach((id) => window.clearTimeout(id));
    timer.current = [];
    setJalan(false);
    setPosisi(awal);
    setJejak([]);
    if (lompat > awal) setLompat(awal);
  }, [awal, lompat, setJejak, setJalan, setLompat, setPosisi]);

  const lompatMundur = () => {
    if (jalan) return;
    timer.current.forEach((id) => window.clearTimeout(id));
    timer.current = [];
    setJalan(true);
    setPosisi(awal);
    setJejak([]);
    const langkah: { dari: number; ke: number; n: number }[] = [];
    for (let i = 1; i <= lompat; i += 1) {
      const dari = awal - i + 1;
      const ke = awal - i;
      const id = window.setTimeout(() => {
        langkah.push({ dari, ke, n: i });
        setPosisi(ke);
        setJejak([...langkah]);
        if (i === lompat) {
          setJalan(false);
          kirimEvent("FROG_JUMP_COMPLETED", {
            pesan: `Katak mulai dari angka ${awal} dan melompat mundur ${lompat} langkah ke kiri hingga mendarat di angka ${awal - lompat}. Jadi, ${awal} - ${lompat} = ${awal - lompat}!`,
            initial: awal,
            removed: lompat,
            remaining: awal - lompat,
          });
        }
      }, i * 420);
      timer.current.push(id);
    }
    if (lompat === 0) {
      setJalan(false);
      kirimEvent("FROG_JUMP_COMPLETED", {
        pesan: `Katak mulai dari angka ${awal} dan melompat mundur 0 langkah ke kiri hingga mendarat di angka ${awal}. Jadi, ${awal} - 0 = ${awal}!`,
        initial: awal,
        removed: 0,
        remaining: awal,
      });
    }
  };

  const xUntuk = (angka: number) => 24 + angka * 29;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <TombolAngka
          label="Posisi Awal Katak"
          nilai={awal}
          min={1}
          max={10}
          onKurang={() => setAwal(clamp(awal - 1, 1, 10))}
          onTambah={() => setAwal(clamp(awal + 1, 1, 10))}
        />
        <TombolAngka
          label="Lompatan Mundur"
          nilai={lompat}
          min={0}
          max={awal}
          onKurang={() => setLompat(clamp(lompat - 1, 0, awal))}
          onTambah={() => setLompat(clamp(lompat + 1, 0, awal))}
        />
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-emerald-100 bg-gradient-to-b from-sky-50 to-emerald-50 p-2">
        <svg viewBox="0 0 340 130" className="h-auto w-full" role="img" aria-label="Garis bilangan 0 sampai 10">
          <line x1="24" y1="88" x2="314" y2="88" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          {Array.from({ length: 11 }).map((_, n) => (
            <g key={n}>
              <line x1={xUntuk(n)} y1="78" x2={xUntuk(n)} y2="98" stroke="#334155" strokeWidth="3" />
              <text x={xUntuk(n)} y="118" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e293b">
                {n}
              </text>
            </g>
          ))}
          {jejak.map((j) => {
            const x1 = xUntuk(j.dari);
            const x2 = xUntuk(j.ke);
            const mid = (x1 + x2) / 2;
            return (
              <g key={j.n}>
                <path d={`M${x1} 72 Q${mid} ${28 + (j.n % 3) * 6} ${x2} 72`} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <polygon points={`${x2},72 ${x2 + 6},66 ${x2 + 6},78`} fill="#F59E0B" />
                <circle cx={mid} cy={34 + (j.n % 3) * 6} r="10" fill="#F59E0B" />
                <text x={mid} y={38 + (j.n % 3) * 6} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                  {j.n}
                </text>
              </g>
            );
          })}
          <g className={jalan ? "igil-katak-loncat" : undefined} style={{ transformOrigin: `${xUntuk(posisi)}px 58px` }}>
            <foreignObject x={xUntuk(posisi) - 18} y="40" width="36" height="36">
              <KatakSvg />
            </foreignObject>
          </g>
        </svg>
      </div>

      <button
        type="button"
        onClick={lompatMundur}
        disabled={jalan}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-md disabled:opacity-50"
      >
        🐸 Lompat Mundur!
      </button>
    </div>
  );
}

function TabBanding({
  kelinci,
  setKelinci,
  wortel,
  setWortel,
  terpasang,
  setTerpasang,
  kirimEvent,
}: {
  kelinci: number;
  setKelinci: (n: number) => void;
  wortel: number;
  setWortel: (n: number) => void;
  terpasang: boolean;
  setTerpasang: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const ubahKelinci = (n: number) => {
    setKelinci(n);
    setTerpasang(false);
  };
  const ubahWortel = (n: number) => {
    setWortel(n);
    setTerpasang(false);
  };

  const pasangan = Math.min(kelinci, wortel);
  const selisih = Math.abs(kelinci - wortel);
  const lebar = 320;
  const xKelinci = (i: number) => 18 + (i + 0.5) * ((lebar - 36) / Math.max(kelinci, 1));
  const xWortel = (i: number) => 18 + (i + 0.5) * ((lebar - 36) / Math.max(wortel, 1));

  const pasangkan = () => {
    setTerpasang(true);
    kirimEvent("COMPARE_DIFFERENCE", {
      pesan: `Ada ${kelinci} kelinci dan ${wortel} wortel. Setelah dipasangkan satu-satu, terlihat ada ${selisih} yang tidak mendapat pasangan. Itulah selisihnya!`,
      kelinci,
      wortel,
      selisih,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <TombolAngka
          label="Jumlah Kelinci"
          nilai={kelinci}
          min={1}
          max={10}
          onKurang={() => ubahKelinci(clamp(kelinci - 1, 1, 10))}
          onTambah={() => ubahKelinci(clamp(kelinci + 1, 1, 10))}
        />
        <TombolAngka
          label="Jumlah Wortel"
          nilai={wortel}
          min={1}
          max={10}
          onKurang={() => ubahWortel(clamp(wortel - 1, 1, 10))}
          onTambah={() => ubahWortel(clamp(wortel + 1, 1, 10))}
        />
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-violet-100 bg-violet-50">
        <svg viewBox="0 0 320 170" className="h-auto w-full" role="img" aria-label="Baris kelinci dan wortel">
          {Array.from({ length: kelinci }).map((_, i) => {
            const sisa = terpasang && i >= pasangan;
            return (
              <g key={`k-${i}`}>
                {sisa ? <rect x={xKelinci(i) - 18} y="8" width="36" height="44" rx="8" fill="#FDE047" /> : null}
                <foreignObject x={xKelinci(i) - 18} y="10" width="40" height="40">
                  <KelinciSvg />
                </foreignObject>
              </g>
            );
          })}
          {Array.from({ length: wortel }).map((_, i) => {
            const sisa = terpasang && i >= pasangan;
            return (
              <g key={`w-${i}`}>
                {sisa ? <rect x={xWortel(i) - 18} y="116" width="36" height="44" rx="8" fill="#FDE047" /> : null}
                <foreignObject x={xWortel(i) - 16} y="120" width="36" height="36">
                  <WortelSvg />
                </foreignObject>
              </g>
            );
          })}
          {terpasang
            ? Array.from({ length: pasangan }).map((_, i) => (
                <line
                  key={`p-${i}`}
                  x1={xKelinci(i)}
                  y1="54"
                  x2={xWortel(i)}
                  y2="118"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))
            : null}
        </svg>
      </div>

      <button
        type="button"
        onClick={pasangkan}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-violet-600 text-sm font-black text-white shadow-md"
      >
        🔗 Pasangkan!
      </button>
    </div>
  );
}

function TabKuis({
  kirimEvent,
  onLulus,
  onKalimat,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onLulus: (catatan: string) => void;
  onKalimat: (n: { a: number; b: number; hasil: number }) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  useEffect(() => {
    const peta = [
      { a: 8, b: 3, hasil: 5 },
      { a: 9, b: 4, hasil: 5 },
      { a: 5, b: 3, hasil: 2 },
      { a: 6, b: 4, hasil: 2 },
    ];
    onKalimat(peta[Math.min(nomor, 3)]);
  }, [nomor, onKalimat]);

  const jawab = (id: string) => {
    if (umpan === "benar" || selesai) return;
    setPilih(id);
    if (id === soal.kunci) {
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", {
        pesan: `Benar! Soal ${nomor + 1} sudah tepat.`,
        soal: soal.id,
        benar: true,
      });
      window.setTimeout(() => {
        if (nomor + 1 >= SOAL_KUIS.length) {
          onLulus("Kuis pengurangan sampai 10 selesai. Empat soal interaktif sudah dijawab.");
          setNomor(SOAL_KUIS.length);
        } else {
          setNomor((n) => n + 1);
          setPilih(null);
          setUmpan(null);
        }
      }, 900);
      return;
    }
    setUmpan("salah");
    setHint(true);
    kirimEvent("QUIZ_ANSWERED", {
      pesan: soal.hint,
      soal: soal.id,
      benar: false,
      hint: true,
    });
  };

  if (selesai) {
    return (
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-4xl font-normal" aria-hidden>
          🌟
        </p>
        <p className="mt-2 text-xl font-black text-emerald-800">Kuis selesai!</p>
        <p className="mt-1 text-sm font-semibold text-emerald-700">Empat soal pengurangan sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-rose-500">Soal {nomor + 1} dari 4</p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>

      {nomor === 0 ? (
        <div className="flex flex-wrap justify-center gap-1 rounded-2xl bg-sky-50 p-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <BalonSvg key={i} pecah={i < 3} />
          ))}
        </div>
      ) : null}
      {nomor === 1 ? (
        <svg viewBox="0 0 320 90" className="h-auto w-full rounded-2xl bg-emerald-50" aria-hidden>
          <line x1="20" y1="55" x2="300" y2="55" stroke="#334155" strokeWidth="3" />
          {Array.from({ length: 11 }).map((_, n) => (
            <g key={n}>
              <line x1={20 + n * 28} y1="48" x2={20 + n * 28} y2="62" stroke="#334155" strokeWidth="2" />
              <text x={20 + n * 28} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">
                {n}
              </text>
            </g>
          ))}
          {[9, 8, 7, 6].map((dari, i) => {
            const x1 = 20 + dari * 28;
            const x2 = 20 + (dari - 1) * 28;
            return (
              <path key={dari} d={`M${x1} 44 Q${(x1 + x2) / 2} ${18 + i} ${x2} 44`} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            );
          })}
          <circle cx={20 + 5 * 28} cy="34" r="11" fill="#22C55E" />
        </svg>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2 rounded-2xl bg-amber-50 p-3">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <KucingSvg key={i} />
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <MangkukSvg key={i} />
            ))}
          </div>
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="flex flex-wrap justify-center gap-1 rounded-2xl bg-rose-50 p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`flex h-10 w-10 items-center justify-center rounded-full ${i < 2 ? "bg-rose-500" : "bg-slate-300"}`} />
          ))}
        </div>
      ) : null}

      <div className="grid gap-2">
        {soal.opsi.map((o) => {
          const aktif = pilih === o;
          const hijau = umpan === "benar" && o === soal.kunci;
          const merah = umpan === "salah" && aktif;
          return (
            <button
              key={o}
              type="button"
              onClick={() => jawab(o)}
              className={`min-h-12 rounded-2xl border-2 px-3 text-left text-lg font-black ${
                hijau
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : merah
                    ? "border-rose-400 bg-rose-50 text-rose-800"
                    : aktif
                      ? "border-indigo-400 bg-indigo-50 text-indigo-800"
                      : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>

      {hint ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          💡 {soal.hint}
        </p>
      ) : null}
    </div>
  );
}
