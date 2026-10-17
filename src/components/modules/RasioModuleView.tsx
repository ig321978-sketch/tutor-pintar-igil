"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import dataMentah from "@/data/modules/kurikulum-merdeka-bab2-rasio.json";
import { idLatihanMtk6Bab2 } from "@/lib/kuis-materi";
import { useEffect, useState } from "react";

const GELAS_MIN = 1;
const GELAS_MAKS = 8;
const GELAS_AWAL = 2;
const KUNCI_JEJAK = "igil-modul-mat-6-bab2";

type ContohKonkret = {
  objekA: string;
  nilaiA: number;
  objekB: string;
  nilaiB: number;
  rasioBaku: string;
};

type Eksplorasi = {
  subJudul: string;
  tahap?: string;
  narasi: string;
  contohKonkret?: ContohKonkret;
  langkahHitung?: string;
};

type SoalFormatif = {
  id: string;
  soal: string;
  opsi: string[];
  kunciJawaban: string;
  pembahasan: string;
};

type ModulRasio = {
  id: string;
  jenjang: string;
  kelas: number;
  fase: string;
  mataPelajaran: string;
  bab: number;
  judul: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  pertanyaanPemantik: string;
  eksplorasiMateri: Eksplorasi[];
  simulasiLokal: {
    judul: string;
    deskripsi: string;
    baseRatioA: number;
    baseRatioB: number;
  };
  latihanFormatif: SoalFormatif[];
};

type JejakRasio = {
  jawaban: Record<string, string>;
  gelas: number;
  simulasiDicoba: boolean;
  tuntas: boolean;
};

function adalahModul(data: unknown): data is ModulRasio {
  if (!data || typeof data !== "object") return false;
  const calon = data as ModulRasio;
  return (
    calon.id === "mat-6-bab2" &&
    Array.isArray(calon.eksplorasiMateri) &&
    Array.isArray(calon.latihanFormatif) &&
    calon.latihanFormatif.length > 0 &&
    typeof calon.simulasiLokal?.baseRatioA === "number" &&
    typeof calon.simulasiLokal?.baseRatioB === "number" &&
    calon.simulasiLokal.baseRatioB !== 0
  );
}

const modul = adalahModul(dataMentah) ? dataMentah : null;

function jepitGelas(nilai: number): number {
  if (!Number.isFinite(nilai)) return GELAS_AWAL;
  return Math.min(GELAS_MAKS, Math.max(GELAS_MIN, Math.round(nilai)));
}

function bacaJejak(): JejakRasio | null {
  if (typeof window === "undefined") return null;
  try {
    const mentah = window.localStorage.getItem(KUNCI_JEJAK);
    if (!mentah) return null;
    const data = JSON.parse(mentah) as Partial<JejakRasio>;
    const jawaban =
      data.jawaban && typeof data.jawaban === "object" ? data.jawaban : {};
    return {
      jawaban,
      gelas: jepitGelas(typeof data.gelas === "number" ? data.gelas : GELAS_AWAL),
      simulasiDicoba: Boolean(data.simulasiDicoba),
      tuntas: Boolean(data.tuntas),
    };
  } catch {
    return null;
  }
}

function simpanJejak(jejak: JejakRasio): void {
  try {
    window.localStorage.setItem(KUNCI_JEJAK, JSON.stringify(jejak));
  } catch {
    return;
  }
}

function angka(nilai: number): string {
  return Number.isInteger(nilai) ? String(nilai) : nilai.toFixed(1).replace(".", ",");
}

function sirupUntuk(gelas: number, dasarA: number, dasarB: number): number {
  return (gelas * dasarA) / dasarB;
}

function DeretBenda({
  jumlah,
  warna,
  label,
}: {
  jumlah: number;
  warna: string;
  label: string;
}) {
  const tampil = Math.max(0, Math.min(Math.round(jumlah), 24));
  return (
    <div className="flex flex-wrap gap-1.5" aria-label={`${angka(jumlah)} ${label}`}>
      {Array.from({ length: tampil }, (_, indeks) => (
        <span key={`${label}-${indeks}`} className={`h-7 w-7 rounded-full shadow-sm ${warna}`} aria-hidden />
      ))}
    </div>
  );
}

function KartuEksplorasi({ item }: { item: Eksplorasi }) {
  const contoh = item.contohKonkret;
  return (
    <section className="space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {item.tahap ? (
          <span className="rounded-full bg-[#F0AB00] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
            {item.tahap}
          </span>
        ) : null}
        <h3 className="text-lg font-black text-[#1C01A5]">{item.subJudul}</h3>
      </div>
      <p className="text-base font-semibold leading-8 text-slate-800">{item.narasi}</p>
      {contoh ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 rounded-2xl bg-amber-50 p-4">
            <p className="text-sm font-black text-amber-900">{contoh.objekA}</p>
            <p className="text-3xl font-black text-amber-700">{contoh.nilaiA}</p>
            <DeretBenda jumlah={contoh.nilaiA} warna="bg-amber-400" label={contoh.objekA} />
          </div>
          <div className="space-y-2 rounded-2xl bg-sky-50 p-4">
            <p className="text-sm font-black text-sky-900">{contoh.objekB}</p>
            <p className="text-3xl font-black text-sky-700">{contoh.nilaiB}</p>
            <DeretBenda jumlah={contoh.nilaiB} warna="bg-sky-400" label={contoh.objekB} />
          </div>
          <p className="sm:col-span-2 rounded-2xl bg-[#EEF2FF] px-4 py-3 text-center text-2xl font-black text-[#1C01A5]">
            {contoh.rasioBaku}
          </p>
        </div>
      ) : null}
      {item.langkahHitung ? (
        <p className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-center text-lg font-black leading-8 text-[#1C01A5]">
          {item.langkahHitung}
        </p>
      ) : null}
    </section>
  );
}

function Laboratorium({
  judul,
  deskripsi,
  dasarA,
  dasarB,
  gelas,
  onUbah,
}: {
  judul: string;
  deskripsi: string;
  dasarA: number;
  dasarB: number;
  gelas: number;
  onUbah: (nilai: number) => void;
}) {
  const kelipatan = gelas / dasarB;
  const sirup = sirupUntuk(gelas, dasarA, dasarB);
  return (
    <section className="space-y-4 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
      <div className="space-y-1">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
        <h3 className="text-xl font-black text-[#1C01A5]">{judul}</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{deskripsi}</p>
      </div>
      <div className="space-y-3 rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black text-[#1C01A5]">Gelas air</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUbah(gelas - 1)}
              disabled={gelas <= GELAS_MIN}
              aria-label="Kurangi gelas"
              className="h-11 w-11 rounded-full bg-[#1C01A5] text-2xl font-black text-white disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-10 text-center text-3xl font-black text-[#1C01A5]">{gelas}</span>
            <button
              type="button"
              onClick={() => onUbah(gelas + 1)}
              disabled={gelas >= GELAS_MAKS}
              aria-label="Tambah gelas"
              className="h-11 w-11 rounded-full bg-[#1C01A5] text-2xl font-black text-white disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
        <input
          type="range"
          min={GELAS_MIN}
          max={GELAS_MAKS}
          step={1}
          value={gelas}
          aria-label="Banyak gelas air"
          onChange={(event) => onUbah(Number(event.target.value))}
          className="w-full accent-[#1C01A5]"
        />
        <p className="text-center text-sm font-bold text-slate-600">
          Geser sampai 6 gelas untuk menjawab pertanyaan pemantik.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-2xl bg-sky-50 p-4">
          <p className="text-sm font-black text-sky-900">Air</p>
          <p className="text-3xl font-black text-sky-700">{gelas} gelas</p>
          <DeretBenda jumlah={gelas} warna="bg-sky-400" label="gelas air" />
        </div>
        <div className="space-y-2 rounded-2xl bg-amber-50 p-4">
          <p className="text-sm font-black text-amber-900">Sirup</p>
          <p className="text-3xl font-black text-amber-700">{angka(sirup)} sendok</p>
          <DeretBenda jumlah={sirup} warna="bg-amber-400" label="sendok sirup" />
        </div>
      </div>
      <p className="rounded-2xl bg-white px-4 py-3 text-center text-lg font-black leading-8 text-[#1C01A5]">
        {angka(dasarA)} : {angka(dasarB)} = ({angka(dasarA)} × {angka(kelipatan)}) : ({angka(dasarB)} × {angka(kelipatan)}) = {angka(sirup)} : {gelas}
      </p>
      <p className="text-center text-base font-bold leading-8 text-slate-800">
        Untuk {gelas} gelas air, tuang {angka(sirup)} sendok sirup. Rasa manisnya tetap sama.
      </p>
    </section>
  );
}

function KartuSoal({
  nomor,
  soal,
  pilihan,
  onPilih,
}: {
  nomor: number;
  soal: SoalFormatif;
  pilihan: string | undefined;
  onPilih: (opsi: string) => void;
}) {
  const sudah = pilihan !== undefined;
  const benar = pilihan === soal.kunciJawaban;
  return (
    <fieldset className="space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
      <legend className="px-1 text-sm font-black text-[#1C01A5]">Soal {nomor}</legend>
      <p className="text-base font-semibold leading-8 text-slate-800">{soal.soal}</p>
      <div className="grid gap-2">
        {soal.opsi.map((opsi) => {
          const aktif = pilihan === opsi;
          const warna = !aktif
            ? "border-slate-200 bg-white text-slate-800"
            : opsi === soal.kunciJawaban
              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
              : "border-rose-600 bg-rose-50 text-rose-900";
          return (
            <button
              key={opsi}
              type="button"
              aria-pressed={aktif}
              onClick={() => onPilih(opsi)}
              className={`rounded-2xl border-2 px-4 py-3 text-left text-base font-bold ${warna}`}
            >
              {opsi}
            </button>
          );
        })}
      </div>
      {sudah ? (
        <div
          aria-live="polite"
          className={`rounded-2xl px-4 py-3 text-sm font-semibold leading-7 ${
            benar ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
          }`}
        >
          <p className="font-black">{benar ? "Benar." : "Belum tepat."}</p>
          <p>{soal.pembahasan}</p>
        </div>
      ) : null}
    </fieldset>
  );
}

export default function RasioModuleView() {
  const kuis = useKuisMateri();
  const [siap, setSiap] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, string>>({});
  const [gelas, setGelas] = useState(GELAS_AWAL);
  const [simulasiDicoba, setSimulasiDicoba] = useState(false);

  useEffect(() => {
    const jejak = bacaJejak();
    if (jejak) {
      setJawaban(jejak.jawaban);
      setGelas(jejak.gelas);
      setSimulasiDicoba(jejak.simulasiDicoba);
    }
    setSiap(true);
  }, []);

  const jumlahBenar = modul
    ? modul.latihanFormatif.filter((soal) => jawaban[soal.id] === soal.kunciJawaban).length
    : 0;
  const tuntas = modul ? jumlahBenar === modul.latihanFormatif.length : false;

  useEffect(() => {
    if (!siap || !modul) return;
    simpanJejak({ jawaban, gelas, simulasiDicoba, tuntas });
  }, [siap, jawaban, gelas, simulasiDicoba, tuntas]);

  const tandai = kuis?.tandaiBenar;
  useEffect(() => {
    if (!siap || !tandai || !modul) return;
    for (const soal of modul.latihanFormatif) {
      if (jawaban[soal.id] === soal.kunciJawaban) {
        tandai(idLatihanMtk6Bab2(soal.id));
      }
    }
  }, [siap, tandai, jawaban]);

  if (!modul) {
    return (
      <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">
        Data modul rasio belum lengkap.
      </p>
    );
  }

  const pilih = (soal: SoalFormatif, opsi: string) => {
    setJawaban((lama) => ({ ...lama, [soal.id]: opsi }));
    if (opsi === soal.kunciJawaban) {
      kuis?.tandaiBenar(idLatihanMtk6Bab2(soal.id));
    }
  };

  return (
    <article className="space-y-6">
      <header className="space-y-3 rounded-3xl bg-[#1C01A5] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F0AB00]">
          {modul.mataPelajaran} · Kelas {modul.kelas} {modul.jenjang} · Fase {modul.fase} · Bab {modul.bab}
        </p>
        <h2 className="text-3xl font-black">{modul.judul}</h2>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#F0AB00]">Capaian pembelajaran</p>
          <p className="mt-1 text-base font-semibold leading-8">{modul.capaianPembelajaran}</p>
        </div>
      </header>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Tujuan pembelajaran</h3>
        <ul className="list-disc space-y-1 pl-5 text-base font-semibold leading-8 text-slate-800">
          {modul.tujuanPembelajaran.map((tujuan) => (
            <li key={tujuan}>{tujuan}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Pertanyaan pemantik</p>
        <p className="text-lg font-bold leading-8 text-slate-900">{modul.pertanyaanPemantik}</p>
      </section>

      <div className="space-y-4">
        {modul.eksplorasiMateri.map((item) => (
          <KartuEksplorasi key={item.subJudul} item={item} />
        ))}
      </div>

      <Laboratorium
        judul={modul.simulasiLokal.judul}
        deskripsi={modul.simulasiLokal.deskripsi}
        dasarA={modul.simulasiLokal.baseRatioA}
        dasarB={modul.simulasiLokal.baseRatioB}
        gelas={gelas}
        onUbah={(nilai) => {
          setGelas(jepitGelas(nilai));
          setSimulasiDicoba(true);
        }}
      />

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-black text-[#1C01A5]">Latihan formatif</h3>
          <p className="text-sm font-black text-[#1C01A5]">
            {jumlahBenar}/{modul.latihanFormatif.length} benar
          </p>
        </div>
        {modul.latihanFormatif.map((soal, indeks) => (
          <KartuSoal
            key={soal.id}
            nomor={indeks + 1}
            soal={soal}
            pilihan={jawaban[soal.id]}
            onPilih={(opsi) => pilih(soal, opsi)}
          />
        ))}
      </section>

      {tuntas ? (
        <section className="rounded-3xl bg-emerald-600 px-5 py-4 text-white">
          <p className="text-lg font-black">Bab ini tuntas.</p>
          <p className="mt-1 text-sm font-semibold leading-7">
            Tiga soal benar{simulasiDicoba ? " dan resep sirup sudah dicoba" : ""}. Status tersimpan di perangkat ini.
          </p>
        </section>
      ) : null}
    </article>
  );
}
