"use client";

import { useCallback, useRef, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "MISALIGNED_COMPARISON"
  | "ALIGNED_SUCCESS"
  | "MEASUREMENT_COMPLETE"
  | "UNIT_SIZE_CHANGED"
  | "GAP_ERROR_DETECTED"
  | "ORDERING_CORRECT"
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

type TabLab = "sejajar" | "ukur" | "urut" | "kuis";
type IdBenda = "merah" | "biru" | "hijau";
type TargetUkur = "pensil" | "buku" | "meja";
type AlatUkur = "klip" | "penghapus" | "jengkal";
type MisiUrut = "pendek" | "panjang";

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "sejajar", ikon: "📏", label: "Sejajarkan" },
  { id: "ukur", ikon: "📎", label: "Satuan Tak Baku" },
  { id: "urut", ikon: "📊", label: "Urutkan" },
  { id: "kuis", ikon: "⭐", label: "Kuis" },
];

const BENDA_BANDING: { id: IdBenda; nama: string; panjang: number; warna: string }[] = [
  { id: "merah", nama: "Pensil Merah", panjang: 7, warna: "#EF4444" },
  { id: "biru", nama: "Pensil Biru", panjang: 9, warna: "#3B82F6" },
  { id: "hijau", nama: "Krayon Hijau", panjang: 5, warna: "#22C55E" },
];

const TARGET: Record<TargetUkur, { nama: string; panjang: number }> = {
  pensil: { nama: "Pensil", panjang: 6 },
  buku: { nama: "Buku Tulis", panjang: 6 },
  meja: { nama: "Meja Belajar", panjang: 12 },
};

const ALAT: Record<AlatUkur, { nama: string; ukuran: number }> = {
  klip: { nama: "Klip Kertas", ukuran: 1 },
  penghapus: { nama: "Penghapus", ukuran: 2 },
  jengkal: { nama: "Jengkal Tangan", ukuran: 3 },
};

const KARTU_URUT = [
  { id: "penggaris", nama: "Penggaris", petak: 8, warna: "#F59E0B" },
  { id: "spidol", nama: "Spidol", petak: 5, warna: "#8B5CF6" },
  { id: "kapur", nama: "Kapur", petak: 3, warna: "#64748B" },
];

type OpsiKuis = { id: string; label: string };
type SoalKuis = { id: string; tanya: string; hint: string; kunci: string; opsi: OpsiKuis[] };

const SOAL_KUIS: SoalKuis[] = [
  {
    id: "q1",
    tanya: "Pita ungu mulai lebih ke kanan. Pita mana yang lebih panjang?",
    hint: "Jangan lihat ujung kanan saja. Lihat pangkal kiri di garis merah dulu.",
    kunci: "kuning",
    opsi: [
      { id: "ungu", label: "Pita ungu, karena ujungnya lebih ke kanan" },
      { id: "kuning", label: "Pita kuning, setelah pangkalnya disejajarkan" },
      { id: "sama", label: "Keduanya sama panjang" },
    ],
  },
  {
    id: "q2",
    tanya: "Sikat gigi ini diukur dengan klip kertas rapat. Berapa panjangnya?",
    hint: "Hitung klip dari pangkal sampai ujung, tanpa celah.",
    kunci: "5",
    opsi: [
      { id: "4", label: "4 klip" },
      { id: "5", label: "5 klip" },
      { id: "6", label: "6 klip" },
    ],
  },
  {
    id: "q3",
    tanya: "Cara mengukur yang benar itu yang mana?",
    hint: "Satuan harus rapat, lurus, dan tanpa tumpang tindih.",
    kunci: "rapat",
    opsi: [
      { id: "rapat", label: "Rapat dan lurus dari pangkal" },
      { id: "renggang", label: "Ada celah di antara satuan" },
      { id: "tumpang", label: "Satuan saling tumpang tindih" },
    ],
  },
  {
    id: "q4",
    tanya: "Urutkan pohon dari paling tinggi ke paling pendek.",
    hint: "Hitung petaknya. Yang petaknya paling banyak itu yang paling tinggi.",
    kunci: "6-4-2",
    opsi: [
      { id: "6-4-2", label: "6 petak, 4 petak, 2 petak" },
      { id: "2-4-6", label: "2 petak, 4 petak, 6 petak" },
      { id: "4-6-2", label: "4 petak, 6 petak, 2 petak" },
    ],
  },
  {
    id: "q5",
    tanya: "Meja diukur 4 jengkal. Buku diukur 2 jengkal. Mana yang lebih panjang?",
    hint: "4 jengkal lebih banyak dari 2 jengkal.",
    kunci: "meja",
    opsi: [
      { id: "meja", label: "Meja" },
      { id: "buku", label: "Buku" },
      { id: "sama", label: "Sama panjang" },
    ],
  },
];

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  void ucapkanGuruIgil(teks, { kelas: "1 SD" });
}

function PanelStatus({ teks, peringatan }: { teks: string; peringatan?: boolean }) {
  return (
    <div
      className={`rounded-3xl border-2 px-4 py-3 text-center text-sm font-black sm:text-base ${
        peringatan ? "border-rose-300 bg-rose-50 text-rose-800" : "border-teal-200 bg-teal-50 text-teal-900"
      }`}
    >
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest opacity-70">Status Pengukuran Dinamis</p>
      {teks}
    </div>
  );
}

function BatangBenda({
  panjang,
  offset,
  warna,
  label,
  px = 22,
}: {
  panjang: number;
  offset: number;
  warna: string;
  label: string;
  px?: number;
}) {
  return (
    <div className="relative h-10">
      <div
        className="absolute top-1 h-8 rounded-full border-2 border-slate-800 transition-all duration-500"
        style={{ left: offset * px, width: panjang * px, background: warna }}
      />
      <p className="pointer-events-none absolute left-2 top-2 text-[11px] font-black text-white drop-shadow">{label}</p>
    </div>
  );
}

function IkonAlat({ jenis, n }: { jenis: AlatUkur; n: number }) {
  if (jenis === "klip") {
    return (
      <svg viewBox="0 0 28 36" className="h-9 w-7" aria-hidden>
        <path d="M10 8 H18 Q22 8 22 14 V24 Q22 30 16 30 H12 Q8 30 8 24 V12 Q8 6 14 6 H18" fill="none" stroke="#64748b" strokeWidth="3" />
        <text x="14" y="22" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f172a">
          {n}
        </text>
      </svg>
    );
  }
  if (jenis === "penghapus") {
    return (
      <svg viewBox="0 0 44 28" className="h-8 w-11" aria-hidden>
        <rect x="2" y="4" width="40" height="20" rx="4" fill="#F9A8D4" stroke="#9d174d" strokeWidth="2" />
        <text x="22" y="18" textAnchor="middle" fontSize="11" fontWeight="800" fill="#831843">
          {n}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 52 36" className="h-9 w-12" aria-hidden>
      <path d="M8 28 Q26 4 44 28" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <circle cx="8" cy="28" r="4" fill="#FDBA74" />
      <circle cx="44" cy="28" r="4" fill="#FDBA74" />
      <text x="26" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e">
        {n}
      </text>
    </svg>
  );
}

export default function SimulasiMtk1Bab7({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("sejajar");
  const [pesanLayar, setPesanLayar] = useState("Sejajarkan pangkal, ukur dengan satuan tak baku, lalu urutkan. IGIL ikut bicara.");
  const sudahLulus = useRef(false);

  const [sejajar, setSejajar] = useState(false);
  const [offset, setOffset] = useState<Record<IdBenda, number>>({ merah: 3, biru: 0, hijau: 5 });
  const [target, setTarget] = useState<TargetUkur>("buku");
  const [alat, setAlat] = useState<AlatUkur>("klip");
  const [jumlah, setJumlah] = useState(0);
  const [renggang, setRenggang] = useState(false);
  const [misiUrut, setMisiUrut] = useState<MisiUrut>("pendek");
  const [urutan, setUrutan] = useState(["spidol", "penggaris", "kapur"]);

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

  const butuh = TARGET[target].panjang / ALAT[alat].ukuran;
  const pas = jumlah === butuh && !renggang;
  const status = (() => {
    if (tab === "sejajar") {
      return sejajar
        ? { teks: "Pangkal sudah sejajar. Lihat ujung kanan untuk bandingkan.", peringatan: false }
        : { teks: "Pangkal benda belum sejajar!", peringatan: true };
    }
    if (tab === "ukur") {
      if (renggang) return { teks: "Ada celah. Hasil pengukuran tidak tepat.", peringatan: true };
      if (pas) return { teks: `Panjang ${TARGET[target].nama} = ${jumlah} ${ALAT[alat].nama}`, peringatan: false };
      return { teks: `${TARGET[target].nama} diukur dengan ${ALAT[alat].nama}: ${jumlah} satuan`, peringatan: false };
    }
    if (tab === "urut") {
      return {
        teks: misiUrut === "pendek" ? "Urutkan dari paling pendek ke paling panjang." : "Urutkan dari paling panjang ke paling pendek.",
        peringatan: false,
      };
    }
    return { teks: "Jawab kuis pelan-pelan. Ada hint jika salah.", peringatan: false };
  })();

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-teal-100 bg-white shadow-xl shadow-teal-100/40">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Mengukur Panjang Benda</h2>
        <p className="mt-1 text-sm text-teal-50">Sejajarkan pangkal, ukur rapat, dan urutkan bersama IGIL.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-teal-50 p-2 sm:grid-cols-4">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-sm font-bold transition ${
              tab === item.id ? "bg-white text-teal-700 shadow-sm" : "text-teal-500 hover:bg-white/60"
            }`}
          >
            <span className="font-normal" aria-hidden>
              {item.ikon}
            </span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-gradient-to-b from-white to-cyan-50/40 p-4 sm:p-5">
        <p className="min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          <span className="font-normal">🦉</span> {pesanLayar}
        </p>
        <PanelStatus teks={status.teks} peringatan={status.peringatan} />

        {tab === "sejajar" ? (
          <TabSejajar
            sejajar={sejajar}
            offset={offset}
            setSejajar={setSejajar}
            setOffset={setOffset}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "ukur" ? (
          <TabUkur
            target={target}
            alat={alat}
            jumlah={jumlah}
            renggang={renggang}
            setTarget={setTarget}
            setAlat={setAlat}
            setJumlah={setJumlah}
            setRenggang={setRenggang}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "urut" ? (
          <TabUrut misi={misiUrut} urutan={urutan} setMisi={setMisiUrut} setUrutan={setUrutan} kirimEvent={kirimEvent} />
        ) : null}
        {tab === "kuis" ? <TabKuis kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
      </div>

    </div>
  );
}

function TabSejajar({
  sejajar,
  offset,
  setSejajar,
  setOffset,
  kirimEvent,
}: {
  sejajar: boolean;
  offset: Record<IdBenda, number>;
  setSejajar: (n: boolean) => void;
  setOffset: (n: Record<IdBenda, number>) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [pilihPanjang, setPilihPanjang] = useState<IdBenda | null>(null);
  const [pilihPendek, setPilihPendek] = useState<IdBenda | null>(null);
  const sudahSejajar = useRef(false);

  const acak = () => {
    setOffset({ merah: 3, biru: 0, hijau: 5 });
    setSejajar(false);
    setPilihPanjang(null);
    setPilihPendek(null);
    sudahSejajar.current = false;
  };

  const sejajarkan = () => {
    setOffset({ merah: 0, biru: 0, hijau: 0 });
    setSejajar(true);
    if (!sudahSejajar.current) {
      sudahSejajar.current = true;
      kirimEvent("ALIGNED_SUCCESS", {
        pesan: "Nah, sekarang pangkalnya sudah sejajar! Coba lihat ujung kanannya, benda mana yang paling panjang?",
      });
    }
  };

  const jawab = (jenis: "panjang" | "pendek", id: IdBenda) => {
    if (!sejajar) {
      kirimEvent("MISALIGNED_COMPARISON", {
        pesan: "Tunggu dulu! Pangkal pensilnya belum sejajar di garis merah. Yuk, klik 'Sejajarkan ke Garis Pangkal' dulu supaya adil membandingkannya!",
      });
      return;
    }
    if (jenis === "panjang") setPilihPanjang(id);
    else setPilihPendek(id);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border-2 border-rose-100 bg-amber-50 p-3">
        <div className="absolute bottom-3 left-6 top-3 w-1.5 rounded-full bg-rose-500" />
        <p className="mb-2 pl-6 text-xs font-bold uppercase tracking-wide text-rose-600">Garis Pangkal</p>
        <div className="space-y-3 pl-6">
          {BENDA_BANDING.map((b) => (
            <BatangBenda key={b.id} panjang={b.panjang} offset={offset[b.id]} warna={b.warna} label={b.nama} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={acak} className="min-h-12 rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700">
          Acak Posisi
        </button>
        <button type="button" onClick={sejajarkan} className="min-h-12 rounded-2xl bg-rose-500 text-sm font-black text-white">
          Sejajarkan ke Garis Pangkal!
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-bold uppercase text-slate-500">Paling panjang</p>
          <div className="grid gap-1">
            {BENDA_BANDING.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => jawab("panjang", b.id)}
                className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${
                  pilihPanjang === b.id
                    ? b.id === "biru" && sejajar
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-indigo-400 bg-indigo-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {b.nama}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-bold uppercase text-slate-500">Paling pendek</p>
          <div className="grid gap-1">
            {BENDA_BANDING.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => jawab("pendek", b.id)}
                className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${
                  pilihPendek === b.id
                    ? b.id === "hijau" && sejajar
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-indigo-400 bg-indigo-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {b.nama}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabUkur({
  target,
  alat,
  jumlah,
  renggang,
  setTarget,
  setAlat,
  setJumlah,
  setRenggang,
  kirimEvent,
}: {
  target: TargetUkur;
  alat: AlatUkur;
  jumlah: number;
  renggang: boolean;
  setTarget: (n: TargetUkur) => void;
  setAlat: (n: AlatUkur) => void;
  setJumlah: (n: number) => void;
  setRenggang: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const panjang = TARGET[target].panjang;
  const ukuran = ALAT[alat].ukuran;
  const butuh = panjang / ukuran;
  const sudahPas = useRef("");

  const gantiAlat = (baru: AlatUkur) => {
    if (baru === alat) return;
    setAlat(baru);
    setJumlah(0);
    sudahPas.current = "";
    kirimEvent("UNIT_SIZE_CHANGED", {
      pesan: `Lihat! Karena ukuran ${ALAT[baru].nama} berbeda, jumlah satuan yang dibutuhkan juga ikut berubah walaupun bendanya tetap sama.`,
      unitName: ALAT[baru].nama,
      objectName: TARGET[target].nama,
    });
  };

  const gantiTarget = (baru: TargetUkur) => {
    setTarget(baru);
    setJumlah(0);
    sudahPas.current = "";
  };

  const ubahJumlah = (n: number) => {
    const baru = Math.max(0, Math.min(16, n));
    setJumlah(baru);
    const kunci = `${target}-${alat}-${baru}-${renggang}`;
    if (baru === butuh && !renggang && sudahPas.current !== kunci) {
      sudahPas.current = kunci;
      kirimEvent("MEASUREMENT_COMPLETE", {
        pesan: `Tepat sekali! Panjang ${TARGET[target].nama} ini sama dengan ${baru} ${ALAT[alat].nama} yang disusun rapat tanpa celah.`,
        objectName: TARGET[target].nama,
        unitName: ALAT[alat].nama,
        count: baru,
      });
    }
  };

  const toggleRenggang = () => {
    const berikutnya = !renggang;
    setRenggang(berikutnya);
    sudahPas.current = "";
    if (berikutnya) {
      kirimEvent("GAP_ERROR_DETECTED", {
        pesan: "Ups, ada jarak kosong di antara alat ukurnya! Kalau bercelah seperti ini, hasil pengukurannya menjadi tidak tepat.",
      });
    }
  };

  const px = 18;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(TARGET) as TargetUkur[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => gantiTarget(id)}
            className={`min-h-12 rounded-2xl border-2 text-xs font-bold sm:text-sm ${
              target === id ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {TARGET[id].nama}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(ALAT) as AlatUkur[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => gantiAlat(id)}
            className={`min-h-12 rounded-2xl border-2 text-xs font-bold sm:text-sm ${
              alat === id ? "border-orange-400 bg-orange-50 text-orange-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {ALAT[id].nama}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-3xl border-2 border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-bold uppercase text-slate-500">Benda</p>
        <div className="h-8 rounded-lg bg-sky-400" style={{ width: panjang * px }} />
        <p className="mb-2 mt-3 text-xs font-bold uppercase text-slate-500">Rel pengukuran</p>
        <div className={`flex items-end ${renggang ? "gap-3" : "gap-0"}`}>
          {Array.from({ length: jumlah }).map((_, i) => (
            <div key={i} className="flex flex-col items-center" style={{ width: ukuran * px }}>
              <IkonAlat jenis={alat} n={i + 1} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button type="button" onClick={() => ubahJumlah(jumlah + 1)} className="min-h-12 rounded-2xl bg-teal-600 text-sm font-black text-white">
          + Tambah Satuan
        </button>
        <button type="button" onClick={() => ubahJumlah(jumlah - 1)} className="min-h-12 rounded-2xl bg-slate-700 text-sm font-black text-white">
          − Kurangi Satuan
        </button>
        <button type="button" onClick={() => ubahJumlah(butuh)} className="min-h-12 rounded-2xl bg-amber-500 px-2 text-sm font-black text-white">
          Isi Penuh Otomatis
        </button>
        <button
          type="button"
          onClick={toggleRenggang}
          className={`min-h-12 rounded-2xl border-2 px-2 text-xs font-bold ${
            renggang ? "border-rose-400 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          {renggang ? "Renggang: NYALA (Salah)" : "Coba Susun Renggang/Bercelah (Salah)"}
        </button>
      </div>
    </div>
  );
}

function TabUrut({
  misi,
  urutan,
  setMisi,
  setUrutan,
  kirimEvent,
}: {
  misi: MisiUrut;
  urutan: string[];
  setMisi: (n: MisiUrut) => void;
  setUrutan: (n: string[]) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const sudahBenar = useRef("");
  const target =
    misi === "pendek"
      ? [...KARTU_URUT].sort((a, b) => a.petak - b.petak).map((k) => k.id)
      : [...KARTU_URUT].sort((a, b) => b.petak - a.petak).map((k) => k.id);

  const geser = (i: number, arah: -1 | 1) => {
    const j = i + arah;
    if (j < 0 || j >= urutan.length) return;
    const berikutnya = [...urutan];
    const tmp = berikutnya[i];
    berikutnya[i] = berikutnya[j];
    berikutnya[j] = tmp;
    setUrutan(berikutnya);
    const kunci = `${misi}-${berikutnya.join(",")}`;
    if (berikutnya.every((id, idx) => id === target[idx]) && sudahBenar.current !== kunci) {
      sudahBenar.current = kunci;
      kirimEvent("ORDERING_CORRECT", {
        pesan: "Hebat! Kamu berhasil mengurutkan ketiga benda dengan bantuan petak ukur.",
        misi,
      });
    }
  };

  const gantiMisi = (baru: MisiUrut) => {
    setMisi(baru);
    sudahBenar.current = "";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => gantiMisi("pendek")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${misi === "pendek" ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 bg-white"}`}
        >
          Dari Paling Pendek
        </button>
        <button
          type="button"
          onClick={() => gantiMisi("panjang")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${misi === "panjang" ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 bg-white"}`}
        >
          Dari Paling Panjang
        </button>
      </div>
      <div className="space-y-2 rounded-3xl border-2 border-slate-200 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:18px_18px] p-3">
        {urutan.map((id, i) => {
          const kartu = KARTU_URUT.find((k) => k.id === id);
          if (!kartu) return null;
          return (
            <div key={id} className="flex items-center gap-2 rounded-2xl bg-white/90 p-2">
              <button type="button" onClick={() => geser(i, -1)} className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-lg font-black" aria-label={`Naikkan ${kartu.nama}`}>
                ↑
              </button>
              <div className="h-8 rounded-full border-2 border-slate-800" style={{ width: kartu.petak * 18, background: kartu.warna }} />
              <p className="flex-1 text-sm font-bold text-slate-800">
                {kartu.nama} · {kartu.petak} petak
              </p>
              <button type="button" onClick={() => geser(i, 1)} className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-lg font-black" aria-label={`Turunkan ${kartu.nama}`}>
                ↓
              </button>
            </div>
          );
        })}
      </div>
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
  const [pilih, setPilih] = useState<string | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  const jawab = (id: string) => {
    if (umpan === "benar" || selesai) return;
    setPilih(id);
    if (id === soal.kunci) {
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", { pesan: `Benar! Soal ${nomor + 1} sudah tepat.`, soal: soal.id, benar: true });
      window.setTimeout(() => {
        if (nomor + 1 >= SOAL_KUIS.length) {
          onLulus("Kuis mengukur panjang benda selesai. Lima soal sudah dijawab.");
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
        <p className="mt-1 text-sm font-semibold text-emerald-700">Lima soal mengukur panjang sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-500">Soal {nomor + 1} dari {SOAL_KUIS.length}</p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>
      {nomor === 0 ? (
        <div className="relative rounded-2xl bg-amber-50 p-3 pl-6">
          <div className="absolute bottom-3 left-3 top-3 w-1.5 rounded-full bg-rose-500" />
          <BatangBenda panjang={8} offset={0} warna="#FBBF24" label="Kuning" px={16} />
          <div className="h-2" />
          <BatangBenda panjang={6} offset={4} warna="#A855F7" label="Ungu" px={16} />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="rounded-2xl bg-sky-50 p-3">
          <div className="mb-2 h-4 w-40 rounded bg-rose-300" />
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <IkonAlat key={i} jenis="klip" n={i + 1} />
            ))}
          </div>
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "rapat", label: "Rapat", celah: 0, tumpang: false },
            { id: "renggang", label: "Renggang", celah: 8, tumpang: false },
            { id: "tumpang", label: "Tumpang", celah: -6, tumpang: true },
          ].map((g) => (
            <div key={g.id} className="rounded-2xl border-2 border-slate-200 bg-white p-2 text-center">
              <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">{g.label}</p>
              <div className="flex justify-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-5 w-6 rounded-sm border border-slate-700 ${g.tumpang && i === 1 ? "bg-amber-300" : "bg-sky-300"}`}
                    style={{ marginLeft: i === 0 ? 0 : g.celah }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="flex items-end justify-center gap-4 rounded-2xl bg-emerald-50 p-3">
          {[6, 4, 2].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className="w-8 rounded-t-lg bg-green-600" style={{ height: n * 12 }} />
              <p className="mt-1 text-xs font-bold">{n} petak</p>
            </div>
          ))}
        </div>
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
