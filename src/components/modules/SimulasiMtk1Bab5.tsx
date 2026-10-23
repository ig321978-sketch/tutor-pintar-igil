"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "TEN_BUNDLED"
  | "TEEN_NUMBER_FORMED"
  | "TWENTY_REACHED"
  | "CROSSING_TEN"
  | "SEQUENCE_SOLVED"
  | "COMPARE_TEENS"
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

type TabLab = "bungkus" | "kereta" | "timbang";
type LabelBanding = ">" | "<" | "=";

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "bungkus", ikon: "🍊", label: "Bungkus Puluhan" },
  { id: "kereta", ikon: "🚂", label: "Kereta 0–20" },
  { id: "timbang", ikon: "⚖️", label: "Timbangan 11–20" },
];

const SOAL_KUIS = [
  {
    id: "q1",
    tanya: "Bingkai kiri penuh, bingkai kanan ada 4 jeruk. Berapa jumlahnya?",
    hint: "Bingkai penuh = 10. Jadi 10 + 4.",
    kunci: "14",
    opsi: ["4", "14", "104"],
  },
  {
    id: "q2",
    tanya: "Angka 17 punya berapa puluhan dan berapa satuan?",
    hint: "Angka 1 di 17 artinya 1 puluhan (10), bukan 1 biasa. 10 + 7 = 17.",
    kunci: "1-7",
    opsi: [
      { id: "1-7", label: "1 puluhan, 7 satuan" },
      { id: "10-7", label: "10 puluhan, 7 satuan" },
      { id: "1-1", label: "1 puluhan, 1 satuan" },
    ],
  },
  {
    id: "q3",
    tanya: "Lengkapi gerbong mundur: 19 − 18 − ? − 16",
    hint: "Hitung mundur satu langkah dari 18.",
    kunci: "17",
    opsi: ["15", "17", "20"],
  },
  {
    id: "q4",
    tanya: "Urutkan dari paling sedikit ke paling banyak.",
    hint: "Lihat puluhannya sama, lalu bandingkan satuannya.",
    kunci: "12-16-19",
    kartu: [16, 12, 19],
  },
] as const;

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  void ucapkanGuruIgil(teks, { kelas: "1 SD" });
}

function clamp(nilai: number, min: number, max: number) {
  return Math.max(min, Math.min(max, nilai));
}

function puluhanDari(n: number) {
  return n === 20 ? 2 : n >= 10 ? 1 : 0;
}

function satuanDari(n: number) {
  return n === 20 ? 0 : n >= 10 ? n - 10 : n;
}

function kalimatDari(n: number) {
  if (n === 20) return "20 + 0 = 20";
  if (n >= 10) return `10 + ${n - 10} = ${n}`;
  return `0 + ${n} = ${n}`;
}

function JerukSvg({ ukuran = 28 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="15" r="10" fill="#F97316" stroke="#9a3412" strokeWidth="1.8" />
      <path d="M14 6 C14 3 17 3 18 5" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="12" r="2" fill="#fed7aa" />
    </svg>
  );
}

function KeranjangSvg({ ukuran = 72 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 72 72" aria-hidden>
      <ellipse cx="36" cy="22" rx="22" ry="8" fill="#FDBA74" stroke="#9a3412" strokeWidth="2" />
      <path d="M14 22 L20 58 Q36 66 52 58 L58 22" fill="#F97316" stroke="#9a3412" strokeWidth="2" />
      <path d="M22 34 H50" stroke="#fff7ed" strokeWidth="2" />
      <text x="36" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">
        10
      </text>
    </svg>
  );
}

function BatangPuluhan({ tinggi = 88 }: { tinggi?: number }) {
  return (
    <svg width="28" height={tinggi} viewBox="0 0 28 100" className="h-full w-7" aria-hidden>
      <rect x="4" y="4" width="20" height="92" rx="4" fill="#FB923C" stroke="#9a3412" strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="4" y1={13.2 * (i + 1)} x2="24" y2={13.2 * (i + 1)} stroke="#9a3412" strokeWidth="1" />
      ))}
    </svg>
  );
}

function KubusSatuan({ aktif = true }: { aktif?: boolean }) {
  return (
    <span
      className={`block h-5 w-5 rounded-sm border-2 ${
        aktif ? "border-orange-800 bg-orange-400" : "border-slate-300 bg-slate-200"
      }`}
    />
  );
}

function KeretaSvg({ ukuran = 40 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 48 40" aria-hidden>
      <rect x="4" y="10" width="28" height="16" rx="3" fill="#EF4444" stroke="#7f1d1d" strokeWidth="2" />
      <rect x="32" y="16" width="12" height="10" rx="2" fill="#FBBF24" stroke="#92400e" strokeWidth="2" />
      <circle cx="12" cy="30" r="5" fill="#1e293b" />
      <circle cx="28" cy="30" r="5" fill="#1e293b" />
      <rect x="8" y="4" width="10" height="8" rx="1" fill="#7DD3FC" stroke="#0369a1" strokeWidth="1.5" />
    </svg>
  );
}

function PanelNilaiTempat({ total }: { total: number }) {
  const puluhan = puluhanDari(total);
  const satuan = satuanDari(total);
  return (
    <div className="space-y-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-center text-[11px] font-bold uppercase tracking-widest text-amber-700">
        Tabel Nilai Tempat
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-orange-500 px-3 py-3 text-center text-white">
          <p className="text-xs font-bold uppercase">Puluhan</p>
          <p className="text-3xl font-black">{puluhan}</p>
        </div>
        <div className="rounded-2xl bg-sky-500 px-3 py-3 text-center text-white">
          <p className="text-xs font-bold uppercase">Satuan</p>
          <p className="text-3xl font-black">{satuan}</p>
        </div>
      </div>
      <p className="rounded-2xl bg-white px-3 py-2 text-center text-lg font-black text-slate-800">
        {kalimatDari(total)}
      </p>
    </div>
  );
}

function BingkaiSepuluh({
  terisi,
  bundel,
  offset,
  onSlot,
}: {
  terisi: number;
  bundel?: boolean;
  offset: number;
  onSlot: (indeks: number) => void;
}) {
  if (bundel) {
    return (
      <div className="flex min-h-[132px] flex-col items-center justify-center rounded-3xl border-2 border-orange-400 bg-orange-100 p-3">
        <div className="igil-ikat-pulse">
          <KeranjangSvg />
        </div>
        <p className="mt-1 text-sm font-black text-orange-800">1 Keranjang Puluhan</p>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-2">
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => {
          const penuh = i < terisi;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSlot(offset + i)}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-orange-200 bg-white"
              aria-label={penuh ? `Kurangi jeruk ke-${offset + i + 1}` : `Tambah jeruk ke-${offset + i + 1}`}
            >
              {penuh ? <JerukSvg /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SimulasiMtk1Bab5({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("bungkus");
  const [pesanLayar, setPesanLayar] = useState("Isi bingkai, naik kereta, atau bandingkan belasan. IGIL akan ikut bicara.");
  const sudahLulus = useRef(false);

  const [jumlah, setJumlah] = useState(7);
  const [ikat, setIkat] = useState(true);
  const [kereta, setKereta] = useState(9);
  const [kiri, setKiri] = useState(14);
  const [kanan, setKanan] = useState(17);
  const [totalKuis, setTotalKuis] = useState(14);

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

  const totalPanel = tab === "bungkus" ? jumlah : tab === "kereta" ? kereta : tab === "timbang" ? kiri : totalKuis;

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-orange-100 bg-white shadow-xl shadow-orange-100/50">
      <style>{`
        @keyframes igil-ikat-pulse {
          0% { transform: scale(0.86); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .igil-ikat-pulse { animation: igil-ikat-pulse 0.55s ease-out; }
        @keyframes igil-kereta-gerak {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .igil-kereta-gerak { animation: igil-kereta-gerak 0.28s ease-out; }
      `}</style>

      <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Ayo Membilang sampai dengan 20</h2>
        <p className="mt-1 text-sm text-orange-50">Ikat puluhan, naik kereta, dan bandingkan belasan bersama IGIL.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-orange-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-sm font-bold transition ${
              tab === item.id ? "bg-white text-orange-700 shadow-sm" : "text-orange-500 hover:bg-white/60"
            }`}
          >
            <span className="font-normal" aria-hidden>
              {item.ikon}
            </span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-gradient-to-b from-white to-amber-50/50 p-4 sm:p-5">
        <p className="min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          <span className="font-normal">🦉</span> {pesanLayar}
        </p>

        <PanelNilaiTempat total={totalPanel} />

        {tab === "bungkus" ? (
          <TabBungkus jumlah={jumlah} setJumlah={setJumlah} ikat={ikat} setIkat={setIkat} kirimEvent={kirimEvent} />
        ) : null}
        {tab === "kereta" ? <TabKereta posisi={kereta} setPosisi={setKereta} kirimEvent={kirimEvent} /> : null}
        {tab === "timbang" ? (
          <TabTimbang kiri={kiri} setKiri={setKiri} kanan={kanan} setKanan={setKanan} kirimEvent={kirimEvent} />
        ) : null}
      </div>

    </div>
  );
}

function TabBungkus({
  jumlah,
  setJumlah,
  ikat,
  setIkat,
  kirimEvent,
}: {
  jumlah: number;
  setJumlah: (n: number) => void;
  ikat: boolean;
  setIkat: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const sudahSepuluh = useRef(false);
  const sudahDuaPuluh = useRef(false);
  const teenTerakhir = useRef<number | null>(null);

  const ubah = (baruMentah: number) => {
    const baru = clamp(baruMentah, 0, 20);
    const lama = jumlah;
    setJumlah(baru);
    if (lama < 10 && baru >= 10 && !sudahSepuluh.current) {
      sudahSepuluh.current = true;
      kirimEvent("TEN_BUNDLED", {
        pesan: "Wah, bingkai pertamanya sudah penuh 10! Kita ikat jadi 1 Puluhan ya.",
        total: baru,
      });
    }
    if (baru < 10) sudahSepuluh.current = false;
    if (baru >= 11 && baru <= 19 && teenTerakhir.current !== baru) {
      teenTerakhir.current = baru;
      const ones = baru - 10;
      kirimEvent("TEEN_NUMBER_FORMED", {
        pesan: `Ada 1 puluhan (10) dan ${ones} satuan di luar. Sepuluh ditambah ${ones} menjadi ${baru}!`,
        total: baru,
        tens: 1,
        ones,
      });
    }
    if (baru < 11 || baru > 19) teenTerakhir.current = null;
    if (baru === 20 && !sudahDuaPuluh.current) {
      sudahDuaPuluh.current = true;
      kirimEvent("TWENTY_REACHED", {
        pesan: "Dua bingkai 10 sudah penuh semua! Artinya kita punya 2 Puluhan dan 0 Satuan, yaitu 20.",
        total: 20,
        tens: 2,
        ones: 0,
      });
    }
    if (baru < 20) sudahDuaPuluh.current = false;
  };

  const klikSlot = (indeks: number) => {
    if (indeks < jumlah) ubah(jumlah - 1);
    else ubah(jumlah + 1);
  };

  const kiriPenuh = jumlah >= 10;
  const kiriTerisi = Math.min(jumlah, 10);
  const kananTerisi = Math.max(0, jumlah - 10);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "+1", aksi: () => ubah(jumlah + 1) },
          { label: "−1", aksi: () => ubah(jumlah - 1) },
          { label: "+10", aksi: () => ubah(jumlah + 10) },
          { label: "Reset", aksi: () => ubah(0) },
        ].map((tombol) => (
          <button
            key={tombol.label}
            type="button"
            onClick={tombol.aksi}
            className="min-h-12 rounded-2xl bg-orange-500 text-sm font-black text-white shadow-sm"
          >
            {tombol.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIkat(!ikat)}
        className={`flex min-h-12 w-full items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold ${
          ikat ? "border-orange-400 bg-orange-50 text-orange-800" : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {ikat ? "🧺 Otomatis Ikat Puluhan: NYALA" : "Otomatis Ikat Puluhan: MATI"}
      </button>

      <div className="grid gap-3 sm:grid-cols-2">
        <BingkaiSepuluh terisi={kiriTerisi} bundel={ikat && kiriPenuh} offset={0} onSlot={klikSlot} />
        <BingkaiSepuluh terisi={kananTerisi} offset={10} onSlot={klikSlot} />
      </div>
      <p className="text-center text-sm font-bold text-orange-800">Jumlah jeruk: {jumlah}</p>
    </div>
  );
}

function TabKereta({
  posisi,
  setPosisi,
  kirimEvent,
}: {
  posisi: number;
  setPosisi: (n: number) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [modeTebak, setModeTebak] = useState(false);
  const [hilang, setHilang] = useState<number[]>([13, 17]);
  const [terisi, setTerisi] = useState<Record<number, number>>({});
  const [kartuPilih, setKartuPilih] = useState<number | null>(null);
  const sudahSilang = useRef(false);
  const sudahUrutan = useRef(false);

  const kartu = useMemo(() => {
    const pengecoh = [11, 12, 14, 15, 16, 18, 19, 20].find((n) => !hilang.includes(n)) ?? 15;
    return [...hilang, pengecoh].sort((a, b) => a - b);
  }, [hilang]);

  const acakHilang = () => {
    const kolam = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const a = kolam[Math.floor(Math.random() * kolam.length)];
    let b = a;
    while (b === a) b = kolam[Math.floor(Math.random() * kolam.length)];
    setHilang([Math.min(a, b), Math.max(a, b)]);
    setTerisi({});
    setKartuPilih(null);
    sudahUrutan.current = false;
  };

  const gerak = (delta: number) => {
    const lama = posisi;
    const baru = clamp(lama + delta, 0, 20);
    setPosisi(baru);
    if (lama <= 10 && baru > 10 && !sudahSilang.current) {
      sudahSilang.current = true;
      kirimEvent("CROSSING_TEN", {
        pesan: "Kita sudah melewati angka 10! Sekarang kita masuk ke keluarga bilangan belasan.",
        from: lama,
        to: baru,
      });
    }
    if (baru <= 10) sudahSilang.current = false;
  };

  const pasang = (slot: number) => {
    if (kartuPilih == null) return;
    if (kartuPilih !== slot) {
      kirimEvent("QUIZ_ANSWERED", {
        pesan: "Angka itu belum cocok dengan gerbong ini. Coba lihat tetangga kiri dan kanannya.",
        benar: false,
        slot,
        kartu: kartuPilih,
      });
      return;
    }
    const berikutnya = { ...terisi, [slot]: kartuPilih };
    setTerisi(berikutnya);
    setKartuPilih(null);
    if (hilang.every((n) => berikutnya[n] === n) && !sudahUrutan.current) {
      sudahUrutan.current = true;
      kirimEvent("SEQUENCE_SOLVED", {
        pesan: `Tepat sekali! Angka ${slot} berada tepat di antara ${slot - 1} dan ${slot + 1}.`,
        target: slot,
        prev: slot - 1,
        next: slot + 1,
      });
    }
  };

  const xUntuk = (n: number) => 16 + n * 18.4;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <button type="button" onClick={() => gerak(-1)} className="min-h-12 rounded-2xl bg-slate-700 text-sm font-black text-white">
          −1
        </button>
        <button type="button" onClick={() => gerak(1)} className="min-h-12 rounded-2xl bg-sky-600 text-sm font-black text-white">
          +1
        </button>
        <button type="button" onClick={() => gerak(2)} className="min-h-12 rounded-2xl bg-violet-600 text-sm font-black text-white">
          +2
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600">
        Gerbong di angka {posisi} · {posisi % 2 === 0 ? "genap" : "ganjil"}
      </p>

      <div className="overflow-x-auto rounded-3xl border-2 border-sky-100 bg-sky-50 p-2">
        <svg viewBox="0 0 400 110" className="h-auto min-w-[340px] w-full" role="img" aria-label="Rel kereta 0 sampai 20">
          <line x1="16" y1="72" x2="384" y2="72" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {Array.from({ length: 21 }).map((_, n) => {
            const istimewa = n === 10 || n === 20;
            const kosong = modeTebak && hilang.includes(n) && terisi[n] == null;
            const terisiBenar = modeTebak && terisi[n] === n;
            return (
              <g key={n}>
                <line x1={xUntuk(n)} y1="64" x2={xUntuk(n)} y2="80" stroke="#334155" strokeWidth="2" />
                {kosong ? (
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label={`Pasang gerbong ${n}`}
                    onClick={() => pasang(n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") pasang(n);
                    }}
                  >
                    <rect x={xUntuk(n) - 9} y="84" width="18" height="18" rx="4" fill="#fff" stroke="#6366f1" strokeDasharray="3 2" />
                  </g>
                ) : (
                  <text
                    x={xUntuk(n)}
                    y="98"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill={istimewa ? "#c2410c" : terisiBenar ? "#16a34a" : "#1e293b"}
                  >
                    {modeTebak && hilang.includes(n) ? terisi[n] : n}
                  </text>
                )}
                {istimewa ? <circle cx={xUntuk(n)} cy="72" r="5" fill="#F97316" /> : <circle cx={xUntuk(n)} cy="72" r="3" fill="#94a3b8" />}
              </g>
            );
          })}
          <g className="igil-kereta-gerak" style={{ transformOrigin: `${xUntuk(posisi)}px 40px` }}>
            <foreignObject x={xUntuk(posisi) - 20} y="18" width="40" height="40">
              <KeretaSvg />
            </foreignObject>
          </g>
        </svg>
      </div>

      <button
        type="button"
        onClick={() => {
          setModeTebak((n) => !n);
          if (!modeTebak) acakHilang();
        }}
        className={`flex min-h-12 w-full items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold ${
          modeTebak ? "border-violet-400 bg-violet-50 text-violet-800" : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {modeTebak ? "🎯 Tebak Gerbong Hilang: NYALA" : "Tebak Gerbong Hilang"}
      </button>

      {modeTebak ? (
        <div className="space-y-2">
          <p className="text-center text-sm font-semibold text-slate-600">Ketuk kartu, lalu ketuk gerbong kosong.</p>
          <div className="grid grid-cols-3 gap-2">
            {kartu.map((n) => {
              const dipakai = Object.values(terisi).includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  disabled={dipakai}
                  onClick={() => setKartuPilih(n)}
                  className={`min-h-12 rounded-2xl border-2 text-lg font-black disabled:opacity-30 ${
                    kartuPilih === n ? "border-violet-500 bg-violet-50 text-violet-800" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={acakHilang} className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700">
            Soal gerbong baru
          </button>
        </div>
      ) : null}
    </div>
  );
}

function NampanBilangan({ nilai, sorot }: { nilai: number; sorot: boolean }) {
  const ones = satuanDari(nilai);
  const tens = puluhanDari(nilai);
  return (
    <div className={`rounded-3xl border-2 p-3 ${sorot ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"}`}>
      <p className="mb-2 text-center text-2xl font-black text-slate-800">{nilai}</p>
      <div className="flex items-end justify-center gap-3">
        <div className="flex flex-col items-center">
          {Array.from({ length: tens }).map((_, i) => (
            <div key={i} className={`h-24 ${sorot ? "ring-4 ring-orange-300 ring-offset-2" : ""}`}>
              <BatangPuluhan />
            </div>
          ))}
          <p className="mt-1 text-[10px] font-bold uppercase text-orange-700">Puluhan</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-8 flex-col-reverse gap-0.5">
            {Array.from({ length: ones }).map((_, i) => (
              <KubusSatuan key={i} />
            ))}
          </div>
          {sorot ? <div className="mt-1 h-1 w-8 rounded bg-violet-500" /> : null}
          <p className="mt-1 text-[10px] font-bold uppercase text-sky-700">Satuan</p>
        </div>
      </div>
    </div>
  );
}

function TabTimbang({
  kiri,
  setKiri,
  kanan,
  setKanan,
  kirimEvent,
}: {
  kiri: number;
  setKiri: (n: number) => void;
  kanan: number;
  setKanan: (n: number) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [sorot, setSorot] = useState(false);
  const [pilih, setPilih] = useState<LabelBanding | null>(null);
  const benar: LabelBanding = kiri > kanan ? ">" : kiri < kanan ? "<" : "=";

  const ubahKiri = (n: number) => {
    setKiri(n);
    setPilih(null);
  };
  const ubahKanan = (n: number) => {
    setKanan(n);
    setPilih(null);
  };

  const bandingkan = (label: LabelBanding) => {
    setPilih(label);
    kirimEvent("COMPARE_TEENS", {
      pesan: `Kiri (${kiri}) dan kanan (${kanan}) sama-sama punya 1 puluhan. Jadi kita cukup lihat satuannya saja: ${satuanDari(kiri)} dibandingkan ${satuanDari(kanan)}!`,
      left: kiri,
      right: kanan,
      leftOnes: satuanDari(kiri),
      rightOnes: satuanDari(kanan),
      pilihan: label,
      tepat: label === benar,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <p className="mb-2 text-center text-xs font-bold uppercase text-slate-500">Nampan kiri</p>
          <div className="flex items-center justify-center gap-2">
            <button type="button" onClick={() => ubahKiri(clamp(kiri - 1, 11, 20))} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-2xl font-black text-white">
              −
            </button>
            <p className="min-w-10 text-center text-3xl font-black text-indigo-800">{kiri}</p>
            <button type="button" onClick={() => ubahKiri(clamp(kiri + 1, 11, 20))} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-black text-white">
              +
            </button>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <p className="mb-2 text-center text-xs font-bold uppercase text-slate-500">Nampan kanan</p>
          <div className="flex items-center justify-center gap-2">
            <button type="button" onClick={() => ubahKanan(clamp(kanan - 1, 11, 20))} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-2xl font-black text-white">
              −
            </button>
            <p className="min-w-10 text-center text-3xl font-black text-indigo-800">{kanan}</p>
            <button type="button" onClick={() => ubahKanan(clamp(kanan + 1, 11, 20))} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-black text-white">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NampanBilangan nilai={kiri} sorot={sorot} />
        <NampanBilangan nilai={kanan} sorot={sorot} />
      </div>

      <button
        type="button"
        onClick={() => setSorot((n) => !n)}
        className={`flex min-h-12 w-full items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold ${
          sorot ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {sorot ? "🔦 Sorot Perbandingan: NYALA" : "Sorot Perbandingan"}
      </button>

      <div className="grid grid-cols-3 gap-2">
        {(
          [
            { id: ">" as const, label: "Lebih banyak >" },
            { id: "=" as const, label: "Sama =" },
            { id: "<" as const, label: "Lebih sedikit <" },
          ]
        ).map((item) => {
          const aktif = pilih === item.id;
          const hijau = aktif && item.id === benar;
          const merah = aktif && item.id !== benar;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => bandingkan(item.id)}
              className={`min-h-12 rounded-2xl border-2 px-1 text-xs font-black sm:text-sm ${
                hijau
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : merah
                    ? "border-rose-400 bg-rose-50 text-rose-800"
                    : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabKuis({
  kirimEvent,
  onLulus,
  onTotal,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onLulus: (catatan: string) => void;
  onTotal: (n: number) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const [urut, setUrut] = useState<number[]>([]);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  useEffect(() => {
    onTotal([14, 17, 17, 12][Math.min(nomor, 3)]);
  }, [nomor, onTotal]);

  const maju = () => {
    window.setTimeout(() => {
      if (nomor + 1 >= SOAL_KUIS.length) {
        onLulus("Kuis membilang sampai 20 selesai. Empat soal interaktif sudah dijawab.");
        setNomor(SOAL_KUIS.length);
      } else {
        setNomor((n) => n + 1);
        setPilih(null);
        setUmpan(null);
        setHint(false);
        setUrut([]);
      }
    }, 900);
  };

  const jawab = (id: string) => {
    if (umpan === "benar" || selesai) return;
    setPilih(id);
    if (id === soal.kunci) {
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", { pesan: `Benar! Soal ${nomor + 1} sudah tepat.`, soal: soal.id, benar: true });
      maju();
      return;
    }
    setUmpan("salah");
    setHint(true);
    kirimEvent("QUIZ_ANSWERED", { pesan: soal.hint, soal: soal.id, benar: false, hint: true });
  };

  const klikKartu = (n: number) => {
    if (umpan === "benar" || urut.includes(n)) return;
    const berikutnya = [...urut, n];
    setUrut(berikutnya);
    if (berikutnya.length === 3) {
      jawab(berikutnya.join("-"));
    }
  };

  if (selesai) {
    return (
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-4xl font-normal" aria-hidden>
          🌟
        </p>
        <p className="mt-2 text-xl font-black text-emerald-800">Kuis selesai!</p>
        <p className="mt-1 text-sm font-semibold text-emerald-700">Empat soal membilang sampai 20 sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Soal {nomor + 1} dari 4</p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>

      {nomor === 0 ? (
        <div className="grid grid-cols-2 gap-2">
          <BingkaiSepuluh terisi={10} offset={0} onSlot={() => undefined} />
          <BingkaiSepuluh terisi={4} offset={10} onSlot={() => undefined} />
        </div>
      ) : null}
      {nomor === 1 ? (
        <p className="rounded-2xl bg-orange-50 px-3 py-2 text-center text-sm font-bold text-orange-800">
          Jangan tertukar: 10 + 7 = 17, bukan 1 + 7 = 8.
        </p>
      ) : null}
      {nomor === 2 ? (
        <div className="flex justify-center gap-2 text-xl font-black text-slate-800">
          <span className="rounded-xl bg-sky-100 px-3 py-2">19</span>
          <span className="rounded-xl bg-sky-100 px-3 py-2">18</span>
          <span className="rounded-xl border-2 border-dashed border-violet-400 bg-white px-3 py-2">?</span>
          <span className="rounded-xl bg-sky-100 px-3 py-2">16</span>
        </div>
      ) : null}
      {nomor === 3 && "kartu" in soal ? (
        <div className="grid grid-cols-3 gap-2">
          {soal.kartu.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => klikKartu(n)}
              disabled={urut.includes(n)}
              className="min-h-12 rounded-2xl border-2 border-orange-200 bg-white text-xl font-black text-orange-800 disabled:bg-emerald-50 disabled:text-emerald-700"
            >
              {n}
            </button>
          ))}
        </div>
      ) : null}
      {nomor === 3 ? (
        <p className="text-center text-sm font-semibold text-slate-600">
          Urutan: {urut.length ? urut.join(" → ") : "ketuk dari yang paling sedikit"}
        </p>
      ) : null}

      {"opsi" in soal ? (
        <div className="grid gap-2">
          {(typeof soal.opsi[0] === "string"
            ? (soal.opsi as readonly string[]).map((id) => ({ id, label: id }))
            : (soal.opsi as readonly { id: string; label: string }[])
          ).map((o) => {
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
      ) : null}

      {hint ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          💡 {soal.hint}
        </p>
      ) : null}
    </div>
  );
}
