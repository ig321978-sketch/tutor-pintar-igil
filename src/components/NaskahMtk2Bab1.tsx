"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB1 } from "@/lib/modul-resmi-mtk-2-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BARIS_ANGKA = [
  { ikon: "🍎", puluh: 1, sisa: 0, baca: "SEPULUH", lambang: "10" },
  { ikon: "🍎", puluh: 2, sisa: 0, baca: "DUA PULUH", lambang: "20" },
  { ikon: "🍎", puluh: 2, sisa: 5, baca: "DUA PULUH LIMA", lambang: "25" },
  { ikon: "🍊", puluh: 3, sisa: 7, baca: "TIGA PULUH TUJUH", lambang: "37" },
] as const;

const WARNA_BARIS = [
  "border-[#F97316] bg-[#FFF7ED]",
  "border-[#2563EB] bg-[#EFF6FF]",
  "border-[#16A34A] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
];

const PASANGAN = [
  { gambar: "🍎×10", label: "10 apel", benar: "10" },
  { gambar: "🍎×10 + 🍎×10 + 🍎×5", label: "25 apel", benar: "25" },
  { gambar: "10 kelompok 10", label: "100 stiker", benar: "100" },
] as const;

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function KelompokBenda({
  ikon,
  puluh,
  sisa,
  ukuran = "text-lg",
}: {
  ikon: string;
  puluh: number;
  sisa: number;
  ukuran?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length: puluh }, (_, i) => (
        <div
          key={`p-${i}`}
          className="inline-flex flex-wrap items-center gap-0.5 rounded-xl border-2 border-dashed border-[#F0AB00] bg-[#FFF8E8] px-2 py-1"
        >
          <span className={`${ukuran} leading-none tracking-tight`} aria-hidden>
            {Array.from({ length: 10 }, () => ikon).join("")}
          </span>
          <span className="ml-1 text-[10px] font-black text-[#1C01A5]">10</span>
        </div>
      ))}
      {sisa > 0 ? (
        <div className="inline-flex flex-wrap items-center gap-0.5 rounded-xl bg-[#F8F7FF] px-2 py-1">
          <span className={`${ukuran} leading-none tracking-tight`} aria-hidden>
            {Array.from({ length: sisa }, () => ikon).join("")}
          </span>
          <span className="ml-1 text-[10px] font-black text-[#1C01A5]">{sisa}</span>
        </div>
      ) : null}
    </div>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB1.id, "D", indeks);
}

function rapikanNamaBilangan(nilai: string): string {
  return nilai.trim().toLowerCase().replace(/\s+/g, " ");
}

function KuisMewarnaiAngka({
  indeks,
  judul,
  puluh,
  sisa,
  ikon,
  pilihan,
  benar,
}: {
  indeks: number;
  judul: string;
  puluh: number;
  sisa: number;
  ikon: string;
  pilihan: string[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="mt-2">
        <KelompokBenda ikon={ikon} puluh={puluh} sisa={sisa} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pilihan.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setPilih(angka);
              if (angka === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
              pilih,
              angka,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {angka}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba pilih angka yang lain."
        />
      </div>
    </article>
  );
}

function KuisTulisBilangan({
  indeks,
  soal,
  angkaBenar,
  namaBenar,
}: {
  indeks: number;
  soal: string;
  angkaBenar: string;
  namaBenar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [angka, setAngka] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const angkaOk = angka.trim() === angkaBenar;
    const namaOk = rapikanNamaBilangan(nama) === namaBenar;
    if (angkaOk && namaOk) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold text-slate-700">{soal}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Lambang bilangan (angka)
          <input
            value={angka}
            onChange={(e) => setAngka(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
            placeholder=".........."
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Nama bilangan (huruf)
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
            placeholder=".........."
          />
        </label>
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={angka || nama ? `${angka} ${nama}`.trim() : undefined}
          pesanSalah="Cek lagi angka dan nama bilangannya."
        />
      </div>
    </article>
  );
}

function KuisBanding({
  indeks,
  kiri,
  kanan,
  benar,
}: {
  indeks: number;
  kiri: { ikon: string; puluh: number; sisa: number; label: string };
  kanan: { ikon: string; puluh: number; sisa: number; label: string };
  benar: "lebih banyak" | "lebih sedikit" | "sama banyak";
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const opsi = ["lebih banyak", "lebih sedikit", "sama banyak"] as const;
  const status = statusDariPilihan(pilih, benar);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0FDF4] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white px-3 py-2">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Kotak A</p>
          <div className="mt-2">
            <KelompokBenda ikon={kiri.ikon} puluh={kiri.puluh} sisa={kiri.sisa} ukuran="text-base" />
          </div>
          <p className="mt-1 text-sm font-bold text-slate-600">{kiri.label}</p>
        </div>
        <div className="rounded-xl bg-white px-3 py-2">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Kotak B</p>
          <div className="mt-2">
            <KelompokBenda
              ikon={kanan.ikon}
              puluh={kanan.puluh}
              sisa={kanan.sisa}
              ukuran="text-base"
            />
          </div>
          <p className="mt-1 text-sm font-bold text-slate-600">{kanan.label}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-bold text-[#1C01A5]">
        Kotak A ................ dari/dengan Kotak B
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {opsi.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setPilih(item);
              if (item === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-sm font-black capitalize ${kelasTombolHasilKuis(
              pilih,
              item,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba bandingkan lagi."
        />
      </div>
    </article>
  );
}

function KuisCerita({
  indeks,
  soal,
  benar,
  satuan,
}: {
  indeks: number;
  soal: string;
  benar: string;
  satuan: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [jawab, setJawab] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const isi = jawab.trim().toLowerCase();
    const alias =
      benar === "25"
        ? ["25", "dua puluh lima"]
        : benar === "100"
          ? ["100", "seratus"]
          : [benar];
    if (alias.includes(isi)) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };

  return (
    <article className="rounded-2xl border-2 border-[#7C3AED]/20 bg-[#F5F3FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={jawab}
          onChange={(e) => setJawab(e.target.value)}
          className="w-28 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder="......"
        />
        <span className="text-sm font-bold text-[#1C01A5]">{satuan}</span>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={jawab.trim() || undefined}
          pesanSalah="Coba hitung lagi."
        />
      </div>
    </article>
  );
}

function LembarEvaluasiMtk2Bab1() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [rombel, setRombel] = useState("");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );
  const [bukaKunci, setBukaKunci] = useState(false);

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-3">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama siswa
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="________________"
          />
        </label>
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Kelas 2
          <input
            value={rombel}
            onChange={(e) => setRombel(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="( ____ )"
          />
        </label>
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Tanggal
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
      </div>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Kelompok A: Menghitung & Mewarnai</h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitunglah jumlah benda di dalam kotak, lalu pilih angka yang sesuai.
        </p>
        <KuisMewarnaiAngka
          indeks={0}
          judul="1. Kotak Jeruk"
          ikon="🍊"
          puluh={2}
          sisa={4}
          pilihan={["14", "24", "42"]}
          benar="24"
        />
        <KuisMewarnaiAngka
          indeks={1}
          judul="2. Kotak Apel"
          ikon="🍎"
          puluh={2}
          sisa={5}
          pilihan={["20", "25", "52"]}
          benar="25"
        />
        <KuisMewarnaiAngka
          indeks={2}
          judul="3. Kotak Pensil"
          ikon="✏️"
          puluh={3}
          sisa={0}
          pilihan={["3", "13", "30"]}
          benar="30"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok B: Menulis Lambang Bilangan
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Tuliskan angka dan nama bilangannya.
        </p>
        <KuisTulisBilangan
          indeks={3}
          soal="Dua puluh lima apel."
          angkaBenar="25"
          namaBenar="dua puluh lima"
        />
        <KuisTulisBilangan
          indeks={4}
          soal="Tiga puluh tujuh jeruk."
          angkaBenar="37"
          namaBenar="tiga puluh tujuh"
        />
        <KuisTulisBilangan
          indeks={5}
          soal="Enam puluh dua kelereng."
          angkaBenar="62"
          namaBenar="enam puluh dua"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok C: Membandingkan Banyak Benda
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitung kotak kiri dan kanan, lalu pilih lebih banyak, lebih sedikit, atau sama banyak.
        </p>
        <KuisBanding
          indeks={6}
          kiri={{ ikon: "🍎", puluh: 2, sisa: 5, label: "25 apel" }}
          kanan={{ ikon: "🍊", puluh: 2, sisa: 0, label: "20 jeruk" }}
          benar="lebih banyak"
        />
        <KuisBanding
          indeks={7}
          kiri={{ ikon: "🍎", puluh: 2, sisa: 0, label: "20 apel" }}
          kanan={{ ikon: "🍊", puluh: 3, sisa: 7, label: "37 jeruk" }}
          benar="lebih sedikit"
        />
        <KuisBanding
          indeks={8}
          kiri={{ ikon: "🍎", puluh: 2, sisa: 5, label: "25 apel" }}
          kanan={{ ikon: "🍊", puluh: 2, sisa: 5, label: "25 jeruk" }}
          benar="sama banyak"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Kelompok D: Tantangan Penalaran</h5>
        <p className="text-sm font-semibold text-slate-600">
          Bacalah cerita singkat, lalu tuliskan jawabannya.
        </p>
        <KuisCerita
          indeks={9}
          soal="Ali mempunyai 20 kelereng. Nia memberi 5 kelereng lagi. Berapa banyak kelereng Ali sekarang?"
          benar="25"
          satuan="kelereng"
        />
        <KuisCerita
          indeks={10}
          soal="Ibu memberi Nia 100 stiker. Tuliskan angka seratus."
          benar="100"
          satuan=""
        />
      </section>

      <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] p-4">
        <button
          type="button"
          onClick={() => setBukaKunci((sebelum) => !sebelum)}
          className="text-sm font-black text-[#1C01A5]"
        >
          {bukaKunci ? "Sembunyikan kunci jawaban" : "Lihat kunci jawaban (guru & orang tua)"}
        </button>
        {bukaKunci ? (
          <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
            <li>Kelompok A: (1) 24, (2) 25, (3) 30</li>
            <li>
              Kelompok B: (1) 25 / dua puluh lima, (2) 37 / tiga puluh tujuh, (3) 62 / enam puluh
              dua
            </li>
            <li>Kelompok C: (1) Lebih banyak, (2) Lebih sedikit, (3) Sama banyak</li>
            <li>Kelompok D: (1) 25 kelereng, (2) 100</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function KuisMencocokkan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ: Cocokkan gambar ke angkanya
      </p>
      <p className="text-sm font-semibold text-slate-600">
        Ketuk angka yang cocok dengan banyak bendanya.
      </p>
      {PASANGAN.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB1.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article
            key={item.label}
            className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4"
          >
            <p className="text-lg font-black text-[#1C01A5]">{item.gambar}</p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["10", "25", "100"].map((angka) => (
                <button
                  key={angka}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: angka }));
                    if (angka === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
                    ketuk,
                    angka,
                    item.benar,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  Angka {angka}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={ketuk || undefined}
                pesanSalah="Coba angka yang lain."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab1({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB1;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🍎🍊
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuA.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuA.pengantar}
        </p>
        <div className="mt-5 space-y-3">
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Nia, dulu apelku cuma empat. Sekarang lebih banyak! Yuk hitung sepuluh-sepuluh
              dulu.
            </p>
            <div className="mt-3">
              <KelompokBenda ikon="🍎" puluh={2} sisa={5} />
            </div>
            <p className="mt-2 text-sm font-extrabold text-[#1C01A5]">
              Sepuluh... sepuluh... lima! Ada dua puluh lima apel!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">Nia</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, asyik! Aku juga bawa jeruk. Hmm, ada berapa banyak ya?
            </p>
            <div className="mt-3">
              <KelompokBenda ikon="🍊" puluh={2} sisa={4} />
            </div>
            <p className="mt-2 text-sm font-extrabold text-[#9D174D]">
              Sepuluh... sepuluh... empat! Ada dua puluh empat jeruk!
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Hore! Kalau banyak, hitung sepuluh-sepuluh dulu. Seru dan mudah ya, Nia!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🔢🍎
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuB.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Dunia Angka
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-[1fr_auto] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:grid-cols-[1fr_auto_auto] sm:text-xs">
            <span>Gambar</span>
            <span>Cara membaca</span>
            <span className="hidden sm:inline">Angka</span>
          </div>
          {BARIS_ANGKA.map((baris, indeks) => (
            <div
              key={baris.lambang}
              className={`grid grid-cols-1 items-center gap-2 border-t border-[#F0AB00]/40 px-3 py-3 sm:grid-cols-[1fr_auto_auto] ${WARNA_BARIS[indeks]}`}
            >
              <KelompokBenda ikon={baris.ikon} puluh={baris.puluh} sisa={baris.sisa} />
              <p className="text-sm font-black text-[#1C01A5] sm:text-right">
                {baris.lambang} = {baris.baca}
              </p>
              <p className="w-14 rounded-lg border-2 border-dashed border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]">
                {baris.lambang}
              </p>
            </div>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">
            Kamus Mini Angka
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Sepuluh benda disebut{" "}
            <span className="font-black text-[#1C01A5]">1 puluhan</span>. Yang kurang dari sepuluh
            disebut <span className="font-black text-[#1C01A5]">satuan</span>. Jadi 25 = 2 puluhan +
            5 satuan.
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
            Sepuluh kelompok 10 sama dengan{" "}
            <span className="font-black text-[#1C01A5]">100</span> atau{" "}
            <span className="font-black text-[#1C01A5]">SERATUS</span>!
          </p>
        </article>
        <KuisMencocokkan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB1.id, "B")}
          pertanyaan="Tuliskan satu angka dan cara membacanya, misalnya 25 = dua puluh lima."
          alias={kumpulkanAlias([
            ...BARIS_ANGKA.map((item) => `${item.lambang} ${item.baca}`),
            "100 seratus",
          ])}
          konteks={kartuB.pengantar}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🏠
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuC.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuC.pengantar}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1D4ED8] bg-[#EFF6FF] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#1D4ED8]">
              Sekolah · Untuk Guru
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Detektif Berhitung di Kelas</h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Bagi siswa 3–4 anak. Sebut satu angka, misalnya “Tunjukkan angka 25!” Setiap
              kelompok membuat 2 kelompok 10 pensil, lalu 5 pensil lagi. Yang paling tepat dan
              cepat mendapat bintang.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Alat: pensil, penghapus, buku, atau balok mainan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Bantu Ibu di Dapur</h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ajak anak ke dapur. Minta mengambil 30 jeruk: hitung 10, 10, lalu 10 lagi. Atau
              hitung sendok di meja makan.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Beri pujian atau pelukan hangat setelah anak menghitung benar.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🎨
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 1: Bilangan Cacah sampai 100
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuD.pengantar}
        </p>
        <LembarEvaluasiMtk2Bab1 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB1.id, "D")}
          pertanyaan="Tuliskan satu jawaban dari lembar evaluasi, misalnya 25 apel."
          alias={kumpulkanAlias([
            "24",
            "dua puluh empat",
            "25",
            "dua puluh lima",
            "30",
            "tiga puluh",
            "37",
            "tiga puluh tujuh",
            "62",
            "enam puluh dua",
            "lebih banyak",
            "lebih sedikit",
            "sama banyak",
            "100",
            "seratus",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
