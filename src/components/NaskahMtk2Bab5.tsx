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
import { MODUL_MTK2_BAB5 } from "@/lib/modul-resmi-mtk-2-bab5";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB5.id, "D", indeks);
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
          pesanSalah="Coba kurangi jumlah temannya berulang sampai habis."
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

function JurnalBerbagiAdil() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru, sekarang aku bisa membagi makanan dengan adil kepada temanku!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung menghitung berapa kali angka pengurangannya muncul." },
    { id: "susah", ikon: "😢", teks: "Aku masih butuh bantuan tutor untuk menghitung mundur sampai angka 0." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar membagi permen secara adil hari ini? Ketuk satu wajah.
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

function LembarEvaluasiBerbagiAdil() {
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
          soal='1. Edo punya 15 permen untuk 3 teman. Ia menulis 15 - 5 - 5 - 5 = 0, jadi 15 ÷ 3 = 5. Udin bilang seharusnya dikurangi 3 berulang, bukan 5. Siapa yang paling tepat?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Edo benar, karena hasil akhirnya toh sama-sama habis menjadi 0." },
            {
              huruf: "B",
              teks: "Udin benar, karena angka pengurangan harus menunjukkan jumlah orang yang menerima permen (wadahnya), yaitu angka 3.",
            },
            { huruf: "C", teks: "Kedua anak tersebut salah semuanya." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Ibu membagi seluruh permen kepada 5 anak. Tiap anak mendapat 4 butir, habis tanpa sisa. Berapa permen di kantong semula?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "9 butir permen" },
            { huruf: "B", teks: "20 butir permen" },
            { huruf: "C", teks: "1 butir permen" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Empat kantong sama banyak jumlahnya 20 permen. Kalimat pembagian untuk isi satu kantong..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "20 ÷ 4 = 5" },
            { huruf: "B", teks: "20 ÷ 5 = 4" },
            { huruf: "C", teks: "4 ÷ 20 = 5" },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              🛍️ + 🛍️ + 🛍️ + 🛍️ = 20
            </p>
          }
        />
        <KuisPilih
          indeks={3}
          soal="4. Lani punya 18 permen karet ke 6 kotak sama banyak sampai habis. Pengurangan berulang yang paling tepat..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "18 - 6 - 6 - 6 = 0" },
            { huruf: "B", teks: "18 - 3 - 3 - 3 - 3 - 3 - 3 = 0" },
            { huruf: "C", teks: "18 - 9 - 9 = 0" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Cerita A: 24 permen untuk 4 anak. Cerita B: 24 permen untuk 6 anak. Pernyataan yang paling tepat..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Anak pada Cerita A mendapatkan permen lebih banyak daripada anak pada Cerita B." },
            { huruf: "B", teks: "Anak pada Cerita B mendapatkan permen lebih banyak daripada anak pada Cerita A." },
            { huruf: "C", teks: "Setiap anak pada Cerita A dan Cerita B mendapatkan jumlah permen yang sama persis." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Ubah 32 - 8 - 8 - 8 - 8 = 0 menjadi kalimat pembagian."
          alias={["32 ÷ 8", "32:8", "32 / 8"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Dodi punya 12 permen cokelat dan 8 permen stroberi. Dibagi kepada 4 teman secara adil. Berapa total campuran tiap anak?"
          alias={["5"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              12 cokelat + 8 stroberi, dibagi 4 teman
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. (1) 16 permen ke 8 stoples. (2) 16 permen ke 2 stoples. Pasangkan dengan A 16 ÷ 2 = 8 atau B 16 ÷ 8 = 2."
          alias={["1b", "1 b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. 16 ÷ 2 = 8</p>
              <p>B. 16 ÷ 8 = 2</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko punya 15 permen. Ia makan 3 dulu, sisanya dibagi 3 adik sama banyak. Berapa yang didapat tiap adik?"
          alias={["4"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              15 − 3, lalu bagi 3
            </p>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Tuliskan dua bentuk pembagian berbeda yang sama-sama hasilnya 3."
          alias={["3"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              ______ ÷ ______ = 3 dan ______ ÷ ______ = 3
            </p>
          }
        />
      </section>
    </div>
  );
}

function AktivitasDetektifBagi() {
  const kuis = useKuisMateri();
  const [mula, setMula] = useState("");
  const [kurang, setKurang] = useState("");
  const [kali, setKali] = useState("");
  const [hasil, setHasil] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okMula = ["10", "sepuluh"].includes(mula.trim().toLowerCase());
    const okKurang = ["2", "dua"].includes(kurang.trim().toLowerCase());
    const okKali = ["5", "lima"].includes(kali.trim().toLowerCase());
    const rapat = hasil.trim().toLowerCase().replace(/\s+/g, "").replace(/:|÷|\//g, "÷");
    const okHasil = rapat.includes("10÷2=5") || rapat === "5" || rapat.includes("10÷2");
    if (okMula && okKurang && okKali && okHasil) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB5.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB5.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB5.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Detektif Pembagian Adil</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bagi 10 permen kepada 2 anak sampai habis. Kurangi 2 berulang, lalu tulis pembagiannya.
      </p>
      <div className="mt-3 rounded-xl bg-white px-3 py-3">
        <IkonUlang ikon="🍬" jumlah={10} />
        <p className="text-xs font-bold text-[#1C01A5]">10 permen cokelat untuk 2 anak</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Jumlah semua permen mula-mula
          <input
            value={mula}
            onChange={(e) => setMula(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Dikurangi angka berapa (banyaknya anak)
          <input
            value={kurang}
            onChange={(e) => setKurang(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          10 − 2 − 2 − 2 − 2 − 2 = 0. Berapa kali angka 2 muncul?
          <input
            value={kali}
            onChange={(e) => setKali(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Kalimat pembagian (semua ÷ wadah)
          <input
            value={hasil}
            onChange={(e) => setHasil(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="10 ÷ 2 = 5"
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
          cuplikan={[mula, kurang, kali, hasil].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Kurangi 2 sebanyak 5 kali: 10 ÷ 2 = 5."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBagi() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "12 − 3 − 3 − 3 − 3 = 0", label: "12 permen untuk 3 anak", benar: "4" },
    { gambar: "10 − 2 − 2 − 2 − 2 − 2 = 0", label: "10 permen untuk 2 anak", benar: "5" },
    { gambar: "Pembagian habis jika sisanya...", label: "Rahasia adil", benar: "0" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB5.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi = indeks === 2 ? ["0", "1", "3"] : ["4", "5", "6"];
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
                pesanSalah="Coba hitung berapa kali dikurangi sampai 0."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab5({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB5;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🍬🤝
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
            🎯 Aku bisa memahami konsep pembagian sebagai pengurangan berulang sampai habis (nol).
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa membagi permen secara adil kepada teman-teman tanpa ada yang tersisa.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Berbagi Permen Ulang Tahun
            </p>
            <GambarCerita src="/doodle-mtk/mtk-2-bab5-cerita.jpg" alt="Ada 12 permen untuk Sani dan tiga sahabat." />
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Sani membuka kantong berisi 12 permen. Tiga sahabat datang berkunjung. Sani ingin
              semua mendapat sama rata, dan permen di tangannya habis tidak bersisa.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">12 permen · 3 sahabat</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Aduh, bagaimana ya caranya agar aku bisa membagikan 12 permen ini secara adil kepada
              3 temanku?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani melakukan trik matematika adil!
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
          🍬➗🤝
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
          Infografis: Kurangi Terus Sampai Habis
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Ke-1", "9"],
            ["Ke-2", "6"],
            ["Ke-3", "3"],
            ["Ke-4", "0"],
          ].map(([putaran, sisa]) => (
            <div key={putaran} className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF7ED] px-2 py-3 text-center">
              <p className="text-xs font-black uppercase text-[#92400E]">{putaran}</p>
              <p className="mt-1 text-xl">🍬🍬🍬</p>
              <p className="text-xs font-bold text-slate-600">ambil 3</p>
              <p className="text-lg font-black text-[#1C01A5]">sisa {sisa}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Keliling</span>
            <span>Dihitung</span>
            <span>Sisa</span>
          </div>
          {[
            ["Mula-mula", "12", "12"],
            ["Ke-1", "12 − 3", "9"],
            ["Ke-2", "9 − 3", "6"],
            ["Ke-3", "6 − 3", "3"],
            ["Ke-4", "3 − 3", "0"],
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
        <p className="mt-4 rounded-2xl bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
          12 − 3 − 3 − 3 − 3 = 0 → 4 kali → 12 ÷ 3 = 4
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            ✍️ Rumus kotak rahasia
          </p>
          <div className="grid grid-cols-3 px-3 py-4 text-center text-sm font-bold">
            <span>Semua permen</span>
            <span>÷</span>
            <span>Banyak teman</span>
          </div>
          <div className="grid grid-cols-3 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-3xl font-black text-[#1C01A5]">
            <span>12</span>
            <span>÷</span>
            <span>3</span>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            12 ÷ 3 = 4
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Pengurangan berulang sampai habis disebut pembagian. Angka yang dikurangi berulang
            adalah jumlah orang yang menerima, bukan hasil tiap orang.
          </p>
        </article>
        <KuisMencocokkanBagi />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB5.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 12 ÷ 3 = 4."
          alias={kumpulkanAlias(["12 ÷ 3 = 4", "10 ÷ 2 = 5", "0"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🍬➗
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
        <AktivitasDetektifBagi />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalBerbagiAdil />
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
          Tantangan Para Juara · Fondasi Pembagian Dasar
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
        <LembarEvaluasiBerbagiAdil />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB5.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 20 atau 4."
          alias={kumpulkanAlias(["3", "20", "5", "4", "32 ÷ 8"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
