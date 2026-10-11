"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB3 } from "@/lib/modul-resmi-mtk-2-bab3";
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

function IkonUlang({ ikon, jumlah }: { ikon: string; jumlah: number }) {
  return (
    <p className="text-2xl leading-relaxed tracking-tight" aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join("")}
    </p>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB3.id, "D", indeks);
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
          pesanSalah="Coba ingat: wadah di depan, isi di belakang."
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

function JurnalKotakKembar() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Seru banget, ternyata perkalian itu mudah!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung membedakan angka depan (wadah) dan belakang (isi)." },
    { id: "susah", ikon: "😢", teks: "Aku masih butuh bantuan tutor untuk menulis lambang perkalian." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah tahu rahasia menghitung angka kembar hari ini? Ketuk satu
        wajah.
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

function LembarEvaluasiKotakKembar() {
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
          soal='1. Dokter meminta Adi minum obat 3 kali sehari. Tiap kali minum 1 tablet. Beni menulis 1 × 3. Apakah tulisan Beni sudah tepat?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Tepat, karena jumlah obat yang diminum totalnya tetap 3 tablet." },
            {
              huruf: "B",
              teks: "Salah, seharusnya 3 × 1 karena ada 3 waktu minum (wadah) yang masing-masing berisi 1 tablet.",
            },
            { huruf: "C", teks: "Salah, seharusnya 3 + 3 + 3 karena obatnya diminum sebanyak tiga kali." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Siti punya 12 permen untuk dimasukkan ke kantong dengan isi sama rata. Manakah kombinasi yang SALAH dan tidak menghasilkan 12?"
          benar="C"
          pilihan={[
            { huruf: "A", teks: "4 Kantong × 3 Permen" },
            { huruf: "B", teks: "6 Kantong × 2 Permen" },
            { huruf: "C", teks: "5 Kantong × 2 Permen" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Tiga kantong sama banyak jumlahnya 15 permen. Kalimat perkalian yang tepat..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "3 × 5 = 15" },
            { huruf: "B", teks: "5 × 3 = 15" },
            { huruf: "C", teks: "15 × 3 = 5" },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              🛍️ + 🛍️ + 🛍️ = 15
            </p>
          }
        />
        <KuisPilih
          indeks={3}
          soal="4. Lani membeli 5 bungkus permen karet. Setiap bungkus berisi 4 butir. Penjumlahan berulang yang tepat..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "5 + 5 + 5 + 5" },
            { huruf: "B", teks: "4 + 4 + 4 + 4 + 4" },
            { huruf: "C", teks: "5 + 4" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Meja hijau: 2 piring × 6 permen. Meja biru: 4 piring × 3 permen. Pernyataan yang paling tepat..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Permen di Meja Hijau lebih banyak daripada Meja Biru." },
            {
              huruf: "B",
              teks: "Bentuk perkalian dan cerita kedua meja berbeda, tetapi total jumlah permennya sama banyak.",
            },
            { huruf: "C", teks: "Bentuk perkalian dan susunan piring kedua meja sama persis." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Tuliskan bentuk perkalian dari 7 + 7 + 7 + 7 + 7 = 35."
          alias={["5 × 7", "5x7", "5 * 7"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Dodi punya 2 kantong. 10 permen cokelat dan 6 permen stroberi dibagi sama banyak ke 2 kantong. Berapa isi campuran tiap kantong?"
          alias={["8"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              10 cokelat + 6 stroberi, dibagi 2 kantong
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. Pasangkan: (1) 5 anak masing-masing 4 permen. (2) 4 bungkus masing-masing 5 permen. Tuliskan huruf A atau B untuk kisah 1 dan 2."
          alias={["b", "a"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. 4 × 5 = 20</p>
              <p>B. 5 × 4 = 20</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko punya 3 kantong, tiap kantong 6 permen. Satu kantong bolong, 2 permen jatuh. Berapa sisa permen yang aman?"
          alias={["16"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              3 × 6, lalu kurang 2
            </p>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Tuliskan dua bentuk perkalian berbeda yang sama-sama hasilnya 8."
          alias={["2", "4", "8", "1"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              ______ × ______ = 8 dan ______ × ______ = 8
            </p>
          }
        />
      </section>

    </div>
  );
}

function AktivitasDetektifKantong() {
  const kuis = useKuisMateri();
  const [kembar, setKembar] = useState("");
  const [wadah, setWadah] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [kali, setKali] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okKembar = ["4", "empat"].includes(kembar.trim().toLowerCase());
    const okWadah = ["4", "empat"].includes(wadah.trim().toLowerCase());
    const okJumlah = jumlah.trim() === "16";
    const rapatKali = kali.trim().toLowerCase().replace(/\s+/g, "").replace(/x|×|\*/g, "x");
    const okKali = rapatKali.includes("4x4=16") || rapatKali === "16" || rapatKali === "4x4";
    if (okKembar && okWadah && okJumlah && okKali) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB3.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB3.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB3.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Detektif Kantong Hadiah</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Hitung jumlah kantong dulu, lalu isi tiap kantong. Ubah menjadi kalimat perkalian.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {["A", "B", "C", "D"].map((huruf) => (
          <div key={huruf} className="rounded-xl bg-white px-3 py-3 text-center">
            <p className="text-[10px] font-black uppercase text-[#1C01A5]">Kantong {huruf}</p>
            <IkonUlang ikon="🍬" jumlah={4} />
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Angka kembar yang selalu muncul
          <input
            value={kembar}
            onChange={(e) => setKembar(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa banyak kantong
          <input
            value={wadah}
            onChange={(e) => setWadah(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          4 + 4 + 4 + 4 =
          <input
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Kalimat perkalian (wadah × isi)
          <input
            value={kali}
            onChange={(e) => setKali(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="4 × 4 = 16"
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
          cuplikan={[kembar, wadah, jumlah, kali].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung lagi: 4 kantong, tiap kantong 4 permen."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanPerkalian() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "🍽️🍬🍬 + 🍽️🍬🍬 + 🍽️🍬🍬", label: "3 piring × 2 permen", benar: "6" },
    { gambar: "🛍️🍬🍬🍬🍬 × 4 kantong", label: "4 kantong × 4 permen", benar: "16" },
    { gambar: "3 × 2 ceritanya...", label: "Posisi angka", benar: "3 piring isi 2" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke artinya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB3.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 2 ? ["2 piring isi 3", "3 piring isi 2", "6 piring isi 1"] : ["6", "12", "16"];
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
                pesanSalah="Coba jawaban yang lain."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab3({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB3;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🍽️🍬
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
            🎯 Aku bisa memahami konsep perkalian sebagai penjumlahan berulang dari angka yang sama
            (kembar).
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengubah cerita permen menjadi kalimat matematika perkalian dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Tamu Ulang Tahun Sani
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Tiga sahabat Sani datang bermain. Sani ingin menyuguhkan permen dengan adil. Ia
              mengambil 3 piring kecil, lalu memasukkan 2 butir permen ke tiap piring.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {["1", "2", "3"].map((nomor) => (
                <div key={nomor} className="rounded-xl bg-white px-3 py-2 text-center">
                  <p className="text-[10px] font-black uppercase text-[#1C01A5]">Piring {nomor}</p>
                  <p className="mt-1 text-2xl">🍽️🍬🍬</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
              Sani menghitung pelan-pelan: “Dua ditambah dua, lalu ditambah dua lagi...”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Duh, kalau tamunya ada banyak sekali, pasti lelah menghitung tambah-tambah terus.”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani melihat trik rahasia menghitung permen yang isinya kembar!
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
          🍽️✖️🍬
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
          Infografis: Penjumlahan Berulang Angka Kembar
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Piring 1</span>
            <span>Piring 2</span>
            <span>Piring 3</span>
          </div>
          <div className="grid grid-cols-3 bg-[#FFF7ED] px-3 py-4 text-center text-2xl">
            <span>🍬🍬</span>
            <span>🍬🍬</span>
            <span>🍬🍬</span>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            2 + 2 + 2 = 6
          </p>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            ✍️ Rumus kotak rahasia
          </p>
          <div className="grid grid-cols-3 px-3 py-4 text-center text-sm font-bold">
            <span>Jumlah wadah</span>
            <span>×</span>
            <span>Isi per wadah</span>
          </div>
          <div className="grid grid-cols-3 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-3xl font-black text-[#1C01A5]">
            <span>3</span>
            <span>×</span>
            <span>2</span>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            3 × 2 = 6
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">⚠️ Rahasia penting</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            3 × 2 artinya ada 3 piring, masing-masing 2 permen. 2 × 3 artinya ada 2 piring,
            masing-masing 3 permen. Totalnya sama 6, tetapi susunan ceritanya berbeda!
          </p>
        </article>
        <KuisMencocokkanPerkalian />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB3.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 3 × 2 = 6."
          alias={kumpulkanAlias(["3 × 2 = 6", "2 + 2 + 2", "wadah", "isi"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🛍️🍬
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
        <AktivitasDetektifKantong />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalKotakKembar />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🍓
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Fondasi Perkalian Dasar
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
        <LembarEvaluasiKotakKembar />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB3.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 3 × 1 atau 16."
          alias={kumpulkanAlias(["3 × 1", "5 × 2", "3 × 5", "5 × 7", "8", "16", "2 × 4"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
