"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { benihBaru } from "@/lib/modul-kedua/acak";
import { indeks, indeksPerElemen, indeksPerKognitif, levelPenalaranDikuasai } from "@/lib/modul-kedua/penguasaan";
import { kartuJatuhTempo, perbaruiKartu, susunUlangan } from "@/lib/modul-kedua/pengulangan";
import { bolehLanjut } from "@/lib/modul-kedua/remedial";
import { bacaProgresModul, hapusProgresModul, progresBaru, simpanProgresModul, type ProgresModulKedua } from "@/lib/modul-kedua/simpan";
import type { CatatanButir, DataModul, TahapId } from "@/lib/modul-kedua/tipe";
import { bacaProgres } from "@/lib/progres";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import PraPascaTes from "./PraPascaTes";
import Remedial from "./Remedial";
import TahapAbstract from "./TahapAbstract";
import TahapConcrete from "./TahapConcrete";
import TahapInfografis from "./TahapInfografis";
import TahapPeta from "./TahapPeta";
import TahapPictorial from "./TahapPictorial";
import TahapSimulasi from "./TahapSimulasi";
import TahapStory from "./TahapStory";
import { aturSuara, berhenti, suaraNyala } from "./suara";

/**
 * Kerangka umum 7 tahap SMISCPA (diapit pra-tes dan pasca-tes). Modul baru cukup menyediakan satu berkas data bertipe DataModul.
 * Urutan tahap tetap: Story, Mind-map, Infografis, Simulasi, Concrete, Pictorial, Abstract.
 */

const URUTAN: TahapId[] = ["pretest", "story", "peta", "infografis", "simulasi", "concrete", "pictorial", "abstract", "posttest"];
const LABEL: Record<TahapId, { huruf: string; nama: string }> = {
  pretest: { huruf: "Tes", nama: "Tes Awal" },
  story: { huruf: "S", nama: "Story (Cerita)" },
  peta: { huruf: "M", nama: "Mind-map (Peta Konsep)" },
  infografis: { huruf: "I", nama: "Infografis (Rangkuman)" },
  simulasi: { huruf: "S", nama: "Simulasi (Permainan)" },
  concrete: { huruf: "C", nama: "Concrete (Benda)" },
  pictorial: { huruf: "P", nama: "Pictorial (Diagram)" },
  abstract: { huruf: "A", nama: "Abstract (Angka)" },
  posttest: { huruf: "Tes", nama: "Tes Akhir" },
};
/** Tahap bernilai yang wajib mencapai 80 sebelum lanjut (jika tidak: remedial otomatis). */
const GERBANG = new Set<TahapId>(["peta", "simulasi", "concrete", "pictorial", "abstract", "posttest"]);
const TAHAP_BERNILAI_ELEMEN: TahapId[] = ["concrete", "pictorial", "abstract", "posttest"];

const tidakLangganan = () => () => {};
const TOMBOL = "min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white";

type Jeda = { tahap: TahapId; indeks: number; tuntas: boolean; detik: number; ke: TahapId | "selesai" };
type RemedialAktif = { tahap: TahapId; indeks: number; putaran: number; benih: number };

function Pembuka({ judul, saatLanjut, saatUlang }: { judul: string; saatLanjut: () => void; saatUlang: () => void }) {
  return (
    <section className="space-y-3 rounded-3xl border-4 border-amber-400 bg-amber-50 p-4">
      <h2 className="text-2xl font-black text-indigo-950">Selamat datang kembali! 👋</h2>
      <p className="text-lg font-bold text-indigo-900">Kamu sudah mulai belajar {judul}. Mau lanjut dari tempat terakhir?</p>
      <button type="button" onClick={saatLanjut} className={TOMBOL}>
        Lanjutkan ➜
      </button>
      <button type="button" onClick={saatUlang} className="min-h-14 w-full rounded-2xl border-4 border-slate-400 bg-white text-lg font-black text-slate-800">
        Mulai dari awal
      </button>
    </section>
  );
}

function Isi({ data }: { data: DataModul }) {
  const [progres, setProgres] = useState<ProgresModulKedua>(() => bacaProgresModul(data.id));
  const [tahap, setTahap] = useState<TahapId | "selesai">(() => {
    const p = bacaProgresModul(data.id);
    return p.hasil.posttest ? "selesai" : p.tahapSekarang;
  });
  const [tanya, setTanya] = useState(() => !!bacaProgresModul(data.id).hasil.pretest);
  const [benih, setBenih] = useState(() => benihBaru());
  const [putaran, setPutaran] = useState<Partial<Record<TahapId, number>>>({});
  const [remedial, setRemedial] = useState<RemedialAktif | null>(null);
  const [jeda, setJeda] = useState<Jeda | null>(null);
  const [ulangan, setUlangan] = useState<number | null>(null);
  const [suara, setSuara] = useState(() => suaraNyala());
  const [sekarang] = useState(() => new Date());
  const [nama] = useState(() => bacaProgres().profil.nama);

  const simpan = (p: ProgresModulKedua) => {
    setProgres(p);
    simpanProgresModul(p);
  };

  function selesaiTahap(t: TahapId, h: HasilLatihan) {
    const nilai = h.butir.length ? indeks(h.butir) : null;
    const put = putaran[t] ?? 0;
    if (GERBANG.has(t) && nilai !== null) {
      const { lanjut } = bolehLanjut(nilai, put);
      if (!lanjut) {
        setRemedial({ tahap: t, indeks: nilai, putaran: put + 1, benih: benihBaru() });
        setPutaran({ ...putaran, [t]: put + 1 });
        return;
      }
    }
    const tuntas = nilai === null || nilai >= 80;
    let kartu = progres.kartu;
    const terakhirPerGen = new Map<string, CatatanButir>();
    for (const b of h.butir) terakhirPerGen.set(b.gen, b);
    for (const b of terakhirPerGen.values()) if (!b.gen.startsWith("peta") && !b.gen.startsWith("sim")) kartu = perbaruiKartu(kartu, b.gen, b.benar && b.percobaan === 1, new Date());
    const ke: TahapId | "selesai" = (URUTAN[URUTAN.indexOf(t) + 1] as TahapId | undefined) ?? "selesai";
    simpan({
      ...progres,
      kartu,
      tahapSekarang: ke === "selesai" ? t : ke,
      hasil: {
        ...progres.hasil,
        [t]: { tahap: t, indeks: nilai ?? 100, detik: h.detik, percobaan: h.butir.reduce((a, b) => a + b.percobaan, 0), petunjuk: h.butir.reduce((a, b) => a + b.petunjuk, 0), butir: h.butir, waktu: new Date().toISOString(), putaranRemedial: put, tuntas },
      },
    });
    berhenti();
    if (nilai !== null) setJeda({ tahap: t, indeks: nilai, tuntas, detik: h.detik, ke });
    else lanjutKe(ke);
  }

  function lanjutKe(ke: TahapId | "selesai") {
    setJeda(null);
    setBenih(benihBaru());
    setTahap(ke);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const tanpaNilai = (t: TahapId) => (h?: unknown) => {
    void h;
    selesaiTahap(t, { butir: [], detik: 0 });
  };

  const stepper = (
    <nav aria-label="Tahap" className="flex gap-1 overflow-x-auto pb-1">
      {URUTAN.map((t) => {
        const selesai = !!progres.hasil[t];
        const aktif = tahap === t;
        return (
          <span
            key={t}
            title={LABEL[t].nama}
            className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border-2 px-2 text-sm font-black ${
              aktif ? "border-amber-500 bg-amber-300 text-indigo-950" : selesai ? "border-emerald-600 bg-emerald-200 text-emerald-900" : "border-indigo-200 bg-white text-indigo-400"
            }`}
          >
            {selesai && !aktif ? "✓" : LABEL[t].huruf}
          </span>
        );
      })}
    </nav>
  );

  const kepala = (
    <header className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Link href="/ruang-belajar" className="inline-flex min-h-10 items-center rounded-xl border-2 border-indigo-300 bg-white px-3 text-sm font-black text-indigo-800">
          ← Ruang Belajar
        </Link>
        <button
          type="button"
          onClick={() => {
            aturSuara(!suara);
            setSuara(!suara);
          }}
          className="min-h-10 rounded-xl border-2 border-violet-300 bg-white px-3 text-sm font-black text-violet-800"
        >
          {suara ? "🔊 Suara nyala" : "🔇 Suara mati"}
        </button>
      </div>
      <h1 className="text-xl font-black leading-tight text-indigo-950">{data.judul}</h1>
      <p className="text-sm font-bold text-indigo-700">{data.subBab}</p>
      {stepper}
      {tahap !== "selesai" ? <p className="text-base font-black text-indigo-900">Tahap: {LABEL[tahap].nama}</p> : null}
    </header>
  );

  let badan: React.ReactNode;
  if (tanya) {
    badan = (
      <Pembuka
        judul={data.subBab}
        saatLanjut={() => setTanya(false)}
        saatUlang={() => {
          hapusProgresModul(data.id);
          setProgres(progresBaru(data.id));
          setTahap("pretest");
          setTanya(false);
        }}
      />
    );
  } else if (jeda) {
    const ketTes = jeda.tahap === "pretest";
    badan = (
      <section className="space-y-3 rounded-3xl border-4 border-emerald-500 bg-emerald-50 p-4 text-center">
        <p className="text-5xl">{jeda.tuntas ? "🌟" : "💪"}</p>
        <h2 className="text-2xl font-black text-indigo-950">{LABEL[jeda.tahap].nama} selesai</h2>
        <p className="text-5xl font-black text-indigo-950">{Math.round(jeda.indeks)}</p>
        <p className="text-base font-bold text-indigo-900">
          {ketTes ? "Ini nilai awalmu. Tidak apa-apa, kita belajar bersama." : jeda.tuntas ? "Hebat! Kamu sudah menguasai tahap ini (target 80)." : "Kamu sudah mencoba dengan sungguh-sungguh. Kita lanjutkan, nanti ada latihan ulang."}
        </p>
        <p className="text-sm font-bold text-indigo-700">Waktu: {Math.round(jeda.detik)} detik</p>
        <button type="button" onClick={() => lanjutKe(jeda.ke)} className={TOMBOL}>
          {jeda.ke === "selesai" ? "Lihat ringkasan ➜" : "Lanjut ➜"}
        </button>
      </section>
    );
  } else if (remedial) {
    badan = (
      <Remedial
        key={remedial.benih}
        data={data}
        kunci={remedial.tahap}
        indeksTahap={remedial.indeks}
        putaran={remedial.putaran}
        benih={remedial.benih}
        saatSelesai={() => {
          setBenih(benihBaru());
          setRemedial(null);
        }}
      />
    );
  } else if (ulangan !== null) {
    const bank = [...data.latihan.concrete, ...data.latihan.pictorial, ...data.latihan.abstract];
    badan = (
      <div className="space-y-3">
        <h2 className="text-2xl font-black text-indigo-950">Ulangan Berjarak 🔁</h2>
        <LatihanTahap
          key={ulangan}
          spesifikasi={susunUlangan(progres.kartu, bank, sekarang, 5, ulangan)}
          benih={ulangan}
          mode="latihan"
          saatSelesai={(h) => {
            let kartu = progres.kartu;
            for (const b of h.butir) kartu = perbaruiKartu(kartu, b.gen, b.benar && b.percobaan === 1, new Date());
            simpan({ ...progres, kartu });
            setUlangan(null);
          }}
        />
      </div>
    );
  } else if (tahap === "selesai") {
    const semuaButir = TAHAP_BERNILAI_ELEMEN.flatMap((t) => progres.hasil[t]?.butir ?? []);
    const perElemen = indeksPerElemen(semuaButir);
    const perKognitif = indeksPerKognitif(semuaButir);
    const level = levelPenalaranDikuasai(semuaButir);
    const pra = progres.hasil.pretest?.indeks;
    const pasca = progres.hasil.posttest?.indeks;
    const jatuhTempo = kartuJatuhTempo(progres.kartu, sekarang).length;
    const berikut = progres.kartu.map((k) => k.jatuhTempo).sort()[0];
    const NAMA_ELEMEN: Record<string, string> = { membilang: "Membilang", "membaca-menulis": "Membaca dan menulis bilangan", membandingkan: "Membandingkan", mengurutkan: "Mengurutkan" };
    const NAMA_KOGNITIF: Record<string, string> = { knowing: "Knowing (mengetahui)", applying: "Applying (menerapkan)", reasoning: "Reasoning (bernalar)" };
    badan = (
      <section className="space-y-3">
        <div className="rounded-3xl border-4 border-emerald-500 bg-emerald-50 p-4 text-center">
          <p className="text-5xl">🏆</p>
          <h2 className="text-2xl font-black text-indigo-950">Modul selesai{nama && nama !== "Siswa" ? `, ${nama}` : ""}!</h2>
          <p className="text-lg font-bold text-indigo-900">
            Tes awal {pra !== undefined ? Math.round(pra) : "-"} ➜ Tes akhir {pasca !== undefined ? Math.round(pasca) : "-"}
          </p>
          <p className="text-base font-bold text-indigo-800">Level penalaran yang dikuasai: {level === "belum" ? "belum ada (ayo ulangi latihannya)" : NAMA_KOGNITIF[level]}</p>
        </div>

        <div className="rounded-3xl border-4 border-indigo-300 bg-white p-3">
          <h3 className="text-lg font-black text-indigo-950">Indeks penguasaan (0 sampai 100)</h3>
          <p className="mb-1 text-sm font-bold text-indigo-700">Per elemen capaian (Bilangan)</p>
          <ul className="space-y-1 text-base font-bold text-indigo-950">
            {Object.entries(perElemen).map(([k, v]) => (
              <li key={k} className="flex justify-between rounded-xl bg-indigo-50 px-3 py-1">
                <span>{NAMA_ELEMEN[k] ?? k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          <p className="mb-1 mt-2 text-sm font-bold text-indigo-700">Per level kognitif</p>
          <ul className="space-y-1 text-base font-bold text-indigo-950">
            {Object.entries(perKognitif).map(([k, v]) => (
              <li key={k} className="flex justify-between rounded-xl bg-indigo-50 px-3 py-1">
                <span>{NAMA_KOGNITIF[k] ?? k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border-4 border-indigo-300 bg-white p-3">
          <h3 className="text-lg font-black text-indigo-950">Catatan tiap tahap</h3>
          <table className="mt-1 w-full text-left text-sm font-bold text-indigo-950">
            <thead>
              <tr className="text-indigo-700">
                <th>Tahap</th>
                <th>Nilai</th>
                <th>Detik</th>
                <th>Coba</th>
                <th>Petunjuk</th>
              </tr>
            </thead>
            <tbody>
              {URUTAN.map((t) => {
                const h = progres.hasil[t];
                return (
                  <tr key={t} className="border-t border-indigo-100">
                    <td className="py-1">{LABEL[t].huruf === "Tes" ? LABEL[t].nama : `${LABEL[t].huruf}: ${LABEL[t].nama.split(" ")[0]}`}</td>
                    <td>{h && h.butir.length ? `${Math.round(h.indeks)}${h.tuntas || !GERBANG.has(t) ? "" : " ⚠"}` : h ? "✓" : "-"}</td>
                    <td>{h?.detik ?? "-"}</td>
                    <td>{h && h.butir.length ? h.percobaan : "-"}</td>
                    <td>{h && h.butir.length ? h.petunjuk : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-1 text-xs font-bold text-indigo-600">Data tersimpan di perangkat ini. ⚠ = belum mencapai 80 setelah remedial.</p>
        </div>

        <div className="space-y-2 rounded-3xl border-4 border-violet-300 bg-violet-50 p-3">
          <h3 className="text-lg font-black text-violet-950">Ulangan berjarak 🔁</h3>
          <p className="text-base font-bold text-violet-900">
            {jatuhTempo > 0 ? `${jatuhTempo} jenis soal siap diulang sekarang.` : berikut ? `Ulangan berikutnya sekitar ${new Date(berikut).toLocaleDateString("id-ID")}.` : "Belum ada jadwal."} Soal yang lama muncul lagi dan dicampur supaya ingatanmu kuat.
          </p>
          <button type="button" onClick={() => setUlangan(benihBaru())} className={TOMBOL}>
            Latihan ulangan sekarang ➜
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            hapusProgresModul(data.id);
            setProgres(progresBaru(data.id));
            setPutaran({});
            setTahap("pretest");
          }}
          className="min-h-14 w-full rounded-2xl border-4 border-slate-400 bg-white text-lg font-black text-slate-800"
        >
          Ulangi modul dari awal
        </button>
        <Link href="/ruang-belajar" className="flex min-h-14 w-full items-center justify-center rounded-2xl border-4 border-indigo-900 bg-white text-lg font-black text-indigo-900">
          Kembali ke Ruang Belajar
        </Link>
      </section>
    );
  } else {
    const kunci = `${tahap}-${benih}`;
    switch (tahap) {
      case "pretest":
        badan = <PraPascaTes key={kunci} data={data} jenis="pra" benih={benih} saatSelesai={(h) => selesaiTahap("pretest", h)} />;
        break;
      case "story":
        badan = <TahapStory key={kunci} data={data} saatSelesai={tanpaNilai("story")} />;
        break;
      case "peta":
        badan = <TahapPeta key={kunci} data={data} benih={benih} saatSelesai={(h) => selesaiTahap("peta", h)} />;
        break;
      case "infografis":
        badan = <TahapInfografis key={kunci} data={data} saatSelesai={tanpaNilai("infografis")} />;
        break;
      case "simulasi":
        badan = <TahapSimulasi key={kunci} data={data} benih={benih} saatSelesai={(h) => selesaiTahap("simulasi", h)} />;
        break;
      case "concrete":
        badan = <TahapConcrete key={kunci} data={data} benih={benih} saatSelesai={(h) => selesaiTahap("concrete", h)} />;
        break;
      case "pictorial":
        badan = <TahapPictorial key={kunci} data={data} benih={benih} saatSelesai={(h) => selesaiTahap("pictorial", h)} />;
        break;
      case "abstract":
        badan = <TahapAbstract key={kunci} data={data} benih={benih} saatSelesai={(h) => selesaiTahap("abstract", h)} />;
        break;
      default:
        badan = <PraPascaTes key={kunci} data={data} jenis="pasca" benih={benih} saatSelesai={(h) => selesaiTahap("posttest", h)} />;
    }
  }

  return (
    <main className="mx-auto max-w-md space-y-3 p-4 pb-16">
      {kepala}
      {badan}
    </main>
  );
}

/** Pemutar modul SMISCPA. Dirender hanya di klien karena data siswa disimpan lokal (localStorage). */
export default function PemutarSmiscpa({ data }: { data: DataModul }) {
  const klien = useSyncExternalStore(tidakLangganan, () => true, () => false);
  if (!klien) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center p-6 text-center">
        <p className="rounded-3xl border-4 border-amber-400 bg-white p-6 text-lg font-black text-indigo-950">Menyiapkan modul…</p>
      </main>
    );
  }
  return <Isi data={data} />;
}
