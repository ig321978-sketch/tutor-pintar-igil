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
            Cakrawala ilmu
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
          pesanSalah="Jodohkan setiap kata ke arti atau posisi yang tepat."
        />
      </div>
    </article>
  );
}

function KuisUrut({
  id,
  soal,
  butir,
  kunci,
}: {
  id: string;
  soal: string;
  butir: string[];
  kunci: Record<string, string>;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const nomor = ["1", "2", "3", "4"];
  const periksa = () => {
    const ok = Object.entries(kunci).every(([nama, nilai]) => pilih[nama] === nilai);
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
        {butir.map((item) => (
          <label key={item} className="block text-sm font-bold text-[#1C01A5]">
            {item}
            <select
              value={pilih[item] ?? ""}
              onChange={(e) =>
                setPilih((lama) => ({ ...lama, [item]: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
            >
              <option value="">Pilih nomor urut...</option>
              {nomor.map((nilai) => (
                <option key={nilai} value={nilai}>
                  {nilai}
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
          pesanSalah="Urutkan sesuai rukun wudu yang tertib."
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
  "pai-2-bab1-A": {
    judul: "Tameng iman Surah an-Nas",
    kepala: ["Bagian", "Isi", "Makna untuk kita"],
    baris: [
      ["Arti nama", "An-Nas = manusia", "Surah ke-114, 6 ayat"],
      ["Peta perlindungan", "Bisikan Khannas", "Setan menggoda secara tersembunyi"],
      ["Benteng gaib", "Allah Malik dan Ilah", "Raja dan Tuhan seluruh manusia"],
    ],
    catatan:
      "Setan tidak terlihat, tetapi bisikannya bisa membuat kita malas belajar atau berbohong. Tamengnya adalah membaca Surah an-Nas!",
  },
  "pai-2-bab1-B": {
    judul: "Kreasi huruf hijaiyah bersambung",
    kepala: ["Posisi", "Wajah huruf", "Yang dilakukan"],
    baris: [
      ["Bentuk awal", "Di depan kata", "Ekor dipotong agar ramping"],
      ["Bentuk tengah", "Di tengah kata", "Membuka dua tangan menggandeng"],
      ["Bentuk akhir", "Di akhir kata", "Kembali ke bentuk utuh"],
    ],
    catatan:
      "Ada 6 huruf pemalu yang hanya mau digandeng dari kanan, tidak mau menggandeng ke kiri: ا د ذ ر ز و (Alif, Dal, Dzal, Ra, Zai, Wau).",
  },
  "pai-2-bab2-A": {
    judul: "Tiga nama agung Allah",
    kepala: ["Asmaulhusna", "Arti", "Teladan anak"],
    baris: [
      ["Al-Hafiz", "Maha Memelihara", "Jaga kebersihan kelas dan bumi"],
      ["Al-Wali", "Maha Melindungi", "Berdoa memohon keselamatan"],
      ["Al-'Alim", "Maha Mengetahui", "Jujur meski tidak ada yang melihat"],
    ],
    catatan:
      "Kita meneladani Al-Hafiz dengan menjaga kebersihan kelas, dan meneladani Al-'Alim dengan rajin belajar serta jujur karena Allah melihat kita.",
  },
  "pai-2-bab2-B": {
    judul: "Melihat Allah lewat ciptaan",
    kepala: ["Yang terlihat", "Pasti ada", "Kesimpulan"],
    baris: [
      ["Ada meja", "Ada tukang kayu", "Tidak muncul sendiri"],
      ["Ada alam", "Ada Khalik", "Allah SWT itu ada"],
      ["Ada makhluk", "Ada Pencipta", "Khalik tidak sama dengan makhluk"],
    ],
    catatan:
      "Segala sesuatu yang diciptakan Allah disebut makhluk. Allah adalah Khalik, Sang Pencipta. Khalik tidak sama dengan makhluk.",
  },
  "pai-2-bab3-A": {
    judul: "Indahnya bersaudara",
    kepala: ["Landasan", "Aksi nyata", "Pesan"],
    baris: [
      ["Ukhuwah Islamiyah", "Semua muslim saudara", "Satu tubuh, saling rawat"],
      ["Kasih sayang", "Bagi bekal, tolong yang jatuh", "Jangan ejek suku atau kulit"],
      ["Hadis Bukhari", "Sayangi saudara", "Seperti menyayangi diri sendiri"],
    ],
    catatan:
      "Tidak beriman seseorang di antara kamu sebelum ia menyayangi saudaranya seperti ia menyayangi dirinya sendiri.",
  },
  "pai-2-bab3-B": {
    judul: "Tata krama anak hebat, lima S",
    kepala: ["Tempat", "Sikap", "Hasil"],
    baris: [
      ["Di rumah", "Cium tangan, bicara lembut", "Birrul walidain"],
      ["Di sekolah", "Salam dan menyimak guru", "Ilmu menjadi berkah"],
      ["Rumus 5S", "Senyum, Sapa, Salam, Sopan, Santun", "Disukai dan dimudahkan"],
    ],
    catatan:
      "Ridha Allah terletak pada ridha orang tua. Menghormati guru membuat ilmu yang kita pelajari menjadi berkah dan bermanfaat.",
  },
  "pai-2-bab4-A": {
    judul: "Ketentuan wudu",
    kepala: ["Bagian", "Isi", "Ingat"],
    baris: [
      ["Fungsi", "Suci dari hadas kecil", "Sebelum salat"],
      ["Rukun", "Niat, wajah, siku, kepala, kaki, tertib", "Tidak boleh terlewat"],
      ["Membatalkan", "Buang air, kentut, tidur lelap", "Wudu ulang sebelum salat"],
    ],
    catatan:
      "Buang air kecil/besar, buang angin, dan tertidur lelap membatalkan wudu. Jika batal, wajib berwudu kembali sebelum salat.",
  },
  "pai-2-bab4-B": {
    judul: "Urutan gerakan wudu sempurna",
    kepala: ["Langkah", "Gerakan", "Sunah"],
    baris: [
      ["1–2", "Telapak, kumur, hidung", "Basmalah, tiga kali"],
      ["3–4", "Wajah, tangan sampai siku", "Kanan dahulu"],
      ["5–6", "Kepala, telinga, kaki mata kaki", "Sela-sela jari, hemat air"],
    ],
    catatan:
      "Saat kran dibuka, gunakan air secukupnya. Menghambur-hamburkan air dibenci oleh Allah.",
  },
  "pai-2-bab5-A": {
    judul: "Perjuangan Nabi Nuh As.",
    kepala: ["Pokok", "Fakta", "Hikmah"],
    baris: [
      ["Gelar", "Ulul Azmi", "Kesabaran luar biasa"],
      ["Masa dakwah", "950 tahun", "Tetap tabah meski diejek"],
      ["Tantangan", "Kan'an dan istri membangkang", "Jangan balas amarah, doakan"],
    ],
    catatan:
      "Kesabaran adalah kunci menghadapi ejekan. Kita meneladani Nabi Nuh dengan tidak membalas amarah saat dijahili teman, melainkan mendoakannya.",
  },
  "pai-2-bab5-B": {
    judul: "Bahtera penyelamat",
    kepala: ["Pokok", "Isi", "Makna"],
    baris: [
      ["Perintah", "Bahtera di atas bukit", "Taat meski diejek"],
      ["Sifat mulia", "Kerja keras dan patuh", "Doa dibarengi usaha"],
      ["Akhir kisah", "Taufan, iman selamat", "Sepasang hewan ikut selamat"],
    ],
    catatan:
      "Doa harus dibarengi usaha nyata. Nabi Nuh bekerja siang malam menebang pohon dan merakit kapal hingga selesai.",
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
        soal="Surah an-Nas adalah surah terakhir di dalam Al-Qur'an yang terdiri dari 6 ayat. Surah ini diturunkan kepada Nabi Muhammad SAW dengan tujuan utama untuk..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Mengajarkan manusia cara berhitung." },
          {
            huruf: "B",
            teks: "Menjadi doa memohon perlindungan kepada Allah dari kejahatan bisikan setan.",
          },
          { huruf: "C", teks: "Mengenalkan nama-nama malaikat." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Perhatikan huruf-huruf berikut: ( ر - ز - و ). Huruf-huruf tersebut memiliki aturan penulisan bersambung yaitu..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Boleh disambung dengan huruf di sebelah kanan maupun kirinya.",
          },
          {
            huruf: "B",
            teks: "Hanya bisa disambung dari arah kanan dan tidak bisa menggandeng huruf di sebelah kirinya.",
          },
          { huruf: "C", teks: "Tidak boleh ditulis di awal kata." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Mengucapkan kata-kata bohong atau mengejek teman adalah contoh bahwa dada kita sedang kemasukan bisikan buruk dari setan."
        benar="benar"
        alasanBenar="bohong dan mengejek adalah bisikan buruk setan yang menggoda dada manusia"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Huruf Alif jika berada di tengah kata bisa membuka tangan kiri untuk menyambung huruf setelahnya."
        benar="salah"
        alasanBenar="alif termasuk huruf pemalu yang tidak mau menggandeng ke kiri"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus pada pasangan yang cocok."
        pasangan={[
          {
            kiri: "Malikinnas",
            kanan: [
              "Huruf Nun (ن) di posisi awal kata.",
              "Raja manusia.",
              "Huruf Mim (م) di posisi akhir kata.",
            ],
          },
          {
            kiri: "ﻧ",
            kanan: [
              "Huruf Nun (ن) di posisi awal kata.",
              "Raja manusia.",
              "Huruf Mim (م) di posisi akhir kata.",
            ],
          },
          {
            kiri: "ﻢ",
            kanan: [
              "Huruf Nun (ن) di posisi awal kata.",
              "Raja manusia.",
              "Huruf Mim (م) di posisi akhir kata.",
            ],
          },
        ]}
        kunci={{
          Malikinnas: "Raja manusia.",
          "ﻧ": "Huruf Nun (ن) di posisi awal kata.",
          "ﻢ": "Huruf Mim (م) di posisi akhir kata.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa ketika kita hendak membaca kitab suci Al-Qur'an atau saat kita sedang merasa ketakutan di malam hari, kita sangat dianjurkan untuk membaca Surah an-Nas? Jelaskan alasan logismu!"
        alias={["lindung", "tameng", "setan", "aman", "takut", "allah"]}
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
        soal="Nia tidak sengaja menjatuhkan pensil Tono saat kelas sepi. Walau tidak ada teman yang melihat, Nia segera mengembalikan pensil itu karena ia tahu Allah memiliki sifat Al-'Alim, yang artinya..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Allah Maha Melindungi anak yang sedih." },
          {
            huruf: "B",
            teks: "Allah Maha Mengetahui segala sesuatu termasuk perbuatan yang tersembunyi.",
          },
          { huruf: "C", teks: "Allah Maha Memelihara semua mainan kita." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Adanya keteraturan pergantian siang dan malam serta buah-buahan yang tumbuh subur di bumi merupakan bukti nyata bahwa..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Alam semesta tercipta secara kebetulan dan bergerak sendiri.",
          },
          {
            huruf: "B",
            teks: "Allah SWT itu Ada dan Mengatur seluruh kehidupan makhluk-Nya.",
          },
          { huruf: "C", teks: "Manusia bisa membuat matahari sendiri." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Kita meneladani sifat Allah Al-Hafiz dengan cara merawat dan menjaga kebersihan lingkungan sekitar kita agar tidak rusak."
        benar="benar"
        alasanBenar="al-hafiz maha memelihara jadi kita menjaga kelas dan bumi agar tidak rusak"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Allah memiliki wujud dan kelemahan yang sama persis seperti makhluk ciptaan-Nya."
        benar="salah"
        alasanBenar="khalik tidak sama dengan makhluk, Allah tidak lemah seperti ciptaan-Nya"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus pada pasangan yang cocok."
        pasangan={[
          {
            kiri: "Al-Hafiz",
            kanan: ["Maha Memelihara.", "Maha Melindungi.", "Sang Pencipta."],
          },
          {
            kiri: "Al-Wali",
            kanan: ["Maha Memelihara.", "Maha Melindungi.", "Sang Pencipta."],
          },
          {
            kiri: "Khalik",
            kanan: ["Maha Memelihara.", "Maha Melindungi.", "Sang Pencipta."],
          },
        ]}
        kunci={{
          "Al-Hafiz": "Maha Memelihara.",
          "Al-Wali": "Maha Melindungi.",
          Khalik: "Sang Pencipta.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal='Seorang temanmu berkata: "Aku tidak percaya Allah itu ada karena aku tidak bisa melihat Allah memakai mataku sendiri." Bagaimana cara kamu menjelaskan secara logis menggunakan contoh benda di sekitar bahwa Allah itu benar-benar ada?'
        alias={["meja", "tukang", "cipta", "alam", "khalik", "pencipta"]}
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
        soal="Ketika bel istirahat berbunyi, Tono melihat bekal makanan milik Made tertinggal di rumah. Sikap terpuji yang mencerminkan rasa kasih sayang bersaudara adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Memakan bekal sendiri di pojok kelas agar tidak ketahuan Made.",
          },
          {
            huruf: "B",
            teks: "Menghampiri Made dan mengajaknya berbagi makanan bersama dengan gembira.",
          },
          { huruf: "C", teks: "Mengejek Made karena pelupa." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Saat Ibu Guru sedang menjelaskan materi pelajaran di depan kelas, tindakan sopan santun yang wajib dilakukan oleh siswa kelas 2 adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Mengobrol dengan teman sebangku membahas mainan baru.",
          },
          {
            huruf: "B",
            teks: "Duduk dengan rapi, menyimak penjelasan guru dengan tenang, dan tidak membuat gaduh.",
          },
          {
            huruf: "C",
            teks: "Menggambar di buku tulis tanpa memperhatikan papan tulis.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Kita diperbolehkan berbicara dengan nada suara yang keras dan membentak orang tua jika keinginan kita tidak dituruti."
        benar="salah"
        alasanBenar="anak terpuji berbicara lembut dan patuh, ridha Allah pada ridha orang tua"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Menjaga kerukunan antar teman di sekolah termasuk ke dalam wujud meneladani akhlak Rasulullah SAW."
        benar="benar"
        alasanBenar="rasul mengajarkan menyayangi saudara seperti menyayangi diri sendiri"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus pada pasangan yang cocok."
        pasangan={[
          {
            kiri: "Mencium tangan Ayah sebelum pergi",
            kanan: [
              "Sopan santun kepada Guru.",
              "Sopan santun kepada Orang Tua.",
              "Perilaku Tercela (Mazmumah).",
            ],
          },
          {
            kiri: "Mengangkat tangan sebelum bertanya",
            kanan: [
              "Sopan santun kepada Guru.",
              "Sopan santun kepada Orang Tua.",
              "Perilaku Tercela (Mazmumah).",
            ],
          },
          {
            kiri: "Mengejek nama orang tua teman",
            kanan: [
              "Sopan santun kepada Guru.",
              "Sopan santun kepada Orang Tua.",
              "Perilaku Tercela (Mazmumah).",
            ],
          },
        ]}
        kunci={{
          "Mencium tangan Ayah sebelum pergi": "Sopan santun kepada Orang Tua.",
          "Mengangkat tangan sebelum bertanya": "Sopan santun kepada Guru.",
          "Mengejek nama orang tua teman": "Perilaku Tercela (Mazmumah).",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa menghormati dan mematuhi nasihat guru di sekolah dinilai sangat penting bagi keberhasilan belajar seorang murid? Jelaskan dampak baiknya bagi ilmu yang kamu dapatkan!"
        alias={["berkah", "manfaat", "ilmu", "berhasil", "hormat", "simak"]}
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
        soal="Di bawah ini yang termasuk ke dalam perkara yang dapat membatalkan keabsahan wudu seorang muslim adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Makan kurma setelah wudu." },
          {
            huruf: "B",
            teks: "Mengeluarkan gas dari dubur (buang angin/kentut).",
          },
          { huruf: "C", teks: "Berbicara dengan teman sekelas." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Batasan membasuh tangan yang wajib menurut rukun wudu adalah sampai ke..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Pergelangan tangan saja." },
          { huruf: "B", teks: "Siku tangan." },
          { huruf: "C", teks: "Pundak atas." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Membasuh kedua telinga luar dan dalam termasuk ke dalam Rukun Wudu yang wajib dilakukan dan tidak boleh ditinggalkan."
        benar="salah"
        alasanBenar="telinga termasuk sunah, rukunnya mengusap sebagian kepala"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Saat berwudu kita disunahkan untuk mendahulukan anggota tubuh bagian kanan daripada bagian kiri."
        benar="benar"
        alasanBenar="sunah wudu mendahulukan kanan lalu kiri"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan urutan gerakan
      </h5>
      <KuisUrut
        id={idEval(modulId, 4)}
        soal="Tulis nomor urut 1 sampai 4 sesuai urutan wudu yang benar."
        butir={[
          "Membasuh kedua kaki sampai mata kaki.",
          "Membaca niat wudu dan membasuh seluruh wajah.",
          "Mengusap sebagian kepala dan telinga.",
          "Membasuh kedua tangan sampai siku-siku.",
        ]}
        kunci={{
          "Membasuh kedua kaki sampai mata kaki.": "4",
          "Membaca niat wudu dan membasuh seluruh wajah.": "1",
          "Mengusap sebagian kepala dan telinga.": "3",
          "Membasuh kedua tangan sampai siku-siku.": "2",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa Islam mengajarkan umatnya untuk sangat berhemat dalam menggunakan air ketika berwudu, walaupun air di tempat wudu tersebut sangat melimpah? Jelaskan kaitannya dengan perilaku peduli lingkungan!"
        alias={["hemat", "boros", "lingkung", "allah", "air", "cukup"]}
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
        soal="Ketika diperintahkan Allah untuk membuat bahtera di atas bukit, kaum Nabi Nuh As. yang ingkar menertawakan dan mengejeknya. Sikap Nabi Nuh As. dalam menghadapi hinaan tersebut adalah..."
        benar="C"
        pilihan={[
          {
            huruf: "A",
            teks: "Membalas mengejek dan melempar batu kepada mereka.",
          },
          {
            huruf: "B",
            teks: "Berhenti membuat kapal karena malu diejek orang banyak.",
          },
          {
            huruf: "C",
            teks: "Tetap sabar, tabah, dan terus bekerja keras menuntaskan perintah Allah.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Makhluk apa saja yang diperintahkan Allah untuk ikut masuk ke dalam bahtera Nabi Nuh As. agar selamat dari bencana banjir besar?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Hanya manusia yang kaya dan memiliki rumah mewah.",
          },
          {
            huruf: "B",
            teks: "Orang-orang yang beriman kepada Allah serta berpasang-pasangan hewan jantan dan betina.",
          },
          { huruf: "C", teks: "Semua patung berhala milik kaum kafir." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Nabi Nuh As. mengajarkan kepada kita bahwa kesuksesan dan keselamatan hidup hanya bisa dicapai melalui perpaduan doa dan kerja keras yang nyata."
        benar="benar"
        alasanBenar="nabi nuh berdoa dan tetap merakit kapal siang malam sampai selesai"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Kan'an, anak Nabi Nuh, selamat dari terjangan banjir besar karena ia berlari memanjat ke atas puncak gunung yang sangat tinggi."
        benar="salah"
        alasanBenar="kan'an durhaka dan tenggelam, gunung tidak menyelamatkannya"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan kategori tokoh
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus ke sifat tokoh yang tepat."
        pasangan={[
          {
            kiri: "Nabi Nuh As.",
            kanan: [
              "Durhaka, sombong, dan menolak ajaran iman.",
              "Sabar, taat, dan pekerja keras.",
              "Membangkang nasihat ayah dan tenggelam.",
            ],
          },
          {
            kiri: "Kan'an",
            kanan: [
              "Durhaka, sombong, dan menolak ajaran iman.",
              "Sabar, taat, dan pekerja keras.",
              "Membangkang nasihat ayah dan tenggelam.",
            ],
          },
          {
            kiri: "Kaum Kafir",
            kanan: [
              "Durhaka, sombong, dan menolak ajaran iman.",
              "Sabar, taat, dan pekerja keras.",
              "Membangkang nasihat ayah dan tenggelam.",
            ],
          },
        ]}
        kunci={{
          "Nabi Nuh As.": "Sabar, taat, dan pekerja keras.",
          "Kan'an": "Membangkang nasihat ayah dan tenggelam.",
          "Kaum Kafir": "Durhaka, sombong, dan menolak ajaran iman.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Jelaskan mengapa sifat malas dan mudah menyerah saat belajar dinilai sangat bertentangan dengan keteladanan yang dicontohkan oleh Nabi Nuh As. saat merakit bahtera raksasa di atas bukit!"
        alias={["kerja", "keras", "bahtera", "menyerah", "malas", "usaha"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "pai-2-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "pai-2-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "pai-2-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  if (modul.id === "pai-2-bab4") return <EvaluasiBab4 modulId={modul.id} />;
  return <EvaluasiBab5 modulId={modul.id} />;
}

export default function NaskahPai2({
  modul,
  kelas = "2 SD",
  kelamin,
}: {
  modul: ModulResmiPai;
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const [kartuA, kartuB, kartuC] = modul.kartu;
  const aliasTulisC = kumpulkanAlias(kartuC.kuis.flatMap((item) => item.alias));

  return (
    <div className="space-y-5">
      {[kartuA, kartuB].map((kartu) => {
        const info = INFOGRAFIS[`${modul.id}-${kartu.kode}`];
        return (
          <KartuBingkai key={kartu.kode}>
            <DoodleKartuAtasJudul
              id={`${modul.id}-${kartu.kode}`}
              folder="doodle-pai"
              alt={`Ilustrasi ${kartu.judul}`}
            />
            <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
              {kartu.judul}
            </h4>
            <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
              PAI · Kelas 2 SD · {modul.judul}
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
                  {item.arab ? (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arab mt-2 text-right text-2xl font-black text-[#1C01A5]"
                    >
                      {item.arab}
                    </p>
                  ) : null}
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
          folder="doodle-pai"
          alt={`Ilustrasi ${kartuC.judul}`}
        />
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuC.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          PAI · Kelas 2 SD · {modul.judul}
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
    </div>
  );
}
