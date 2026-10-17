"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import dataMentah from "@/data/modules/kurikulum-merdeka-bab2-rasio.json";
import { idLatihanMtk6Bab2 } from "@/lib/kuis-materi";
import { useEffect, useState } from "react";

const KUNCI_JEJAK = "igil-modul-mat-6-bab2";

type PaketBibit = { kode: string; bibit: number; harga: number };
type BarisAntrean = { wahana: string; jumlah: string };
type SoalFormatif = {
  id: string;
  bagian: string;
  soal: string;
  opsi: string[];
  kunciJawaban: string;
  pembahasan: string;
};
type CabangPeta = { judul: string; anak: string[] };

type ModulRasio = {
  id: string;
  jenjang: string;
  kelas: number;
  fase: string;
  mataPelajaran: string;
  bab: number;
  judul: string;
  sumber: string;
  capaianPembelajaran: string;
  pembuka: string[];
  tujuanPembelajaran: string[];
  pertanyaanPemantik: string[];
  kataKunci: string[];
  petaKonsep: CabangPeta[];
  fokusPeta: string;
  mengingat: { narasi: string; pecahan: string };
  permasalahan: string;
  membandingkan: {
    subJudul: string;
    eksplorasi: string;
    narasi: string;
    gambar: string;
    gambarAlt: string;
    paket: PaketBibit[];
  };
  pengertian: {
    subJudul: string;
    eksplorasi: string;
    narasi: string;
    gambar: string;
    gambarAlt: string;
    objekA: string;
    nilaiA: number;
    objekB: string;
    nilaiB: number;
    rasioAwal: string;
    rasioSederhana: string;
    rasioTerbalik: string;
    makna: string;
  };
  kerjaSama: string;
  berpikirKritis: string;
  simulasiLokal: {
    judul: string;
    deskripsi: string;
    baseRatioA: number;
    baseRatioB: number;
    kelipatanAwal: number;
    kelipatanMin: number;
    kelipatanMaks: number;
  };
  antrean: BarisAntrean[];
  refleksi: string[];
  latihanFormatif: SoalFormatif[];
};

type JejakRasio = {
  jawaban: Record<string, string>;
  kelipatan: number;
  simulasiDicoba: boolean;
  tuntas: boolean;
};

function adalahModul(data: unknown): data is ModulRasio {
  if (!data || typeof data !== "object") return false;
  const calon = data as ModulRasio;
  return (
    calon.id === "mat-6-bab2" &&
    Array.isArray(calon.latihanFormatif) &&
    calon.latihanFormatif.length > 0 &&
    calon.simulasiLokal?.baseRatioA > 0 &&
    calon.simulasiLokal?.baseRatioB > 0 &&
    Array.isArray(calon.membandingkan?.paket) &&
    calon.membandingkan.paket.length >= 2
  );
}

const modul = adalahModul(dataMentah) ? dataMentah : null;

function jepit(nilai: number, min: number, maks: number, cadangan: number): number {
  if (!Number.isFinite(nilai)) return cadangan;
  return Math.min(maks, Math.max(min, Math.round(nilai)));
}

function bacaJejak(awal: number, min: number, maks: number): JejakRasio | null {
  if (typeof window === "undefined") return null;
  try {
    const mentah = window.localStorage.getItem(KUNCI_JEJAK);
    if (!mentah) return null;
    const data = JSON.parse(mentah) as Partial<JejakRasio>;
    const jawaban = data.jawaban && typeof data.jawaban === "object" ? data.jawaban : {};
    const mentahKelipatan = data.kelipatan;
    return {
      jawaban,
      kelipatan: jepit(typeof mentahKelipatan === "number" ? mentahKelipatan : awal, min, maks, awal),
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

function rupiah(nilai: number): string {
  return `Rp${nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function hargaSatu(paket: PaketBibit): { utuh: number; sisa: number; teks: string } {
  const utuh = Math.floor(paket.harga / paket.bibit);
  const sisa = paket.harga % paket.bibit;
  const teks = sisa === 0 ? rupiah(utuh) : `${rupiah(utuh)} sisa ${rupiah(sisa)}`;
  return { utuh, sisa, teks };
}

function GambarBuku({ src, alt, keterangan }: { src: string; alt: string; keterangan: string }) {
  return (
    <figure className="space-y-1">
      <img src={src} alt={alt} className="w-full rounded-2xl border border-slate-200 bg-white object-cover" />
      <figcaption className="text-sm font-semibold leading-7 text-slate-600">{keterangan}</figcaption>
    </figure>
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

function Laboratorium({
  judul,
  deskripsi,
  dasarA,
  dasarB,
  kelipatan,
  min,
  maks,
  onUbah,
}: {
  judul: string;
  deskripsi: string;
  dasarA: number;
  dasarB: number;
  kelipatan: number;
  min: number;
  maks: number;
  onUbah: (nilai: number) => void;
}) {
  const pucuk = dasarA * kelipatan;
  const cemara = dasarB * kelipatan;
  return (
    <section className="space-y-4 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
      <div className="space-y-1">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
        <h3 className="text-xl font-black text-[#1C01A5]">{judul}</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{deskripsi}</p>
      </div>
      <div className="space-y-3 rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black text-[#1C01A5]">Kelipatan</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUbah(kelipatan - 1)}
              disabled={kelipatan <= min}
              aria-label="Kurangi kelipatan"
              className="h-11 w-11 rounded-full bg-[#1C01A5] text-2xl font-black text-white disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-10 text-center text-3xl font-black text-[#1C01A5]">{kelipatan}</span>
            <button
              type="button"
              onClick={() => onUbah(kelipatan + 1)}
              disabled={kelipatan >= maks}
              aria-label="Tambah kelipatan"
              className="h-11 w-11 rounded-full bg-[#1C01A5] text-2xl font-black text-white disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={maks}
          step={1}
          value={kelipatan}
          aria-label="Kelipatan rasio pohon"
          onChange={(event) => onUbah(Number(event.target.value))}
          className="w-full accent-[#1C01A5]"
        />
        <p className="text-center text-sm font-bold text-slate-600">
          Kelipatan 2 menampilkan gambar kebun, 4 : 6. Kelipatan 7 menampilkan 14 pucuk merah.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-2xl bg-rose-50 p-4">
          <p className="text-sm font-black text-rose-900">Pucuk merah</p>
          <p className="text-3xl font-black text-rose-700">{pucuk} pohon</p>
        </div>
        <div className="space-y-2 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-black text-emerald-900">Cemara</p>
          <p className="text-3xl font-black text-emerald-700">{cemara} pohon</p>
        </div>
      </div>
      <p className="rounded-2xl bg-white px-4 py-3 text-center text-lg font-black leading-8 text-[#1C01A5]">
        {dasarA} : {dasarB} = ({dasarA} × {kelipatan}) : ({dasarB} × {kelipatan}) = {pucuk} : {cemara}
      </p>
    </section>
  );
}

export default function RasioModuleView() {
  const kuis = useKuisMateri();
  const awal = modul?.simulasiLokal.kelipatanAwal ?? 2;
  const min = modul?.simulasiLokal.kelipatanMin ?? 1;
  const maks = modul?.simulasiLokal.kelipatanMaks ?? 8;
  const [siap, setSiap] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, string>>({});
  const [kelipatan, setKelipatan] = useState(awal);
  const [simulasiDicoba, setSimulasiDicoba] = useState(false);

  useEffect(() => {
    const jejak = bacaJejak(awal, min, maks);
    if (jejak) {
      setJawaban(jejak.jawaban);
      setKelipatan(jejak.kelipatan);
      setSimulasiDicoba(jejak.simulasiDicoba);
    }
    setSiap(true);
  }, [awal, min, maks]);

  const jumlahBenar = modul
    ? modul.latihanFormatif.filter((soal) => jawaban[soal.id] === soal.kunciJawaban).length
    : 0;
  const tuntas = modul ? jumlahBenar === modul.latihanFormatif.length : false;

  useEffect(() => {
    if (!siap || !modul) return;
    simpanJejak({ jawaban, kelipatan, simulasiDicoba, tuntas });
  }, [siap, jawaban, kelipatan, simulasiDicoba, tuntas]);

  const tandai = kuis?.tandaiBenar;
  useEffect(() => {
    if (!siap || !tandai || !modul) return;
    for (const soal of modul.latihanFormatif) {
      if (jawaban[soal.id] === soal.kunciJawaban) tandai(idLatihanMtk6Bab2(soal.id));
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
    if (opsi === soal.kunciJawaban) kuis?.tandaiBenar(idLatihanMtk6Bab2(soal.id));
  };

  const soalBagian = (bagian: string) => modul.latihanFormatif.filter((soal) => soal.bagian === bagian);
  let nomor = 0;
  const kartu = (daftar: SoalFormatif[]) =>
    daftar.map((soal) => {
      nomor += 1;
      return (
        <KartuSoal
          key={soal.id}
          nomor={nomor}
          soal={soal}
          pilihan={jawaban[soal.id]}
          onPilih={(opsi) => pilih(soal, opsi)}
        />
      );
    });

  const paketA = modul.membandingkan.paket[0];
  const paketB = modul.membandingkan.paket[1];
  const silangKiri = paketA.harga * paketB.bibit;
  const silangKanan = paketB.harga * paketA.bibit;

  return (
    <article className="space-y-6">
      <header className="space-y-3 rounded-3xl bg-[#1C01A5] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F0AB00]">
          {modul.mataPelajaran} · Kelas {modul.kelas} {modul.jenjang} · Fase {modul.fase} · Bab {modul.bab}
        </p>
        <h2 className="text-3xl font-black">{modul.judul}</h2>
        <p className="text-sm font-semibold text-white/80">{modul.sumber}</p>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#F0AB00]">Capaian pembelajaran</p>
          <p className="mt-1 text-base font-semibold leading-8">{modul.capaianPembelajaran}</p>
        </div>
      </header>

      <section className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Pembuka bab</p>
        {modul.pembuka.map((kalimat) => (
          <p key={kalimat} className="text-base font-semibold leading-8 text-slate-900">{kalimat}</p>
        ))}
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Tujuan pembelajaran</h3>
        <ul className="list-disc space-y-1 pl-5 text-base font-semibold leading-8 text-slate-800">
          {modul.tujuanPembelajaran.map((tujuan) => (
            <li key={tujuan}>{tujuan}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Pertanyaan pemantik</h3>
        <ul className="list-disc space-y-1 pl-5 text-base font-semibold leading-8 text-slate-800">
          {modul.pertanyaanPemantik.map((pertanyaan) => (
            <li key={pertanyaan}>{pertanyaan}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Kata kunci</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.kataKunci.join(", ")}.</p>
      </section>

      <section className="space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Peta konsep</h3>
        <p className="mx-auto w-fit rounded-full bg-[#1C01A5] px-4 py-1 text-sm font-black text-white">Rasio</p>
        <div className="grid gap-3 md:grid-cols-3">
          {modul.petaKonsep.map((cabang) => (
            <div
              key={cabang.judul}
              className={`space-y-2 rounded-2xl p-3 ${cabang.judul === modul.fokusPeta ? "bg-[#F0AB00]/30" : "bg-[#EEF2FF]"}`}
            >
              <p className="text-sm font-black text-[#1C01A5]">{cabang.judul}</p>
              {cabang.anak.map((anak) => (
                <p key={anak} className="text-sm font-semibold text-slate-800">{anak}</p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-[#1C01A5]">Bagian yang dikerjakan sekarang: {modul.fokusPeta}.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Ayo Mengingat Kembali</h3>
        <GambarBuku
          src="/doodle-mtk/mtk-6-bab2-catatan.jpg"
          alt="Catatan faktor dan kelipatan"
          keterangan="Faktor memperkecil rasio. Kelipatan memperbesar rasio."
        />
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.mengingat.narasi}</p>
        <GambarBuku
          src="/doodle-mtk/mtk-6-bab2-pecahan.jpg"
          alt="Roti, semangka, dan cokelat dengan bagian yang hilang"
          keterangan={modul.mengingat.pecahan}
        />
        {kartu(soalBagian("Ayo Mengingat Kembali"))}
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-black text-[#1C01A5]">A. Konsep Rasio</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.permasalahan}</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">{modul.membandingkan.subJudul}</h3>
        <p className="text-sm font-black text-[#1C01A5]">{modul.membandingkan.eksplorasi}</p>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.membandingkan.narasi}</p>
        <GambarBuku
          src={modul.membandingkan.gambar}
          alt={modul.membandingkan.gambarAlt}
          keterangan="Paket A berharga Rp50.000 untuk 5 bibit. Paket B berharga Rp40.000 untuk 3 bibit."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {modul.membandingkan.paket.map((paket) => (
            <div key={paket.kode} className="space-y-2 rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-black text-emerald-900">Paket {paket.kode}</p>
              <p className="text-2xl font-black text-emerald-800">{paket.bibit} bibit</p>
              <p className="text-lg font-black text-[#1C01A5]">{rupiah(paket.harga)}</p>
            </div>
          ))}
        </div>
        {kartu(soalBagian("1. Membandingkan Benda").slice(0, 2))}
        <div className="space-y-3 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Ayo Mencoba</h4>
          <p className="text-base font-semibold leading-8 text-slate-800">Harga satu bibit dihitung di perangkat ini.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  {["Paket", "Banyak bibit", "Harga paket", "Harga satu bibit"].map((kolom) => (
                    <th key={kolom} className="border border-slate-200 bg-white px-3 py-2 text-left font-black text-[#1C01A5]">{kolom}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modul.membandingkan.paket.map((paket) => (
                  <tr key={paket.kode}>
                    <td className="border border-slate-200 px-3 py-2 font-bold">{paket.kode}</td>
                    <td className="border border-slate-200 px-3 py-2 font-bold">{paket.bibit}</td>
                    <td className="border border-slate-200 px-3 py-2 font-bold">{rupiah(paket.harga)}</td>
                    <td className="border border-slate-200 px-3 py-2 font-bold">{hargaSatu(paket).teks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm font-semibold leading-7 text-slate-800">
            Banding silang: {rupiah(paketA.harga)} × {paketB.bibit} = {rupiah(silangKiri)}. {rupiah(paketB.harga)} × {paketA.bibit} = {rupiah(silangKanan)}.
          </p>
        </div>
        {kartu(soalBagian("1. Membandingkan Benda").slice(2))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">{modul.pengertian.subJudul}</h3>
        <p className="text-sm font-black text-[#1C01A5]">{modul.pengertian.eksplorasi}</p>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.pengertian.narasi}</p>
        <GambarBuku
          src={modul.pengertian.gambar}
          alt={modul.pengertian.gambarAlt}
          keterangan={`${modul.pengertian.objekA} ${modul.pengertian.nilaiA} pohon. ${modul.pengertian.objekB} ${modul.pengertian.nilaiB} pohon.`}
        />
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.pengertian.makna}</p>
        <p className="rounded-2xl bg-[#EEF2FF] px-4 py-3 text-center text-2xl font-black text-[#1C01A5]">
          {modul.pengertian.rasioAwal} = {modul.pengertian.rasioSederhana}
        </p>
        <GambarBuku
          src="/doodle-mtk/mtk-6-bab2-urutan.jpg"
          alt="Urutan rasio mengikuti jenis pohon yang disebut lebih dulu"
          keterangan={`Pucuk merah terhadap cemara ${modul.pengertian.rasioSederhana}. Cemara terhadap pucuk merah ${modul.pengertian.rasioTerbalik}.`}
        />
        {kartu(soalBagian("2. Pengertian Rasio").slice(0, 2))}
        <div className="space-y-2 rounded-3xl bg-emerald-50 p-4">
          <h4 className="text-lg font-black text-emerald-900">Ayo Bekerja Sama</h4>
          <p className="text-base font-semibold leading-8 text-slate-800">{modul.kerjaSama}</p>
        </div>
        <div className="space-y-2 rounded-3xl bg-rose-50 p-4">
          <h4 className="text-lg font-black text-rose-900">Ayo Berpikir Kritis</h4>
          <p className="text-base font-semibold leading-8 text-slate-800">{modul.berpikirKritis}</p>
        </div>
        <Laboratorium
          judul={modul.simulasiLokal.judul}
          deskripsi={modul.simulasiLokal.deskripsi}
          dasarA={modul.simulasiLokal.baseRatioA}
          dasarB={modul.simulasiLokal.baseRatioB}
          kelipatan={kelipatan}
          min={min}
          maks={maks}
          onUbah={(nilai) => {
            setKelipatan(jepit(nilai, min, maks, awal));
            setSimulasiDicoba(true);
          }}
        />
        {kartu(soalBagian("2. Pengertian Rasio").slice(2))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-black text-[#1C01A5]">Latihan 2.1</h3>
          <p className="text-sm font-black text-[#1C01A5]">
            {jumlahBenar}/{modul.latihanFormatif.length} benar
          </p>
        </div>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Soal lahir di kelasmu mengikuti jumlah temanmu. Bagi kedua angka dengan faktor yang sama, lalu tukar urutannya untuk rasio sebaliknya.
        </p>
        <GambarBuku
          src="/doodle-mtk/mtk-6-bab2-antrean.jpg"
          alt="Dua antrean wahana di taman hiburan"
          keterangan="Roller coaster 24 orang. Komidi putar 18 orang."
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black text-[#1C01A5]">Wahana</th>
                <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black text-[#1C01A5]">Banyak pengunjung</th>
              </tr>
            </thead>
            <tbody>
              {modul.antrean.map((baris) => (
                <tr key={baris.wahana}>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">{baris.wahana}</td>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">{baris.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {kartu(soalBagian("Latihan 2.1").slice(0, 3))}
        <GambarBuku
          src="/doodle-mtk/mtk-6-bab2-minuman.jpg"
          alt="Minuman disiapkan untuk teman undangan"
          keterangan="6 liter disiapkan untuk 15 teman."
        />
        {kartu(soalBagian("Latihan 2.1").slice(3))}
        <div className="space-y-2 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Ayo Berefleksi</h4>
          {modul.refleksi.map((kalimat) => (
            <p key={kalimat} className="text-base font-semibold leading-8 text-slate-800">{kalimat}</p>
          ))}
        </div>
      </section>

      {tuntas ? (
        <section className="rounded-3xl bg-emerald-600 px-5 py-4 text-white">
          <p className="text-lg font-black">Bagian A tuntas.</p>
          <p className="mt-1 text-sm font-semibold leading-7">
            {jumlahBenar} soal benar{simulasiDicoba ? " dan kebun mini sudah dicoba" : ""}. Status tersimpan di perangkat ini.
          </p>
        </section>
      ) : null}
    </article>
  );
}
