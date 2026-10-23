"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "MESSY_DATA_START"
  | "SORTING_COMPLETED"
  | "ORIENTATION_CHANGED"
  | "PICTOGRAPH_UPDATED"
  | "COMPARE_DATA_COLUMNS"
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

type TabLab = "kelompok" | "diagram" | "detektif";
type IdBuah = "apel" | "pisang" | "jeruk" | "stroberi";
type Orientasi = "tegak" | "datar";
type ItemMeja = { id: string; jenis: IdBuah; x: number; y: number; diMeja: boolean };
type Counts = Record<IdBuah, number>;

const TAB_LAB: { id: TabLab; ikon: string; label: string }[] = [
  { id: "kelompok", ikon: "🧺", label: "Kelompokkan" },
  { id: "diagram", ikon: "📊", label: "Diagram Gambar" },
  { id: "detektif", ikon: "🔎", label: "Detektif Data" },
];

const BUAH: { id: IdBuah; nama: string; warna: string; latar: string }[] = [
  { id: "apel", nama: "Apel Merah", warna: "#EF4444", latar: "#FEE2E2" },
  { id: "pisang", nama: "Pisang Kuning", warna: "#EAB308", latar: "#FEF9C3" },
  { id: "jeruk", nama: "Jeruk Oranye", warna: "#F97316", latar: "#FFEDD5" },
  { id: "stroberi", nama: "Stroberi Pink", warna: "#FB7185", latar: "#FFE4E6" },
];

const NAMA: Record<IdBuah, string> = {
  apel: "Apel Merah",
  pisang: "Pisang Kuning",
  jeruk: "Jeruk Oranye",
  stroberi: "Stroberi Pink",
};

type OpsiKuis = { id: string; label: string };
type SoalKuis = { id: string; tanya: string; hint: string; kunci: string; opsi: OpsiKuis[] };

const SOAL_KUIS: SoalKuis[] = [
  {
    id: "q1",
    tanya: "Dari diagram hewan peliharaan, mana yang paling banyak dan paling sedikit?",
    hint: "Lihat tumpukan gambar. Yang paling tinggi jumlahnya paling banyak. Yang paling pendek paling sedikit.",
    kunci: "kucing-ikan",
    opsi: [
      { id: "kucing-ikan", label: "Kucing paling banyak, ikan paling sedikit" },
      { id: "burung-anjing", label: "Burung paling banyak, anjing paling sedikit" },
      { id: "anjing-kucing", label: "Anjing paling banyak, kucing paling sedikit" },
    ],
  },
  {
    id: "q2",
    tanya: "Masukkan semangka dan kelereng ke petak. Mana yang jumlahnya lebih banyak?",
    hint: "Jangan tertipu ukuran gambar. Hitung kotaknya. Yang kotaknya lebih banyak, itulah yang lebih banyak.",
    kunci: "kelereng",
    opsi: [
      { id: "semangka", label: "Semangka, karena gambarnya lebih besar" },
      { id: "kelereng", label: "Kelereng, karena ada 4 kotak" },
      { id: "sama", label: "Sama banyak" },
    ],
  },
  {
    id: "q3",
    tanya: "Berapa selisih Donat dikurangi Bolu?",
    hint: "Hitung kotak donat, lalu kurangi kotak bolu. Selisih = yang lebih banyak dikurangi yang lebih sedikit.",
    kunci: "4",
    opsi: [
      { id: "2", label: "2" },
      { id: "4", label: "4" },
      { id: "8", label: "8" },
    ],
  },
  {
    id: "q4",
    tanya: "Berapa jumlah Ikan ditambah Kelinci?",
    hint: "Gabungkan dua kategori. Jumlah = ikan + kelinci.",
    kunci: "8",
    opsi: [
      { id: "5", label: "5" },
      { id: "7", label: "7" },
      { id: "8", label: "8" },
    ],
  },
];

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ucapkan(teks: string) {
  void ucapkanGuruIgil(teks, { kelas: "1 SD" });
}

function kosongCounts(): Counts {
  return { apel: 0, pisang: 0, jeruk: 0, stroberi: 0 };
}

function buatMeja(): ItemMeja[] {
  const jenis: IdBuah[] = ["apel", "pisang", "jeruk", "stroberi"];
  const daftar: IdBuah[] = [...jenis];
  const extra = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < extra; i += 1) daftar.push(jenis[Math.floor(Math.random() * 4)]!);
  return daftar.map((j, i) => ({
    id: `buah-${i}-${j}`,
    jenis: j,
    x: 6 + ((i * 19) % 82),
    y: 8 + ((i * 27) % 68),
    diMeja: true,
  }));
}

function hitungKeranjang(meja: ItemMeja[]): Counts {
  const c = kosongCounts();
  for (const item of meja) {
    if (!item.diMeja) c[item.jenis] += 1;
  }
  return c;
}

function ringkas(counts: Counts, abaikanNol: boolean) {
  const entri = BUAH.map((b) => ({ id: b.id, nama: b.nama, n: counts[b.id] })).filter((e) => !abaikanNol || e.n > 0);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (entri.length === 0) return { total, max: "Belum ada", min: "Belum ada" };
  const maxN = Math.max(...entri.map((e) => e.n));
  const minN = Math.min(...entri.map((e) => e.n));
  return {
    total,
    max: entri.filter((e) => e.n === maxN).map((e) => e.nama).join(" & "),
    min: entri.filter((e) => e.n === minN).map((e) => e.nama).join(" & "),
  };
}

function IkonBuah({ jenis, besar = false }: { jenis: IdBuah; besar?: boolean }) {
  const s = besar ? "h-11 w-11" : "h-8 w-8";
  if (jenis === "apel") {
    return (
      <svg viewBox="0 0 32 32" className={s} aria-hidden>
        <ellipse cx="16" cy="19" rx="10" ry="10" fill="#EF4444" />
        <path d="M16 10 C16 6 20 6 20 9" fill="none" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="19" cy="8" rx="4" ry="2" fill="#22C55E" />
      </svg>
    );
  }
  if (jenis === "pisang") {
    return (
      <svg viewBox="0 0 32 32" className={s} aria-hidden>
        <path d="M6 22 Q16 6 28 14 Q18 10 10 24 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      </svg>
    );
  }
  if (jenis === "jeruk") {
    return (
      <svg viewBox="0 0 32 32" className={s} aria-hidden>
        <circle cx="16" cy="18" r="10" fill="#FB923C" />
        <circle cx="16" cy="18" r="3" fill="#FDBA74" />
        <path d="M16 8 L18 5 L14 5 Z" fill="#16A34A" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={s} aria-hidden>
      <path d="M16 28 C6 18 8 8 16 12 C24 8 26 18 16 28 Z" fill="#FB7185" />
      <circle cx="13" cy="16" r="1" fill="#9F1239" />
      <circle cx="18" cy="19" r="1" fill="#9F1239" />
      <path d="M16 12 C16 6 20 6 21 9" fill="none" stroke="#16A34A" strokeWidth="2" />
    </svg>
  );
}

function Turus({ n }: { n: number }) {
  const lima = Math.floor(n / 5);
  const sisa = n % 5;
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-1">
      {Array.from({ length: lima }).map((_, i) => (
        <svg key={`g${i}`} viewBox="0 0 40 24" className="h-6 w-10" aria-hidden>
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={7 + k * 8} y1="3" x2={7 + k * 8} y2="21" stroke="#0f172a" strokeWidth="3" />
          ))}
          <line x1="4" y1="20" x2="36" y2="4" stroke="#0f172a" strokeWidth="3" />
        </svg>
      ))}
      {sisa > 0 ? (
        <svg viewBox={`0 0 ${sisa * 8 + 8} 24`} className="h-6" style={{ width: sisa * 10 + 4 }} aria-hidden>
          {Array.from({ length: sisa }).map((_, k) => (
            <line key={k} x1={6 + k * 8} y1="3" x2={6 + k * 8} y2="21" stroke="#0f172a" strokeWidth="3" />
          ))}
        </svg>
      ) : (
        <span className="text-xs font-bold text-slate-400">—</span>
      )}
    </div>
  );
}

function PanelRingkasan({ total, max, min }: { total: number; max: string; min: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Total Benda", nilai: String(total), warna: "border-violet-200 bg-violet-50 text-violet-900" },
        { label: "Paling Banyak", nilai: max, warna: "border-emerald-200 bg-emerald-50 text-emerald-900" },
        { label: "Paling Sedikit", nilai: min, warna: "border-amber-200 bg-amber-50 text-amber-900" },
      ].map((k) => (
        <div key={k.label} className={`rounded-2xl border-2 px-2 py-2 text-center ${k.warna}`}>
          <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">{k.label}</p>
          <p className="mt-1 text-xs font-black leading-tight sm:text-sm">{k.nilai}</p>
        </div>
      ))}
    </div>
  );
}

export default function SimulasiMtk1Bab8({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("kelompok");
  const [pesanLayar, setPesanLayar] = useState("Kelompokkan buah, susun diagram gambar, lalu jadi detektif data bersama IGIL.");
  const sudahLulus = useRef(false);
  const sudahAcakAwal = useRef(false);

  const [meja, setMeja] = useState<ItemMeja[]>(() => buatMeja());
  const [diagram, setDiagram] = useState<Counts>({ apel: 5, pisang: 3, jeruk: 4, stroberi: 2 });
  const [orientasi, setOrientasi] = useState<Orientasi>("tegak");
  const [angkaPuncak, setAngkaPuncak] = useState(true);
  const [buahA, setBuahA] = useState<IdBuah>("apel");
  const [buahB, setBuahB] = useState<IdBuah>("stroberi");
  const [sorot, setSorot] = useState(false);

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

  useEffect(() => {
    if (sudahAcakAwal.current) return;
    sudahAcakAwal.current = true;
    kirimEvent("MESSY_DATA_START", {
      pesan: "Wah, buah-buahnya masih tercampur di meja! Yuk, ketuk buahnya satu per satu untuk mengelompokkannya ke keranjang yang sejenis.",
    });
  }, [kirimEvent]);

  const keranjang = useMemo(() => hitungKeranjang(meja), [meja]);
  const sisaMeja = meja.filter((i) => i.diMeja).length;
  const dataAktif = tab === "kelompok" ? keranjang : diagram;
  const abaikanNol = tab === "kelompok" && sisaMeja > 0;
  const ringkasan = ringkas(dataAktif, abaikanNol);

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-orange-100 bg-white shadow-xl shadow-orange-100/40">
      <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-100">Lab PhET · Matematika Kelas 1 SD</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Mengenal Diagram</h2>
        <p className="mt-1 text-sm text-orange-50">Kelompokkan, susun gambar, dan bandingkan data bersama IGIL.</p>
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

      <div className="space-y-4 bg-gradient-to-b from-white to-orange-50/40 p-4 sm:p-5">
        <p className="min-h-12 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          <span className="font-normal">🦉</span> {pesanLayar}
        </p>
        <div>
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-widest text-orange-500">Ringkasan Data Dinamis</p>
          <PanelRingkasan total={ringkasan.total} max={ringkasan.max} min={ringkasan.min} />
        </div>

        {tab === "kelompok" ? <TabKelompok meja={meja} setMeja={setMeja} keranjang={keranjang} kirimEvent={kirimEvent} /> : null}
        {tab === "diagram" ? (
          <TabDiagram
            diagram={diagram}
            setDiagram={setDiagram}
            orientasi={orientasi}
            setOrientasi={setOrientasi}
            angkaPuncak={angkaPuncak}
            setAngkaPuncak={setAngkaPuncak}
            kirimEvent={kirimEvent}
          />
        ) : null}
        {tab === "detektif" ? (
          <TabDetektif
            diagram={diagram}
            orientasi={orientasi}
            buahA={buahA}
            buahB={buahB}
            sorot={sorot}
            setBuahA={setBuahA}
            setBuahB={setBuahB}
            setSorot={setSorot}
            kirimEvent={kirimEvent}
          />
        ) : null}
      </div>

    </div>
  );
}

function TabKelompok({
  meja,
  setMeja,
  keranjang,
  kirimEvent,
}: {
  meja: ItemMeja[];
  setMeja: (n: ItemMeja[]) => void;
  keranjang: Counts;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const sudahRapi = useRef(false);

  const selesaiJikaRapi = (berikutnya: ItemMeja[]) => {
    if (berikutnya.some((i) => i.diMeja) || sudahRapi.current) return;
    sudahRapi.current = true;
    const counts = hitungKeranjang(berikutnya);
    const r = ringkas(counts, false);
    kirimEvent("SORTING_COMPLETED", {
      pesan: "Semua buah sudah rapi di keranjang! Sekarang mudah sekali melihat jumlah masing-masing buah pada tabel.",
      counts,
      maxItem: r.max,
      minItem: r.min,
    });
  };

  const ketuk = (id: string) => {
    const berikutnya = meja.map((i) => (i.id === id ? { ...i, diMeja: false } : i));
    setMeja(berikutnya);
    selesaiJikaRapi(berikutnya);
  };

  const acak = () => {
    sudahRapi.current = false;
    setMeja(buatMeja());
    kirimEvent("MESSY_DATA_START", {
      pesan: "Wah, buah-buahnya masih tercampur di meja! Yuk, ketuk buahnya satu per satu untuk mengelompokkannya ke keranjang yang sejenis.",
    });
  };

  const otomatis = () => {
    const berikutnya = meja.map((i) => ({ ...i, diMeja: false }));
    setMeja(berikutnya);
    selesaiJikaRapi(berikutnya);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 overflow-hidden rounded-3xl border-2 border-amber-200 bg-[linear-gradient(#fef3c7,#fde68a)]">
        <p className="absolute left-3 top-2 text-[10px] font-bold uppercase tracking-wide text-amber-800">Meja acak</p>
        {meja
          .filter((i) => i.diMeja)
          .map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => ketuk(item.id)}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow transition duration-500 hover:scale-110"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-label={`Kelompokkan ${NAMA[item.jenis]}`}
            >
              <IkonBuah jenis={item.jenis} />
            </button>
          ))}
        {meja.every((i) => !i.diMeja) ? (
          <p className="flex h-full items-center justify-center text-sm font-bold text-amber-800">Meja kosong. Semua buah di keranjang!</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BUAH.map((b) => (
          <div key={b.id} className="rounded-2xl border-2 p-2 text-center" style={{ borderColor: b.warna, background: b.latar }}>
            <p className="text-[10px] font-bold uppercase text-slate-600">{b.nama}</p>
            <div className="mx-auto my-1 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <IkonBuah jenis={b.id} besar />
            </div>
            <p className="text-lg font-black text-slate-800">{keranjang[b.id]}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Buah</th>
              <th className="px-3 py-2">Turus</th>
              <th className="px-3 py-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {BUAH.map((b) => (
              <tr key={b.id} className="border-t border-slate-100">
                <td className="px-3 py-2">
                  <span className="flex items-center gap-2 font-bold text-slate-800">
                    <IkonBuah jenis={b.id} />
                    {b.nama}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <Turus n={keranjang[b.id]} />
                </td>
                <td className="px-3 py-2 text-lg font-black text-slate-900">{keranjang[b.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={acak} className="min-h-12 rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700">
          Acak Benda Baru
        </button>
        <button type="button" onClick={otomatis} className="min-h-12 rounded-2xl bg-orange-500 px-2 text-sm font-black text-white">
          Kelompokkan Semua Otomatis!
        </button>
      </div>
    </div>
  );
}

function SelGambar({ jenis, nyala }: { jenis: IdBuah; nyala?: boolean }) {
  const meta = BUAH.find((b) => b.id === jenis)!;
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-md border-2 transition ${
        nyala ? "border-yellow-400 bg-yellow-200 ring-2 ring-yellow-300" : "border-slate-300 bg-white"
      }`}
      style={nyala ? undefined : { background: meta.latar, borderColor: meta.warna }}
    >
      <IkonBuah jenis={jenis} />
    </div>
  );
}

function TabDiagram({
  diagram,
  setDiagram,
  orientasi,
  setOrientasi,
  angkaPuncak,
  setAngkaPuncak,
  kirimEvent,
}: {
  diagram: Counts;
  setDiagram: (n: Counts) => void;
  orientasi: Orientasi;
  setOrientasi: (n: Orientasi) => void;
  angkaPuncak: boolean;
  setAngkaPuncak: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const puncakLama = useRef("");

  const ubah = (id: IdBuah, delta: number) => {
    const n = Math.max(0, Math.min(8, diagram[id] + delta));
    const berikutnya = { ...diagram, [id]: n };
    setDiagram(berikutnya);
    const maxN = Math.max(...Object.values(berikutnya));
    const pemimpin = BUAH.filter((b) => berikutnya[b.id] === maxN);
    if (pemimpin.length === 1 && maxN > 0) {
      const kunci = `${pemimpin[0]!.id}-${maxN}`;
      if (puncakLama.current !== kunci) {
        puncakLama.current = kunci;
        kirimEvent("PICTOGRAPH_UPDATED", {
          pesan: "Tanpa menghitung satu-satu dari bawah, lihat menara gambar yang paling tinggi! Itu menunjukkan buah yang jumlahnya paling banyak.",
          maxItem: pemimpin[0]!.nama,
          count: maxN,
        });
      }
    }
  };

  const gantiOrientasi = (baru: Orientasi) => {
    if (baru === orientasi) return;
    setOrientasi(baru);
    kirimEvent("ORIENTATION_CHANGED", {
      pesan: "Lihat, meskipun diagramnya kita putar jadi mendatar atau tegak, jumlah buah di dalam kotaknya tetap sama ya!",
      orientasi: baru,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => gantiOrientasi("tegak")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${orientasi === "tegak" ? "border-orange-500 bg-orange-50 text-orange-800" : "border-slate-200 bg-white"}`}
        >
          Menara Tegak (Vertikal)
        </button>
        <button
          type="button"
          onClick={() => gantiOrientasi("datar")}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${orientasi === "datar" ? "border-orange-500 bg-orange-50 text-orange-800" : "border-slate-200 bg-white"}`}
        >
          Baris Mendatar (Horizontal)
        </button>
      </div>
      <button
        type="button"
        onClick={() => setAngkaPuncak(!angkaPuncak)}
        className={`min-h-12 w-full rounded-2xl border-2 text-sm font-bold ${angkaPuncak ? "border-violet-400 bg-violet-50 text-violet-800" : "border-slate-200 bg-white text-slate-600"}`}
      >
        {angkaPuncak ? "Angka Puncak: NYALA" : "Tampilkan Angka Puncak"}
      </button>

      <PapanDiagram counts={diagram} orientasi={orientasi} angkaPuncak={angkaPuncak} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BUAH.map((b) => (
          <div key={b.id} className="rounded-2xl border-2 border-slate-200 bg-white p-2 text-center">
            <IkonBuah jenis={b.id} besar />
            <p className="mt-1 text-[11px] font-bold text-slate-700">{b.nama}</p>
            <div className="mt-1 flex justify-center gap-1">
              <button type="button" onClick={() => ubah(b.id, -1)} className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl font-black text-white" aria-label={`Kurangi ${b.nama}`}>
                −
              </button>
              <button type="button" onClick={() => ubah(b.id, 1)} className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-black text-white" aria-label={`Tambah ${b.nama}`}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PapanDiagram({
  counts,
  orientasi,
  angkaPuncak,
  sorotId,
  garis,
}: {
  counts: Counts;
  orientasi: Orientasi;
  angkaPuncak: boolean;
  sorotId?: IdBuah;
  garis?: number;
}) {
  const tegak = orientasi === "tegak";
  return (
    <div className="overflow-x-auto rounded-3xl border-2 border-slate-200 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:36px_36px] bg-slate-50 p-3">
      <div className={tegak ? "flex items-end justify-around gap-2" : "space-y-3"}>
        {BUAH.map((b) => {
          const n = counts[b.id];
          const sel = Array.from({ length: n }).map((_, i) => {
            const lebih = typeof garis === "number" && sorotId === b.id && i >= garis;
            return <SelGambar key={`${b.id}-${i}`} jenis={b.id} nyala={lebih} />;
          });
          return (
            <div key={b.id} className={tegak ? "flex flex-col items-center gap-1" : "flex items-center gap-2"}>
              {tegak ? (
                <>
                  {angkaPuncak ? <p className="text-sm font-black text-slate-800">{n}</p> : null}
                  <div className="flex min-h-[18rem] flex-col-reverse gap-0.5">{sel}</div>
                  <IkonBuah jenis={b.id} />
                  <p className="w-16 text-center text-[10px] font-bold leading-tight text-slate-600">{b.nama}</p>
                </>
              ) : (
                <>
                  <div className="w-20 text-right">
                    <IkonBuah jenis={b.id} />
                    <p className="text-[10px] font-bold leading-tight text-slate-600">{b.nama}</p>
                  </div>
                  <div className="flex flex-1 gap-0.5">{sel}</div>
                  {angkaPuncak ? <p className="w-6 text-sm font-black text-slate-800">{n}</p> : null}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabDetektif({
  diagram,
  orientasi,
  buahA,
  buahB,
  sorot,
  setBuahA,
  setBuahB,
  setSorot,
  kirimEvent,
}: {
  diagram: Counts;
  orientasi: Orientasi;
  buahA: IdBuah;
  buahB: IdBuah;
  sorot: boolean;
  setBuahA: (n: IdBuah) => void;
  setBuahB: (n: IdBuah) => void;
  setSorot: (n: boolean) => void;
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const sudahBanding = useRef("");
  const countA = diagram[buahA];
  const countB = diagram[buahB];
  const diff = Math.abs(countA - countB);
  const lebih = countA === countB ? null : countA > countB ? buahA : buahB;
  const sedikit = countA === countB ? 0 : Math.min(countA, countB);

  const bandingkan = (nyalaSorot = sorot) => {
    if (buahA === buahB) return;
    const kunci = `${buahA}-${buahB}-${countA}-${countB}-${nyalaSorot}`;
    if (sudahBanding.current === kunci) return;
    sudahBanding.current = kunci;
    kirimEvent("COMPARE_DATA_COLUMNS", {
      pesan: `Jika kita sejajarkan ${NAMA[buahA]} (${countA}) dan ${NAMA[buahB]} (${countB}), terlihat ada ${diff} kotak yang menonjol. Artinya selisihnya adalah ${diff}!`,
      itemA: NAMA[buahA],
      countA,
      itemB: NAMA[buahB],
      countB,
      diff,
    });
  };

  const kalimat =
    buahA === buahB
      ? "Pilih dua buah yang berbeda."
      : countA === countB
        ? `${NAMA[buahA]} dan ${NAMA[buahB]} jumlahnya sama.`
        : `${NAMA[lebih!]} ada ${diff} lebih banyak dari ${NAMA[lebih === buahA ? buahB : buahA]} (X = ${Math.max(countA, countB)} − ${Math.min(countA, countB)})`;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <PemilihBuah label="Buah A" nilai={buahA} onGanti={setBuahA} />
        <PemilihBuah label="Buah B" nilai={buahB} onGanti={setBuahB} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => bandingkan(sorot)}
          className="min-h-12 rounded-2xl bg-violet-600 text-sm font-black text-white"
        >
          Bandingkan
        </button>
        <button
          type="button"
          onClick={() => {
            const berikutnya = !sorot;
            setSorot(berikutnya);
            if (berikutnya) bandingkan(true);
          }}
          className={`min-h-12 rounded-2xl border-2 text-sm font-bold ${sorot ? "border-yellow-400 bg-yellow-100 text-yellow-900" : "border-slate-200 bg-white text-slate-700"}`}
        >
          {sorot ? "Sorot Selisih: NYALA" : "Sorot Selisih"}
        </button>
      </div>
      <p className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-4 py-3 text-center text-sm font-black text-violet-900">{kalimat}</p>
      <PapanDiagram
        counts={diagram}
        orientasi={orientasi}
        angkaPuncak
        sorotId={sorot && lebih ? lebih : undefined}
        garis={sorot && lebih ? sedikit : undefined}
      />
    </div>
  );
}

function PemilihBuah({ label, nilai, onGanti }: { label: string; nilai: IdBuah; onGanti: (n: IdBuah) => void }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase text-slate-500">{label}</p>
      <div className="grid grid-cols-2 gap-1">
        {BUAH.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onGanti(b.id)}
            className={`flex min-h-12 items-center justify-center gap-1 rounded-xl border-2 px-1 text-[11px] font-bold ${
              nilai === b.id ? "border-violet-500 bg-violet-50 text-violet-800" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <IkonBuah jenis={b.id} />
            {b.nama.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniBar({ items }: { items: { label: string; n: number; warna: string }[] }) {
  return (
    <div className="flex items-end justify-center gap-4 rounded-2xl bg-slate-50 p-3">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-1">
          {Array.from({ length: it.n }).map((_, i) => (
            <div key={i} className="h-6 w-8 rounded-sm border border-slate-700" style={{ background: it.warna }} />
          ))}
          <p className="text-[11px] font-bold">{it.label}</p>
          <p className="text-xs font-black">{it.n}</p>
        </div>
      ))}
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
  const [petak, setPetak] = useState(false);
  const soal = SOAL_KUIS[nomor];
  const selesai = nomor >= SOAL_KUIS.length;

  const jawab = (id: string) => {
    if (!soal || umpan === "benar" || selesai) return;
    if (soal.id === "q2" && !petak) {
      setHint(true);
      kirimEvent("QUIZ_ANSWERED", {
        pesan: "Masukkan dulu ke petak diagram. Ukuran gambar besar tidak berarti jumlahnya lebih banyak.",
        soal: soal.id,
        benar: false,
        hint: true,
      });
      return;
    }
    setPilih(id);
    if (id === soal.kunci) {
      setUmpan("benar");
      setHint(false);
      kirimEvent("QUIZ_ANSWERED", { pesan: `Benar! Soal ${nomor + 1} sudah tepat.`, soal: soal.id, benar: true });
      window.setTimeout(() => {
        if (nomor + 1 >= SOAL_KUIS.length) {
          onLulus("Kuis mengenal diagram selesai. Empat soal sudah dijawab.");
          setNomor(SOAL_KUIS.length);
        } else {
          setNomor((n) => n + 1);
          setPilih(null);
          setUmpan(null);
          setHint(false);
          setPetak(false);
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
        <p className="mt-1 text-sm font-semibold text-emerald-700">Empat soal diagram sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wide text-orange-500">Soal {nomor + 1} dari 4</p>
      <p className="text-lg font-black text-slate-800">{soal!.tanya}</p>
      {nomor === 0 ? (
        <MiniBar
          items={[
            { label: "Kucing", n: 5, warna: "#FDBA74" },
            { label: "Anjing", n: 3, warna: "#93C5FD" },
            { label: "Ikan", n: 2, warna: "#67E8F9" },
            { label: "Burung", n: 4, warna: "#86EFAC" },
          ]}
        />
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2 rounded-2xl border-2 border-rose-100 bg-rose-50 p-3">
          {petak ? (
            <div className="flex items-end justify-center gap-8">
              <div className="flex flex-col items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-green-700 bg-green-200 text-lg font-normal">
                    🍉
                  </div>
                ))}
                <p className="text-xs font-bold">Semangka · 3</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-violet-700 bg-violet-200 text-lg font-normal">
                    🟣
                  </div>
                ))}
                <p className="text-xs font-bold">Kelereng · 4</p>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-around">
              <div className="flex items-end gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="text-5xl font-normal leading-none">
                    🍉
                  </span>
                ))}
              </div>
              <div className="flex items-end gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-xl font-normal leading-none">
                    🟣
                  </span>
                ))}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setPetak(true)}
            className="min-h-12 w-full rounded-2xl bg-rose-500 text-sm font-black text-white"
          >
            {petak ? "Sudah di petak diagram" : "Masukkan ke petak diagram"}
          </button>
        </div>
      ) : null}
      {nomor === 2 ? (
        <MiniBar
          items={[
            { label: "Donat", n: 6, warna: "#F9A8D4" },
            { label: "Bolu", n: 2, warna: "#FDE68A" },
          ]}
        />
      ) : null}
      {nomor === 3 ? (
        <MiniBar
          items={[
            { label: "Ikan", n: 3, warna: "#67E8F9" },
            { label: "Kelinci", n: 5, warna: "#FDBA74" },
          ]}
        />
      ) : null}
      <div className="grid gap-2">
        {soal!.opsi.map((o) => {
          const aktif = pilih === o.id;
          const hijau = umpan === "benar" && o.id === soal!.kunci;
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
          💡 {soal!.hint}
        </p>
      ) : null}
    </div>
  );
}
