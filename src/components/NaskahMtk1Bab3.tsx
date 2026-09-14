"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB3 } from "@/lib/modul-resmi-mtk-1-bab3";
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
  return idKuisKartuResmi(MODUL_MTK1_BAB3.id, "D", indeks);
}

function KuisSisa({
  indeks,
  judul,
  cerita,
  gambar,
  rumus,
  benar,
}: {
  indeks: number;
  judul: string;
  cerita: string;
  gambar: string;
  rumus: string;
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [jawab, setJawab] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    if (jawab.trim() === benar) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">{cerita}</p>
      <p className="mt-2 text-2xl leading-relaxed">{gambar}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-black text-[#1C01A5]">{rumus}</span>
        <input
          value={jawab}
          onChange={(e) => setJawab(e.target.value)}
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
          cuplikan={jawab.trim() || undefined}
          pesanSalah="Cek lagi sisanya."
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
  { soal: "9 ➖ 5 ＝", benar: "4" },
  { soal: "6 ➖ 4 ＝", benar: "2" },
  { soal: "10 ➖ 3 ＝", benar: "7" },
] as const;

const JAWAB_COCOK = ["2", "7", "4"] as const;

function KuisCocokKurang() {
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
          Soal pengurangan
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

function LembarEvaluasiMtk3() {
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
          Kelompok A: Hitung Sisa Benda
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Hitunglah jumlah seluruh benda, coret benda yang dikurangi, lalu
          tuliskan sisanya.
        </p>
        <KuisSisa
          indeks={0}
          judul="1. Kotak Ikan"
          cerita="Ada 4 ikan berenang. 1 ikan berenang pergi."
          gambar="🐟🐟🐟❌"
          rumus="4 ➖ 1 ＝"
          benar="3"
        />
        <KuisSisa
          indeks={1}
          judul="2. Kotak Bunga"
          cerita="Ada 6 bunga mekar. 3 bunga dipetik."
          gambar="🌸🌸🌸❌❌❌"
          rumus="6 ➖ 3 ＝"
          benar="3"
        />
        <KuisSisa
          indeks={2}
          judul="3. Kotak Es Krim"
          cerita="Ada 5 es krim. 2 es krim mencair."
          gambar="🍦🍦🍦❌❌"
          rumus="5 ➖ 2 ＝"
          benar="3"
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
          soal="1. Perhatikan operasi bilangan 8 ➖ 3 ＝ .... Hasil dari pengurangan di atas adalah..."
          opsi={[
            { kode: "A", teks: "4" },
            { kode: "B", teks: "5" },
            { kode: "C", teks: "6" },
          ]}
          benar="B"
        />
        <KuisPilihan
          indeks={4}
          soal="2. Nia membawa 7 buah pensil ke sekolah. Di kelas, Nia meminjamkan 2 pensilnya kepada Ali. Sisa pensil di dalam kotak pensil Nia sekarang ada..."
          opsi={[
            { kode: "A", teks: "5 buah" },
            { kode: "B", teks: "6 buah" },
            { kode: "C", teks: "7 buah" },
          ]}
          benar="A"
        />
        <KuisPilihan
          indeks={5}
          soal="3. Tono memiliki 4 buah permen. Dia memakan semua permennya sampai habis. Berapa sisa permen Tono sekarang?"
          opsi={[
            { kode: "A", teks: "4" },
            { kode: "B", teks: "1" },
            { kode: "C", teks: "0" },
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
        <KuisCocokKurang />
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
            <li>Kelompok A: (1) 4 ➖ 1 ＝ 3, (2) 6 ➖ 3 ＝ 3, (3) 5 ➖ 2 ＝ 3</li>
            <li>
              Kelompok B: (1) B. 5, (2) A. 5 buah, (3) C. 0 (karena habis
              dimakan semua)
            </li>
            <li>Kelompok C: 9 ➖ 5 ＝ 4, 6 ➖ 4 ＝ 2, 10 ➖ 3 ＝ 7</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function NaskahMtk1Bab3({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB3;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🍰👜
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
              Nia, aku punya 6 butir kue lapis kecil di dalam kantongku. Kamu
              mau?
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍰🍰🍰🍰🍰🍰
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">6 kue</p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, mau sekali, Ali! Terima kasih banyak ya.
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#9D174D]">
              Nia mengambil 2 kue dan memakannya. 🍰🍰
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Sama-sama, Nia! Hmm, sekarang mari kita hitung kue yang tersisa di
              kantongku. Tadi ada 6, diambil 2... jadi tinggal satu, dua, tiga,
              empat! Tersisa 4 butir kue!
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍰🍰🍰🍰
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#1C01A5]">
              6 kue ➖ 2 kue ＝ 4 kue
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Oh, aku tahu! Berarti kalau diambil atau dimakan, jumlah
            bendanya jadi semakin sedikit ya. Itu namanya pengurangan!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎈➖💥
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
          Infografis: Hitung Sisa (Kurang)
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
            <span>Jumlah awal</span>
            <span>Simbol</span>
            <span>Yang hilang</span>
            <span>Hasil</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2 bg-[#FFF7ED] px-3 py-4">
            <div>
              <p className="text-2xl leading-none" aria-hidden>
                🎈🎈🎈🎈🎈
              </p>
              <p className="mt-1 text-xs font-black text-[#1C01A5]">5 Balon</p>
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">➖</p>
            <div>
              <p className="text-2xl leading-none" aria-hidden>
                💥💥
              </p>
              <p className="mt-1 text-xs font-black text-[#1C01A5]">2 Pecah</p>
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">＝</p>
          </div>
          <div className="border-t-2 border-[#F0AB00] bg-[#F0FDF4] px-4 py-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Sisa balon yang utuh
            </p>
            <p className="mt-2 text-3xl leading-none" aria-hidden>
              🎈🎈🎈
            </p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">3 Balon</p>
          </div>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#7C3AED] bg-[#F5F3FF] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#6D28D9]">
            Kenalan dengan simbol minus
          </p>
          <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
            <li>
              Tanda <span className="font-black text-[#1C01A5]">➖</span> disebut{" "}
              <span className="font-black text-[#1C01A5]">MINUS</span> atau{" "}
              <span className="font-black text-[#1C01A5]">DIKURANG</span>.
            </li>
            <li>
              Tanda <span className="font-black text-[#1C01A5]">＝</span> disebut{" "}
              <span className="font-black text-[#1C01A5]">SAMA DENGAN</span>.
            </li>
          </ul>
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
            5 ➖ 2 ＝ 3
          </p>
        </article>
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🐦🧱
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
              Burung Terbang dari Pohon
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Tempelkan 7 gambar burung di pohon papan tulis. Seorang siswa
              menjadi angin dan mengambil 3 burung seolah terbang pergi.
              Seluruh kelas menghitung bersama: 7 ➖ 3 ＝ 4.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Alat: gambar pohon besar dan 10 gambar burung.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Menara Balok yang Runtuh
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Susun menara dari 8 balok, lalu runtuhkan 4 balok dengan
              hati-hati. Tanya: “Tadi ada 8, diambil 4. Berapa yang masih
              berdiri?”
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Biarkan anak menghitung sisanya sendiri: 8 ➖ 4 ＝ 4.
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
          📝➖
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 3: Pengurangan sampai 10
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
        <LembarEvaluasiMtk3 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB3.id, "D")}
          pertanyaan="Tuliskan satu pengurangan, misalnya 4 - 1 = 3."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "4 - 1 = 3",
            "4-1=3",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
