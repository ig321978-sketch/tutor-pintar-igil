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

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
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
  "mtk-2-bab1-A": {
    judul: "Rumah tinggal angka",
    kepala: ["Kamar", "Posisi", "Contoh 147"],
    baris: [
      ["Satuan", "Paling kanan, nilai tetap", "7 = 7"],
      ["Puluhan", "Tengah, ditambah satu nol", "4 = 40"],
      ["Ratusan", "Paling kiri, dua nol", "1 = 100"],
    ],
    catatan: "147 dibaca seratus empat puluh tujuh. Bentuk panjang: 147 = 100 + 40 + 7.",
  },
  "mtk-2-bab1-B": {
    judul: "Bandingkan dari kiri",
    kepala: ["Langkah", "Yang dilihat", "Contoh"],
    baris: [
      ["1. Ratusan", "Nilai paling besar", "168 dan 162 sama 1"],
      ["2. Puluhan", "Jika ratusan sama", "Keduanya 6"],
      ["3. Satuan", "Penentu terakhir", "8 > 2 jadi 168 > 162"],
    ],
    catatan: "72, 89, 60 lebih besar dari 50. 14 dan 35 lebih kecil. Urutan naik: 112, 128, 145.",
  },
  "mtk-2-bab2-A": {
    judul: "Jalan bersusun matematika",
    kepala: ["Langkah", "Aturan", "Ingat"],
    baris: [
      ["Sejajarkan", "Satuan di bawah satuan", "Jangan geser"],
      ["Hitung kanan", "Mulai dari satuan", "7 + 5 = 12"],
      ["Simpan / pinjam", "≥10 simpan; atas kecil pinjam", "Tulis 2, simpan 1"],
    ],
    catatan: "27 + 5: satuan 2, simpan 1. 42 - 15: pinjam jadi 12 - 5 = 7, hasil 27.",
  },
  "mtk-2-bab2-B": {
    judul: "Dua jenis pengerjaan",
    kepala: ["Jenis", "Ciri", "Contoh"],
    baris: [
      ["Tanpa simpan", "Tiap kamar cukup", "34 + 25 = 59"],
      ["Dengan simpan", "Satuan ≥ 10", "48 + 15 = 63"],
      ["Dengan pinjam", "Atas lebih kecil", "52 - 14 = 38"],
    ],
    catatan: "Soal cerita: yang sudah ada, yang bertambah, lalu pertanyaan. 24 + 15 = 39 apel.",
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
    judul: "Karakter bangun datar",
    kepala: ["Bangun", "Sisi", "Sudut"],
    baris: [
      ["Segitiga", "3 garis lurus", "3 pojok"],
      ["Segiempat", "4 garis lurus", "4 pojok"],
      ["Lingkaran", "1 sisi lengkung", "0 pojok"],
    ],
    catatan: "Pizza sering segitiga, televisi dan papan tulis segiempat, roda dan koin lingkaran.",
  },
  "mtk-2-bab4-B": {
    judul: "Detektif benda sekitar",
    kepala: ["Benda", "Bangun", "Ciri"],
    baris: [
      ["Koin, roda, jam", "Lingkaran", "Tanpa pojok"],
      ["Papan, buku, kalender", "Segiempat", "4 sisi lurus"],
      ["Potongan pizza", "Segitiga", "3 sisi lurus"],
    ],
    catatan: "Urutan jumlah sisi dari sedikit: lingkaran, segitiga, segiempat. Sudut segitiga ada 3.",
  },
};

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Pada angka 85, angka yang menempati kamar satuan paling kanan adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "8" },
          { huruf: "B", teks: "5" },
          { huruf: "C", teks: "80" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Bentuk panjang 139 adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "1 + 3 + 9" },
          { huruf: "B", teks: "100 + 30 + 9" },
          { huruf: "C", teks: "10 + 39" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Bilangan 168 nilainya lebih kecil daripada 162 karena angka 8 lebih besar dari 2."
        benar="salah"
        alasanBenar="bandingkan dari ratusan puluhan satuan, 168 lebih besar dari 162"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Bentuk panjang dari 190 adalah 100 + 90 + 0."
        benar="benar"
        alasanBenar="ratusan seratus, puluhan sembilan puluh, satuan nol"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan angka pada 152 dengan kamar nilai tempatnya."
        pasangan={[
          {
            kiri: "Angka 5 pada 152",
            kanan: ["Ratusan nilainya 100", "Puluhan nilainya 50", "Satuan nilainya 2"],
          },
          {
            kiri: "Angka 2 pada 152",
            kanan: ["Ratusan nilainya 100", "Puluhan nilainya 50", "Satuan nilainya 2"],
          },
          {
            kiri: "Angka 1 pada 152",
            kanan: ["Ratusan nilainya 100", "Puluhan nilainya 50", "Satuan nilainya 2"],
          },
        ]}
        kunci={{
          "Angka 5 pada 152": "Puluhan nilainya 50",
          "Angka 2 pada 152": "Satuan nilainya 2",
          "Angka 1 pada 152": "Ratusan nilainya 100",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa kita membandingkan dua bilangan dari kamar ratusan dulu, bukan dari satuan? Jelaskan!"
        alias={["ratusan", "besar", "kiri", "nilai", "puluhan"]}
      />
    </div>
  );
}

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
        soal="Jumlah sudut pojok dan sisi lingkaran adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "1 sudut, 3 sisi" },
          { huruf: "B", teks: "0 sudut, 1 sisi lengkung" },
          { huruf: "C", teks: "4 sudut, 4 sisi" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Bangun datar yang memiliki 3 sisi garis lurus dinamakan..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Lingkaran" },
          { huruf: "B", teks: "Segitiga" },
          { huruf: "C", teks: "Segiempat" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Permukaan kertas kalender berbentuk segiempat karena memiliki empat garis lurus."
        benar="benar"
        alasanBenar="empat sisi lurus termasuk jenis segiempat"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Bangun datar segitiga bisa memiliki sisi melengkung seperti busur panah."
        benar="salah"
        alasanBenar="segitiga wajib tiga garis lurus yang bertemu di tiga titik sudut"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Jodohkan bangun datar dengan ciri fisiknya."
        pasangan={[
          {
            kiri: "Segitiga",
            kanan: [
              "4 garis sisi dan 4 titik sudut",
              "3 garis sisi dan 3 titik sudut",
              "1 sisi lengkung dan 0 sudut",
            ],
          },
          {
            kiri: "Lingkaran",
            kanan: [
              "4 garis sisi dan 4 titik sudut",
              "3 garis sisi dan 3 titik sudut",
              "1 sisi lengkung dan 0 sudut",
            ],
          },
          {
            kiri: "Segiempat",
            kanan: [
              "4 garis sisi dan 4 titik sudut",
              "3 garis sisi dan 3 titik sudut",
              "1 sisi lengkung dan 0 sudut",
            ],
          },
        ]}
        kunci={{
          Segitiga: "3 garis sisi dan 3 titik sudut",
          Lingkaran: "1 sisi lengkung dan 0 sudut",
          Segiempat: "4 garis sisi dan 4 titik sudut",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa roda sepeda tidak disebut segiempat? Jelaskan cirinya!"
        alias={["lengkung", "sudut", "pojok", "lingkaran", "sisi"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "mtk-2-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "mtk-2-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  return <EvaluasiBab4 modulId={modul.id} />;
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
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;
  const aliasTulisC = kumpulkanAlias(kartuC.kuis.flatMap((item) => item.alias));

  return (
    <div className="space-y-5">
      {[kartuA, kartuB].map((kartu) => {
        const info = INFOGRAFIS[`${modul.id}-${kartu.kode}`];
        return (
          <KartuBingkai key={kartu.kode}>
            <DoodleKartuAtasJudul
              id={`${modul.id}-${kartu.kode}`}
              folder="doodle-mtk"
              alt={`Ilustrasi ${kartu.judul}`}
            />
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
        <DoodleKartuAtasJudul
          id={`${modul.id}-C`}
          folder="doodle-mtk"
          alt={`Ilustrasi ${kartuC.judul}`}
        />
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
          <DoodleKartuAtasJudul
            id={`${modul.id}-D`}
            folder="doodle-mtk"
            alt={`Ilustrasi ${kartuD.judul}`}
          />
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
