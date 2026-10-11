"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB6 } from "@/lib/modul-resmi-mtk-2-bab6";
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

function PenggarisPita({
  dari,
  sampai,
  maks = 14,
  label,
  warna = "bg-[#DC2626]",
}: {
  dari: number;
  sampai: number;
  maks?: number;
  label: string;
  warna?: string;
}) {
  const angka = Array.from({ length: maks + 1 }, (_, i) => i);
  return (
    <div className="rounded-xl border-2 border-[#1C01A5]/10 bg-white px-2 py-3">
      <p className="text-xs font-black text-[#1C01A5]">{label}</p>
      <div className="relative mt-3 overflow-hidden">
        <div
          className={`absolute top-0 h-5 rounded-sm ${warna}`}
          style={{
            left: `${(dari / maks) * 100}%`,
            width: `${((sampai - dari) / maks) * 100}%`,
          }}
        />
        <div
          className="mt-7 grid"
          style={{ gridTemplateColumns: `repeat(${maks + 1}, minmax(0, 1fr))` }}
        >
          {angka.map((n) => (
            <div key={n} className="text-center">
              <div className="mx-auto h-3 w-px bg-[#1C01A5]" />
              <span className="text-[9px] font-black text-[#1C01A5] sm:text-[10px]">{n}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-1 text-center text-[10px] font-bold text-[#1C01A5]/70">cm</p>
    </div>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB6.id, "D", indeks);
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
          pesanSalah="Coba mulai dari 0, atau hitung selisih angkanya."
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

function JurnalPitaPermen() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru, sekarang aku mau mengukur semua barang di kamarku!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung membedakan kapan memakai satuan cm dan m." },
    { id: "susah", ikon: "😢", teks: "Aku masih sering lupa memulai pengukuran dari angka 0." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar memegang penggaris dan mengukur benda hari ini? Ketuk satu wajah.
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

function LembarEvaluasiPitaPermen() {
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

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">🍓 Bagian A: Pilihan Ganda</h5>
        <KuisPilih
          indeks={0}
          soal='1. Edo mengukur pensil dari angka 3 sampai 10, lalu berteriak "panjangnya 10 cm!" Apakah Edo sudah benar?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena ujung akhir pensil berada tepat di angka 10." },
            {
              huruf: "B",
              teks: "Salah, seharusnya panjang pensil Edo adalah 7 cm karena ia mulai menghitung dari angka 3 (10 dikurangi 3).",
            },
            { huruf: "C", teks: "Salah, seharusnya panjang pensil Edo adalah 13 cm karena angka 3 dan 10 dijumlahkan." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Sani punya pita 1 meter. Dipotong sama rata untuk 2 kotak kado sampai habis. Berapa cm pita tiap kotak?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "50 cm" },
            { huruf: "B", teks: "5 cm" },
            { huruf: "C", teks: "200 cm" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. (1) Permen karet = 2 cm. (2) Tinggi lemari = 2 m. (3) Penggaris guru = 1 cm. Mana yang tidak masuk akal?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Nomor (1) saja" },
            { huruf: "B", teks: "Nomor (3) saja" },
            { huruf: "C", teks: "Nomor (2) dan (3)" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Pita pertama 45 cm digabung pita kedua 30 cm. Berapa panjang totalnya?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "15 cm" },
            { huruf: "B", teks: "75 cm" },
            { huruf: "C", teks: "70 cm" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Tinggi Siti 120 cm, Dayu 1 meter lebih 15 cm, Beni 118 cm. Urutan dari yang paling tinggi..."
          benar="C"
          pilihan={[
            { huruf: "A", teks: "Siti, Dayu, Beni" },
            { huruf: "B", teks: "Dayu, Siti, Beni" },
            { huruf: "C", teks: "Siti, Beni, Dayu" },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Tali 3 meter diubah ke sentimeter menjadi..."
          alias={["300"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Pita Lani 90 cm. Dipotong 25 cm, lalu 35 cm. Berapa sisa pitanya?"
          alias={["30"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              90 − 25 − 35 = ?
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. (1) Panjang sebutir permen koin. (2) Lingkar perut Sani. Pasangkan dengan A meteran rol kain atau B penggaris plastik kecil."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. Meteran rol kain / meteran keliling</p>
              <p>B. Penggaris plastik kecil</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Penggaris Riko 30 cm. Ia menempelkannya 3 kali penuh sepanjang meja. Berapa panjang meja itu?"
          alias={["90"]}
        />
        <KuisIsian
          indeks={9}
          soal="10. Lilin hias tinggi awal 20 cm. Tiap 10 menit berkurang 3 cm. Tinggi sisa setelah 20 menit?"
          alias={["14"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              20 menit = 2 kali 10 menit
            </p>
          }
        />
      </section>
    </div>
  );
}

function AktivitasDetektifStik() {
  const kuis = useKuisMateri();
  const [aKiri, setAKiri] = useState("");
  const [aKanan, setAKanan] = useState("");
  const [aPanjang, setAPanjang] = useState("");
  const [bKiri, setBKiri] = useState("");
  const [bKanan, setBKanan] = useState("");
  const [bPanjang, setBPanjang] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okA =
      ["0", "nol"].includes(aKiri.trim().toLowerCase()) &&
      aKanan.trim() === "12" &&
      aPanjang.trim() === "12";
    const okB =
      bKiri.trim() === "2" && bKanan.trim() === "12" && bPanjang.trim() === "10";
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB6.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB6.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB6.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Membantu Sani Mengecek Ukuran</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Baca ujung kiri dan ujung kanan stik. Kalau tidak mulai dari 0, hitung selisihnya.
      </p>
      <div className="mt-3 space-y-3">
        <PenggarisPita dari={0} sampai={12} label="STIK A" warna="bg-[#F59E0B]" />
        <PenggarisPita dari={2} sampai={12} label="STIK B" warna="bg-[#2563EB]" />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <label className="text-sm font-bold text-[#1C01A5]">
          Stik A: ujung kiri
          <input
            value={aKiri}
            onChange={(e) => setAKiri(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Stik A: ujung kanan
          <input
            value={aKanan}
            onChange={(e) => setAKanan(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Panjang Stik A (cm)
          <input
            value={aPanjang}
            onChange={(e) => setAPanjang(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Stik B: ujung kiri
          <input
            value={bKiri}
            onChange={(e) => setBKiri(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Stik B: ujung kanan
          <input
            value={bKanan}
            onChange={(e) => setBKanan(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Panjang Stik B (cm)
          <input
            value={bPanjang}
            onChange={(e) => setBPanjang(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
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
          cuplikan={[aKiri, aKanan, aPanjang, bKiri, bKanan, bPanjang].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Stik A dari 0 sampai 12. Stik B dari 2 sampai 12, selisihnya 10."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanUkur() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Pita dari 0 sampai 5", label: "Panjang pita Sani", benar: "5 cm" },
    { gambar: "1 meter disambung dari penggaris 1 cm", label: "Rumus lompatan panjang", benar: "100 cm" },
    { gambar: "Ujung kiri benda harus pas di...", label: "Rahasia mengukur", benar: "0" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB6.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 0 ? ["4 cm", "5 cm", "9 cm"] : indeks === 1 ? ["10 cm", "100 cm", "1 cm"] : ["0", "1", "ujung plastik"];
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
                pesanSalah="Ingat: mulai dari 0, dan 1 m = 100 cm."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab6({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB6;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🎀📏
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
            🎯 Aku bisa mengukur panjang benda menggunakan alat ukur baku (penggaris) dengan cara yang benar.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengenal satuan panjang standar Sentimeter (cm) dan Meter (m) serta hubungannya.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Menghias Kantong Permen
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Toko permen Sani ramai. Sani ingin menghias kantong besar dengan pita merah. Kalau dipotong
              asal-asalan, pitanya bisa kependekan atau terbuang sia-sia.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🛍️🎀📏
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">Gulungan pita · penggaris di meja</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Aduh, kalau aku asal potong, nanti pitanya bisa kependekan atau malah kepanjangan dan terbuang
              sia-sia.”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani memakai penggaris untuk mengukur pita secara tepat!
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
          📏🎀📐
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
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Trik Angka 0
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Langkah</span>
            <span>Yang dilakukan</span>
            <span>Ingat</span>
          </div>
          {[
            ["1", "Ujung kiri benda pas di angka 0", "Bukan ujung plastik"],
            ["2", "Tempelkan benda lurus", "Searah penggaris"],
            ["3", "Baca angka di ujung kanan", "Itu panjangnya"],
          ].map((baris, i) => (
            <div
              key={baris[0]}
              className={`grid grid-cols-3 border-t border-[#F0AB00]/40 px-3 py-3 text-center text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              {baris.map((sel) => (
                <span key={sel}>{sel}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <PenggarisPita dari={0} sampai={5} maks={9} label="Pita Sani: ujung kiri di 0, ujung kanan di 5" />
        </div>
        <p className="mt-4 rounded-2xl bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
          Dari 0 sampai 5 → panjang pita = 5 cm
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            🏃‍♂️ Rumus lompatan panjang
          </p>
          <p className="px-3 py-4 text-center text-2xl font-black text-[#1C01A5]">1 m = 100 cm</p>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-sm font-bold text-[#1C01A5]">
            100 penggaris 1 cm yang disambung = 1 meter
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            cm untuk benda pendek seperti pita dan pensil. m untuk benda sangat panjang seperti ruangan atau
            pintu. Kalau tidak mulai dari 0, hitung selisih ujung kanan dikurangi ujung kiri.
          </p>
        </article>
        <KuisMencocokkanUkur />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB6.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 5 cm atau 1 m = 100 cm."
          alias={kumpulkanAlias(["5 cm", "100", "0"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️📏🍭
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
        <AktivitasDetektifStik />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalPitaPermen />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🎀
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Pengukuran Panjang Standar
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
        <LembarEvaluasiPitaPermen />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB6.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 50 atau 300."
          alias={kumpulkanAlias(["7", "50", "75", "300", "30", "90", "14"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
