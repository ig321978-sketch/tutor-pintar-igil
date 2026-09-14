"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB5 } from "@/lib/modul-resmi-mtk-1-bab5";
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
  return idKuisKartuResmi(MODUL_MTK1_BAB5.id, "D", indeks);
}

const BACA_ANGKA: Record<number, string> = {
  11: "SEBELAS",
  12: "DUA BELAS",
  13: "TIGA BELAS",
  14: "EMPAT BELAS",
  15: "LIMA BELAS",
  16: "ENAM BELAS",
  17: "TUJUH BELAS",
  18: "DELAPAN BELAS",
  19: "SEMBILAN BELAS",
  20: "DUA PULUH",
};

const ANGKA_BELASAN = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

function Bintang({ jumlah }: { jumlah: number }) {
  return (
    <p className="text-lg leading-none tracking-tight sm:text-xl" aria-hidden>
      {Array.from({ length: jumlah }, (_, indeks) => (
        <span key={indeks}>🌟</span>
      ))}
    </p>
  );
}

function KelompokSepuluh() {
  return (
    <div className="rounded-xl border-2 border-[#F0AB00] bg-white px-2 py-2">
      <p className="text-center text-[10px] font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok 10
      </p>
      <div className="mt-1 grid grid-cols-5 gap-y-1 text-center text-base leading-none">
        {Array.from({ length: 10 }, (_, indeks) => (
          <span key={indeks} aria-hidden>
            🌟
          </span>
        ))}
      </div>
    </div>
  );
}

function InfografisBelasan() {
  const [pilih, setPilih] = useState(13);
  const [mundur, setMundur] = useState(false);
  const satuan = pilih - 10;
  const urutan = mundur ? [...ANGKA_BELASAN].reverse() : [...ANGKA_BELASAN];

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setMundur(false)}
          className={`rounded-xl px-4 py-2 text-sm font-black ${
            !mundur
              ? "bg-[#16A34A] text-white"
              : "bg-[#1C01A5]/10 text-[#1C01A5]"
          }`}
        >
          Kereta maju
        </button>
        <button
          type="button"
          onClick={() => setMundur(true)}
          className={`rounded-xl px-4 py-2 text-sm font-black ${
            mundur
              ? "bg-[#C2410C] text-white"
              : "bg-[#1C01A5]/10 text-[#1C01A5]"
          }`}
        >
          Kereta mundur
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {urutan.map((angka, indeks) => (
          <button
            key={angka}
            type="button"
            onClick={() => setPilih(angka)}
            className={`min-w-[3.25rem] flex-none rounded-2xl border-4 px-2 py-3 text-center ${
              pilih === angka
                ? "border-[#F0AB00] bg-[#FFF8E8] text-[#1C01A5]"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-wide">
              {indeks === 0 ? "🚂" : "🚃"}
            </p>
            <p className="mt-1 text-lg font-black">{angka}</p>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
          {pilih} adalah {BACA_ANGKA[pilih]}
        </div>
        <div className="grid gap-3 bg-[#FFF7ED] px-3 py-4 sm:grid-cols-[1fr_auto_1fr_auto]">
          <KelompokSepuluh />
          <p className="self-center text-center text-2xl font-black text-[#1C01A5]">
            ➕
          </p>
          <div className="rounded-xl border-2 border-dashed border-[#1C01A5]/30 bg-[#F0FDF4] px-2 py-2">
            <p className="text-center text-[10px] font-black uppercase tracking-wide text-[#166534]">
              Satuan {satuan}
            </p>
            <div className="mt-2 text-center">
              <Bintang jumlah={satuan} />
            </div>
          </div>
          <p className="self-center text-center text-3xl font-black text-[#1C01A5]">
            ＝ {pilih}
          </p>
        </div>
        <p className="border-t-2 border-[#F0AB00] bg-[#F5F3FF] px-4 py-3 text-center text-sm font-black text-[#1C01A5]">
          10 ➕ {satuan} ＝ {pilih} · {BACA_ANGKA[pilih]}
        </p>
      </div>
      <article className="rounded-2xl border-2 border-[#7C3AED] bg-[#F5F3FF] px-4 py-4">
        <p className="text-sm font-black uppercase tracking-wide text-[#6D28D9]">
          Tips menghitung maju dan mundur
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Maju (makin besar): 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Mundur (makin kecil): 20, 19, 18, 17, 16, 15, 14, 13, 12, 11
        </p>
      </article>
    </div>
  );
}

function KuisIsiAngka({
  indeks,
  judul,
  sebelum,
  opsi,
  benar,
}: {
  indeks: number;
  judul: string;
  sebelum: ReactNode;
  opsi: string[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-black text-[#1C01A5]">
        {sebelum}
        <span
          className={`min-w-[3rem] rounded-xl border-2 border-dashed px-3 py-2 text-center ${
            status === "benar"
              ? "border-emerald-400 bg-emerald-50 text-emerald-800"
              : status === "salah"
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : "border-[#1C01A5]/30 bg-white"
          }`}
        >
          {pilih || "...."}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {opsi.map((angka) => (
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
          pesanSalah="Coba angka yang lain."
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
  { soal: "🍎 11 apel", gambar: "🍎🍎🍎🍎🍎 🍎🍎🍎🍎🍎 🍎", benar: "11" },
  { soal: "🌟 14 bintang", gambar: "🌟🌟🌟🌟🌟 🌟🌟🌟🌟🌟 🌟🌟🌟🌟", benar: "14" },
  { soal: "✏️ 16 pensil", gambar: "✏️✏️✏️✏️✏️ ✏️✏️✏️✏️✏️ ✏️✏️✏️✏️✏️✏️", benar: "16" },
] as const;

const JAWAB_COCOK = ["16", "11", "14"] as const;

function KuisCocokJumlah() {
  const kuis = useKuisMateri();
  const [pilihSoal, setPilihSoal] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<Record<number, string>>({});

  const hubungkan = (angka: string) => {
    if (pilihSoal === null) return;
    const item = SOAL_COCOK[pilihSoal];
    setPasangan((sebelum) => ({ ...sebelum, [pilihSoal]: angka }));
    if (angka === item.benar) {
      kuis?.tandaiBenar(idEvaluasi(7 + pilihSoal));
    }
    setPilihSoal(null);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Gambar benda
        </p>
        {SOAL_COCOK.map((item, indeks) => {
          const pilih = pasangan[indeks];
          const status = statusDariPilihan(pilih ?? "", item.benar);
          return (
            <button
              key={item.soal}
              type="button"
              onClick={() => setPilihSoal(indeks)}
              className={`w-full rounded-xl border-2 px-3 py-3 text-left ${
                pilihSoal === indeks
                  ? "border-[#F0AB00] bg-[#FFF8E8] text-[#1C01A5]"
                  : status === "benar"
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : status === "salah"
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
              }`}
            >
              <p className="text-sm leading-relaxed" aria-hidden>
                {item.gambar}
              </p>
              <p className="mt-1 flex items-center justify-between text-sm font-black">
                <span>{item.soal}</span>
                <span>{pilih || "•"}</span>
              </p>
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Lambang angka
        </p>
        {JAWAB_COCOK.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => hubungkan(angka)}
            className="w-full rounded-xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] px-3 py-3 text-sm font-black text-[#1C01A5] hover:border-[#1C01A5]"
          >
            • {angka}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiMtk5() {
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
          Kelompok A: Lengkapi Angka yang Hilang
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Ketuk angka yang tepat untuk mengisi kotak kosong.
        </p>
        <KuisIsiAngka
          indeks={0}
          judul="1. Hitung maju: setelah 12"
          sebelum={
            <>
              <span>11 → 12 →</span>
            </>
          }
          opsi={["13", "15", "11"]}
          benar="13"
        />
        <KuisIsiAngka
          indeks={1}
          judul="2. Hitung maju: setelah 15"
          sebelum={
            <>
              <span>14 → 15 →</span>
            </>
          }
          opsi={["16", "14", "18"]}
          benar="16"
        />
        <KuisIsiAngka
          indeks={2}
          judul="3. Hitung mundur: setelah 19"
          sebelum={
            <>
              <span>20 → 19 →</span>
            </>
          }
          opsi={["18", "21", "17"]}
          benar="18"
        />
        <KuisIsiAngka
          indeks={3}
          judul="4. Hitung mundur: setelah 16"
          sebelum={
            <>
              <span>17 → 16 →</span>
            </>
          }
          opsi={["15", "14", "18"]}
          benar="15"
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
          indeks={4}
          soal='1. Lambang bilangan dari nama angka "Lima Belas" yang tepat adalah...'
          opsi={[
            { kode: "A", teks: "12" },
            { kode: "B", teks: "15" },
            { kode: "C", teks: "51" },
          ]}
          benar="B"
        />
        <KuisPilihan
          indeks={5}
          soal="2. Di sebuah dahan pohon terdapat 14 ekor burung. Lambang bilangan 14 jika dibaca menjadi..."
          opsi={[
            { kode: "A", teks: "Empat belas" },
            { kode: "B", teks: "Empat puluh" },
            { kode: "C", teks: "Satu empat" },
          ]}
          benar="A"
        />
        <KuisPilihan
          indeks={6}
          soal="3. Perhatikan urutan berikut: 12, 13, ..., 15. Angka yang tepat untuk mengisi titik-titik di tengah adalah..."
          opsi={[
            { kode: "A", teks: "11" },
            { kode: "B", teks: "14" },
            { kode: "C", teks: "16" },
          ]}
          benar="B"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok C: Menghubungkan Garis
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Ketuk gambar benda di kiri, lalu ketuk lambang angka yang cocok di
          kanan.
        </p>
        <KuisCocokJumlah />
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
            <li>
              Kelompok A: (1) 13, (2) 16, (3) 18, (4) 15 — urutan maju 13 dan
              16, mundur 18 dan 15
            </li>
            <li>
              Kelompok B: (1) B. 15, (2) A. Empat belas, (3) B. 14
            </li>
            <li>
              Kelompok C: 11 apel = 11, 14 bintang = 14, 16 pensil = 16
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function NaskahMtk1Bab5({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB5;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍂🍂🍂
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
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Ali, aku sudah mengumpulkan 10 daun kering di dalam genggamanku!
            </p>
            <p className="mt-2 text-xl leading-none" aria-hidden>
              🍂🍂🍂🍂🍂 🍂🍂🍂🍂🍂
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#9D174D]">
              10 daun · satu kelompok penuh
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, banyak sekali, Nia! Aku juga punya 3 daun lagi di tanganku.
              Kalau kita gabungkan semua daun ini, jumlahnya jadi melewati
              angka 10 ya?
            </p>
            <p className="mt-2 text-xl leading-none" aria-hidden>
              🍂🍂🍂
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">
              3 daun lagi
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Benar! Mari kita hitung lanjut setelah angka 10. Sebelas... dua
              belas... tiga belas! Sekarang kita punya 13 daun!
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#166534]">
              10 ➕ 3 ＝ 13 · sebelas, dua belas, tiga belas
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Hore! Ternyata menghitung angka belasan itu mudah ya, tinggal
            melanjutkan hitungan setelah angka 10!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚂🌟🔟
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
          Infografis: Melompat ke Angka Belasan
        </p>
        <p className="mt-2 text-center text-sm font-semibold text-slate-600">
          Ketuk gerbong kereta, lalu lihat kelompok 10 ditambah satuannya.
        </p>
        <InfografisBelasan />
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚂🪜
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
              Kereta Api Nomor Belasan
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Bagikan kartu angka 11 sampai 20. Saat peluit, siswa berbaris
              dari 11 ke 20 sambil mengepakkan tangan seperti roda kereta. Aba-aba
              mundur mengurutkan dari 20 ke 11.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              🚂 11-12-13-14-15-16-17-18-19-20
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Lompat Tangga Angka
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Tulis 11 sampai 20 di anak tangga atau kotak di lantai. Setiap
              lompat, anak menyebut angkanya dengan lantang sampai 20.
            </p>
            <p className="mt-3 grid grid-cols-5 gap-1 text-center text-xs font-black text-[#1C01A5]">
              {ANGKA_BELASAN.map((angka) => (
                <span
                  key={angka}
                  className="rounded-lg bg-white px-1 py-2 shadow-sm"
                >
                  {angka}
                </span>
              ))}
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
          📝🔟
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 5: Bilangan yang Lebih Besar (11 sampai 20)
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
        <LembarEvaluasiMtk5 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB5.id, "D")}
          pertanyaan="Tuliskan satu angka belasan dan cara membacanya, misalnya 13 = tiga belas."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "sebelas",
            "dua belas",
            "tiga belas",
            "dua puluh",
            "11",
            "20",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
