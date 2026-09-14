"use client";

import { useMemo, useState, type ReactNode } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { MODUL_MTK1_BAB4 } from "@/lib/modul-resmi-mtk-1-bab4";
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
  return idKuisKartuResmi(MODUL_MTK1_BAB4.id, "D", indeks);
}

const WARNA_KUIS = [
  { kode: "merah", label: "Merah", kelas: "bg-red-600 text-white", bentuk: "KUBUS" },
  { kode: "biru", label: "Biru", kelas: "bg-blue-600 text-white", bentuk: "BALOK" },
  { kode: "hijau", label: "Hijau", kelas: "bg-green-600 text-white", bentuk: "BOLA" },
  { kode: "kuning", label: "Kuning", kelas: "bg-yellow-400 text-[#1C01A5]", bentuk: "TABUNG" },
] as const;

function KuisWarnai({
  indeks,
  nama,
  emoji,
  benar,
}: {
  indeks: number;
  nama: string;
  emoji: string;
  benar: (typeof WARNA_KUIS)[number]["kode"];
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [pilih, setPilih] = useState("");
  const status = sudah || pilih === benar ? "benar" : pilih ? "salah" : null;
  const warnaBenar = WARNA_KUIS.find((item) => item.kode === benar);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p
        className={`rounded-xl px-3 py-6 text-center text-5xl ${
          status === "benar" ? warnaBenar?.kelas : "bg-white"
        }`}
        aria-hidden
      >
        {emoji}
      </p>
      <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">{nama}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {WARNA_KUIS.map((item) => (
          <button
            key={item.kode}
            type="button"
            onClick={() => {
              setPilih(item.kode);
              if (item.kode === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-xs font-black ${
              pilih === item.kode || (sudah && item.kode === benar)
                ? item.kode === benar
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
                : item.kelas
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-center text-sm font-black text-emerald-700">BENAR</p>
      ) : status === "salah" ? (
        <p className="mt-2 text-center text-sm font-black text-rose-600">
          Coba warna yang lain.
        </p>
      ) : null}
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
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [pilih, setPilih] = useState("");
  const status = sudah || pilih === benar ? "benar" : pilih ? "salah" : null;

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
            className={`rounded-xl px-4 py-2 text-sm font-black ${
              pilih === item.kode || (sudah && item.kode === benar)
                ? item.kode === benar
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
                : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
            }`}
          >
            {item.kode}. {item.teks}
          </button>
        ))}
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-sm font-black text-emerald-700">BENAR</p>
      ) : status === "salah" ? (
        <p className="mt-2 text-sm font-black text-rose-600">
          Coba pilih jawaban yang lain.
        </p>
      ) : null}
    </article>
  );
}

const SOAL_COCOK = [
  { soal: "🎲 Dadu", benar: "KUBUS" },
  { soal: "📙 Kamus tebal", benar: "BALOK" },
  { soal: "🍊 Jeruk", benar: "BOLA" },
] as const;

const JAWAB_COCOK = ["BALOK", "KUBUS", "BOLA"] as const;

function KuisCocokBentuk() {
  const kuis = useKuisMateri();
  const [pilihSoal, setPilihSoal] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<Record<number, string>>({});

  const hubungkan = (nama: string) => {
    if (pilihSoal === null) return;
    const item = SOAL_COCOK[pilihSoal];
    setPasangan((sebelum) => ({ ...sebelum, [pilihSoal]: nama }));
    if (nama === item.benar) {
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
          const id = idEvaluasi(7 + indeks);
          const sudah = Boolean(kuis?.sudahBenar(id));
          const pilih = pasangan[indeks];
          const status =
            sudah || pilih === item.benar ? "benar" : pilih ? "salah" : null;
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
              <span>{sudah || pilih === item.benar ? item.benar : "•"}</span>
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama bentuk ruang
        </p>
        {JAWAB_COCOK.map((nama) => (
          <button
            key={nama}
            type="button"
            onClick={() => hubungkan(nama)}
            className="w-full rounded-xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] px-3 py-3 text-sm font-black text-[#1C01A5] hover:border-[#1C01A5]"
          >
            • {nama}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiMtk4() {
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
          Kelompok A: Mewarnai Berdasarkan Bentuk
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Warnai kubus merah, balok biru, bola hijau, dan tabung kuning.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KuisWarnai indeks={0} nama="Bola Sepak" emoji="⚽" benar="hijau" />
          <KuisWarnai indeks={1} nama="Kotak Paket" emoji="📦" benar="biru" />
          <KuisWarnai indeks={2} nama="Dadu Angka" emoji="🎲" benar="merah" />
          <KuisWarnai indeks={3} nama="Kaleng" emoji="🛢️" benar="kuning" />
        </div>
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
          soal="1. Benda di bawah ini yang memiliki bentuk ruang berupa Tabung adalah..."
          opsi={[
            { kode: "A", teks: "Kelereng" },
            { kode: "B", teks: "Kaleng susu" },
            { kode: "C", teks: "Buku tulis" },
          ]}
          benar="B"
        />
        <KuisPilihan
          indeks={5}
          soal="2. Perhatikan ciri-ciri benda berikut: Permukaannya bulat, tidak memiliki pojok/sudut, dan sangat mudah menggelinding. Benda tersebut berbentuk..."
          opsi={[
            { kode: "A", teks: "Balok" },
            { kode: "B", teks: "Kubus" },
            { kode: "C", teks: "Bola" },
          ]}
          benar="C"
        />
        <KuisPilihan
          indeks={6}
          soal="3. Lemari pakaian dan kotak tisu panjang di rumah memiliki bentuk ruang yang dinamakan..."
          opsi={[
            { kode: "A", teks: "Balok" },
            { kode: "B", teks: "Tabung" },
            { kode: "C", teks: "Bola" },
          ]}
          benar="A"
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Kelompok C: Menghubungkan Garis
        </h5>
        <p className="text-sm font-semibold text-slate-600">
          Ketuk gambar benda di kiri, lalu ketuk nama bentuk ruang yang cocok di
          kanan.
        </p>
        <KuisCocokBentuk />
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
              Kelompok A: bola sepak hijau, kotak paket biru, dadu merah, kaleng
              kuning
            </li>
            <li>
              Kelompok B: (1) B. Kaleng susu, (2) C. Bola, (3) A. Balok
            </li>
            <li>
              Kelompok C: dadu = kubus, kamus tebal = balok, jeruk = bola
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const BENTUK_RUANG = [
  {
    nama: "KUBUS",
    emoji: "🧱",
    warna: "bg-[#FEE2E2]",
    ciri: "Punya 6 kotak yang sama besar.",
    contoh: "Dadu mainan · Kado kotak",
  },
  {
    nama: "BALOK",
    emoji: "📦",
    warna: "bg-[#DBEAFE]",
    ciri: "Bentuknya panjang seperti lemari.",
    contoh: "Kotak pensil · Penghapus papan",
  },
  {
    nama: "BOLA",
    emoji: "⚽",
    warna: "bg-[#DCFCE7]",
    ciri: "Bulat total dan bisa menggelinding bebas.",
    contoh: "Kelereng · Melon / Jeruk",
  },
  {
    nama: "TABUNG",
    emoji: "🛢️",
    warna: "bg-[#FEF3C7]",
    ciri: "Punya tutup dan alas yang berbentuk bulat.",
    contoh: "Celengan koin · Kaleng susu",
  },
] as const;

export default function NaskahMtk1Bab4({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB4;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🐔✏️📦
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
              Ali, coba lihat celengan ayam yang aku bawa dari rumah ini. Lucu
              ya! Bentuknya gendut seperti botol minum.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🐔🛢️
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#9D174D]">
              Celengan ayam · gendut seperti tabung
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah iya, Nia! Kalau kotak pensil baru milikku ini bentuknya
              panjang dan punya sudut-sudut yang agak tajam di pojoknya.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              ✏️📦
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">
              Kotak pensil · panjang seperti balok
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Eh, Ibu Guru kemarin bilang kalau benda-benda di sekitar kita itu
              punya bentuk ruang yang berbeda-beda, lho. Ada yang bisa
              menggelinding, ada juga yang tidak.
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Benar! Yuk, kita cari tahu nama-nama bentuk ruang untuk mainan
            dan benda-benda yang ada di dalam kelas kita!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🧱📦⚽🛢️
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
          Infografis: Detektif Bentuk Ruang
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
            <span>Nama bentuk</span>
            <span>Ciri khas</span>
            <span>Contoh benda</span>
          </div>
          {BENTUK_RUANG.map((item) => (
            <div
              key={item.nama}
              className={`grid grid-cols-[auto_1fr_1fr] items-center gap-2 border-t border-[#F0AB00]/40 px-3 py-3 ${item.warna}`}
            >
              <div className="min-w-[5.5rem] text-center">
                <p className="text-3xl leading-none" aria-hidden>
                  {item.emoji}
                </p>
                <p className="mt-1 text-xs font-black text-[#1C01A5]">
                  {item.nama}
                </p>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-slate-700 sm:text-sm">
                {item.ciri}
              </p>
              <p className="text-xs font-extrabold text-[#1C01A5] sm:text-sm">
                {item.contoh}
              </p>
            </div>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#7C3AED] bg-[#F5F3FF] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#6D28D9]">
            Tebak seru
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Mengapa bola mudah menggelinding, sedangkan kubus tidak?
          </p>
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">
            Karena permukaan bola melengkung halus tanpa sudut pojok!
          </p>
        </article>
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📦✋🏠
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
              Raba dan Tebak di Dalam Kardus Misteri
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Masukkan dadu besar, kotak susu, bola tenis, dan kaleng soda ke
              dalam kardus yang dilubangi sebesar tangan. Siswa meraba tanpa
              melihat, lalu menebak bentuk ruangnya.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Contoh: “Benda ini bulat dan licin, pasti ini BOLA!”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Berburu Bentuk Ruang di Rumah
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ajak anak berkeliling kamar, ruang tamu, dan dapur. Tantang anak
              mencari 2 benda tabung di dapur atau 1 benda balok di ruang tamu,
              lalu jelaskan cirinya.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Kaleng celengan = tabung. Kotak tisu = balok.
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
          📝📦
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 4: Mengenal Bentuk Ruang
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
        <LembarEvaluasiMtk4 />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB4.id, "D")}
          pertanyaan="Tuliskan satu nama bentuk ruang, misalnya bola atau kubus."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "kubus",
            "balok",
            "bola",
            "tabung",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
