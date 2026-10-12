"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { MODUL_MTK3_BAB3 } from "@/lib/modul-resmi-mtk-3-bab3";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function angkaDari(teks: string): string {
  return teks.replace(/\./g, "").replace(/[^\d]/g, "");
}

function Penggaris({ sampai, warna = "#F5C400" }: { sampai: number; warna?: string }) {
  return (
    <div className="mt-3">
      <div className="relative h-8">
        <div
          className="absolute top-1 h-6 rounded-r-full"
          style={{ width: `${(sampai / 12) * 100}%`, background: warna }}
        />
      </div>
      <div className="flex border-t-4 border-[#1C01A5]">
        {Array.from({ length: 13 }, (_, angka) => (
          <span
            key={angka}
            className={`flex-1 border-l border-[#1C01A5]/40 pt-1 text-center text-[10px] font-black ${
              angka === 0 || angka === sampai ? "text-[#1C01A5]" : "text-slate-500"
            }`}
          >
            {angka}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] font-bold text-slate-500">cm</p>
    </div>
  );
}

function Tangga({
  anak,
  satuanAcuan,
}: {
  anak: { lambang: string; nama: string }[];
  satuanAcuan?: string;
}) {
  return (
    <ol className="mt-4 space-y-2">
      {anak.map((item, indeks) => (
        <li key={item.lambang}>
          <div
            className={`rounded-2xl border-2 px-4 py-3 ${
              item.lambang === satuanAcuan
                ? "border-[#F0AB00] bg-[#FFF8E8]"
                : "border-[#1C01A5]/15 bg-[#F8F7FF]"
            }`}
          >
            <p className="text-lg font-black text-[#1C01A5]">{item.lambang}</p>
            <p className="text-sm font-semibold text-slate-700">
              {item.nama}
              {item.lambang === satuanAcuan ? " · satuan acuan" : ""}
            </p>
          </div>
          {indeks < anak.length - 1 ? (
            <p className="py-1 text-center text-sm font-black text-[#1C01A5]">⬇️ × 10</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function PilihKartu({
  kode,
  butir,
}: {
  kode: "B" | "C";
  butir: { soal: string; pilihan: string[]; benar: string }[];
}) {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ</p>
      {butir.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK3_BAB3.id, kode, indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article key={item.soal} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-semibold text-slate-700">{item.soal}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.pilihan.map((opsi) => (
                <button
                  key={opsi}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: opsi }));
                    if (opsi === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
                    ketuk,
                    opsi,
                    item.benar,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  {opsi}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis status={status} cuplikan={ketuk || undefined} pesanSalah="Coba pilihan yang lain." />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK3_BAB3.id, "D", indeks);
}

function KuisPilih({
  indeks,
  soal,
  pilihan,
  benar,
  anak,
  umpan,
}: {
  indeks: number;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
  umpan: string;
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah="Coba hitung lagi dari titik 0." />
        {status === "benar" ? <p className="mt-2 text-sm font-semibold text-emerald-800">{umpan}</p> : null}
      </div>
    </article>
  );
}

function KuisAngka({
  indeks,
  soal,
  kunci,
  anak,
  umpan,
  placeholder = "__________",
}: {
  indeks: number;
  soal: string;
  kunci: string;
  anak?: ReactNode;
  umpan: string;
  placeholder?: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    if (angkaDari(isi) === kunci) {
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
          inputMode="numeric"
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder={placeholder}
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
        <HasilJawabanKuis status={status} cuplikan={isi.trim() || undefined} pesanSalah="Hitung lagi tangga satuannya." />
        {status === "benar" ? <p className="mt-2 text-sm font-semibold text-emerald-800">{umpan}</p> : null}
      </div>
    </article>
  );
}

function TaliJemuran() {
  const kuis = useKuisMateri();
  const id = idEvaluasi(2);
  const [meter, setMeter] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    if (angkaDari(meter) === "200" && angkaDari(total) === "245") {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        3. Tali jemuran Ibu panjangnya 2 m 45 cm. Berapa panjang totalnya dalam sentimeter?
      </p>
      <div className="mt-3 space-y-2 text-sm font-bold text-[#1C01A5]">
        <label className="flex flex-wrap items-center gap-2">
          2 m =
          <input
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
            inputMode="numeric"
            className="w-28 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="..."
          />
          cm
        </label>
        <p>45 cm = 45 cm</p>
        <label className="flex flex-wrap items-center gap-2">
          Total =
          <input
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            inputMode="numeric"
            className="w-28 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="..."
          />
          cm
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
          cuplikan={[meter, total].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Ubah 2 m menjadi sentimeter, lalu tambah 45."
        />
        {status === "benar" ? (
          <p className="mt-2 text-sm font-semibold text-emerald-800">
            Hebat! 2 m = 200 cm. Ditambah 45 cm menjadi 245 cm.
          </p>
        ) : null}
      </div>
    </article>
  );
}

function Refleksi() {
  const [centang, setCentang] = useState<Record<string, boolean>>({});
  const butir = [
    ["ukur", "📏 Aku bisa mengukur panjang benda menggunakan penggaris dari titik 0."],
    ["ubah", "🔁 Aku bisa mengubah satuan meter (m) menjadi sentimeter (cm)."],
    ["jarum", "⚖️ Aku tahu cara membaca timbangan jarum dengan benar."],
    ["kilo", "🍪 Aku tahu bahwa 1 kilogram sama dengan 1.000 gram."],
  ] as const;
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">Refleksi capaian diri</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Centang kemampuan yang sudah kamu kuasai.</p>
      <div className="mt-3 grid gap-2">
        {butir.map(([id, teks]) => (
          <label key={id} className="flex items-start gap-2 text-sm font-bold text-[#1C01A5]">
            <input
              type="checkbox"
              checked={Boolean(centang[id])}
              onChange={(e) => setCentang((sebelum) => ({ ...sebelum, [id]: e.target.checked }))}
              className="mt-1 h-4 w-4"
            />
            {teks}
          </label>
        ))}
      </div>
    </div>
  );
}

function LembarKerja() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );
  return (
    <div className="mt-5 space-y-4">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-2">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
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
      <KuisPilih
        indeks={0}
        soal="1. Krayon Edo berpangkal di angka 0 dan ujungnya di angka 8 cm. Berapa panjang krayon itu?"
        benar="C"
        umpan="Panjang dihitung dari titik akhir dikurangi titik awal: 8 cm − 0 cm = 8 cm."
        pilihan={[
          { huruf: "A", teks: "6 cm" },
          { huruf: "B", teks: "7 cm" },
          { huruf: "C", teks: "8 cm" },
          { huruf: "D", teks: "10 cm" },
        ]}
        anak={
          <div>
            <p className="text-2xl" aria-hidden>
              🖍️
            </p>
            <Penggaris sampai={8} warna="#E23B3B" />
          </div>
        }
      />
      <KuisAngka
        indeks={1}
        soal="2. Pita Siti sepanjang 3 meter. Berapa sentimeter panjang pita itu?"
        kunci="300"
        umpan="Tepat sekali! 1 m = 100 cm, maka 3 m = 3 × 100 = 300 cm."
        anak={
          <p className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">
            3 m ⬇️ turun 2 langkah × 100 → … cm
          </p>
        }
      />
      <TaliJemuran />
      <KuisPilih
        indeks={3}
        soal="4. Jarum timbangan beras berhenti tepat di angka 4 kg. Berapa gram berat beras itu?"
        benar="C"
        umpan="1 kg = 1.000 g. Jadi 4 kg = 4 × 1.000 g = 4.000 g."
        pilihan={[
          { huruf: "A", teks: "40 gram" },
          { huruf: "B", teks: "400 gram" },
          { huruf: "C", teks: "4.000 gram" },
          { huruf: "D", teks: "40.000 gram" },
        ]}
      />
      <KuisAngka
        indeks={4}
        soal="5. Dayu membeli 500 gram gula dan 500 gram tepung. Berapa kilogram total belanjaannya?"
        kunci="1"
        placeholder="... kg"
        umpan="Keren! 500 g + 500 g = 1.000 g. Karena 1.000 g = 1 kg, totalnya 1 kg."
        anak={
          <p className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">
            500 g + 500 g = 1.000 g = … kg
          </p>
        }
      />
      <Refleksi />
    </div>
  );
}

const ALAT_PANJANG = [
  ["📏", "Penggaris", "Pensil, penghapus, buku tulis", "cm dan mm"],
  ["📐", "Meteran pita", "Lingkar badan atau kain", "cm"],
  ["🛠️", "Meteran saku", "Meja, pintu, dan jendela", "m dan cm"],
  ["🏗️", "Meteran rol", "Lapangan, kelas, atau jalan", "m"],
] as const;

const ALAT_BERAT = [
  ["⚖️", "Timbangan pasar", "Anak timbangan 1 kg dan 500 g"],
  ["🥬", "Timbangan duduk", "Sayur, buah, atau daging"],
  ["🧁", "Timbangan digital", "Tepung dan gula, sampai gram"],
  ["🧍", "Timbangan badan", "Berat tubuh di UKS"],
] as const;

export default function NaskahMtk3Bab3({
  kelas = "3 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK3_BAB3;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📏📐🛠️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Pengukuran Panjang dan Berat</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">🎯 Aku bisa memilih alat ukur panjang dan berat yang tepat.</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">🎯 Aku bisa mengukur dari angka 0 dan membaca jarum timbangan.</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">🎯 Aku bisa mengubah satuan panjang dan berat dengan tangga × 10.</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ALAT_PANJANG.map(([ikon, nama, guna, satuan]) => (
            <article key={nama} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3">
              <p className="text-2xl" aria-hidden>
                {ikon}
              </p>
              <p className="mt-1 text-sm font-black text-[#1C01A5]">{nama}</p>
              <p className="text-sm font-semibold text-slate-700">{guna}</p>
              <p className="text-xs font-bold text-[#92400E]">Satuan: {satuan}</p>
            </article>
          ))}
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} hanyaKanvas />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          ✏️📏
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
          Aturan emas: selalu mulai dari angka 0, bukan dari tepi penggaris.
        </p>
        <ol className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
          <li>1. Tempelkan ujung kiri benda tepat di garis angka 0.</li>
          <li>2. Lihat ujung kanan benda berimpit di angka berapa.</li>
          <li>3. Baca nilainya tegak lurus dari atas.</li>
        </ol>
        <div className="mt-4 rounded-2xl border-4 border-[#F0AB00] bg-white px-3 py-3">
          <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Pensil · titik pangkal 0 · titik ujung 10</p>
          <Penggaris sampai={10} />
          <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">Panjang pensil = 10 cm</p>
        </div>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Tangga konversi panjang
        </p>
        <Tangga
          satuanAcuan="m"
          anak={[
            { lambang: "km", nama: "Kilometer" },
            { lambang: "hm", nama: "Hektometer" },
            { lambang: "dam", nama: "Dekameter" },
            { lambang: "m", nama: "Meter" },
            { lambang: "dm", nama: "Desimeter" },
            { lambang: "cm", nama: "Sentimeter" },
            { lambang: "mm", nama: "Milimeter" },
          ]}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl bg-[#EFF6FF] px-4 py-3 text-sm font-semibold text-slate-700">
            <p className="font-black text-[#1C01A5]">⬇️ Turun 1 langkah: × 10</p>
            <p className="mt-1">1 m turun 2 langkah = 100 cm</p>
            <p>2 km turun 3 langkah = 2.000 m</p>
          </article>
          <article className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-semibold text-slate-700">
            <p className="font-black text-[#166534]">⬆️ Naik 1 langkah: ÷ 10</p>
            <p className="mt-1">300 cm naik 2 langkah = 3 m</p>
            <p>5.000 m naik 3 langkah = 5 km</p>
          </article>
        </div>
        <PilihKartu
          kode="B"
          butir={[
            { soal: "1. Pensil dari angka 0 sampai 10. Panjangnya?", pilihan: ["8 cm", "10 cm", "12 cm"], benar: "10 cm" },
            { soal: "2. 1 meter sama dengan berapa sentimeter?", pilihan: ["10 cm", "100 cm", "1.000 cm"], benar: "100 cm" },
            { soal: "3. 2 kilometer sama dengan berapa meter?", pilihan: ["200 m", "2.000 m", "20.000 m"], benar: "2.000 m" },
          ]}
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "B")}
          pertanyaan="Tuliskan satu hubungan, misalnya 1 m = 100 cm."
          alias={kumpulkanAlias(["100", "10 cm", "2000", "2.000"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          ⚖️🥬🧁
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ALAT_BERAT.map(([ikon, nama, guna]) => (
            <article key={nama} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] px-4 py-3">
              <p className="text-2xl" aria-hidden>
                {ikon}
              </p>
              <p className="mt-1 text-sm font-black text-[#1C01A5]">{nama}</p>
              <p className="text-sm font-semibold text-slate-700">{guna}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border-4 border-[#1C01A5]/20 px-4 py-4">
          <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Jarum timbangan</p>
          <div className="mx-auto mt-3 grid max-w-xs grid-cols-3 gap-2 text-center text-sm font-black text-[#1C01A5]">
            <span />
            <span className="rounded-xl bg-[#1C01A5] py-2 text-white">0 kg</span>
            <span />
            <span className="rounded-xl bg-[#F8F7FF] py-2">5 kg</span>
            <span className="rounded-full border-4 border-[#F0AB00] py-2">↻</span>
            <span className="rounded-xl bg-[#F8F7FF] py-2">1 kg</span>
            <span className="rounded-xl bg-[#F8F7FF] py-2">4 kg</span>
            <span className="rounded-xl bg-[#FFF8E8] py-2">3 kg</span>
            <span className="rounded-xl bg-[#F0FDF4] py-2">2 kg</span>
          </div>
          <ol className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
            <li>1. Saat wadah kosong, jarum menunjuk angka 0.</li>
            <li>2. Letakkan benda, misalnya 🍏🍏🍏.</li>
            <li>3. Jarum berputar searah jarum jam.</li>
            <li>4. Jika jarum berhenti di angka 2, beratnya 2 kg.</li>
          </ol>
        </div>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">Tangga satuan berat</p>
        <Tangga
          anak={[
            { lambang: "kg", nama: "Kilogram" },
            { lambang: "hg", nama: "Hektogram, sering disebut ons" },
            { lambang: "dag", nama: "Dekagram" },
            { lambang: "g", nama: "Gram" },
          ]}
        />
        <ul className="mt-4 space-y-1 text-sm font-semibold text-slate-700">
          <li>1 kg ⬇️ × 1.000 = 1.000 g</li>
          <li>1 kg ⬇️ × 10 = 10 ons (hg)</li>
          <li>1 ons ⬇️ × 100 = 100 g</li>
        </ul>
        <PilihKartu
          kode="C"
          butir={[
            { soal: "1. Jarum berhenti di angka 2. Beratnya?", pilihan: ["2 kg", "20 kg", "200 g"], benar: "2 kg" },
            { soal: "2. 1 kilogram sama dengan berapa gram?", pilihan: ["100 g", "1.000 g", "10 g"], benar: "1.000 g" },
            { soal: "3. 1 ons sama dengan berapa gram?", pilihan: ["10 g", "100 g", "1.000 g"], benar: "100 g" },
          ]}
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "C")}
          pertanyaan="Tuliskan satu hubungan berat, misalnya 1 kg = 1.000 g."
          alias={kumpulkanAlias(["1000", "1.000", "100", "2 kg"])}
          konteks={kartuC.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📏⚖️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Latihan dan evaluasi · Pengukuran Panjang dan Berat</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban, misalnya 8 cm atau 300."
          alias={kumpulkanAlias(["8", "300", "245", "4000", "4.000", "1"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
