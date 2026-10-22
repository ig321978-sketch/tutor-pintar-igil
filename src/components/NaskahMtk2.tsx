"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import DoodleKartuAtasJudul from "@/components/DoodleKartuAtasJudul";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KartuModulResmi, ModulResmiPai } from "@/lib/modul-resmi-pai";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import type { KelaminGuru } from "@/lib/guru";
import EvaluasiEkstraBindo2 from "@/components/EvaluasiEkstraBindo2";
import NaskahMtk2Bab1 from "@/components/NaskahMtk2Bab1";
import NaskahMtk2Bab2 from "@/components/NaskahMtk2Bab2";
import NaskahMtk2Bab3 from "@/components/NaskahMtk2Bab3";
import NaskahMtk2Bab4 from "@/components/NaskahMtk2Bab4";
import NaskahMtk2Bab5 from "@/components/NaskahMtk2Bab5";
import NaskahMtk2Bab6 from "@/components/NaskahMtk2Bab6";
import NaskahMtk2Bab7 from "@/components/NaskahMtk2Bab7";
import NaskahMtk2Bab8 from "@/components/NaskahMtk2Bab8";
import NaskahMtk2Bab9 from "@/components/NaskahMtk2Bab9";
import NaskahMtk2Bab10 from "@/components/NaskahMtk2Bab10";
import NaskahMtk2Bab11 from "@/components/NaskahMtk2Bab11";
import NaskahMtk2Bab12 from "@/components/NaskahMtk2Bab12";
import NaskahMtk2Bab13 from "@/components/NaskahMtk2Bab13";
import NaskahMtk2Bab14 from "@/components/NaskahMtk2Bab14";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function DoodleKartuMtk2({
  modulId,
  kode,
  judul,
}: {
  modulId: string;
  kode: string;
  judul: string;
}) {
  return (
    <DoodleKartuAtasJudul
      id={`${modulId}-${kode}`}
      folder="doodle-mtk"
      alt={`Ilustrasi ${judul}`}
    />
  );
}

function InfografisTabel({
  judul,
  kepala,
  baris,
  catatan,
}: {
  judul: string;
  kepala: [string, string, string];
  baris: Array<[string, string, string]>;
  catatan?: string;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
      <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white sm:text-sm">
        Infografis: {judul}
      </p>
      <div className="grid grid-cols-3 gap-2 bg-[#16017a] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
        {kepala.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {baris.map((isi, indeks) => (
        <div
          key={isi.join("-")}
          className={`grid grid-cols-3 gap-2 border-t border-[#F0AB00]/40 px-3 py-3 text-xs font-semibold leading-snug text-slate-700 sm:text-sm ${
            indeks % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
          }`}
        >
          {isi.map((sel) => (
            <p key={sel}>{sel}</p>
          ))}
        </div>
      ))}
      {catatan ? (
        <div className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">
            Cakrawala numerasi
          </p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
            {catatan}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function KuisPilihan({
  id,
  soal,
  pilihan,
  benar,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
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
          pesanSalah="Coba pilih jawaban yang lebih tepat."
        />
      </div>
    </article>
  );
}

function KuisBenarSalah({
  id,
  soal,
  benar,
  alasanBenar,
}: {
  id: string;
  soal: string;
  benar: "benar" | "salah";
  alasanBenar: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const [alasan, setAlasan] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const cukup = pilih === benar && alasan.trim().length >= 6;
    const ok =
      pilih === benar &&
      alasan
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .some((kata) => alasanBenar.toLowerCase().includes(kata) && kata.length > 3);
    if (ok || cukup) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["benar", "salah"] as const).map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => setPilih(nilai)}
            className={`rounded-xl px-4 py-2 text-sm font-black capitalize ${kelasTombolHasilKuis(
              pilih,
              nilai,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {nilai}
          </button>
        ))}
      </div>
      <label className="mt-3 block text-sm font-bold text-[#1C01A5]">
        Alasan
        <input
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
          placeholder="Tulis alasan singkat..."
        />
      </label>
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
          cuplikan={pilih || undefined}
          pesanSalah="Pilih benar/salah yang tepat, lalu tulis alasannya."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  id,
  soal,
  alias,
}: {
  id: string;
  soal: string;
  alias: string[];
}) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const teks = isi.trim().toLowerCase();
    const ok = alias.some((item) => teks.includes(item.toLowerCase()));
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0FDF4] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <input
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        className="mt-3 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
        placeholder="Tulis jawaban..."
      />
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
          cuplikan={isi || undefined}
          pesanSalah="Coba kata kunci dari infografis bab ini."
        />
      </div>
    </article>
  );
}

function KuisJodoh({
  id,
  soal,
  pasangan,
  kunci,
}: {
  id: string;
  soal: string;
  pasangan: { kiri: string; kanan: string[] }[];
  kunci: Record<string, string>;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const ok = Object.entries(kunci).every(([kiri, kanan]) => pilih[kiri] === kanan);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 grid gap-3">
        {pasangan.map((item) => (
          <label key={item.kiri} className="block text-sm font-bold text-[#1C01A5]">
            {item.kiri}
            <select
              value={pilih[item.kiri] ?? ""}
              onChange={(e) =>
                setPilih((lama) => ({ ...lama, [item.kiri]: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
            >
              <option value="">Pilih pasangan...</option>
              {item.kanan.map((opsi) => (
                <option key={opsi} value={opsi}>
                  {opsi}
                </option>
              ))}
            </select>
          </label>
        ))}
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
          cuplikan={Object.values(pilih).join(" · ") || undefined}
          pesanSalah="Jodohkan setiap bagian ke arti yang tepat."
        />
      </div>
    </article>
  );
}

function idEval(modulId: string, indeks: number): string {
  return idKuisKartuResmi(modulId, "C", indeks);
}

function KuisKartuMateri({
  modulId,
  kartu,
}: {
  modulId: string;
  kartu: KartuModulResmi;
}) {
  const suara = kartu.kuis[0];
  const tulis = kartu.kuisTulis ?? kartu.kuis[0];
  if (!suara || !tulis) return null;
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ VOICE
      </p>
      <SoalRekamSuara
        id={idKuisKartuResmi(modulId, kartu.kode, 0)}
        pertanyaan={suara.pertanyaan}
        periksa={(transkrip) => ucapanMemuatAlias(transkrip, suara.alias)}
        petunjuk="Ketuk Rekam suara, sebutkan jawabannya, lalu kirim."
      />
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ TULIS
      </p>
      <KuisTulisKartu
        id={idKuisTulisKartu(modulId, kartu.kode)}
        rapat
        pertanyaan={tulis.pertanyaan}
        alias={tulis.alias}
        konteks={`${tulis.pertanyaan} ${tulis.alias.join(", ")}`}
      />
    </div>
  );
}

const INFOGRAFIS: Record<
  string,
  {
    judul: string;
    kepala: [string, string, string];
    baris: Array<[string, string, string]>;
    catatan: string;
  }
> = {
  "mtk-2-bab2-A": {
    judul: "Tiga cara penjumlahan",
    kepala: ["Cara", "Langkah", "Contoh"],
    baris: [
      ["Maju", "Lompat ke depan", "12 + 6 = 18"],
      ["Bersusun", "Satuan di bawah satuan", "2 + 6 = 8"],
      ["Pasangan", "Pecah jadi 10 dan sisa", "10 + 8 = 18"],
    ],
    catatan: "8 satuan + 2 satuan = 10 satuan = 1 puluhan. 18 + 2 = 20.",
  },
  "mtk-2-bab2-B": {
    judul: "Pengurangan dan kata cerita",
    kepala: ["Kata", "Arti", "Contoh"],
    baris: [
      ["Lebihnya", "Ditambah", "12 + 6 = 18"],
      ["Kurangnya", "Dikurangi", "12 - 5 = 7"],
      ["Selisih / jumlah", "Kurang / tambah", "18 - 12 = 6"],
    ],
    catatan: "Mundur dari 18 sebanyak 12 langkah sampai 6. Urai puluhan jika satuan tidak cukup.",
  },
  "mtk-2-bab3-A": {
    judul: "Logika perkalian cerdik",
    kepala: ["Bagian", "Arti", "Contoh"],
    baris: [
      ["Kotak", "Wadah / piring", "3 piring"],
      ["Isi", "Benda di dalam", "2 donat tiap piring"],
      ["Kalimat", "Kotak × isi", "3 × 2 = 2+2+2 = 6"],
    ],
    catatan: "3 × 2 artinya 2 ditulis 3 kali. Hasil sama dengan 2 × 3, tetapi susunan bendanya berbeda.",
  },
  "mtk-2-bab3-B": {
    judul: "Hasil sama dan kali nol",
    kepala: ["Perkalian", "Penjumlahan", "Hasil"],
    baris: [
      ["3 × 4 / 4 × 3", "4+4+4 / 3+3+3+3", "12"],
      ["2 × 5 / 5 × 2", "5+5 / 2+2+2+2+2", "10"],
      ["5 × 1 / × 0", "1+1+1+1+1 / kosong", "5 / 0"],
    ],
    catatan: "5 × 1 bukan 5+5+5+5+5. Kali 0 selalu 0. Lima kucing empat kaki = 20.",
  },
  "mtk-2-bab4-A": {
    judul: "Posisi di sawah",
    kepala: ["Kalimat", "Kata posisi", "Pasangan"],
    baris: [
      ["Kupu-kupu di atas bunga", "atas", "Bunga di bawah"],
      ["Burung di depan ulat", "depan", "Ulat di belakang"],
      ["Burung di kiri rumput", "kiri", "Rumput di kanan"],
    ],
    catatan: "Atas berpasangan dengan bawah. Depan berpasangan dengan belakang. Kiri berpasangan dengan kanan.",
  },
  "mtk-2-bab4-B": {
    judul: "Pola panen",
    kepala: ["Jenis", "Contoh", "Berikutnya"],
    baris: [
      ["Bentuk", "bunga, segi empat, bunga", "segi empat"],
      ["Warna", "merah, biru, merah", "biru"],
      ["Gerakan", "membungkuk, berdiri", "membungkuk"],
    ],
    catatan: "Pola berulang dan teratur. Setelah langkah terakhir, ulang dari awal.",
  },
  "mtk-2-bab5-A": {
    judul: "Setengah dan seperempat",
    kepala: ["Bagian", "Arti", "Contoh"],
    baris: [
      ["Setengah 1/2", "Dua bagian sama besar", "Martabak Rara dan Bimo"],
      ["Seperempat 1/4", "Empat bagian sama besar", "Semangka 4 piring"],
      ["Bukan pecahan itu", "Potongan tidak sama besar", "Apel besar dan kecil"],
    ],
    catatan: "Angka atas: bagian yang diambil. Angka bawah: semua potongan sama besar.",
  },
  "mtk-2-bab5-B": {
    judul: "Kumpulan benda",
    kepala: ["Bagian", "Arti", "Contoh"],
    baris: [
      ["Setengah kumpulan", "Dua kelompok sama banyak", "8 donat jadi 4 dan 4"],
      ["Bukan setengah", "Jumlah tidak sama", "6 stroberi jadi 4 dan 2"],
      ["Utuh dari pecahan", "Dua 1/2 atau empat 1/4", "Piring kue penuh"],
    ],
    catatan: "Setengah dari 6 stroberi adalah 3. Setengah lebih besar daripada seperempat.",
  },
  "mtk-2-bab6-A": {
    judul: "Aturan timbangan Kapten IGIL",
    kepala: ["Posisi nampan", "Arti", "Contoh"],
    baris: [
      ["Turun ke bawah", "Lebih berat", "Kotak besi, semangka, gajah kecil"],
      ["Naik ke atas", "Lebih ringan", "Bantal kapas, stroberi, kelinci"],
      ["Lurus sejajar", "Sama berat", "1 apel merah = 1 apel hijau"],
    ],
    catatan:
      "Benda yang lebih berat membuat nampan turun. Jangan tertipu ukuran. Batu kecil bisa lebih berat dari balon besar.",
  },
  "mtk-2-bab6-B": {
    judul: "Kelereng, jam, dan durasi",
    kepala: ["Topik", "Rumus", "Ingat"],
    baris: [
      ["Satuan tak baku", "Berat benda = jumlah kelereng saat lurus", "Mangga 5 > pisang 3"],
      ["Jam tepat", "Panjang di 12, pendek di X = pukul X", "Pendek di 8 = pukul 8"],
      ["Durasi", "Sebentar vs lama", "Cuci tangan sebentar, tidur malam lama"],
    ],
    catatan:
      "Jarum pendek menunjuk jam. Jarum panjang di 12 artinya tepat. Selisih kelereng: 5 − 3 = 2.",
  },
  "mtk-2-bab7-A": {
    judul: "Kelompok puluhan sampai 100",
    kepala: ["Cara", "Rumus", "Contoh"],
    baris: [
      ["Kerang puluhan", "1 kerang = 10 mutiara", "7 kerang = 70"],
      ["Tambah satuan", "puluhan + satuan", "70 + 4 = 74"],
      ["Seratus", "10 puluhan = 100", "Dibaca seratus"],
    ],
    catatan:
      "Hitung kelompok puluhan dulu, lalu tambahkan satuan. Angka depan puluhan, angka belakang satuan.",
  },
  "mtk-2-bab7-B": {
    judul: "Nilai tempat dan lompat",
    kepala: ["Topik", "Cara", "Ingat"],
    baris: [
      ["Nilai tempat", "Kiri puluhan, kanan satuan", "87 = 80 + 7"],
      ["Membandingkan", "Cek puluhan dulu", "81 > 79"],
      ["Hitung lompat", "Lompat 2, 5, atau 10", "70, 80, 90, 100"],
    ],
    catatan:
      "59 berbeda dengan 95. Kalau puluhan sama, bandingkan satuan. 10 puluhan = 100.",
  },
  "mtk-2-bab8-A": {
    judul: "Kunci membaca piktogram",
    kepala: ["Bagian", "Arti", "Contoh"],
    baris: [
      ["Data gambar", "Satu ikon = satu jumlah", "Simbol buah atau pensil"],
      ["Data kelas", "Hitung banyak gambar", "Apel 4, pisang 2"],
      ["Analisis", "Baris terpanjang paling banyak", "Apel lebih disukai"],
    ],
    catatan:
      "Selisih anak yang suka apel dan pisang adalah 2. Namanya diagram gambar atau piktogram.",
  },
  "mtk-2-bab8-B": {
    judul: "Membandingkan dan menjumlah",
    kepala: ["Data", "Gambar", "Angka"],
    baris: [
      ["Pensil merah / biru", "3 ikon / 5 ikon", "3, 5, total 8"],
      ["Kucing / burung", "4 ikon / 2 ikon", "4, 2, total 6"],
      ["Buku gambar-sains-cerita", "2 / 3 / 5", "Urutan 2, 3, 5"],
    ],
    catatan:
      "Baris lebih pendek artinya lebih sedikit. Empat gambar mobil berarti 4 anak.",
  },
};

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="27 + 5 bersusun: satuan di kanan dan yang disimpan ke kiri adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "12 tanpa simpan" },
          { huruf: "B", teks: "2 dan simpan 1 puluhan" },
          { huruf: "C", teks: "7 dan simpan 5" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Hasil 42 - 15 adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "37" },
          { huruf: "B", teks: "27" },
          { huruf: "C", teks: "57" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Saat 30 - 7 kita harus meminjam 1 puluhan dari angka 3."
        benar="benar"
        alasanBenar="nol lebih kecil dari tujuh sehingga dipinjam menjadi sepuluh"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Hasil dari 88 - 45 adalah 43."
        benar="benar"
        alasanBenar="satuan delapan kurang lima tiga, puluhan delapan kurang empat empat"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan operasi bersusun dengan hasilnya."
        pasangan={[
          {
            kiri: "34 + 25",
            kanan: ["59 tanpa menyimpan", "63 dengan menyimpan 1", "38 dengan meminjam 1"],
          },
          {
            kiri: "48 + 15",
            kanan: ["59 tanpa menyimpan", "63 dengan menyimpan 1", "38 dengan meminjam 1"],
          },
          {
            kiri: "52 - 14",
            kanan: ["59 tanpa menyimpan", "63 dengan menyimpan 1", "38 dengan meminjam 1"],
          },
        ]}
        kunci={{
          "34 + 25": "59 tanpa menyimpan",
          "48 + 15": "63 dengan menyimpan 1",
          "52 - 14": "38 dengan meminjam 1",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa pengerjaan bersusun selalu dimulai dari kamar satuan di kanan? Jelaskan!"
        alias={["simpan", "pinjam", "puluhan", "kanan", "satuan"]}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="5 + 5 + 5 + 5 ditulis perkalian..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "5 × 5" },
          { huruf: "B", teks: "4 × 5" },
          { huruf: "C", teks: "9 × 1" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="4 × 3 dalam penjumlahan berulang adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "4 + 3" },
          { huruf: "B", teks: "3 + 3 + 3 + 3" },
          { huruf: "C", teks: "4 + 4 + 4 + 4 + 4" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Bentuk perkalian 5 × 1 artinya 5 + 5 + 5 + 5 + 5."
        benar="salah"
        alasanBenar="lima kali satu ditulis satu dijumlah lima kali, bukan lima dijumlah lima kali"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Setiap bilangan cacah dikalikan 0 hasilnya selalu 0."
        benar="benar"
        alasanBenar="kotak tanpa isi tetap nol berapa pun banyak kotaknya"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan perkalian dengan penjumlahan berulangnya."
        pasangan={[
          { kiri: "2 × 6", kanan: ["6 + 6", "4 + 4 + 4", "2 + 2 + 2 + 2"] },
          { kiri: "3 × 4", kanan: ["6 + 6", "4 + 4 + 4", "2 + 2 + 2 + 2"] },
          { kiri: "4 × 2", kanan: ["6 + 6", "4 + 4 + 4", "2 + 2 + 2 + 2"] },
        ]}
        kunci={{
          "2 × 6": "6 + 6",
          "3 × 4": "4 + 4 + 4",
          "4 × 2": "2 + 2 + 2 + 2",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa rumus perkalian memakai kotak dikali isi, bukan sebaliknya? Jelaskan!"
        alias={["wadah", "isi", "piring", "kotak", "cerita"]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Kupu-kupu hinggap di atas bunga. Bunga ada di..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "atas kupu-kupu" },
          { huruf: "B", teks: "bawah kupu-kupu" },
          { huruf: "C", teks: "depan kupu-kupu" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Pola kaus: merah, biru, merah, biru. Berikutnya..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "kuning" },
          { huruf: "B", teks: "biru" },
          { huruf: "C", teks: "merah" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Yang di depan berpasangan dengan yang di belakang."
        benar="benar"
        alasanBenar="depan dan belakang selalu berpasangan"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Pola tepuk 1, 2, 3, 4 lalu ulang. Setelah 4 adalah 5."
        benar="salah"
        alasanBenar="setelah 4 pola ulang dari 1, bukan 5"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan pola dengan langkah berikutnya."
        pasangan={[
          {
            kiri: "merah, biru, merah, biru",
            kanan: ["merah", "bunga", "membungkuk"],
          },
          {
            kiri: "bunga, segi empat, bunga, segi empat",
            kanan: ["merah", "bunga", "membungkuk"],
          },
          {
            kiri: "membungkuk, berdiri, membungkuk, berdiri",
            kanan: ["merah", "bunga", "membungkuk"],
          },
        ]}
        kunci={{
          "merah, biru, merah, biru": "merah",
          "bunga, segi empat, bunga, segi empat": "bunga",
          "membungkuk, berdiri, membungkuk, berdiri": "membungkuk",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa setelah tepuk 4 kita tidak tepuk 5? Jelaskan polanya!"
        alias={["ulang", "satu", "1", "pola", "awal"]}
      />
    </div>
  );
}

function EvaluasiBab5({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Rara makan setengah semangka. Bimo makan seperempat. Siapa yang makan lebih besar?"
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Rara" },
          { huruf: "B", teks: "Bimo" },
          { huruf: "C", teks: "sama besar" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Ibu punya 8 apel. Setengah ke Nenek. Rara makan 1 dari sisa. Sisa Ibu..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "4 apel" },
          { huruf: "B", teks: "3 apel" },
          { huruf: "C", teks: "2 apel" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Potongan tidak sama besar tetap disebut setengah."
        benar="salah"
        alasanBenar="Setengah hanya jika kedua bagian sama besar"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Empat bagian sama besar dari satu semangka bernilai seperempat."
        benar="benar"
        alasanBenar="Tiap orang dari empat teman mendapat seperempat"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan cerita dengan nilainya."
        pasangan={[
          {
            kiri: "Martabak dua potong sama besar",
            kanan: ["setengah", "seperempat", "bukan setengah"],
          },
          {
            kiri: "Semangka empat potong sama besar",
            kanan: ["setengah", "seperempat", "bukan setengah"],
          },
          {
            kiri: "8 donat jadi 5 dan 3",
            kanan: ["setengah", "seperempat", "bukan setengah"],
          },
        ]}
        kunci={{
          "Martabak dua potong sama besar": "setengah",
          "Semangka empat potong sama besar": "seperempat",
          "8 donat jadi 5 dan 3": "bukan setengah",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa 5 donat dan 3 donat tidak boleh disebut setengah dari 8 donat?"
        alias={["sama", "banyak", "tidak", "bukan"]}
      />
    </div>
  );
}

function EvaluasiBab6({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Timbangan 1: semangka turun, nanas naik. Timbangan 2: nanas turun, apel naik. Urutan dari paling berat..."
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Semangka - Nanas - Apel" },
          { huruf: "B", teks: "Apel - Nanas - Semangka" },
          { huruf: "C", teks: "Nanas - Semangka - Apel" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Kotak susu 5 kelereng dan roti 2 kelereng ditaruh bersama. Kelereng di nampan kanan agar lurus..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "3 kelereng" },
          { huruf: "B", teks: "5 kelereng" },
          { huruf: "C", teks: "7 kelereng" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Balon besar naik, batu kecil turun. Berarti balon lebih berat karena ukurannya besar."
        benar="salah"
        alasanBenar="nampan yang turun lebih berat, jadi batu kecil lebih berat"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Jarum pendek di 12 dan jarum panjang di 6 berarti pukul 6 tepat."
        benar="salah"
        alasanBenar="pukul 6 tepat: jarum pendek di 6 dan jarum panjang di 12"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan situasi dengan kesimpulannya."
        pasangan={[
          {
            kiri: "Tidur malam 8 jam vs gosok gigi 2 menit",
            kanan: ["Tidur malam lebih lama", "Pensil lebih ringan"],
          },
          {
            kiri: "Buku 6 balok vs pensil 1 balok",
            kanan: ["Tidur malam lebih lama", "Pensil lebih ringan"],
          },
          {
            kiri: "Jarum pendek di 6, jarum panjang di 12",
            kanan: ["Pukul 06.00 tepat", "Pukul 12.00 tepat"],
          },
        ]}
        kunci={{
          "Tidur malam 8 jam vs gosok gigi 2 menit": "Tidur malam lebih lama",
          "Buku 6 balok vs pensil 1 balok": "Pensil lebih ringan",
          "Jarum pendek di 6, jarum panjang di 12": "Pukul 06.00 tepat",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa nampan yang turun ke bawah menunjukkan benda yang lebih berat?"
        alias={["berat", "turun", "bawah", "timbangan"]}
      />
    </div>
  );
}

function EvaluasiBab7({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Kartu 6 dan 9 disusun menjadi bilangan dua angka paling besar. Nilai tempatnya..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "6 Puluhan dan 9 Satuan (69)" },
          { huruf: "B", teks: "9 Puluhan dan 6 Satuan (96)" },
          { huruf: "C", teks: "9 Puluhan dan 9 Satuan (99)" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="6 kantong puluhan dan 14 satuan. 10 satuan masuk kantong baru. Jumlahnya..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "64 kelereng" },
          { huruf: "B", teks: "74 kelereng" },
          { huruf: "C", teks: "84 kelereng" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Bilangan 72 lebih kecil dari 69 karena angka 2 lebih kecil dari 9."
        benar="salah"
        alasanBenar="72 lebih besar karena 7 puluhan lebih dari 6 puluhan"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Urutan kerang paling banyak Nala 91, Arka 89, lalu Toti 85."
        benar="benar"
        alasanBenar="91 lebih dari 89, dan 89 lebih dari 85"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan deskripsi dengan bilangannya."
        pasangan={[
          {
            kiri: "8 Puluhan + 0 Satuan",
            kanan: ["80", "8", "100"],
          },
          {
            kiri: "10 Puluhan",
            kanan: ["10", "100", "1"],
          },
          {
            kiri: "5 Satuan + 7 Puluhan",
            kanan: ["57", "75", "52"],
          },
        ]}
        kunci={{
          "8 Puluhan + 0 Satuan": "80",
          "10 Puluhan": "100",
          "5 Satuan + 7 Puluhan": "75",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa 81 lebih dari 79 meskipun satuan 1 lebih kecil dari 9?"
        alias={["puluhan", "8 puluhan", "80", "puluh"]}
      />
    </div>
  );
}

function EvaluasiBab8({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Apel 4 gambar, pisang 2 gambar. Selisih jumlah anak yang menyukainya adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "2" },
          { huruf: "C", teks: "4" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Cara menyajikan data memakai lambang gambar dinamakan diagram..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "garis wajib" },
          { huruf: "B", teks: "gambar atau piktogram" },
          { huruf: "C", teks: "lingkaran" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Jika baris gambar robot lebih pendek daripada baris bola, artinya robot lebih banyak."
        benar="salah"
        alasanBenar="baris lebih pendek menunjukkan jumlah yang lebih sedikit"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Diagram gambar membantu membandingkan data paling banyak dan paling sedikit dengan cepat."
        benar="benar"
        alasanBenar="visual piktogram menyederhanakan angka menjadi gambar yang mudah dibaca"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan pertanyaan data pensil dengan jawaban angkanya."
        pasangan={[
          {
            kiri: "Jumlah pensil Kelompok Merah",
            kanan: ["3 buah pensil", "5 buah pensil", "8 buah pensil"],
          },
          {
            kiri: "Jumlah pensil Kelompok Biru",
            kanan: ["3 buah pensil", "5 buah pensil", "8 buah pensil"],
          },
          {
            kiri: "Total seluruh pensil warna",
            kanan: ["3 buah pensil", "5 buah pensil", "8 buah pensil"],
          },
        ]}
        kunci={{
          "Jumlah pensil Kelompok Merah": "3 buah pensil",
          "Jumlah pensil Kelompok Biru": "5 buah pensil",
          "Total seluruh pensil warna": "8 buah pensil",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa baris gambar yang paling panjang berarti jumlah datanya paling banyak?"
        alias={["gambar", "banyak", "ikon", "panjang", "hitung"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "mtk-2-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab4") return <EvaluasiBab4 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab5") return <EvaluasiBab5 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab6") return <EvaluasiBab6 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab7") return <EvaluasiBab7 modulId={modul.id} />;
  return <EvaluasiBab8 modulId={modul.id} />;
}

export default function NaskahMtk2({
  modul,
  kelas = "2 SD",
  kelamin,
}: {
  modul: ModulResmiPai;
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  if (modul.id === "mtk-2-bab1") {
    return <NaskahMtk2Bab1 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab2") {
    return <NaskahMtk2Bab2 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab3") {
    return <NaskahMtk2Bab3 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab4") {
    return <NaskahMtk2Bab4 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab5") {
    return <NaskahMtk2Bab5 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab6") {
    return <NaskahMtk2Bab6 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab7") {
    return <NaskahMtk2Bab7 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab8") {
    return <NaskahMtk2Bab8 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab9") {
    return <NaskahMtk2Bab9 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab10") {
    return <NaskahMtk2Bab10 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab11") {
    return <NaskahMtk2Bab11 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab12") {
    return <NaskahMtk2Bab12 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab13") {
    return <NaskahMtk2Bab13 kelas={kelas} kelamin={kelamin} />;
  }
  if (modul.id === "mtk-2-bab14") {
    return <NaskahMtk2Bab14 kelas={kelas} kelamin={kelamin} />;
  }
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;
  const aliasTulisC = kumpulkanAlias(kartuC.kuis.flatMap((item) => item.alias));

  return (
    <div className="space-y-5">
      {[kartuA, kartuB].map((kartu) => {
        const info = INFOGRAFIS[`${modul.id}-${kartu.kode}`];
        return (
          <KartuBingkai key={kartu.kode}>
            <DoodleKartuMtk2 modulId={modul.id} kode={kartu.kode} judul={kartu.judul} />
            <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
              {kartu.judul}
            </h4>
            <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
              Matematika · Kelas 2 SD · {modul.judul}
            </p>
            <div className="mt-4">
              <TombolVoiceMateriPai1
                kelas={kelas}
                kelamin={kelamin}
                cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
              />
            </div>
            <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
              {kartu.pengantar}
            </p>
            {info ? (
              <InfografisTabel
                judul={info.judul}
                kepala={info.kepala}
                baris={info.baris}
                catatan={info.catatan}
              />
            ) : null}
            <div className="mt-4 grid gap-3">
              {kartu.item.map((item) => (
                <article
                  key={item.nama}
                  className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                    {item.nama}
                    {item.singkat ? ` · ${item.singkat}` : ""}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                    {item.uraian}
                  </p>
                </article>
              ))}
            </div>
            <KuisKartuMateri modulId={modul.id} kartu={kartu} />
          </KartuBingkai>
        );
      })}

      <KartuBingkai>
        <DoodleKartuMtk2 modulId={modul.id} kode="C" judul={kartuC.judul} />
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuC.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Kelas 2 SD · {modul.judul}
        </p>
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
        <EvaluasiBab modul={modul} />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "C")}
          pertanyaan="Tuliskan satu jawaban dari lembar evaluasi bab ini."
          alias={aliasTulisC}
          konteks={kartuC.pengantar}
        />
      </KartuBingkai>

      {kartuD ? (
        <KartuBingkai>
          <DoodleKartuMtk2 modulId={modul.id} kode="D" judul={kartuD.judul} />
          <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
            {kartuD.judul}
          </h4>
          <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
            Matematika · Kelas 2 SD · {modul.judul}
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
          <div className="mt-4 grid gap-3">
            {kartuD.item.map((item) => (
              <article
                key={item.nama}
                className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3"
              >
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                  {item.nama}
                  {item.singkat ? ` · ${item.singkat}` : ""}
                </p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                  {item.uraian}
                </p>
              </article>
            ))}
          </div>
          <EvaluasiEkstraBindo2 modulId={modul.id} />
        </KartuBingkai>
      ) : null}
    </div>
  );
}
