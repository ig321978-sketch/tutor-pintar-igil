"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SHAPE_ROTATED"
  | "ALL_SIDES_COUNTED"
  | "SIDE_TAPPED"
  | "VERTEX_TAPPED"
  | "ROLL_SUCCESS"
  | "ROLL_BLOCKED"
  | "PATTERN_COMPLETED"
  | "SHAPE_SELECTED"
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

type TabLab = "sisi" | "gelinding" | "susun" | "kuis";
type JenisBangun = "lingkaran" | "segitiga" | "persegi" | "persegiPanjang";
type BendaGelinding = "lingkaran" | "segitiga" | "persegi";
type PolaSusun = "rumah" | "roket";
type JenisKeping = "segitiga" | "persegi" | "persegiPanjang" | "segitigaKecil";

type Titik = { x: number; y: number };

const WARNA: Record<JenisBangun, string> = {
  lingkaran: "#F59E0B",
  segitiga: "#22C55E",
  persegi: "#3B82F6",
  persegiPanjang: "#A855F7",
};

const LABEL_BANGUN: Record<JenisBangun, string> = {
  lingkaran: "Lingkaran",
  segitiga: "Segitiga",
  persegi: "Persegi",
  persegiPanjang: "Persegi Panjang",
};

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "sisi", ikon: "🔷", label: "Kenali Sisi & Sudut" },
  { id: "gelinding", ikon: "🎢", label: "Tes Gelinding" },
  { id: "susun", ikon: "🏠", label: "Susun Bentuk" },
  { id: "kuis", ikon: "⭐", label: "Kuis" },
];

const TITIK_BANGUN: Record<Exclude<JenisBangun, "lingkaran">, Titik[]> = {
  segitiga: [
    { x: 0, y: -88 },
    { x: 80, y: 52 },
    { x: -80, y: 52 },
  ],
  persegi: [
    { x: -70, y: -70 },
    { x: 70, y: -70 },
    { x: 70, y: 70 },
    { x: -70, y: 70 },
  ],
  persegiPanjang: [
    { x: -98, y: -54 },
    { x: 98, y: -54 },
    { x: 98, y: 54 },
    { x: -98, y: 54 },
  ],
};

type SlotPola = {
  id: string;
  jenis: JenisKeping;
  label: string;
  d: string;
  isi: string;
};

const POLA_RUMAH: SlotPola[] = [
  {
    id: "atap",
    jenis: "segitiga",
    label: "Atap",
    d: "M160 36 L98 118 L222 118 Z",
    isi: "#86EFAC",
  },
  {
    id: "badan",
    jenis: "persegi",
    label: "Dinding",
    d: "M108 118 H212 V222 H108 Z",
    isi: "#93C5FD",
  },
];

const POLA_ROKET: SlotPola[] = [
  {
    id: "hidung",
    jenis: "segitiga",
    label: "Puncak",
    d: "M160 28 L118 96 L202 96 Z",
    isi: "#86EFAC",
  },
  {
    id: "badan",
    jenis: "persegiPanjang",
    label: "Badan",
    d: "M128 96 H192 V198 H128 Z",
    isi: "#C4B5FD",
  },
  {
    id: "sirip-kiri",
    jenis: "segitigaKecil",
    label: "Sirip kiri",
    d: "M128 158 L86 214 L128 214 Z",
    isi: "#FCD34D",
  },
  {
    id: "sirip-kanan",
    jenis: "segitigaKecil",
    label: "Sirip kanan",
    d: "M192 158 L234 214 L192 214 Z",
    isi: "#FCD34D",
  },
];

const KEPING_RUMAH: { id: string; jenis: JenisKeping; label: string }[] = [
  { id: "k-segitiga", jenis: "segitiga", label: "Segitiga" },
  { id: "k-persegi", jenis: "persegi", label: "Persegi" },
];

const KEPING_ROKET: { id: string; jenis: JenisKeping; label: string }[] = [
  { id: "k-segitiga", jenis: "segitiga", label: "Segitiga" },
  { id: "k-pp", jenis: "persegiPanjang", label: "Persegi Panjang" },
  { id: "k-kecil-1", jenis: "segitigaKecil", label: "Segitiga Kecil" },
  { id: "k-kecil-2", jenis: "segitigaKecil", label: "Segitiga Kecil" },
];

const SOAL_KUIS = [
  {
    id: "q1",
    tanya: "Manakah yang tetap merupakan segitiga, meski posisinya terbalik?",
    hint: "Hitung sisinya. Segitiga selalu punya 3 sisi, walau menghadap ke bawah.",
    kunci: "b",
    opsi: [
      { id: "a", label: "Belah ketupat" },
      { id: "b", label: "Segitiga terbalik" },
      { id: "c", label: "Lingkaran" },
    ],
  },
  {
    id: "q2",
    tanya: "Manakah benda sehari-hari yang sejenis dengan lingkaran?",
    hint: "Lingkaran bundar dan tidak punya pojok. Cari benda yang bisa menggelinding.",
    kunci: "roda",
    opsi: [
      { id: "roda", label: "Roda" },
      { id: "buku", label: "Buku" },
      { id: "pizza", label: "Potongan pizza" },
    ],
  },
  {
    id: "q3",
    tanya: "Pada gambar rumah ini, berapa segitiga dan berapa segiempat?",
    hint: "Atap rumah biasanya segitiga. Dinding dan pintu berbentuk segiempat.",
    kunci: "a",
    opsi: [
      { id: "a", label: "1 segitiga, 2 segiempat" },
      { id: "b", label: "2 segitiga, 1 segiempat" },
      { id: "c", label: "3 segitiga, 3 segiempat" },
    ],
  },
  {
    id: "q4",
    tanya: "Persegi punya berapa sisi?",
    hint: "Hitung tepi yang lurus. Persegi punya 4 sisi.",
    kunci: "4",
    opsi: [
      { id: "3", label: "3 sisi" },
      { id: "4", label: "4 sisi" },
      { id: "5", label: "5 sisi" },
    ],
  },
  {
    id: "q5",
    tanya: "Bangun mana yang tidak punya pojok?",
    hint: "Yang bundar tidak punya sudut.",
    kunci: "lingkaran",
    opsi: [
      { id: "segitiga", label: "Segitiga" },
      { id: "persegi", label: "Persegi" },
      { id: "lingkaran", label: "Lingkaran" },
    ],
  },
] as const;

function titikKePath(titik: Titik[]): string {
  return `${titik.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ")} Z`;
}

function tengahSisi(a: Titik, b: Titik): Titik {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  void ucapkanGuruIgil(teks, { kelas: "1 SD" });
}

function IkonMini({ jenis, ukuran = 36 }: { jenis: JenisBangun | JenisKeping; ukuran?: number }) {
  const fill =
    jenis === "lingkaran"
      ? WARNA.lingkaran
      : jenis === "segitiga" || jenis === "segitigaKecil"
        ? WARNA.segitiga
        : jenis === "persegi"
          ? WARNA.persegi
          : WARNA.persegiPanjang;
  const cx = ukuran / 2;
  if (jenis === "lingkaran") {
    return (
      <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} aria-hidden>
        <circle cx={cx} cy={cx} r={ukuran * 0.38} fill={fill} stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }
  if (jenis === "segitiga") {
    return (
      <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} aria-hidden>
        <polygon points={`${cx},${ukuran * 0.12} ${ukuran * 0.88},${ukuran * 0.86} ${ukuran * 0.12},${ukuran * 0.86}`} fill={fill} stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }
  if (jenis === "segitigaKecil") {
    return (
      <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} aria-hidden>
        <polygon points={`${cx},${ukuran * 0.22} ${ukuran * 0.8},${ukuran * 0.82} ${ukuran * 0.2},${ukuran * 0.82}`} fill="#FBBF24" stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }
  if (jenis === "persegiPanjang") {
    return (
      <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} aria-hidden>
        <rect x={ukuran * 0.08} y={ukuran * 0.28} width={ukuran * 0.84} height={ukuran * 0.44} rx="4" fill={fill} stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} aria-hidden>
      <rect x={ukuran * 0.16} y={ukuran * 0.16} width={ukuran * 0.68} height={ukuran * 0.68} rx="4" fill={fill} stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

function BangunOpsiKuis({ jenis }: { jenis: "belahKetupat" | "segitigaTerbalik" | "lingkaran" | "roda" | "buku" | "pizza" }) {
  if (jenis === "belahKetupat") {
    return (
      <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
        <polygon points="40,6 74,40 40,74 6,40" fill="#60A5FA" stroke="#1e293b" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "segitigaTerbalik") {
    return (
      <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
        <polygon points="40,74 74,14 6,14" fill="#22C55E" stroke="#1e293b" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "lingkaran") {
    return (
      <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
        <circle cx="40" cy="40" r="28" fill="#F59E0B" stroke="#1e293b" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "roda") {
    return (
      <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
        <circle cx="40" cy="40" r="28" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        <circle cx="40" cy="40" r="10" fill="#94A3B8" />
        <line x1="40" y1="12" x2="40" y2="68" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="12" y1="40" x2="68" y2="40" stroke="#cbd5e1" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "buku") {
    return (
      <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
        <rect x="16" y="14" width="48" height="54" rx="3" fill="#F97316" stroke="#1e293b" strokeWidth="3" />
        <line x1="40" y1="14" x2="40" y2="68" stroke="#fff7ed" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden>
      <path d="M18 18 L62 40 L18 62 Z" fill="#FBBF24" stroke="#1e293b" strokeWidth="3" />
      <circle cx="24" cy="40" r="4" fill="#ef4444" />
    </svg>
  );
}

function RumahKuis() {
  return (
    <svg viewBox="0 0 220 200" className="mx-auto h-40 w-44" aria-hidden>
      <polygon points="110,18 28,88 192,88" fill="#86EFAC" stroke="#14532d" strokeWidth="3" />
      <rect x="48" y="88" width="124" height="92" fill="#93C5FD" stroke="#1e3a8a" strokeWidth="3" />
      <rect x="92" y="118" width="36" height="62" fill="#FDBA74" stroke="#9a3412" strokeWidth="3" />
    </svg>
  );
}

export default function SimulasiMtk1Bab4({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("sisi");
  const [pesanLayar, setPesanLayar] = useState("Ketuk bangun, putar, atau susun. IGIL akan ikut bicara.");
  const sudahLulus = useRef(false);

  const kirimEvent = useCallback(
    (jenis: TutorEventType, payload: TutorEventPayload, bicara = true) => {
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

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-indigo-100 bg-white shadow-xl shadow-indigo-100/50">
      <style>{`
        @keyframes igil-pulse-hit {
          0% { transform: scale(1); }
          50% { transform: scale(1.45); }
          100% { transform: scale(1); }
        }
        .igil-hit-pulse { animation: igil-pulse-hit 0.45s ease-out; transform-origin: center; transform-box: fill-box; }
        .igil-bentuk-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 14px; border-radius: 999px; background: #c7d2fe; outline: none; }
        .igil-bentuk-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 32px; height: 32px; border-radius: 50%;
          background: #4f46e5; border: 4px solid #fff; box-shadow: 0 2px 8px rgba(79,70,229,.45); cursor: pointer;
        }
        .igil-bentuk-slider::-moz-range-thumb {
          width: 32px; height: 32px; border-radius: 50%; background: #4f46e5; border: 4px solid #fff; cursor: pointer;
        }
      `}</style>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-500 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Mengenal Bentuk</h2>
        <p className="mt-1 text-sm text-indigo-100">Putar, hitung, gelindingkan, dan susun bangun bersama IGIL.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-indigo-50 p-2 sm:grid-cols-4">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-sm font-bold transition ${
              tab === item.id ? "bg-white text-indigo-700 shadow-sm" : "text-indigo-500 hover:bg-white/60"
            }`}
          >
            <span aria-hidden>{item.ikon}</span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-b from-white to-sky-50/50 p-4 sm:p-5">
        <p className="mb-4 min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          🦉 {pesanLayar}
        </p>
        {tab === "sisi" ? <TabSisiSudut kirimEvent={kirimEvent} /> : null}
        {tab === "gelinding" ? <TabGelinding kirimEvent={kirimEvent} /> : null}
        {tab === "susun" ? <TabSusun kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <TabKuis kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
      </div>

    </div>
  );
}

function TabSisiSudut({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [bangun, setBangun] = useState<JenisBangun>("segitiga");
  const [rotasi, setRotasi] = useState(0);
  const [sorot, setSorot] = useState(true);
  const [sisiKetuk, setSisiKetuk] = useState<number[]>([]);
  const [sudutKetuk, setSudutKetuk] = useState<number[]>([]);
  const [pulse, setPulse] = useState<{ jenis: "sisi" | "sudut"; indeks: number } | null>(null);
  const sudahRotasi = useRef(false);
  const sudahSemuaSisi = useRef(false);

  const titik = bangun === "lingkaran" ? [] : TITIK_BANGUN[bangun];
  const jumlahSisi = titik.length;
  const jumlahSudut = titik.length;

  useEffect(() => {
    setRotasi(0);
    setSisiKetuk([]);
    setSudutKetuk([]);
    setPulse(null);
    sudahRotasi.current = false;
    sudahSemuaSisi.current = false;
  }, [bangun]);

  const pilihBangun = (baru: JenisBangun) => {
    setBangun(baru);
    kirimEvent("SHAPE_SELECTED", {
      pesan: `Ini ${LABEL_BANGUN[baru]}. ${baru === "lingkaran" ? "Tidak punya sisi dan sudut." : `Punya ${TITIK_BANGUN[baru].length} sisi dan ${TITIK_BANGUN[baru].length} sudut.`}`,
      bangun: baru,
    });
  };

  const ubahRotasi = (nilai: number) => {
    setRotasi(nilai);
    if (!sudahRotasi.current && nilai > 30) {
      sudahRotasi.current = true;
      kirimEvent("SHAPE_ROTATED", {
        pesan: "Wah, bentuknya kamu putar miring! Coba perhatikan, apakah jumlah sisinya berubah atau tetap sama?",
        rotasi: nilai,
        bangun,
      });
    }
    if (nilai <= 8) sudahRotasi.current = false;
  };

  const ketukSisi = (indeks: number) => {
    if (sisiKetuk.includes(indeks)) {
      setPulse({ jenis: "sisi", indeks });
      return;
    }
    const baru = [...sisiKetuk, indeks];
    setSisiKetuk(baru);
    setPulse({ jenis: "sisi", indeks });
    kirimEvent("SIDE_TAPPED", {
      pesan: `Sisi ke-${baru.length} ketuk! ${LABEL_BANGUN[bangun]} punya ${jumlahSisi} sisi.`,
      sisi: baru.length,
      total: jumlahSisi,
      bangun,
    }, false);
    if (baru.length === jumlahSisi && jumlahSisi > 0 && !sudahSemuaSisi.current) {
      sudahSemuaSisi.current = true;
      kirimEvent("ALL_SIDES_COUNTED", {
        pesan: `Semua sisi ${LABEL_BANGUN[bangun]} sudah dihitung. Jumlahnya ${jumlahSisi}, tetap sama walau diputar.`,
        total: jumlahSisi,
        bangun,
        rotasi,
      });
    }
  };

  const ketukSudut = (indeks: number) => {
    const baru = sudutKetuk.includes(indeks) ? sudutKetuk : [...sudutKetuk, indeks];
    setSudutKetuk(baru);
    setPulse({ jenis: "sudut", indeks });
    kirimEvent("VERTEX_TAPPED", {
      pesan: `Pojok ke-${baru.length} menyala! ${LABEL_BANGUN[bangun]} punya ${jumlahSudut} sudut.`,
      sudut: baru.length,
      total: jumlahSudut,
      bangun,
    }, false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(LABEL_BANGUN) as JenisBangun[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => pilihBangun(id)}
            className={`flex min-h-12 flex-col items-center justify-center rounded-2xl border-2 px-2 py-2 text-xs font-bold sm:text-sm ${
              bangun === id ? "border-indigo-500 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <IkonMini jenis={id} />
            <span className="mt-1 text-center leading-tight">{LABEL_BANGUN[id]}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-sky-100 bg-gradient-to-b from-sky-50 to-emerald-50">
        <svg viewBox="0 0 320 280" className="h-auto w-full" role="img" aria-label={`${LABEL_BANGUN[bangun]} diputar ${rotasi} derajat`}>
          <text x="16" y="28" fontSize="13" fontWeight="700" fill="#4338ca">
            {LABEL_BANGUN[bangun]} · {rotasi}°
          </text>
          <g transform={`translate(160 150) rotate(${rotasi})`}>
            {bangun === "lingkaran" ? (
              <circle cx="0" cy="0" r="82" fill={WARNA.lingkaran} stroke="#1e293b" strokeWidth="4" />
            ) : (
              <path d={titikKePath(titik)} fill={WARNA[bangun]} stroke="#1e293b" strokeWidth="4" />
            )}
            {titik.map((a, i) => {
              const b = titik[(i + 1) % titik.length];
              const tengah = tengahSisi(a, b);
              const aktif = pulse?.jenis === "sisi" && pulse.indeks === i;
              return (
                <g key={`sisi-${i}`}>
                  <line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="transparent"
                      strokeWidth="28"
                      strokeLinecap="round"
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Sisi ${i + 1}`}
                      onClick={() => ketukSisi(i)}
                    />
                  {sorot ? (
                    <>
                      <circle
                        cx={tengah.x}
                        cy={tengah.y}
                        r={sisiKetuk.includes(i) ? 14 : 12}
                        fill={sisiKetuk.includes(i) ? "#F59E0B" : "#fff"}
                        stroke="#1e293b"
                        strokeWidth="3"
                        className={`cursor-pointer ${aktif ? "igil-hit-pulse" : ""}`}
                        onClick={() => ketukSisi(i)}
                      />
                      <text
                        x={tengah.x}
                        y={tengah.y + 5}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="800"
                        fill="#1e293b"
                        className="pointer-events-none"
                      >
                        {i + 1}
                      </text>
                    </>
                  ) : null}
                </g>
              );
            })}
            {titik.map((p, i) => {
              const aktif = pulse?.jenis === "sudut" && pulse.indeks === i;
              return (
                <circle
                  key={`sudut-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={sorot ? (sudutKetuk.includes(i) ? 12 : 10) : 8}
                  fill={sorot ? (sudutKetuk.includes(i) ? "#EF4444" : "#FDE68A") : "transparent"}
                  stroke={sorot ? "#1e293b" : "transparent"}
                  strokeWidth="3"
                  className={`cursor-pointer ${aktif ? "igil-hit-pulse" : ""}`}
                  onClick={() => ketukSudut(i)}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <label className="block rounded-2xl border border-indigo-100 bg-white p-4">
        <span className="mb-2 flex items-center justify-between text-sm font-bold text-indigo-800">
          <span>🔄 Putar Bentuk</span>
          <span>{rotasi}°</span>
        </span>
        <input
          type="range"
          min={0}
          max={360}
          value={rotasi}
          onChange={(e) => ubahRotasi(Number(e.target.value))}
          className="igil-bentuk-slider min-h-12"
          aria-label="Putar bentuk dari 0 sampai 360 derajat"
        />
      </label>

      <button
        type="button"
        onClick={() => setSorot((n) => !n)}
        className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 px-4 text-sm font-bold ${
          sorot ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {sorot ? "🔆 Sorot Sudut & Sisi: NYALA" : "Sorot Sudut & Sisi: MATI"}
      </button>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-2xl bg-amber-50 p-3">
          <p className="text-xs font-bold uppercase text-amber-700">Sisi diketuk</p>
          <p className="text-3xl font-black text-amber-900">
            {sisiKetuk.length}
            <span className="text-lg text-amber-600">/{jumlahSisi || 0}</span>
          </p>
        </div>
        <div className="rounded-2xl bg-rose-50 p-3">
          <p className="text-xs font-bold uppercase text-rose-700">Sudut diketuk</p>
          <p className="text-3xl font-black text-rose-900">
            {sudutKetuk.length}
            <span className="text-lg text-rose-600">/{jumlahSudut || 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TabGelinding({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [benda, setBenda] = useState<BendaGelinding>("lingkaran");
  const [progress, setProgress] = useState(0);
  const [putar, setPutar] = useState(0);
  const [fase, setFase] = useState<"siap" | "jalan" | "selesai">("siap");
  const [tertahan, setTertahan] = useState(false);
  const anim = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (anim.current) cancelAnimationFrame(anim.current);
    };
  }, []);

  const resetPosisi = (baru?: BendaGelinding) => {
    if (anim.current) cancelAnimationFrame(anim.current);
    setProgress(0);
    setPutar(0);
    setFase("siap");
    setTertahan(false);
    if (baru) setBenda(baru);
  };

  const lepas = () => {
    if (fase === "jalan") return;
    if (anim.current) cancelAnimationFrame(anim.current);
    setFase("jalan");
    setTertahan(false);
    const mulai = performance.now();
    const durasi = benda === "lingkaran" ? 1400 : 700;
    const batas = benda === "lingkaran" ? 1 : 0.2;

    const langkah = (now: number) => {
      const t = Math.min(1, (now - mulai) / durasi);
      const p = t * batas;
      setProgress(p);
      setPutar(benda === "lingkaran" ? p * 720 : p * 40);
      if (t < 1) {
        anim.current = requestAnimationFrame(langkah);
        return;
      }
      setFase("selesai");
      if (benda === "lingkaran") {
        kirimEvent("ROLL_SUCCESS", {
          pesan: "Lihat! Lingkaran tidak punya pojok atau sudut, jadi bisa menggelinding mulus.",
          benda,
        });
      } else {
        setTertahan(true);
        kirimEvent("ROLL_BLOCKED", {
          pesan: "Kok berhenti ya? Menurutmu, bagian mana dari bangun ini yang membuatnya tidak bisa menggelinding?",
          benda,
        });
      }
    };
    anim.current = requestAnimationFrame(langkah);
  };

  const x = 52 + progress * 228;
  const y = 48 + progress * 118;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {(["lingkaran", "segitiga", "persegi"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => resetPosisi(id)}
            className={`flex min-h-12 flex-col items-center justify-center rounded-2xl border-2 py-2 text-xs font-bold sm:text-sm ${
              benda === id ? "border-indigo-500 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <IkonMini jenis={id} />
            <span className="mt-1">{id === "lingkaran" ? "Roda" : LABEL_BANGUN[id]}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-orange-100 bg-gradient-to-b from-sky-100 to-amber-50">
        <svg viewBox="0 0 320 240" className="h-auto w-full" role="img" aria-label="Papan perosotan miring">
          <polygon points="36,36 36,196 284,196" fill="#FDBA74" stroke="#9a3412" strokeWidth="4" />
          <line x1="36" y1="36" x2="284" y2="196" stroke="#b45309" strokeWidth="10" strokeLinecap="round" />
          <rect x="20" y="196" width="280" height="16" rx="4" fill="#65A30D" />
          <g transform={`translate(${x} ${y}) rotate(${putar})`}>
            {benda === "lingkaran" ? (
              <g>
                <circle r="22" fill={WARNA.lingkaran} stroke="#1e293b" strokeWidth="3" />
                <line x1="-22" y1="0" x2="22" y2="0" stroke="#fff7ed" strokeWidth="3" />
                <line x1="0" y1="-22" x2="0" y2="22" stroke="#fff7ed" strokeWidth="3" />
              </g>
            ) : benda === "segitiga" ? (
              <polygon points="0,-24 22,16 -22,16" fill={WARNA.segitiga} stroke="#1e293b" strokeWidth="3" />
            ) : (
              <rect x="-18" y="-18" width="36" height="36" rx="3" fill={WARNA.persegi} stroke="#1e293b" strokeWidth="3" />
            )}
          </g>
          {tertahan ? (
            <text x="160" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#b91c1c">
              Tertahan di sisi datar!
            </text>
          ) : null}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={lepas}
          disabled={fase === "jalan"}
          className="min-h-12 rounded-2xl bg-indigo-600 text-sm font-black text-white shadow-md disabled:opacity-50"
        >
          🚀 Lepaskan!
        </button>
        <button
          type="button"
          onClick={() => resetPosisi()}
          className="min-h-12 rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700"
        >
          Ulangi
        </button>
      </div>
    </div>
  );
}

function TabSusun({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [pola, setPola] = useState<PolaSusun>("rumah");
  const [terpasang, setTerpasang] = useState<Record<string, string>>({});
  const [pilih, setPilih] = useState<string | null>(null);
  const selesaiPola = useRef(false);

  const slot = pola === "rumah" ? POLA_RUMAH : POLA_ROKET;
  const keping = pola === "rumah" ? KEPING_RUMAH : KEPING_ROKET;
  const terpakai = new Set(Object.values(terpasang));

  useEffect(() => {
    setTerpasang({});
    setPilih(null);
    selesaiPola.current = false;
  }, [pola]);

  const pecah = () => {
    setTerpasang({});
    setPilih(null);
    selesaiPola.current = false;
  };

  const pasang = (slotId: string) => {
    const target = slot.find((s) => s.id === slotId);
    if (!target || terpasang[slotId] || !pilih) return;
    const kepingPilih = keping.find((k) => k.id === pilih);
    if (!kepingPilih) return;
    if (kepingPilih.jenis !== target.jenis) {
      kirimEvent("SHAPE_SELECTED", {
        pesan: "Bentuknya belum cocok. Coba keping yang sama dengan siluet itu.",
        slot: slotId,
        keping: pilih,
      });
      return;
    }
    const berikutnya = { ...terpasang, [slotId]: pilih };
    setTerpasang(berikutnya);
    setPilih(null);
    if (Object.keys(berikutnya).length === slot.length && !selesaiPola.current) {
      selesaiPola.current = true;
      kirimEvent("PATTERN_COMPLETED", {
        pesan:
          pola === "rumah"
            ? "Hebat! Ternyata gabungan segitiga dan segiempat bisa membentuk gambar rumah ya."
            : "Hebat! Segitiga dan persegi panjang bisa disusun jadi roket.",
        pola,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {(["rumah", "roket"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setPola(id)}
            className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${
              pola === id ? "border-indigo-500 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {id === "rumah" ? "🏠 Rumah" : "🚀 Roket"}
          </button>
        ))}
      </div>

      <p className="text-center text-sm font-semibold text-slate-600">
        Ketuk keping, lalu ketuk siluet yang cocok. Keping akan menempel sendiri.
      </p>

      <div className="overflow-hidden rounded-3xl border-2 border-violet-100 bg-gradient-to-b from-violet-50 to-white">
        <svg viewBox="0 0 320 250" className="h-auto w-full" role="img" aria-label={`Siluet ${pola}`}>
          {slot.map((s) => {
            const isi = Boolean(terpasang[s.id]);
            return (
              <path
                key={s.id}
                d={s.d}
                fill={isi ? s.isi : "#e2e8f0"}
                stroke={pilih ? "#4f46e5" : "#475569"}
                strokeWidth={3}
                strokeDasharray={isi ? undefined : "7 6"}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Pasang ${s.label}`}
                onClick={() => pasang(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pasang(s.id);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {keping.map((k) => {
          const dipakai = terpakai.has(k.id);
          const aktif = pilih === k.id;
          return (
            <button
              key={k.id}
              type="button"
              disabled={dipakai}
              onClick={() => setPilih(k.id)}
              className={`flex min-h-12 flex-col items-center justify-center rounded-2xl border-2 py-2 text-xs font-bold disabled:opacity-30 ${
                aktif ? "border-indigo-500 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <IkonMini jenis={k.jenis} />
              <span className="mt-1 text-center leading-tight">{k.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={pecah}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-rose-200 bg-rose-50 text-sm font-bold text-rose-800"
      >
        💥 Pecah Bentuk
      </button>
    </div>
  );
}

function TabKuis({
  kirimEvent,
  onLulus,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onLulus: (catatan: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [benar, setBenar] = useState(0);
  const [salah, setSalah] = useState(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  const jawab = (id: string) => {
    if (umpan === "benar" || selesai) return;
    setPilih(id);
    const ok = id === soal.kunci;
    if (ok) {
      const skor = benar + 1;
      setBenar(skor);
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", {
        pesan: `Benar! Soal ${nomor + 1} sudah tepat.`,
        soal: soal.id,
        benar: true,
      });
      window.setTimeout(() => {
        if (nomor + 1 >= SOAL_KUIS.length) {
          onLulus("Kuis mengenal bentuk selesai. Lima soal sudah dijawab.");
          setNomor(SOAL_KUIS.length);
        } else {
          setNomor((n) => n + 1);
          setPilih(null);
          setUmpan(null);
          setSalah(0);
        }
      }, 900);
      return;
    }
    const kali = salah + 1;
    setSalah(kali);
    setUmpan("salah");
    setHint(true);
    kirimEvent("QUIZ_ANSWERED", {
      pesan: kali === 1 ? soal.hint : "Coba lihat gambarnya pelan-pelan, lalu pilih lagi.",
      soal: soal.id,
      benar: false,
      hint: true,
    });
  };

  if (selesai) {
    return (
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-4xl" aria-hidden>
          🌟
        </p>
        <p className="mt-2 text-xl font-black text-emerald-800">Kuis selesai!</p>
        <p className="mt-1 text-sm font-semibold text-emerald-700">Lima soal sudah terjawab. IGIL bangga sekali.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">Soal {nomor + 1} dari {SOAL_KUIS.length}</p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>

      {nomor === 0 ? (
        <div className="grid grid-cols-3 gap-2">
          <BangunOpsiKuis jenis="belahKetupat" />
          <BangunOpsiKuis jenis="segitigaTerbalik" />
          <BangunOpsiKuis jenis="lingkaran" />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="grid grid-cols-3 gap-2">
          <BangunOpsiKuis jenis="roda" />
          <BangunOpsiKuis jenis="buku" />
          <BangunOpsiKuis jenis="pizza" />
        </div>
      ) : null}
      {nomor === 2 ? <RumahKuis /> : null}

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
                    : aktif
                      ? "border-indigo-400 bg-indigo-50 text-indigo-800"
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
