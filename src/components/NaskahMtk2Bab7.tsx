"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import GambarCerita from "@/components/GambarCerita";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB7 } from "@/lib/modul-resmi-mtk-2-bab7";
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

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB7.id, "D", indeks);
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
          pesanSalah="Coba pikirkan: g untuk ringan, kg untuk berat. 1 kg = 1.000 g."
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

function JurnalTimbangan() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru, sekarang aku tahu kenapa benda berukuran besar bisa terasa berat!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung menghitung angka nol yang banyak pada gram." },
    { id: "susah", ikon: "😢", teks: "Aku masih sering tertukar menulis simbol g dan kg." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar melihat angka di jarum timbangan hari ini? Ketuk satu wajah.
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

function LembarEvaluasiTimbangan() {
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
          soal='1. Paket Siti (kantong besar, permen kapas) dan Paket Dayu (kotak kecil, permen koin) sama-sama 1 kg. Beni bilang paket Siti pasti lebih berat karena lebih besar. Apakah Beni benar?'
          benar="C"
          pilihan={[
            { huruf: "A", teks: "Benar, karena benda yang ukurannya besar selalu lebih berat." },
            { huruf: "B", teks: "Salah, Paket Dayu lebih berat karena kotak kayu bahannya lebih keras." },
            {
              huruf: "C",
              teks: "Salah, kedua paket sama berat karena timbangannya sama-sama menunjukkan 1 kg.",
            },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              🎈 Paket Siti 1 kg · 📦 Paket Dayu 1 kg
            </p>
          }
        />
        <KuisPilih
          indeks={1}
          soal="2. Semangka 4 kg dipotong tepat di tengah menjadi 2 bagian sama besar. Berat satu potongan di timbangan?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "2 kg" },
            { huruf: "B", teks: "8 kg" },
            { huruf: "C", teks: "200 g" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. (1) Jeruk manis = 150 g. (2) Ayam potong = 2 kg. (3) Penghapus karet kecil = 5 kg. Mana yang tidak masuk akal?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Nomor (1) saja" },
            { huruf: "B", teks: "Nomor (3) saja" },
            { huruf: "C", teks: "Nomor (2) dan (3)" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Mangkuk stroberi 600 gram digabung mangkuk susu 300 gram. Berat totalnya?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "900 gram" },
            { huruf: "B", teks: "300 gram" },
            { huruf: "C", teks: "90 gram" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Paket Lani 2 kg, Paket Mita 1 kg lebih 500 gram, Paket Dodi 2.500 gram. Urutan dari yang paling ringan..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Paket Mita, Paket Lani, Paket Dodi" },
            { huruf: "B", teks: "Paket Lani, Paket Mita, Paket Dodi" },
            { huruf: "C", teks: "Paket Dodi, Paket Lani, Paket Mita" },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Layar timbangan menunjukkan 2.000 gram. Berat itu dalam kilogram menjadi..."
          alias={["2"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Cokelat bubuk 850 gram. Diambil 200 gram, lalu 350 gram. Berapa sisanya?"
          alias={["300"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              850 − 200 − 350 = ?
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. (1) Berat klip kertas. (2) Berat satu karung beras. Pasangkan dengan A kilogram atau B gram."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. Kilogram (kg)</p>
              <p>B. Gram (g)</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Wadah kosong 100 gram diisi permen 400 gram. Angka di timbangan?"
          alias={["500"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              100 g + 400 g = ?
            </p>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Keranjang plus mangga 7 kg. Keranjang kosong 1 kg. Berat bersih mangganya?"
          alias={["6"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              7 kg − 1 kg = ?
            </p>
          }
        />
      </section>
    </div>
  );
}

function AktivitasPetugasTimbang() {
  const kuis = useKuisMateri();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [ringan, setRingan] = useState("");
  const [berat, setBerat] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const satuan = (isi: string) => isi.trim().toLowerCase().replace(/\s+/g, "");
  const huruf = (isi: string) => isi.trim().toLowerCase().replace(/[^a-d]/g, "");

  const periksa = () => {
    const okSatuan =
      ["g", "gram"].includes(satuan(a)) &&
      ["kg", "kilogram"].includes(satuan(b)) &&
      ["g", "gram"].includes(satuan(c)) &&
      ["kg", "kilogram"].includes(satuan(d));
    const okRingan = huruf(ringan).includes("a") && huruf(ringan).includes("c");
    const okBerat = huruf(berat).includes("b") && huruf(berat).includes("d");
    if (okSatuan && okRingan && okBerat) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB7.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB7.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB7.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Petugas Timbang Toko ⚖️</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Isi stiker satuan yang cocok: g atau kg. Benda ringan pakai g. Benda yang diangkat dua tangan pakai kg.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          (A) 🍭 Lolipop mini ➔ 50
          <input
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="g / kg"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          (B) 🌾 Karung tepung ➔ 25
          <input
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="g / kg"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          (C) 🍫 Cokelat sedang ➔ 100
          <input
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="g / kg"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          (D) 🧍 Berat badan Riko ➔ 28
          <input
            value={d}
            onChange={(e) => setD(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="g / kg"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Ringan dipegang anak 🍭🍫: huruf
          <input
            value={ringan}
            onChange={(e) => setRingan(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="A dan C"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Diangkat dua tangan 🌾🧍: huruf
          <input
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="B dan D"
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
          cuplikan={[a, b, c, d, ringan, berat].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A dan C pakai g. B dan D pakai kg."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBerat() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "🧂 Bungkus garam kecil / 🍬 sebutir permen", label: "Satuan yang cocok", benar: "g" },
    { gambar: "🛍️ Karung gula / 🧍 berat badan Sani", label: "Satuan yang cocok", benar: "kg" },
    { gambar: "1 kilogram disambung dari 1 gram", label: "Rumus lompatan berat", benar: "1.000 g" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB7.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 2 ? ["10 g", "100 g", "1.000 g"] : ["g", "kg", "cm"];
        return (
          <article key={`${item.label}-${item.benar}`} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
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
                pesanSalah="Ingat: g ringan, kg berat, 1 kg = 1.000 g."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab7({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB7;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒⚖️🍬
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
            🎯 Aku bisa mengenal alat ukur berat baku ⚖️ (timbangan) di kehidupan sehari-hari dengan benar.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa membedakan satuan berat standar Gram (g) dan Kilogram (kg) serta hubungannya dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Kantong Gula yang Bocor
            </p>
            <GambarCerita src="/doodle-mtk/mtk-2-bab7-cerita.jpg" alt="Kantong gula lebih berat daripada bungkus garam." />
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Paman membawa kantong gula pasir dan bungkus garam. Sani mengangkat keduanya. Gula terasa mantap
              dan berat, garam terasa sangat enteng.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🛍️🧂⚖️
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">Kantong gula berat · bungkus garam enteng</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Wah! Kantong gula ini terasa mantap dan berat sekali, sedangkan bungkus garam ini terasa sangat
              enteng!”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani menimbang bahan permen menggunakan timbangan ⚖️!
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
          ⚖️🍬🏋️
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
          Infografis: Gram dan Kilogram
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            Bandingkan dua kantong
          </p>
          <div className="grid sm:grid-cols-2">
            <div className="border-b-2 border-[#1C01A5]/10 bg-[#FFF7ED] px-4 py-4 sm:border-b-0 sm:border-r-2">
              <p className="text-xs font-black uppercase text-[#92400E]">Berat · kilogram</p>
              <p className="mt-2 text-4xl">🛍️</p>
              <p className="text-3xl font-black text-[#1C01A5]">kg</p>
              <p className="text-sm font-bold text-slate-700">Karung gula, apel, badan</p>
            </div>
            <div className="bg-[#F0FDF4] px-4 py-4">
              <p className="text-xs font-black uppercase text-[#166534]">Ringan · gram</p>
              <p className="mt-2 text-4xl">🍬</p>
              <p className="text-3xl font-black text-[#1C01A5]">g</p>
              <p className="text-sm font-bold text-slate-700">Permen, garam, kertas</p>
            </div>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            1 kg = 1.000 g
          </p>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Satuan</span>
            <span>Untuk benda</span>
            <span>Contoh</span>
          </div>
          {[
            ["Gram (g)", "Ringan / kecil", "Permen · garam · kertas"],
            ["Kilogram (kg)", "Berat / besar", "Karung gula · apel · badan"],
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
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            ⚖️ Rumus rahasia kantong permen
          </p>
          <p className="px-3 py-4 text-center text-2xl font-black text-[#1C01A5]">1 kg = 1.000 g</p>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-sm font-bold text-[#1C01A5]">
            1.000 benda seberat 1 gram = 1 kilogram
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Benda yang kelihatan lebih besar belum tentu lebih berat. Yang menentukan adalah angka di jarum
            timbangan, bukan ukuran kantongnya.
          </p>
        </article>
        <KuisMencocokkanBerat />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB7.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya g atau 1 kg = 1.000 g."
          alias={kumpulkanAlias(["g", "kg", "1000", "1.000"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️⚖️🍭
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
        <AktivitasPetugasTimbang />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalTimbangan />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⚖️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Pengukuran Berat Standar
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
        <LembarEvaluasiTimbangan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB7.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 2 atau 900."
          alias={kumpulkanAlias(["2", "900", "300", "500", "6"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
