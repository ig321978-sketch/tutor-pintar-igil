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
            Cakrawala literasi
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
          pesanSalah="Jodohkan setiap kata ke arti atau jenis yang tepat."
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
  "bindo-2-bab1-A": {
    judul: "Roda perasaan anak hebat",
    kepala: ["Kelompok", "Perasaan", "Tanda di tubuh"],
    baris: [
      ["Emosi nyaman", "Gembira", "Senyum lebar, dada hangat"],
      ["Emosi nyaman", "Bangga", "Tubuh tegap saat berprestasi"],
      ["Emosi menantang", "Sedih · Marah", "Air mata · tinju mengepal"],
    ],
    catatan:
      "Semua perasaan itu normal dan boleh dirasakan. Yang penting, kita tahu cara mengungkapkannya lewat kata-kata yang baik tanpa menyakiti teman.",
  },
  "bindo-2-bab1-B": {
    judul: "Rambu-rambu huruf kapital",
    kepala: ["Rambu", "Tempat menyala", "Contoh"],
    baris: [
      ["Rambu 1", "Awal kalimat", "Kita harus selalu jujur."],
      ["Rambu 2", "Nama orang", "Ali, Nia, Made, Joko"],
      ["Rambu 3", "Nama tempat", "Sekolah Nasional, Jakarta"],
    ],
    catatan:
      "Kosakata baru membantu kita menulis cerita lebih seru. Gundah artinya sedih dan gelisah. Girang artinya sangat gembira.",
  },
  "bindo-2-bab2-A": {
    judul: "Jalur tanda baca utama",
    kepala: ["Tanda", "Jenis kalimat", "Contoh"],
    baris: [
      ["Tanda tanya ?", "Kalimat tanya", "Apakah kamu sudah mencuci tangan?"],
      ["Tanda seru !", "Kalimat perintah", "Bersihkan bak mandi itu sekarang!"],
      ["ADIKSIMBA", "Kata tanya", "Apa, di mana, kapan, siapa, mengapa, bagaimana"],
    ],
    catatan:
      "Kalimat tanya mencari informasi. Kalimat perintah menyuruh dengan tegas, tetapi tetap sopan.",
  },
  "bindo-2-bab2-B": {
    judul: "Formula kalimat ajakan",
    kepala: ["Bagian", "Isi", "Contoh sehat"],
    baris: [
      ["Kata kunci", "Ayo atau Mari", "Ayo, kita berolahraga pagi!"],
      ["Tanda akhir", "Tanda seru !", "Mari, kita makan buah setiap hari!"],
      ["Etika", "Sukarela, tanpa paksaan", "Ayo, kita bersihkan saluran air!"],
    ],
    catatan:
      "Kalimat ajakan mengajak orang lain melakukan hal baik secara sukarela, tanpa paksaan atau ancaman.",
  },
  "bindo-2-bab3-A": {
    judul: "Makna warna rambu jalan",
    kepala: ["Warna", "Arti", "Contoh"],
    baris: [
      ["Merah", "Larangan", "Huruf P dicoret: dilarang parkir"],
      ["Kuning", "Peringatan", "Jalan berkelok atau licin"],
      ["Biru", "Perintah / petunjuk", "Orang menyeberang, rumah sakit"],
    ],
    catatan:
      "Membaca rambu sama dengan membaca tulisan. Rambu membantu pengguna jalan agar terhindar dari bahaya kecelakaan.",
  },
  "bindo-2-bab3-B": {
    judul: "Kunci membaca denah",
    kepala: ["Kunci", "Isi", "Contoh kata"],
    baris: [
      ["Arah utama", "Atas utara, bawah selatan", "Kanan timur, kiri barat"],
      ["Kata penunjuk", "Posisi di peta kecil", "Di seberang, di sebelah kanan, di antara"],
      ["Denah", "Gambar letak tempat", "Toko di seberang puskesmas"],
    ],
    catatan:
      "Denah adalah gambar yang menunjukkan lokasi suatu tempat. Membaca denah melatih konsentrasi dan ketelitian.",
  },
  "bindo-2-bab4-A": {
    judul: "Pasar kata jual beli",
    kepala: ["Kosakata", "Arti", "Ingat"],
    baris: [
      ["Penjual", "Menawarkan barang", "Di kantin atau pasar seni"],
      ["Pembeli", "Menukar uang dengan barang", "Ali yang membayar"],
      ["Harga", "Nilai uang yang dibayar", "Hemat: kebutuhan dulu"],
    ],
    catatan:
      "Menabung artinya menyisihkan sebagian uang saku di celengan. Hemat artinya menggunakan uang sesuai kebutuhan, bukan keinginan saja.",
  },
  "bindo-2-bab4-B": {
    judul: "Struktur dongeng fabel",
    kepala: ["Bagian", "Isi", "Contoh"],
    baris: [
      ["Tokoh utama", "Hewan yang berbicara", "Kancil, semut, lebah, kura-kura"],
      ["Amanat", "Pesan moral di akhir", "Rajin menabung makanan"],
      ["Bukan fabel", "Cerita manusia", "Malin Kundang"],
    ],
    catatan:
      "Tokoh hewan dalam fabel mewakili sifat manusia. Ada yang rajin, cerdik, malas, atau sombong. Tugas kita meniru sifat baiknya!",
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
        soal="Tono meremas kertas gambarnya karena tidak bisa menggambar mobil seindah gambar Made. Tangan Tono mengepal dan wajahnya cemberut. Perasaan yang sedang dialami oleh Tono adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Bangga" },
          { huruf: "B", teks: "Marah" },
          { huruf: "C", teks: "Girang" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Perhatikan penulisan kalimat-kalimat di bawah ini! Penulisan kalimat yang paling benar sesuai penggunaan huruf kapital adalah..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "Nia dan ali belajar di perpustakaan Kota Batam." },
          { huruf: "B", teks: "Nia dan Ali belajar di perpustakaan kota Batam." },
          { huruf: "C", teks: "Nia dan Ali belajar di Perpustakaan Kota Batam." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal='Kata "gundah" memiliki arti yang sama (sinonim) dengan kata "sangat gembira dan riang".'
        benar="salah"
        alasanBenar="gundah artinya sedih dan gelisah, bukan gembira"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Huruf pertama dari nama bulan (seperti Januari, Februari) wajib ditulis menggunakan huruf kapital."
        benar="benar"
        alasanBenar="nama bulan ditulis dengan huruf kapital seperti nama orang dan tempat"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus pada pasangan yang cocok."
        pasangan={[
          {
            kiri: "Girang",
            kanan: [
              "Perasaan takut yang amat sangat.",
              "Sangat gembira atau gembira sekali.",
              "Kalimat yang menggunakan huruf kapital dengan benar.",
            ],
          },
          {
            kiri: "Ngeri",
            kanan: [
              "Perasaan takut yang amat sangat.",
              "Sangat gembira atau gembira sekali.",
              "Kalimat yang menggunakan huruf kapital dengan benar.",
            ],
          },
          {
            kiri: '"Adik menangis."',
            kanan: [
              "Perasaan takut yang amat sangat.",
              "Sangat gembira atau gembira sekali.",
              "Kalimat yang menggunakan huruf kapital dengan benar.",
            ],
          },
        ]}
        kunci={{
          Girang: "Sangat gembira atau gembira sekali.",
          Ngeri: "Perasaan takut yang amat sangat.",
          '"Adik menangis."': "Kalimat yang menggunakan huruf kapital dengan benar.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa mengenali dan mampu menyebutkan perasaan diri sendiri dengan tepat menggunakan bahasa yang santun dinilai sangat penting dalam menjaga kerukunan berteman di sekolah? Jelaskan analisis kritismu!"
        alias={["santun", "teman", "rukun", "bicara", "marah", "pukul", "paham"]}
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
        soal="Ibu melihat genangan air di halaman rumah yang bisa menjadi sarang nyamuk demam berdarah. Ibu ingin memerintahkan Ali untuk mengurasnya. Kalimat perintah Ibu yang paling tepat adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Mengapa Ali tidak menguras genangan air itu?" },
          { huruf: "B", teks: "Ali, tolong kuras genangan air di halaman itu sekarang!" },
          { huruf: "C", teks: "Mari kita lihat genangan air di halaman, Ali." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Kalimat di bawah ini yang dikategorikan sebagai kalimat ajakan untuk hidup sehat adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Bersihkan kamarmu!" },
          { huruf: "B", teks: "Ayo, kita cuci tangan menggunakan sabun sebelum makan!" },
          { huruf: "C", teks: "Siapa yang belum mandi pagi ini?" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal='Kalimat "Tutup keran air itu setelah bak mandi penuh!" adalah contoh kalimat tanya karena membutuhkan jawaban.'
        benar="salah"
        alasanBenar="itu kalimat perintah yang diakhiri tanda seru, menyuruh melakukan sesuatu"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal='Penggunaan kata tanya "Mengapa" berfungsi untuk menanyakan lokasi atau tempat terjadinya suatu peristiwa kesehatan.'
        benar="salah"
        alasanBenar="mengapa menanyakan alasan, sedangkan di mana menanyakan tempat"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan jalur tanda baca
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus pada pasangan yang cocok."
        pasangan={[
          {
            kiri: "Kapan kita harus memotong kuku",
            kanan: [
              "Kalimat Ajakan (Tanda !)",
              "Kalimat Perintah (Tanda !)",
              "Kalimat Tanya (Tanda ?)",
            ],
          },
          {
            kiri: "Mari kita berolahraga teratur",
            kanan: [
              "Kalimat Ajakan (Tanda !)",
              "Kalimat Perintah (Tanda !)",
              "Kalimat Tanya (Tanda ?)",
            ],
          },
          {
            kiri: "Buang sampah itu pada tempatnya",
            kanan: [
              "Kalimat Ajakan (Tanda !)",
              "Kalimat Perintah (Tanda !)",
              "Kalimat Tanya (Tanda ?)",
            ],
          },
        ]}
        kunci={{
          "Kapan kita harus memotong kuku": "Kalimat Tanya (Tanda ?)",
          "Mari kita berolahraga teratur": "Kalimat Ajakan (Tanda !)",
          "Buang sampah itu pada tempatnya": "Kalimat Perintah (Tanda !)",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Mengapa teks prosedur atau petunjuk cara mencuci tangan yang benar selalu menggunakan kalimat perintah secara berurutan (tertib)? Apa dampaknya jika urutan langkah tersebut diacak secara sembarangan? Jelaskan pendapat kritismu!"
        alias={["urut", "tertib", "kuman", "bersih", "langkah", "acak"]}
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
        soal="Nia ingin menyeberang jalan dengan aman saat pulang sekolah. Rambu petunjuk tempat penyeberangan pejalan kaki (zebra cross) biasanya memiliki warna dasar yaitu..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Merah menyala" },
          { huruf: "B", teks: "Biru terang" },
          { huruf: "C", teks: "Kuning tua" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal='Perhatikan teks petunjuk lokasi berikut: "Puskesmas terletak di Jalan Melati. Di sebelah kiri puskesmas adalah Bank Desa, dan di seberang jalannya adalah Alun-Alun." Berdasarkan informasi teks tersebut, bangunan yang berada tepat di depan Puskesmas adalah...'
        benar="C"
        pilihan={[
          { huruf: "A", teks: "Bank Desa" },
          { huruf: "B", teks: "Jalan Melati" },
          { huruf: "C", teks: "Alun-Alun" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Rambu lalu lintas yang menampilkan gambar jalan licin dengan warna dasar kuning bertugas memberikan larangan agar kendaraan tidak boleh lewat."
        benar="salah"
        alasanBenar="rambu kuning artinya peringatan agar waspada, bukan larangan lewat"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Menyeberang jalan raya secara sembarangan tanpa menggunakan jembatan penyeberangan termasuk tindakan melanggar aturan keselamatan jalan."
        benar="benar"
        alasanBenar="menyeberang harus di tempat aman agar tidak celaka"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan simbol rambu
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tuliskan pasangan yang sesuai dengan deskripsi rambu."
        pasangan={[
          {
            kiri: "Lingkaran merah bertanda strip putih horizontal.",
            kanan: [
              "Peringatan daerah rawan longsor / batu jatuh.",
              "Larangan masuk bagi semua kendaraan.",
              "Petunjuk adanya lokasi rumah sakit.",
            ],
          },
          {
            kiri: "Segitiga kuning bergambar tebing longsor.",
            kanan: [
              "Peringatan daerah rawan longsor / batu jatuh.",
              "Larangan masuk bagi semua kendaraan.",
              "Petunjuk adanya lokasi rumah sakit.",
            ],
          },
          {
            kiri: "Kotak biru bergambar tempat tidur dengan palang merah.",
            kanan: [
              "Peringatan daerah rawan longsor / batu jatuh.",
              "Larangan masuk bagi semua kendaraan.",
              "Petunjuk adanya lokasi rumah sakit.",
            ],
          },
        ]}
        kunci={{
          "Lingkaran merah bertanda strip putih horizontal.":
            "Larangan masuk bagi semua kendaraan.",
          "Segitiga kuning bergambar tebing longsor.":
            "Peringatan daerah rawan longsor / batu jatuh.",
          "Kotak biru bergambar tempat tidur dengan palang merah.":
            "Petunjuk adanya lokasi rumah sakit.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Tuliskan sebuah paragraf pendek (3-4 kalimat) yang menjelaskan rute atau petunjuk arah dari ruang kelasmu menuju ke kantin sekolah secara logis menggunakan kosakata penunjuk arah yang tepat (seperti: belok kanan, lurus, melewati)!"
        alias={["belok", "lurus", "kanan", "kiri", "melewati", "kantin"]}
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
        soal="Nia membuat kerajinan celengan dari botol bekas lalu menjualnya di pasar seni sekolah. Ali datang memberikan uang dua ribu rupiah untuk mendapatkan celengan Nia. Dalam kegiatan ini, posisi Ali bertindak sebagai..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Penjual" },
          { huruf: "B", teks: "Pembeli" },
          { huruf: "C", teks: "Produsen" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Di akhir sebuah cerita fabel, sang Serigala menangis kelaparan di musim dingin karena saat musim panas ia hanya malas-malasan dan menolak ajaran Semut untuk mengumpulkan makanan. Amanat pesan moral dari fabel tersebut adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Kita harus menjauhi musim dingin agar tidak kedinginan." },
          {
            huruf: "B",
            teks: "Sifat malas di masa muda akan mendatangkan kerugian dan penyesalan di masa depan.",
          },
          { huruf: "C", teks: "Semut adalah hewan yang jahat karena tidak membagi makanan." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Menabung memiliki arti yang sama dengan menghabiskan semua uang saku untuk membeli mainan robot secara boros."
        benar="salah"
        alasanBenar="menabung artinya menyisihkan uang, bukan menghabiskannya secara boros"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Cerita rakyat Malin Kundang dikategorikan sebagai cerita fabel karena menceritakan asal-usul sebuah batu di Sumatra."
        benar="salah"
        alasanBenar="malin kundang adalah cerita rakyat tentang manusia, bukan fabel hewan"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan watak tokoh fabel
      </h5>
      <KuisJodoh
        id={idEval(modulId, 4)}
        soal="Tariklah garis lurus ke sifat yang tepat."
        pasangan={[
          {
            kiri: "Kura-Kura Lambat",
            kanan: [
              "Cerdik, pintar mencari jalan keluar, penyayang.",
              "Sombong, meremehkan kekuatan lawan, cepat menyerah.",
              "Sabar, gigih, bertekad kuat menuntaskan tugas.",
            ],
          },
          {
            kiri: "Kancil",
            kanan: [
              "Cerdik, pintar mencari jalan keluar, penyayang.",
              "Sombong, meremehkan kekuatan lawan, cepat menyerah.",
              "Sabar, gigih, bertekad kuat menuntaskan tugas.",
            ],
          },
          {
            kiri: "Kelinci Pelari",
            kanan: [
              "Cerdik, pintar mencari jalan keluar, penyayang.",
              "Sombong, meremehkan kekuatan lawan, cepat menyerah.",
              "Sabar, gigih, bertekad kuat menuntaskan tugas.",
            ],
          },
        ]}
        kunci={{
          "Kura-Kura Lambat": "Sabar, gigih, bertekad kuat menuntaskan tugas.",
          Kancil: "Cerdik, pintar mencari jalan keluar, penyayang.",
          "Kelinci Pelari": "Sombong, meremehkan kekuatan lawan, cepat menyerah.",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        D. Esai pendek analisis
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal='Bacalah kutipan: "Si Belalang Kelaparan mengetuk pintu rumah Semut." Tuliskan kalimat tanggapan yang paling santun dan mencerminkan budi pekerti luhur jika kamu menjadi sosok Semut!'
        alias={["silakan", "mari", "bagi", "makan", "tolong", "rajin", "santun", "masuk"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "bindo-2-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "bindo-2-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "bindo-2-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  return <EvaluasiBab4 modulId={modul.id} />;
}

export default function NaskahBindo2({
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
              folder="doodle-bindo"
              alt={`Ilustrasi ${kartu.judul}`}
            />
            <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
              {kartu.judul}
            </h4>
            <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
              Bahasa Indonesia · Kelas 2 SD · {modul.judul}
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
          folder="doodle-bindo"
          alt={`Ilustrasi ${kartuC.judul}`}
        />
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuC.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Bahasa Indonesia · Kelas 2 SD · {modul.judul}
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
            folder="doodle-bindo"
            alt={`Ilustrasi ${kartuD.judul}`}
          />
          <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
            {kartuD.judul}
          </h4>
          <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
            Bahasa Indonesia · Kelas 2 SD · {modul.judul}
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
