"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB8 } from "@/lib/modul-resmi-mtk-2-bab8";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function Piktogram({
  judul,
  baris,
  kunci,
}: {
  judul: string;
  baris: { nama: string; ikon: string; jumlah: number }[];
  kunci: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
      <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
        📊 {judul}
      </p>
      {baris.map((item, i) => (
        <div
          key={item.nama}
          className={`grid grid-cols-[7.5rem_1fr] items-center gap-2 border-t border-[#F0AB00]/40 px-3 py-3 ${
            i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
          }`}
        >
          <p className="text-sm font-black text-[#1C01A5]">{item.nama}</p>
          <p className="text-xl tracking-tight" aria-hidden>
            {Array.from({ length: item.jumlah }, () => item.ikon).join(" ")}
          </p>
        </div>
      ))}
      <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-sm font-bold text-[#1C01A5]">
        🔑 {kunci}
      </p>
    </div>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB8.id, "D", indeks);
}

function KuisPilih({
  indeks,
  soal,
  pilihan,
  benar,
  anak,
}: {
  indeks: number;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              item.huruf,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Kalikan jumlah gambar dengan nilai kunci dulu."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  alias,
  anak,
}: {
  indeks: number;
  soal: string;
  alias: string[];
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const rapat = isi.trim().toLowerCase().replace(/\s+/g, " ");
    const ok = alias.some((kata) => rapat.includes(kata.toLowerCase()));
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder="__________"
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
          cuplikan={isi.trim() || undefined}
          pesanSalah="Coba pikirkan lagi dari petunjuknya."
        />
      </div>
    </article>
  );
}

function JurnalPapanSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat asyik, ternyata gambar kecil di tabel ada arti angka besarnya!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung jika harus mengalikan angka kunci selain angka 10." },
    { id: "susah", ikon: "😢", teks: "Aku sering lupa melihat kotak keterangan kunci di bawah tabel." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar membaca papan misteri stiker gambar hari ini? Ketuk satu wajah.
      </p>
      <div className="mt-3 grid gap-2">
        {wajah.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPilih(item.id)}
            className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold ${
              pilih === item.id
                ? "border-[#F0AB00] bg-[#1C01A5] text-white"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            <span className="mr-2 text-2xl" aria-hidden>
              {item.ikon}
            </span>
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiPiktogram() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-2">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="______________________"
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

      <Piktogram
        judul="Diagram Koleksi Kelereng Anak"
        baris={[
          { nama: "Siti", ikon: "🔵", jumlah: 5 },
          { nama: "Dayu", ikon: "🔵", jumlah: 3 },
          { nama: "Beni", ikon: "🔵", jumlah: 4 },
        ]}
        kunci="Setiap 1 🔵 = 2 butir kelereng asli"
      />

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">🍓 Bagian A: Pilihan Ganda</h5>
        <KuisPilih
          indeks={0}
          soal="1. Berapa selisih jumlah kelereng asli Siti dan Dayu?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "2 butir kelereng" },
            { huruf: "B", teks: "4 butir kelereng" },
            { huruf: "C", teks: "6 butir kelereng" },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Beni dan Dayu menggabungkan semua kelerengnya. Total di wadah besar?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "14 butir kelereng" },
            { huruf: "B", teks: "7 butir kelereng" },
            { huruf: "C", teks: "20 butir kelereng" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal='3. Udin melihat 5 stiker Siti lalu bilang "kelereng asli Siti ada 5 butir!" Apakah Udin benar?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena stiker biru di baris Siti memang 5." },
            {
              huruf: "B",
              teks: "Salah, kelereng asli Siti ada 10 butir karena 5 × 2 = 10.",
            },
            { huruf: "C", teks: "Salah, kelereng asli Siti ada 7 butir karena 5 ditambah 2." },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal='4. Hari Minggu ada 4 stiker 🎈. Kunci: setiap 1 🎈 = 10. Total balon asli?'
          benar="A"
          pilihan={[
            { huruf: "A", teks: "40 balon" },
            { huruf: "B", teks: "14 balon" },
            { huruf: "C", teks: "4 balon" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Ada 3 stiker ⭐. Kunci A (1 ⭐ = 5) hasilnya 15. Jika diganti Kunci B (1 ⭐ = 10), nilainya sekarang?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Tetap 15 poin" },
            { huruf: "B", teks: "30 poin" },
            { huruf: "C", teks: "13 poin" },
          ]}
        />
      </section>

      <Piktogram
        judul="Diagram Penjualan Es Krim"
        baris={[
          { nama: "Kamis", ikon: "🍦", jumlah: 2 },
          { nama: "Jumat", ikon: "🍦", jumlah: 4 },
          { nama: "Sabtu", ikon: "🍦", jumlah: 6 },
        ]}
        kunci="Setiap 1 🍦 = 5 cone es krim asli"
      />

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Berapa es krim asli yang terjual pada Hari Jumat?"
          alias={["20"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Pada hari apakah penjualan paling banyak, dan berapa jumlah aslinya? Contoh: Sabtu 30"
          alias={["sabtu"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. (1) Hari Kamis. (2) Hari Sabtu. Pasangkan dengan A 30 cone atau B 10 cone."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. 30 cone es krim</p>
              <p>B. 10 cone es krim</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko punya 20 mobil asli. Setiap 1 🚗 = 5 mobil. Berapa stiker yang harus ditempel?"
          alias={["4"]}
        />
        <KuisIsian
          indeks={9}
          soal="10. Baris Lani ada 3 🍬. Jumlah asli di laci 30 butir. Setiap 1 🍬 bernilai berapa?"
          alias={["10"]}
        />
      </section>
    </div>
  );
}

function AktivitasDetektifDonat() {
  const kuis = useKuisMateri();
  const [cGambar, setCGambar] = useState("");
  const [cKunci, setCKunci] = useState("");
  const [cHasil, setCHasil] = useState("");
  const [sGambar, setSGambar] = useState("");
  const [sHasil, setSHasil] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okCokelat =
      cGambar.trim() === "4" && cKunci.trim() === "5" && cHasil.trim() === "20";
    const okStroberi = sGambar.trim() === "2" && sHasil.trim() === "10";
    if (okCokelat && okStroberi) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB8.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB8.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB8.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Membaca Diagram Toko Roti 🍩</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Hitung gambar di baris, lihat kunci, lalu kalikan.
      </p>
      <div className="mt-3">
        <Piktogram
          judul="Diagram Stok Donat Dapur"
          baris={[
            { nama: "Cokelat", ikon: "🍩", jumlah: 4 },
            { nama: "Stroberi", ikon: "🍩", jumlah: 2 },
          ]}
          kunci="Setiap 1 🍩 = 5 buah donat asli"
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <label className="text-sm font-bold text-[#1C01A5]">
          Gambar donat cokelat
          <input
            value={cGambar}
            onChange={(e) => setCGambar(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Nilai kunci 1 gambar
          <input
            value={cKunci}
            onChange={(e) => setCKunci(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Asli cokelat (4 × 5)
          <input
            value={cHasil}
            onChange={(e) => setCHasil(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="20"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Gambar donat stroberi
          <input
            value={sGambar}
            onChange={(e) => setSGambar(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5] sm:col-span-2">
          Asli stroberi (baris × kunci)
          <input
            value={sHasil}
            onChange={(e) => setSHasil(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="10"
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
          cuplikan={[cGambar, cKunci, cHasil, sGambar, sHasil].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Cokelat 4 × 5 = 20. Stroberi 2 × 5 = 10."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanPiktogram() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Senin 🍬🍬🍬 , kunci 10", label: "Jumlah asli Senin", benar: "30" },
    { gambar: "Selasa 🍬🍬🍬🍬🍬 , kunci 10", label: "Jumlah asli Selasa", benar: "50" },
    { gambar: "Cara hitung jumlah asli", label: "Rumus juara", benar: "gambar × kunci" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB8.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 2
            ? ["gambar + kunci", "gambar × kunci", "hanya hitung gambar"]
            : indeks === 0
              ? ["3", "30", "13"]
              : ["5", "50", "15"];
        return (
          <article key={item.label} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-semibold text-slate-600">{item.gambar}</p>
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {opsi.map((angka) => (
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
                  {angka}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={ketuk || undefined}
                pesanSalah="Kalikan jumlah gambar dengan nilai kunci."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab8({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB8;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒📊🍬
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
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            🎯 Aku bisa membaca data yang ditampilkan dalam bentuk diagram gambar (piktogram) sederhana.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menghitung total jumlah benda berdasarkan nilai simbol atau kunci gambar yang ditentukan.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Catatan Rahasia di Lemari Toko
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Toko Sani buka 3 hari. Sani bosan menulis angka, jadi ia menempel stiker 🍬 di papan nama hari.
              Lani heran bagaimana tahu jumlah aslinya.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              📊🍬🔑
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">Papan stiker · kotak kunci di bawah</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Lani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Wah, lucu sekali papannya! Tapi Sani, bagaimana cara kita tahu jumlah permen yang asli jika
              isinya diganti gambar stiker semua?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Lani membaca papan catatan stiker permen Sani!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📊🍬🔑
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
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuB.pengantar}
        </p>
        <div className="mt-4">
          <Piktogram
            judul="Papan Catatan Penjualan Sani"
            baris={[
              { nama: "Senin", ikon: "🍬", jumlah: 3 },
              { nama: "Selasa", ikon: "🍬", jumlah: 5 },
              { nama: "Rabu", ikon: "🍬", jumlah: 2 },
            ]}
            kunci="Setiap 1 🍬 = 10 butir permen asli"
          />
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            ✍️ Baris × kunci
          </p>
          {[
            ["Senin", "3 × 10", "30"],
            ["Selasa", "5 × 10", "50"],
            ["Rabu", "2 × 10", "20"],
          ].map((baris, i) => (
            <div
              key={baris[0]}
              className={`grid grid-cols-3 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              {baris.map((sel) => (
                <span key={sel}>{sel}</span>
              ))}
            </div>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Selalu kalikan jumlah gambar di baris dengan nilai kunci di bawah. Jika kuncinya berubah, hasil
            perkaliannya juga berubah.
          </p>
        </article>
        <KuisMencocokkanPiktogram />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB8.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 30 atau 3 × 10."
          alias={kumpulkanAlias(["30", "50", "20", "10"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🍩📊
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
        <AktivitasDetektifDonat />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalPapanSani />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🔵
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Diagram Gambar Sederhana
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
        <LembarEvaluasiPiktogram />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB8.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 10 atau 20."
          alias={kumpulkanAlias(["4", "14", "10", "40", "30", "20"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
