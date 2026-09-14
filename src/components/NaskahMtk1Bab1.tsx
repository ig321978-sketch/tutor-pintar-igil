"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BARIS_ANGKA = [
  { jumlah: 1, baca: "SATU", lambang: "1" },
  { jumlah: 2, baca: "DUA", lambang: "2" },
  { jumlah: 3, baca: "TIGA", lambang: "3" },
  { jumlah: 4, baca: "EMPAT", lambang: "4" },
  { jumlah: 5, baca: "LIMA", lambang: "5" },
] as const;

const WARNA_BARIS = [
  "border-[#F97316] bg-[#FFF7ED]",
  "border-[#2563EB] bg-[#EFF6FF]",
  "border-[#16A34A] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#DC2626] bg-[#FEF2F2]",
];

const PASANGAN = [
  { gambar: "🎈🎈🎈", label: "3 Balon", benar: "3" },
  { gambar: "🚗🚗", label: "2 Mobil", benar: "2" },
  { gambar: "🌟🌟🌟🌟", label: "4 Bintang", benar: "4" },
] as const;

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function Apel({ jumlah }: { jumlah: number }) {
  return (
    <p className="text-2xl leading-none tracking-tight sm:text-3xl" aria-hidden>
      {Array.from({ length: jumlah }, () => "🍎").join("")}
    </p>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK1_BAB1.id, "D", indeks);
}

function rapikanNamaBilangan(nilai: string): string {
  return nilai.trim().toLowerCase().replace(/\s+/g, " ");
}

function KuisMewarnaiAngka({
  indeks,
  judul,
  gambar,
  pilihan,
  benar,
}: {
  indeks: number;
  judul: string;
  gambar: string;
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
      <p className="mt-2 text-2xl leading-relaxed">{gambar}</p>
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
          pesanSalah="Coba warnai angka yang lain."
        />
      </div>
    </article>
  );
}

function KuisTulisBilangan({
  indeks,
  gambar,
  angkaBenar,
  namaBenar,
}: {
  indeks: number;
  gambar: string;
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
      <p className="text-2xl leading-relaxed">{gambar}</p>
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
  kiri: { gambar: string; label: string };
  kanan: { gambar: string; label: string };
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
          <p className="mt-1 text-2xl">{kiri.gambar}</p>
          <p className="mt-1 text-sm font-bold text-slate-600">{kiri.label}</p>
        </div>
        <div className="rounded-xl bg-white px-3 py-2">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Kotak B</p>
          <p className="mt-1 text-2xl">{kanan.gambar}</p>
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
    if (isi === benar || isi === "nol") {
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
          inputMode="numeric"
          className="w-24 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
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

function LembarEvaluasiMtk1() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [rombel, setRombel] = useState("");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(
      new Date(),
    ),
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
          Kelas 1
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
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok A: Menghitung & Mewarnai
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitunglah jumlah benda di dalam kotak, lalu pilih angka yang sesuai.
        </p>
        <KuisMewarnaiAngka
          indeks={0}
          judul="1. Kotak Kupu-Kupu"
          gambar="🦋🦋🦋🦋🦋🦋"
          pilihan={["5", "6", "7"]}
          benar="6"
        />
        <KuisMewarnaiAngka
          indeks={1}
          judul="2. Kotak Es Krim"
          gambar="🍦🍦🍦🍦🍦🍦🍦🍦"
          pilihan={["7", "8", "9"]}
          benar="8"
        />
        <KuisMewarnaiAngka
          indeks={2}
          judul="3. Kotak Topi"
          gambar="🎩🎩🎩🎩"
          pilihan={["3", "4", "5"]}
          benar="4"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok B: Menulis Lambang Bilangan
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitunglah, lalu tuliskan angka dan nama bilangannya.
        </p>
        <KuisTulisBilangan
          indeks={3}
          gambar="🍉🍉🍉🍉🍉🍉🍉"
          angkaBenar="7"
          namaBenar="tujuh"
        />
        <KuisTulisBilangan
          indeks={4}
          gambar="🧸🧸🧸"
          angkaBenar="3"
          namaBenar="tiga"
        />
        <KuisTulisBilangan
          indeks={5}
          gambar="🚲🚲🚲🚲🚲🚲🚲🚲🚲"
          angkaBenar="9"
          namaBenar="sembilan"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok C: Membandingkan Banyak Benda
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitung kotak kiri dan kanan, lalu pilih lebih banyak, lebih sedikit,
          atau sama banyak.
        </p>
        <KuisBanding
          indeks={6}
          kiri={{ gambar: "🐟🐟🐟🐟🐟", label: "5 ikan" }}
          kanan={{ gambar: "🦀🦀🦀", label: "3 kepiting" }}
          benar="lebih banyak"
        />
        <KuisBanding
          indeks={7}
          kiri={{ gambar: "🐸🐸", label: "2 katak" }}
          kanan={{ gambar: "🦆🦆🦆🦆", label: "4 bebek" }}
          benar="lebih sedikit"
        />
        <KuisBanding
          indeks={8}
          kiri={{ gambar: "🐝🐝🐝🐝", label: "4 lebah" }}
          kanan={{ gambar: "🐞🐞🐞🐞", label: "4 kumbang" }}
          benar="sama banyak"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok D: Tantangan Penalaran
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Bacalah cerita singkat, lalu tuliskan angka jawabannya.
        </p>
        <KuisCerita
          indeks={9}
          soal="Ali mempunyai 5 buah kelereng. Susi tidak mempunyai kelereng sama sekali di kantongnya. Berapa banyak kelereng yang dimiliki Susi?"
          benar="0"
          satuan="kelereng"
        />
        <KuisCerita
          indeks={10}
          soal="Di atas meja ada 7 buah jeruk. Ibu mengambil 7 buah jeruk tersebut untuk dibuat jus. Berapa sisa buah jeruk yang ada di atas meja sekarang?"
          benar="0"
          satuan="buah"
        />
      </section>

      <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] p-4">
        <button
          type="button"
          onClick={() => setBukaKunci((sebelum) => !sebelum)}
          className="text-sm font-black text-[#1C01A5]"
        >
          {bukaKunci
            ? "Sembunyikan kunci jawaban"
            : "Lihat kunci jawaban (guru & orang tua)"}
        </button>
        {bukaKunci ? (
          <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
            <li>Kelompok A: (1) 6, (2) 8, (3) 4</li>
            <li>Kelompok B: (1) 7 / Tujuh, (2) 3 / Tiga, (3) 9 / Sembilan</li>
            <li>
              Kelompok C: (1) Lebih banyak, (2) Lebih sedikit, (3) Sama banyak
            </li>
            <li>
              Kelompok D: (1) 0 kelereng (kosong), (2) 0 buah (habis diambil
              semua)
            </li>
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
        const id = idKuisKartuResmi(MODUL_MTK1_BAB1.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article
            key={item.label}
            className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4"
          >
            <p className="text-2xl leading-none">{item.gambar}</p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["2", "3", "4"].map((angka) => (
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

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB1;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🍎🍩
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
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Nia, lihat deh! Ibuku membawakan buah apel merah yang manis
              sekali untuk bekal.
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍎🍎🍎🍎
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">
              Satu... dua... tiga... empat! Ada empat apel!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, asyik! Aku juga bawa kue donat. Hmm, tapi ada berapa banyak
              ya buah apelmu?
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍩🍩🍩
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#9D174D]">
              Satu... dua... tiga...
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Hore! Berhitung itu seru dan mudah sekali ya, Nia!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
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
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
            <span>Gambar</span>
            <span>Cara membaca</span>
            <span>Titik-titik</span>
          </div>
          {BARIS_ANGKA.map((baris, indeks) => (
            <div
              key={baris.lambang}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-[#F0AB00]/40 px-3 py-3 ${WARNA_BARIS[indeks]}`}
            >
              <Apel jumlah={baris.jumlah} />
              <p className="text-right text-sm font-black text-[#1C01A5]">
                {baris.lambang} = {baris.baca}
              </p>
              <p className="rounded-lg border-2 border-dashed border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]">
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
            Jika piringmu kosong, tidak ada buah sama sekali, itu artinya{" "}
            <span className="font-black text-[#1C01A5]">0</span> atau{" "}
            <span className="font-black text-[#1C01A5]">NOL</span>!
          </p>
          <p className="mt-2 text-3xl" aria-hidden>
            🍽️
          </p>
        </article>
        <KuisMencocokkan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "B")}
          pertanyaan="Tuliskan satu angka dan cara membacanya, misalnya 3 = tiga."
          alias={kumpulkanAlias([
            ...BARIS_ANGKA.map((item) => `${item.lambang} ${item.baca}`),
            "0 nol",
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
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Detektif Berhitung di Kelas
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Bagi siswa 3–4 anak. Sebut satu angka, misalnya “Tunjukkan angka
              6!” Setiap kelompok mencari 6 benda, lalu meletakkannya di meja.
              Yang paling tepat dan cepat mendapat bintang.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Alat: pensil, penghapus, buku, atau balok mainan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Bantu Ibu di Dapur
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ajak anak ke dapur. Minta mengambil benda dengan jumlah tertentu,
              misalnya 3 jeruk di kulkas atau hitung sendok di meja makan.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Beri pujian atau pelukan hangat setelah anak menghitung benar.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🎨
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 1: Ayo Berhitung! (Bilangan sampai 10)
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
        <LembarEvaluasiMtk1 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "D")}
          pertanyaan="Tuliskan satu jawaban dari lembar evaluasi, misalnya 6 kupu-kupu."
          alias={kumpulkanAlias([
            "6",
            "enam",
            "6 kupu-kupu",
            "8",
            "delapan",
            "8 es krim",
            "4",
            "empat",
            "4 topi",
            "7",
            "tujuh",
            "3",
            "tiga",
            "9",
            "sembilan",
            "lebih banyak",
            "lebih sedikit",
            "sama banyak",
            "0",
            "nol",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
