"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "MAKE_TEN_START"
  | "TEN_COMPLETED_ADDITION"
  | "UNBUNDLE_NEEDED"
  | "SUBTRACTION_BRIDGED"
  | "BRIDGE_TEN_STOP"
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

type TabLab = "genap" | "bongkar" | "jembatan" | "kuis";
type ModeJembatan = "plus" | "minus";

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "genap", ikon: "🍎", label: "Genapkan Jadi 10" },
  { id: "bongkar", ikon: "🧺", label: "Bongkar Puluhan" },
  { id: "jembatan", ikon: "🌉", label: "Jembatan 10" },
  { id: "kuis", ikon: "⭐", label: "Kuis" },
];

type OpsiKuis = { id: string; label: string };
type SoalKuis = { id: string; tanya: string; hint: string; kunci: string; opsi: OpsiKuis[] };

const SOAL_KUIS: SoalKuis[] = [
  {
    id: "q1",
    tanya: "9 + 6. Pecah 6 supaya genap 10. 6 jadi angka berapa dan berapa?",
    hint: "9 butuh 1 lagi untuk jadi 10. Jadi 6 dipecah menjadi 1 dan 5.",
    kunci: "1-5",
    opsi: [
      { id: "1-5", label: "1 dan 5 → 10 + 5 = 15" },
      { id: "2-4", label: "2 dan 4 → 10 + 4 = 14" },
      { id: "6-0", label: "6 dan 0 → 10 + 0 = 10" },
    ],
  },
  {
    id: "q2",
    tanya: "17 − 4. Satuan lepas cukup. Berapa sisanya?",
    hint: "17 = 1 puluhan dan 7 satuan. 4 lebih kecil dari 7, jadi ambil langsung dari satuan.",
    kunci: "13",
    opsi: [
      { id: "13", label: "13" },
      { id: "12", label: "12" },
      { id: "3", label: "3" },
    ],
  },
  {
    id: "q3",
    tanya: "12 − 5. Satuan cuma 2, tidak cukup. Setelah buka ikatan 10, berapa hasilnya?",
    hint: "Buka 10, ambil 5 sisa 5, lalu tambah 2 satuan tadi: 5 + 2 = 7.",
    kunci: "7",
    opsi: [
      { id: "7", label: "7" },
      { id: "8", label: "8" },
      { id: "17", label: "17" },
    ],
  },
  {
    id: "q4",
    tanya: "Katak dari 8 lompat biru ke 10, lalu oranye ke 13. Berapa 8 + 5?",
    hint: "Lompat pertama 2 langkah ke jembatan 10. Sisa 3 langkah: 10 + 3 = 13.",
    kunci: "13",
    opsi: [
      { id: "13", label: "13" },
      { id: "10", label: "10" },
      { id: "15", label: "15" },
    ],
  },
];

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  void ucapkanGuruIgil(teks, { kelas: "1 SD" });
}

function clamp(nilai: number, min: number, max: number) {
  return Math.max(min, Math.min(max, nilai));
}

function pasangTambah(a: number, b: number) {
  const aa = clamp(a, 6, 9);
  let bb = clamp(b, 2, 9);
  if (aa + bb < 11) bb = 11 - aa;
  if (aa + bb > 18) bb = 18 - aa;
  return { a: aa, b: clamp(bb, 2, 9) };
}

function ApelSvg({ warna = "merah", ukuran = 26 }: { warna?: "merah" | "hijau"; ukuran?: number }) {
  const isi = warna === "merah" ? "#EF4444" : "#22C55E";
  const tepi = warna === "merah" ? "#991b1b" : "#14532d";
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 28 28" aria-hidden>
      <ellipse cx="14" cy="16" rx="9" ry="10" fill={isi} stroke={tepi} strokeWidth="1.8" />
      <path d="M14 7 C14 4 17 4 18 6" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="13" rx="2" ry="2.4" fill="#fecaca" opacity={warna === "hijau" ? 0.35 : 0.9} />
    </svg>
  );
}

function KeranjangPuluhan({ ukuran = 72 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 72 72" aria-hidden>
      <ellipse cx="36" cy="22" rx="22" ry="8" fill="#FDBA74" stroke="#9a3412" strokeWidth="2" />
      <path d="M14 22 L20 58 Q36 66 52 58 L58 22" fill="#F97316" stroke="#9a3412" strokeWidth="2" />
      <text x="36" y="50" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">
        10
      </text>
    </svg>
  );
}

function TombolAngka({
  label,
  nilai,
  min,
  max,
  onKurang,
  onTambah,
}: {
  label: string;
  nilai: number;
  min: number;
  max: number;
  onKurang: () => void;
  onTambah: () => void;
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
  merah,
  hijau,
  emas,
  onKlikHijau,
  onKlikMerah,
}: {
  merah: number;
  hijau: number;
  emas?: boolean;
  onKlikHijau?: (i: number) => void;
  onKlikMerah?: (i: number) => void;
}) {
  return (
    <div className={`rounded-3xl border-2 p-2 ${emas ? "igil-emas border-amber-400 bg-amber-50" : "border-slate-200 bg-white"}`}>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => {
          const isiMerah = i < merah;
          const isiHijau = !isiMerah && i < merah + hijau;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (isiHijau) onKlikHijau?.(i - merah);
                else if (isiMerah) onKlikMerah?.(i);
              }}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50"
              aria-label={isiMerah ? `Apel merah ${i + 1}` : isiHijau ? `Apel hijau ${i - merah + 1}` : `Slot kosong ${i + 1}`}
            >
              {isiMerah ? <ApelSvg warna="merah" /> : isiHijau ? <ApelSvg warna="hijau" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CabangAngka({ atas, kiri, kanan }: { atas: number; kiri: string; kanan: string }) {
  return (
    <svg viewBox="0 0 160 110" className="mx-auto h-28 w-40" aria-label="Diagram cabang">
      <circle cx="80" cy="22" r="18" fill="#6366F1" />
      <text x="80" y="28" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">
        {atas}
      </text>
      <line x1="80" y1="40" x2="40" y2="68" stroke="#64748b" strokeWidth="3" />
      <line x1="80" y1="40" x2="120" y2="68" stroke="#64748b" strokeWidth="3" />
      <circle cx="40" cy="86" r="18" fill="#F59E0B" />
      <circle cx="120" cy="86" r="18" fill="#22C55E" />
      <text x="40" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">
        {kiri}
      </text>
      <text x="120" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">
        {kanan}
      </text>
    </svg>
  );
}

function PanelTransformasi({ dari, ke }: { dari: string; ke: string }) {
  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-3">
      <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-widest text-violet-700">
        Transformasi Kalimat Matematika
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-2xl bg-white px-3 py-2 text-lg font-black text-slate-800">{dari}</span>
        <span className="text-2xl font-black text-violet-500">→</span>
        <span className="rounded-2xl bg-violet-600 px-3 py-2 text-lg font-black text-white">{ke}</span>
      </div>
    </div>
  );
}

export default function SimulasiMtk1Bab6({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("genap");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanLayar, setPesanLayar] = useState("Genapkan 10, bongkar puluhan, atau lompat di jembatan. IGIL ikut bicara.");
  const sudahLulus = useRef(false);

  const [a, setA] = useState(8);
  const [b, setB] = useState(5);
  const [pindah, setPindah] = useState(0);

  const [awal, setAwal] = useState(13);
  const [kurang, setKurang] = useState(5);
  const [bukaIkat, setBukaIkat] = useState(false);
  const [diambil, setDiambil] = useState(0);

  const [modeJembatan, setModeJembatan] = useState<ModeJembatan>("plus");
  const [langkah, setLangkah] = useState(0);
  const [kuisDari, setKuisDari] = useState("9 + 6");
  const [kuisKe, setKuisKe] = useState("10 + 5 = 15");

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

  const needed = 10 - a;
  const sisaTambah = b - needed;
  const totalTambah = a + b;
  const ones = awal - 10;
  const hasilKurang = awal - kurang;
  const tenRem = 10 - kurang;

  const transform = (() => {
    if (tab === "genap") {
      return {
        dari: `${a} + ${b}`,
        ke: pindah >= needed ? `10 + ${sisaTambah} = ${totalTambah}` : `10 + ?`,
      };
    }
    if (tab === "bongkar") {
      if (kurang <= ones) {
        return {
          dari: `${awal} − ${kurang}`,
          ke: diambil >= kurang ? `10 + ${ones - kurang} = ${hasilKurang}` : `${ones} − ${kurang}`,
        };
      }
      return {
        dari: `${awal} − ${kurang}`,
        ke: bukaIkat && diambil >= kurang ? `(10 − ${kurang}) + ${ones} = ${hasilKurang}` : `(10 − ${kurang}) + ${ones}`,
      };
    }
    if (tab === "jembatan") {
      if (modeJembatan === "plus") {
        return {
          dari: `${a} + ${b}`,
          ke: langkah >= 2 ? `10 + ${sisaTambah} = ${totalTambah}` : langkah === 1 ? `10 + ${sisaTambah}` : `${needed} ke 10, lalu ${sisaTambah}`,
        };
      }
      const step1 = ones;
      const step2 = kurang - ones;
      return {
        dari: `${awal} − ${kurang}`,
        ke: langkah >= 2 ? `(10 − ${step2}) = ${hasilKurang}` : langkah === 1 ? `di 10, sisa ${step2}` : `${step1} ke 10, lalu ${step2}`,
      };
    }
    return { dari: kuisDari, ke: kuisKe };
  })();

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-violet-100 bg-white shadow-xl shadow-violet-100/40">
      <style>{`
        @keyframes igil-emas {
          0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); }
        }
        .igil-emas { animation: igil-emas 0.9s ease-out; }
        @keyframes igil-kedip {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .igil-kedip { animation: igil-kedip 0.8s ease-in-out infinite; }
      `}</style>

      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Penjumlahan dan Pengurangan sampai dengan 20</h2>
        <p className="mt-1 text-sm text-violet-100">Genapkan 10, bongkar puluhan, dan lompat di jembatan bersama IGIL.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-violet-50 p-2 sm:grid-cols-4">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-sm font-bold transition ${
              tab === item.id ? "bg-white text-violet-700 shadow-sm" : "text-violet-500 hover:bg-white/60"
            }`}
          >
            <span className="font-normal" aria-hidden>
              {item.ikon}
            </span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-gradient-to-b from-white to-violet-50/40 p-4 sm:p-5">
        <p className="min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          <span className="font-normal">🦉</span> {pesanLayar}
        </p>
        <PanelTransformasi dari={transform.dari} ke={transform.ke} />

        {tab === "genap" ? (
          <TabGenap
            a={a}
            b={b}
            pindah={pindah}
            setA={setA}
            setB={setB}
            setPindah={setPindah}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "bongkar" ? (
          <TabBongkar
            awal={awal}
            kurang={kurang}
            bukaIkat={bukaIkat}
            diambil={diambil}
            setAwal={setAwal}
            setKurang={setKurang}
            setBukaIkat={setBukaIkat}
            setDiambil={setDiambil}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "jembatan" ? (
          <TabJembatan
            a={a}
            b={b}
            awal={awal}
            kurang={kurang}
            mode={modeJembatan}
            langkah={langkah}
            setMode={setModeJembatan}
            setLangkah={setLangkah}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "kuis" ? (
          <TabKuis kirimEvent={kirimEvent} onLulus={tandaiSelesai} onKalimat={(dari, ke) => { setKuisDari(dari); setKuisKe(ke); }} />
        ) : null}
      </div>

      <div className="border-t-2 border-slate-200 bg-slate-900 p-4 text-slate-100">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-widest text-amber-300">Simulasi Log Tutor IGIL</p>
          <button type="button" onClick={() => setLog([])} className="min-h-12 rounded-xl bg-slate-700 px-3 text-xs font-bold text-white hover:bg-slate-600">
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

function TabGenap({
  a,
  b,
  pindah,
  setA,
  setB,
  setPindah,
  kirimEvent,
}: {
  a: number;
  b: number;
  pindah: number;
  setA: (n: number) => void;
  setB: (n: number) => void;
  setPindah: (n: number) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const needed = 10 - a;
  const remainder = b - needed;
  const total = a + b;
  const selesai = pindah >= needed;
  const kunciSoal = `${a}+${b}`;
  const sudahMulai = useRef("");
  const sudahSepuluh = useRef("");

  const mulaiSoal = (na: number, nb: number) => {
    const p = pasangTambah(na, nb);
    setA(p.a);
    setB(p.b);
    setPindah(0);
    sudahSepuluh.current = "";
  };

  useEffect(() => {
    if (sudahMulai.current === kunciSoal) return;
    sudahMulai.current = kunciSoal;
    kirimEvent("MAKE_TEN_START", {
      pesan: `Bingkai pertama berisi ${a} apel. Butuh berapa apel hijau lagi supaya bingkai pertama genap menjadi 10?`,
      a,
      b,
      neededForTen: needed,
    });
  }, [a, b, kunciSoal, kirimEvent, needed]);

  const pindahkan = (jumlah: number) => {
    if (selesai) return;
    const berikutnya = Math.min(needed, pindah + jumlah);
    setPindah(berikutnya);
    if (berikutnya >= needed && sudahSepuluh.current !== kunciSoal) {
      sudahSepuluh.current = kunciSoal;
      kirimEvent("TEN_COMPLETED_ADDITION", {
        pesan: `Hebat! ${b} apel kita pecah menjadi ${needed} dan ${remainder}. Sekarang bingkai kiri sudah 10 ditambah sisa ${remainder} di kanan, hasilnya ${total}!`,
        a,
        b,
        neededForTen: needed,
        remainder,
        total,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <TombolAngka label="Angka pertama" nilai={a} min={6} max={9} onKurang={() => mulaiSoal(a - 1, b)} onTambah={() => mulaiSoal(a + 1, b)} />
        <TombolAngka label="Angka kedua" nilai={b} min={2} max={9} onKurang={() => mulaiSoal(a, b - 1)} onTambah={() => mulaiSoal(a, b + 1)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <BingkaiSepuluh merah={a} hijau={pindah} emas={selesai} />
        <BingkaiSepuluh merah={0} hijau={b - pindah} onKlikHijau={() => pindahkan(1)} />
      </div>
      <CabangAngka atas={b} kiri={selesai ? String(needed) : "?"} kanan={selesai ? String(remainder) : "?"} />
      <button
        type="button"
        onClick={() => pindahkan(needed - pindah)}
        disabled={selesai}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-violet-600 text-sm font-black text-white shadow-md disabled:opacity-50"
      >
        ➡️ Pindahkan ke Bingkai 10
      </button>
    </div>
  );
}

function TabBongkar({
  awal,
  kurang,
  bukaIkat,
  diambil,
  setAwal,
  setKurang,
  setBukaIkat,
  setDiambil,
  kirimEvent,
}: {
  awal: number;
  kurang: number;
  bukaIkat: boolean;
  diambil: number;
  setAwal: (n: number) => void;
  setKurang: (n: number) => void;
  setBukaIkat: (n: boolean) => void;
  setDiambil: (n: number) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const ones = awal - 10;
  const perluBongkar = kurang > ones;
  const selesai = diambil >= kurang;
  const hasil = awal - kurang;
  const tenRem = 10 - kurang;
  const kunci = `${awal}-${kurang}`;
  const sudahBridge = useRef("");

  const resetSoal = (n: number, k: number) => {
    setAwal(clamp(n, 11, 18));
    setKurang(clamp(k, 1, 9));
    setBukaIkat(false);
    setDiambil(0);
    sudahBridge.current = "";
  };

  const ambil = (dari: "lepas" | "ikat") => {
    if (selesai) return;
    if (dari === "lepas") {
      if (!bukaIkat && diambil >= ones) {
        kirimEvent("UNBUNDLE_NEEDED", {
          pesan: `Satuan di luar cuma ada ${ones}, tidak cukup untuk diambil ${kurang}! Yuk, klik tombol 'Buka Ikatan 10' dulu.`,
          ones,
          sub: kurang,
        });
        return;
      }
      if (!bukaIkat) setDiambil(diambil + 1);
      return;
    }
    if (!bukaIkat) {
      kirimEvent("UNBUNDLE_NEEDED", {
        pesan: `Satuan di luar cuma ada ${ones}, tidak cukup untuk diambil ${kurang}! Yuk, klik tombol 'Buka Ikatan 10' dulu.`,
        ones,
        sub: kurang,
      });
      return;
    }
    const berikutnya = diambil + 1;
    setDiambil(berikutnya);
    if (berikutnya >= kurang && sudahBridge.current !== kunci) {
      sudahBridge.current = kunci;
      kirimEvent("SUBTRACTION_BRIDGED", {
        pesan: `Dari 10 kita ambil ${kurang} sisa ${tenRem}, lalu ditambah ${ones} satuan tadi menjadi ${hasil}!`,
        start: awal,
        sub: kurang,
        ones,
        tenRem,
        result: hasil,
      });
    }
  };

  const lepasSisa = Math.max(0, ones - (bukaIkat ? 0 : diambil));
  const ikatSisa = bukaIkat ? Math.max(0, 10 - diambil) : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <TombolAngka label="Angka awal" nilai={awal} min={11} max={18} onKurang={() => resetSoal(awal - 1, kurang)} onTambah={() => resetSoal(awal + 1, kurang)} />
        <TombolAngka label="Pengurang" nilai={kurang} min={1} max={9} onKurang={() => resetSoal(awal, kurang - 1)} onTambah={() => resetSoal(awal, kurang + 1)} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-3 text-center">
          <p className="mb-2 text-sm font-bold text-orange-800">Keranjang Puluhan</p>
          {bukaIkat ? (
            <BingkaiSepuluh merah={ikatSisa} hijau={0} onKlikMerah={() => ambil("ikat")} />
          ) : (
            <button type="button" onClick={() => ambil("ikat")} className="mx-auto block" aria-label="Keranjang puluhan">
              <KeranjangPuluhan />
            </button>
          )}
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-3">
          <p className="mb-2 text-center text-sm font-bold text-sky-800">Satuan lepas</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: Math.max(lepasSisa, 1) }).map((_, i) =>
              i < lepasSisa ? (
                <button key={i} type="button" onClick={() => ambil("lepas")} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white" aria-label={`Ambil satuan ${i + 1}`}>
                  <ApelSvg />
                </button>
              ) : (
                <p key="kosong" className="w-full py-4 text-center text-sm font-semibold text-sky-700">
                  {perluBongkar ? "Tidak cukup. Buka ikatan 10." : "Sudah diambil."}
                </p>
              ),
            )}
          </div>
        </div>
      </div>

      {perluBongkar && !bukaIkat ? (
        <button
          type="button"
          onClick={() => setBukaIkat(true)}
          className="igil-kedip flex min-h-12 w-full items-center justify-center rounded-2xl bg-amber-400 text-sm font-black text-amber-950"
        >
          ✨ Buka Ikatan 10
        </button>
      ) : null}

      {!perluBongkar ? (
        <p className="text-center text-sm font-bold text-emerald-700">Satuan cukup. Ketuk apel lepas untuk menguranginya.</p>
      ) : null}

      {selesai ? (
        <p className="rounded-2xl bg-emerald-50 px-3 py-2 text-center text-sm font-black text-emerald-800">
          Hasil: {awal} − {kurang} = {hasil}
        </p>
      ) : null}
    </div>
  );
}

function TabJembatan({
  a,
  b,
  awal,
  kurang,
  mode,
  langkah,
  setMode,
  setLangkah,
  kirimEvent,
}: {
  a: number;
  b: number;
  awal: number;
  kurang: number;
  mode: ModeJembatan;
  langkah: number;
  setMode: (n: ModeJembatan) => void;
  setLangkah: (n: number) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const plusStart = a;
  const plusTotal = a + b;
  const needed = 10 - a;
  const remPlus = b - needed;
  const ones = awal - 10;
  const stepMinus1 = ones;
  const stepMinus2 = Math.max(1, kurang - ones);
  const hasilMinus = awal - kurang;
  const start = mode === "plus" ? plusStart : awal;
  const selesaiPos = mode === "plus" ? plusTotal : hasilMinus;
  const step1 = mode === "plus" ? needed : stepMinus1;
  const step2 = mode === "plus" ? remPlus : stepMinus2;
  const pos = langkah === 0 ? start : langkah === 1 ? 10 : selesaiPos;
  const sudahStop = useRef(false);

  const gantiMode = (m: ModeJembatan) => {
    setMode(m);
    setLangkah(0);
    sudahStop.current = false;
  };

  const lompatSatu = () => {
    setLangkah(1);
    if (!sudahStop.current) {
      sudahStop.current = true;
      kirimEvent("BRIDGE_TEN_STOP", {
        pesan: `Kita singgah di Jembatan 10 dulu setelah melompat ${step1} langkah. Sekarang tinggal lanjutkan ${step2} langkah lagi!`,
        step1,
        step2,
        mode,
      });
    }
  };

  const xUntuk = (n: number) => 16 + n * 18.4;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => gantiMode("plus")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${mode === "plus" ? "border-sky-500 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600"}`}
        >
          Lompat Maju +
        </button>
        <button
          type="button"
          onClick={() => gantiMode("minus")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${mode === "minus" ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-600"}`}
        >
          Lompat Mundur −
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600">
        {mode === "plus" ? `${a} + ${b}` : `${awal} − ${kurang}`}
      </p>

      <div className="overflow-x-auto rounded-3xl border-2 border-amber-100 bg-amber-50 p-2">
        <svg viewBox="0 0 400 120" className="h-auto min-w-[340px] w-full" role="img" aria-label="Jembatan angka 10">
          <line x1="16" y1="78" x2="384" y2="78" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <rect x={xUntuk(10) - 8} y="18" width="16" height="60" rx="4" fill="#F59E0B" />
          <text x={xUntuk(10)} y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#b45309">
            10
          </text>
          {Array.from({ length: 21 }).map((_, n) => (
            <g key={n}>
              <line x1={xUntuk(n)} y1="70" x2={xUntuk(n)} y2="86" stroke={n === 10 ? "#b45309" : "#334155"} strokeWidth={n === 10 ? 4 : 2} />
              <text x={xUntuk(n)} y="104" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b">
                {n}
              </text>
            </g>
          ))}
          {langkah >= 1 ? (
            <path
              d={`M${xUntuk(start)} 70 Q${(xUntuk(start) + xUntuk(10)) / 2} 28 ${xUntuk(10)} 70`}
              fill="none"
              stroke="#2563EB"
              strokeWidth="4"
            />
          ) : null}
          {langkah >= 2 ? (
            <path
              d={`M${xUntuk(10)} 70 Q${(xUntuk(10) + xUntuk(selesaiPos)) / 2} 28 ${xUntuk(selesaiPos)} 70`}
              fill="none"
              stroke="#F97316"
              strokeWidth="4"
            />
          ) : null}
          <circle cx={xUntuk(pos)} cy="62" r="10" fill="#22C55E" stroke="#14532d" strokeWidth="2" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={lompatSatu}
          disabled={langkah > 0}
          className="min-h-12 rounded-2xl bg-sky-600 text-sm font-black text-white disabled:opacity-40"
        >
          Lompat ke Jembatan 10 Dulu!
        </button>
        <button
          type="button"
          onClick={() => setLangkah(2)}
          disabled={langkah !== 1}
          className="min-h-12 rounded-2xl bg-orange-500 text-sm font-black text-white disabled:opacity-40"
        >
          Lanjutkan Sisa Lompatan!
        </button>
      </div>
      <button type="button" onClick={() => { setLangkah(0); sudahStop.current = false; }} className="flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700">
        Ulangi lompatan
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
  onKalimat: (dari: string, ke: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  useEffect(() => {
    const peta = [
      ["9 + 6", "10 + 5 = 15"],
      ["17 − 4", "10 + 3 = 13"],
      ["12 − 5", "(10 − 5) + 2 = 7"],
      ["8 + 5", "10 + 3 = 13"],
    ] as const;
    const i = Math.min(nomor, 3);
    onKalimat(peta[i][0], peta[i][1]);
  }, [nomor, onKalimat]);

  const jawab = (id: string) => {
    if (umpan === "benar" || selesai) return;
    setPilih(id);
    if (id === soal.kunci) {
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", { pesan: `Benar! Soal ${nomor + 1} sudah tepat.`, soal: soal.id, benar: true });
      window.setTimeout(() => {
        if (nomor + 1 >= SOAL_KUIS.length) {
          onLulus("Kuis penjumlahan dan pengurangan sampai 20 selesai. Empat soal sudah dijawab.");
          setNomor(SOAL_KUIS.length);
        } else {
          setNomor((n) => n + 1);
          setPilih(null);
          setUmpan(null);
          setHint(false);
        }
      }, 900);
      return;
    }
    setUmpan("salah");
    setHint(true);
    kirimEvent("QUIZ_ANSWERED", { pesan: soal.hint, soal: soal.id, benar: false, hint: true });
  };

  if (selesai) {
    return (
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-4xl font-normal" aria-hidden>
          🌟
        </p>
        <p className="mt-2 text-xl font-black text-emerald-800">Kuis selesai!</p>
        <p className="mt-1 text-sm font-semibold text-emerald-700">Empat soal jembatan 10 sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-violet-500">Soal {nomor + 1} dari 4</p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>
      {nomor === 0 ? <CabangAngka atas={6} kiri="?" kanan="?" /> : null}
      {nomor === 3 ? (
        <svg viewBox="0 0 320 90" className="h-auto w-full rounded-2xl bg-amber-50" aria-hidden>
          <line x1="16" y1="55" x2="304" y2="55" stroke="#64748b" strokeWidth="4" />
          <rect x="148" y="18" width="12" height="38" rx="3" fill="#F59E0B" />
          <path d="M130 50 Q152 18 160 50" fill="none" stroke="#2563EB" strokeWidth="3" />
          <path d="M160 50 Q200 18 232 50" fill="none" stroke="#F97316" strokeWidth="3" />
          <text x="130" y="78" fontSize="11" fontWeight="700">8</text>
          <text x="158" y="78" fontSize="11" fontWeight="700">10</text>
          <text x="228" y="78" fontSize="11" fontWeight="700">13</text>
        </svg>
      ) : null}
      <div className="grid gap-2">
        {soal.opsi.map((o) => {
          const aktif = pilih === o.id;
          const hijau = umpan === "benar" && o.id === soal.kunci;
          const merah = umpan === "salah" && aktif;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => jawab(o.id)}
              className={`min-h-12 rounded-2xl border-2 px-3 text-left text-sm font-bold ${
                hijau
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : merah
                    ? "border-rose-400 bg-rose-50 text-rose-800"
                    : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {o.label}
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
