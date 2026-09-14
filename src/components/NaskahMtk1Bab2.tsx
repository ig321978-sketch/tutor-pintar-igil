"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK1_BAB2.id, "D", indeks);
}

function KuisJumlahkan({
  indeks,
  judul,
  kiri,
  kanan,
  hasil,
  aBenar,
  bBenar,
  cBenar,
}: {
  indeks: number;
  judul: string;
  kiri: string;
  kanan: string;
  hasil: string;
  aBenar: string;
  bBenar: string;
  cBenar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    if (a.trim() === aBenar && b.trim() === bBenar && c.trim() === cBenar) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-2xl leading-none">
        <span className="rounded-xl bg-white px-2 py-1">{kiri}</span>
        <span className="text-lg font-black text-[#1C01A5]">➕</span>
        <span className="rounded-xl bg-white px-2 py-1">{kanan}</span>
        <span className="text-lg font-black text-[#1C01A5]">＝</span>
        <span className="rounded-xl bg-white px-2 py-1">{hasil}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={a}
          onChange={(e) => setA(e.target.value)}
          inputMode="numeric"
          className="w-14 rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold text-[#1C01A5]"
          placeholder="...."
        />
        <span className="font-black text-[#1C01A5]">➕</span>
        <input
          value={b}
          onChange={(e) => setB(e.target.value)}
          inputMode="numeric"
          className="w-14 rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold text-[#1C01A5]"
          placeholder="...."
        />
        <span className="font-black text-[#1C01A5]">＝</span>
        <input
          value={c}
          onChange={(e) => setC(e.target.value)}
          inputMode="numeric"
          className="w-14 rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold text-[#1C01A5]"
          placeholder="...."
        />
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
          cuplikan={a || b || c ? `${a} + ${b} = ${c}` : undefined}
          pesanSalah="Cek lagi angka dan hasilnya."
        />
      </div>
    </article>
  );
}

function KuisPilihan({
  indeks,
  soal,
  opsi,
  benar,
}: {
  indeks: number;
  soal: string;
  opsi: { kode: string; teks: string }[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {opsi.map((item) => (
          <button
            key={item.kode}
            type="button"
            onClick={() => {
              setPilih(item.kode);
              if (item.kode === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
              pilih,
              item.kode,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.kode}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba pilih jawaban yang lain."
        />
      </div>
    </article>
  );
}

const SOAL_COCOK = [
  { soal: "3 ➕ 3 ＝", benar: "6" },
  { soal: "4 ➕ 5 ＝", benar: "9" },
  { soal: "7 ➕ 1 ＝", benar: "8" },
] as const;

const JAWAB_COCOK = ["9", "6", "8"] as const;

function KuisCocokTambah() {
  const kuis = useKuisMateri();
  const [pilihSoal, setPilihSoal] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<Record<number, string>>({});

  const hubungkan = (angka: string) => {
    if (pilihSoal === null) return;
    const item = SOAL_COCOK[pilihSoal];
    setPasangan((sebelum) => ({ ...sebelum, [pilihSoal]: angka }));
    if (angka === item.benar) {
      kuis?.tandaiBenar(idEvaluasi(6 + pilihSoal));
    }
    setPilihSoal(null);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Soal penjumlahan
        </p>
        {SOAL_COCOK.map((item, indeks) => {
          const pilih = pasangan[indeks];
          const status = statusDariPilihan(pilih ?? "", item.benar);
          return (
            <button
              key={item.soal}
              type="button"
              onClick={() => setPilihSoal(indeks)}
              className={`flex w-full items-center justify-between rounded-xl border-2 px-3 py-3 text-left text-sm font-black ${
                pilihSoal === indeks
                  ? "border-[#F0AB00] bg-[#FFF8E8] text-[#1C01A5]"
                  : status === "benar"
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : status === "salah"
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
              }`}
            >
              <span>{item.soal}</span>
              <span>{pilih || "•"}</span>
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Jawaban
        </p>
        {JAWAB_COCOK.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => hubungkan(angka)}
            className="w-full rounded-xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] px-3 py-3 text-sm font-black text-[#1C01A5] hover:border-[#1C01A5]"
          >
            • Angka {angka}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiMtk2() {
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
          Kelompok A: Hitung dan Jumlahkan
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitunglah benda di setiap kotak, lalu tuliskan angka dan hasil
          penjumlahannya.
        </p>
        <KuisJumlahkan
          indeks={0}
          judul="1. Kotak Apel"
          kiri="🍎🍎"
          kanan="🍎🍎🍎"
          hasil="🍎🍎🍎🍎🍎"
          aBenar="2"
          bBenar="3"
          cBenar="5"
        />
        <KuisJumlahkan
          indeks={1}
          judul="2. Kotak Kupu-Kupu"
          kiri="🦋🦋🦋🦋"
          kanan="🦋🦋"
          hasil="🦋🦋🦋🦋🦋🦋"
          aBenar="4"
          bBenar="2"
          cBenar="6"
        />
        <KuisJumlahkan
          indeks={2}
          judul="3. Kotak Es Krim"
          kiri="🍦"
          kanan="🍦🍦🍦🍦"
          hasil="🍦🍦🍦🍦🍦"
          aBenar="1"
          bBenar="4"
          cBenar="5"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok B: Pilihan Ganda
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Pilihlah satu jawaban yang paling benar.
        </p>
        <KuisPilihan
          indeks={3}
          soal="1. Perhatikan operasi bilangan 5 ➕ 2 ＝ .... Hasil dari penjumlahan di atas adalah..."
          opsi={[
            { kode: "A", teks: "6" },
            { kode: "B", teks: "7" },
            { kode: "C", teks: "8" },
          ]}
          benar="B"
        />
        <KuisPilihan
          indeks={4}
          soal="2. Ali memiliki 4 pensil warna. Nia memberikan 3 pensil warna lagi kepada Ali. Berapa jumlah seluruh pensil warna Ali sekarang?"
          opsi={[
            { kode: "A", teks: "6" },
            { kode: "B", teks: "7" },
            { kode: "C", teks: "8" },
          ]}
          benar="B"
        />
        <KuisPilihan
          indeks={5}
          soal="3. Ibu membeli 6 buah jeruk. Ayah membawa 0 buah jeruk dari kantor. Berapa total buah jeruk yang ada di rumah?"
          opsi={[
            { kode: "A", teks: "0" },
            { kode: "B", teks: "5" },
            { kode: "C", teks: "6" },
          ]}
          benar="C"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok C: Menghubungkan Garis
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Ketuk soal di kiri, lalu ketuk angka jawaban yang cocok di kanan.
        </p>
        <KuisCocokTambah />
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
            <li>Kelompok A: (1) 2 ➕ 3 ＝ 5, (2) 4 ➕ 2 ＝ 6, (3) 1 ➕ 4 ＝ 5</li>
            <li>
              Kelompok B: (1) B. 7, (2) B. 7, (3) C. 6 (karena ditambah 0
              hasilnya tetap)
            </li>
            <li>Kelompok C: 3 ➕ 3 ＝ 6, 4 ➕ 5 ＝ 9, 7 ➕ 1 ＝ 8</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function NaskahMtk1Bab2({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB2;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏠🤖📦
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
          <article className="rounded-2xl border-2 border-[#DC2626]/20 bg-[#FEF2F2] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#991B1B]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Nia, aku sedang mengelompokkan mainan robotku. Di kotak merah ada
              3 robot, dan di kotak biru ada 2 robot.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-black uppercase text-[#991B1B]">
                  Kotak merah
                </p>
                <p className="mt-1 text-2xl" aria-hidden>
                  🤖🤖🤖
                </p>
                <p className="text-sm font-extrabold text-[#1C01A5]">3 robot</p>
              </div>
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-black uppercase text-[#1D4ED8]">
                  Kotak biru
                </p>
                <p className="mt-1 text-2xl" aria-hidden>
                  🤖🤖
                </p>
                <p className="text-sm font-extrabold text-[#1C01A5]">2 robot</p>
              </div>
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, kalau semua robot itu digabungkan dan dimasukkan ke dalam
              satu kotak besar, jumlahnya jadi bertambah banyak ya, Ali?
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Iya, betul! Mari kita hitung bersama setelah digabung. Satu...
              dua... tiga... empat... lima! Sekarang totalnya ada 5 robot!
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🤖🤖🤖🤖🤖
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#1C01A5]">
              3 robot ➕ 2 robot ＝ 5 robot
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Hebat! Jadi, 3 robot ditambah 2 robot sama dengan 5 robot.
            Menjumlahkan itu ternyata cuma menggabungkan benda ya!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚗➕🚗
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
          Infografis: Kotak Gabung (Tambah)
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
            <span>Kelompok 1</span>
            <span>Simbol</span>
            <span>Kelompok 2</span>
            <span>Hasil</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2 bg-[#FFF7ED] px-3 py-4">
            <div>
              <p className="text-2xl leading-none" aria-hidden>
                🚗🚗🚗
              </p>
              <p className="mt-1 text-xs font-black text-[#1C01A5]">3 Mobil</p>
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">➕</p>
            <div>
              <p className="text-2xl leading-none" aria-hidden>
                🚗🚗
              </p>
              <p className="mt-1 text-xs font-black text-[#1C01A5]">2 Mobil</p>
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">＝</p>
          </div>
          <div className="border-t-2 border-[#F0AB00] bg-[#F0FDF4] px-4 py-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Menjadi satu kelompok besar
            </p>
            <p className="mt-2 text-3xl leading-none" aria-hidden>
              🚗🚗🚗🚗🚗
            </p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">5 Mobil</p>
          </div>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#7C3AED] bg-[#F5F3FF] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#6D28D9]">
            Kenalan dengan simbol matematika
          </p>
          <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
            <li>
              Tanda <span className="font-black text-[#1C01A5]">➕</span> disebut{" "}
              <span className="font-black text-[#1C01A5]">PLUS</span> atau{" "}
              <span className="font-black text-[#1C01A5]">DITAMBAH</span>.
            </li>
            <li>
              Tanda <span className="font-black text-[#1C01A5]">＝</span> disebut{" "}
              <span className="font-black text-[#1C01A5]">SAMA DENGAN</span>.
            </li>
          </ul>
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
            3 ➕ 2 ＝ 5
          </p>
        </article>
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🏠🍪
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
              Kantong Ajaib Penjumlahan
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Dua siswa ke depan. Siswa pertama mengisi Kantong A dengan 4
              stik. Siswa kedua mengisi Kantong B dengan 3 stik. Keduanya
              menuang isi kantong ke Kantong C. Seluruh kelas menghitung
              bersama: 4 ➕ 3 ＝ 7.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Alat: dua kantong kecil, satu wadah besar, kelereng atau stik es
              krim.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Camilan Tambah-Tambahan
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Letakkan 2 biskuit di kiri piring dan 3 biskuit di kanan. Minta
              anak menghitung, lalu menggabungkannya di tengah sambil
              mengucapkan: “Dua biskuit ditambah tiga biskuit sama dengan lima
              biskuit!”
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Setelah benar, camilan boleh dimakan sebagai hadiah.
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
          📝➕
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 2: Penjumlahan sampai 10
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
        <LembarEvaluasiMtk2 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB2.id, "D")}
          pertanyaan="Tuliskan satu penjumlahan, misalnya 2 + 3 = 5."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "2 + 3 = 5",
            "2+3=5",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
