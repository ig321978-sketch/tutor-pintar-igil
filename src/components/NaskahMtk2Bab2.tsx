"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB2 } from "@/lib/modul-resmi-mtk-2-bab2";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB2.id, "D", indeks);
}

function PapanBersusun({
  operasi,
  atas,
  bawah,
  hasil,
  labelAtas,
  labelBawah,
}: {
  operasi: "➕" | "➖";
  atas: [string, string];
  bawah: [string, string];
  hasil?: [string, string];
  labelAtas?: string;
  labelBawah?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <div className="grid grid-cols-2 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        <span>🛍️ Kantong</span>
        <span>🍬 Eceran</span>
      </div>
      <div className="grid grid-cols-2 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span>{atas[0]}</span>
        <span>{atas[1]}</span>
      </div>
      {labelAtas ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelAtas}</p>
      ) : null}
      <div className="grid grid-cols-2 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span>{bawah[0]}</span>
        <span>{bawah[1]}</span>
      </div>
      {labelBawah ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelBawah}</p>
      ) : null}
      <p className="border-t-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
        {operasi}
      </p>
      {hasil ? (
        <div className="grid grid-cols-2 border-t-2 border-[#1C01A5] bg-[#FEF3C7] px-3 py-3 text-center text-3xl font-black text-[#1C01A5]">
          <span>{hasil[0]}</span>
          <span>{hasil[1]}</span>
        </div>
      ) : null}
    </div>
  );
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
          pesanSalah="Coba hitung lagi dari kolom eceran dulu."
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

function JurnalPestaSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Mudah sekali, aku langsung bisa!" },
    { id: "bingung", ikon: "😐", teks: "Butuh latihan sedikit lagi agar teliti." },
    { id: "susah", ikon: "😢", teks: "Masih bingung urutan kanan-kirinya." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar berhitung bersusun hari ini? Ketuk satu wajah.
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

function LembarEvaluasiPestaSani() {
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
          soal="1. Siti menghitung 35 + 23 bersusun seperti di bawah. Udin bilang hasilnya salah. Apa kesalahan Siti?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Siti salah menghitung 3 + 2." },
            {
              huruf: "B",
              teks: "Siti menghitung dari kolom kiri (kantong) dulu, lalu salah menulis hasil eceran.",
            },
            { huruf: "C", teks: "Hasil Siti sudah benar dan tidak ada yang salah." },
          ]}
          anak={<PapanBersusun operasi="➕" atas={["3", "5"]} bawah={["2", "3"]} hasil={["5", "2"]} />}
        />
        <KuisPilih
          indeks={1}
          soal="2. Beni memberi 12 permen kepada Dayu, sisanya 25. Berapa permen Beni mula-mula? (Gunakan operasi kebalikan bersusun.)"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "13 permen" },
            { huruf: "B", teks: "37 permen" },
            { huruf: "C", teks: "38 permen" },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              [ 🛍️🍬 ? ] − 12 = 25
            </p>
          }
        />
        <KuisPilih
          indeks={2}
          soal="3. Aku sebuah bilangan. Jika aku ditambahkan 21 secara bersusun, hasilnya 65. Bilangan berapakah aku?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "44" },
            { huruf: "B", teks: "86" },
            { huruf: "C", teks: "45" },
          ]}
          anak={<PapanBersusun operasi="➕" atas={["?", "?"]} bawah={["2", "1"]} hasil={["6", "5"]} />}
        />
        <KuisPilih
          indeks={3}
          soal="4. Di meja ada 46 permen cokelat dan 32 permen stroberi. Jumlah seluruh permen jika dihitung bersusun pendek..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "74" },
            { huruf: "B", teks: "78" },
            { huruf: "C", teks: "14" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Kotak A: 12 + 34. Kotak B: 98 - 53. Pernyataan yang benar..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Hasil Kotak A lebih besar daripada Kotak B." },
            { huruf: "B", teks: "Hasil Kotak A lebih kecil daripada Kotak B." },
            { huruf: "C", teks: "Hasil Kotak A sama besar dengan Kotak B." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Selesaikan perhitungan bersusun 75 − 41."
          alias={["34"]}
          anak={<PapanBersusun operasi="➖" atas={["7", "5"]} bawah={["4", "1"]} />}
        />
        <KuisIsian
          indeks={6}
          soal="7. Lani punya 56 permen. Edo diberi 12, Tono diberi 23. Berapa sisa permen Lani setelah dibagikan kepada kedua temannya?"
          alias={["21"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              56 − 12, lalu kurangkan lagi 23
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. Lihat grafik permen Sani. Setiap jam permennya berkurang sebanyak berapa?"
          alias={["12", "dua belas"]}
          anak={
            <div className="space-y-2 rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-3">
              {[
                { jam: "07.00", jumlah: 48, lebar: "100%" },
                { jam: "08.00", jumlah: 36, lebar: "75%" },
                { jam: "09.00", jumlah: 24, lebar: "50%" },
              ].map((baris) => (
                <div key={baris.jam} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2">
                  <span className="text-xs font-black text-[#1C01A5]">{baris.jam}</span>
                  <div className="h-6 rounded-md bg-[#FEF3C7]">
                    <div
                      className="h-6 rounded-md bg-[#F0AB00]"
                      style={{ width: baris.lebar }}
                    />
                  </div>
                  <span className="text-sm font-black text-[#1C01A5]">{baris.jumlah}</span>
                </div>
              ))}
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Tentukan angka misteri bintang dan matahari agar 🌟7 + 2☀️ = 89."
          alias={["6", "2"]}
          anak={<PapanBersusun operasi="➕" atas={["🌟", "7"]} bawah={["2", "☀️"]} hasil={["8", "9"]} />}
        />
        <KuisIsian
          indeks={9}
          soal="10. Riko punya 45 permen eceran, lalu beli 14. Ia bungkus semua ke kantong besar (10 permen). Tulis jumlah kantong dan sisa eceran."
          alias={["5", "9"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              45 + 14 = ? → 🛍️ kantong dan 🍬 sisa
            </p>
          }
        />
      </section>

    </div>
  );
}

function AktivitasKasirSani() {
  const kuis = useKuisMateri();
  const [aEceran, setAEceran] = useState("");
  const [aKantong, setAKantong] = useState("");
  const [aHasil, setAHasil] = useState("");
  const [bHasil, setBHasil] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okA =
      aEceran.trim() === "8" && aKantong.trim() === "6" && aHasil.trim() === "68";
    const okB = bHasil.trim() === "24";
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB2.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB2.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB2.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Kasir Toko Permen</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bantu Sani menghitung pesanan. Isi kotak kosong mulai dari kolom eceran.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Soal A · Penjumlahan</p>
          <div className="mt-2">
            <PapanBersusun operasi="➕" atas={["4", "2"]} bawah={["2", "6"]} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="text-xs font-bold text-[#1C01A5]">
              Eceran dulu
              <input
                value={aEceran}
                onChange={(e) => setAEceran(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              />
            </label>
            <label className="text-xs font-bold text-[#1C01A5]">
              Kantong
              <input
                value={aKantong}
                onChange={(e) => setAKantong(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              />
            </label>
          </div>
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Jadi, jawabannya adalah
            <input
              value={aHasil}
              onChange={(e) => setAHasil(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              placeholder="______"
            />
          </label>
        </div>
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Soal B · Pengurangan</p>
          <div className="mt-2">
            <PapanBersusun operasi="➖" atas={["5", "8"]} bawah={["3", "4"]} />
          </div>
          <label className="mt-3 block text-xs font-bold text-[#1C01A5]">
            Jadi, jawabannya adalah
            <input
              value={bHasil}
              onChange={(e) => setBHasil(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              placeholder="______"
            />
          </label>
        </div>
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
          cuplikan={[aEceran, aKantong, aHasil, bHasil].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung eceran dulu: 2+6 dan 8-4."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBersusun() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "🛍️🛍️ + 🍬🍬🍬🍬  ➕  🛍️ + 🍬🍬🍬", label: "24 + 13", benar: "37" },
    { gambar: "🛍️🛍️🛍️ + 🍬🍬🍬🍬🍬🍬🍬  ➖  🛍️ + 🍬🍬🍬🍬🍬", label: "37 − 15", benar: "22" },
    { gambar: "Mulai dari kotak paling...", label: "Rahasia sukses", benar: "kanan" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB2.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi = indeks === 2 ? ["kiri", "kanan", "tengah"] : ["22", "37", "68"];
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

export default function NaskahMtk2Bab2({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB2;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🍬🛍️
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
            🎯 Aku bisa menjumlahkan dua bilangan dengan cara bersusun pendek.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengurangkan dua bilangan dengan cara bersusun pendek.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Berbagi Permen dengan Teman
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ingat dulu: 1 kantong besar = 10 permen. Permen di luar kantong = eceran atau satuan.
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Hari ini Sani membawa 2 kantong besar dan 4 permen eceran ke sekolah. Lalu Adi
              memberi 1 kantong besar dan 3 permen eceran. Wah, permen Sani makin banyak!
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🛍️🛍️ 🍬🍬🍬🍬 + 🛍️ 🍬🍬🍬
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Aduh, bagaimana ya cara menghitung total permenku dan sisa permenku setelah
              dibagikan kepada Lani dengan cepat?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani menghitung dengan metode Hitung Bersusun Trik Kantong!
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
          🛍️➕🍬
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
          Infografis: Hitung Bersusun Trik Kantong
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-black text-[#1C01A5]">➕ Penjumlahan bersusun</p>
            <PapanBersusun
              operasi="➕"
              atas={["2", "4"]}
              bawah={["1", "3"]}
              hasil={["3", "7"]}
              labelAtas="Permen Sani (24)"
              labelBawah="Dari Adi (13)"
            />
            <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
              <li>1. Eceran dulu: 4 + 3 = 7</li>
              <li>2. Kantong: 2 + 1 = 3</li>
              <li>Hasil: 37 = tiga puluh tujuh</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-black text-[#1C01A5]">➖ Pengurangan bersusun</p>
            <PapanBersusun
              operasi="➖"
              atas={["3", "7"]}
              bawah={["1", "5"]}
              hasil={["2", "2"]}
              labelAtas="Total Sani (37)"
              labelBawah="Untuk Lani (15)"
            />
            <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
              <li>1. Eceran dulu: 7 − 5 = 2</li>
              <li>2. Kantong: 3 − 1 = 2</li>
              <li>Sisa: 22 = dua puluh dua</li>
            </ul>
          </div>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Rahasia sukses</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Selalu hitung dari kotak paling kanan (permen eceran/satuan), baru bergeser ke kiri
            (kantong besar/puluhan). Jangan sampai terbalik!
          </p>
        </article>
        <KuisMencocokkanBersusun />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB2.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 24 + 13 = 37."
          alias={kumpulkanAlias(["24 + 13 = 37", "37 - 15 = 22", "kanan", "eceran"])}
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
        <AktivitasKasirSani />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalPestaSani />
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
          Tantangan Para Juara · Penjumlahan & Pengurangan Bersusun
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
        <LembarEvaluasiPestaSani />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB2.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 37 atau 44."
          alias={kumpulkanAlias(["37", "44", "78", "34", "21", "12", "6", "5", "9"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
