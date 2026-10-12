"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BACA = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh"];

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <p className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join("")}
    </p>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK1_BAB1.id, "D", indeks);
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah="Coba hitung lagi permennya." />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  alias,
  anak,
  ketat = false,
}: {
  indeks: number;
  soal: string;
  alias: string[];
  anak?: ReactNode;
  ketat?: boolean;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const rapat = isi.trim().toLowerCase().replace(/\s+/g, " ");
    const ok = alias.some((kata) => {
      const kunci = kata.toLowerCase();
      return ketat ? rapat === kunci : rapat.includes(kunci);
    });
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

function JurnalPermenSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Seru sekali, sekarang aku sudah bisa menghitung maju mundur sampai angka 10!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung saat mencari pasangan angka yang nilainya besar." },
    { id: "susah", ikon: "😢", teks: "Aku masih butuh bantuan tutor untuk menulis lambang angka 6 sampai 10." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar berpetualang dengan permen warna-warni Sani hari ini? Ketuk satu wajah.
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

function AktivitasDetektif() {
  const kuis = useKuisMateri();
  const [jumlahA, setJumlahA] = useState("");
  const [hurufA, setHurufA] = useState("");
  const [jumlahB, setJumlahB] = useState("");
  const [banding, setBanding] = useState("");
  const [kiri, setKiri] = useState("");
  const [kanan, setKanan] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const a = jumlahA.trim().toLowerCase();
    const b = jumlahB.trim().toLowerCase();
    const kata = hurufA.trim().toLowerCase();
    const band = banding.trim().toLowerCase();
    const pecah = [kiri.trim(), kanan.trim()].map((item) => item.toLowerCase()).sort();
    const okA = a === "6" || a === "enam";
    const okHuruf = kata.includes("enam");
    const okB = b === "4" || b === "empat";
    const okBand = band.includes("sedikit") && !band.includes("banyak");
    const okPecah = pecah[0] === "2" && pecah[1] === "2";
    if (okA && okHuruf && okB && okBand && okPecah) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB1.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB1.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB1.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Detektif Permen Manis</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bantu Sani menghitung dan memisahkan permen di atas meja. Tunjuk satu per satu, lalu tulis jawabannya.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white px-3 py-3">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Kelompok Permen A</p>
          <IkonUlang ikon="🍬" jumlah={6} />
        </div>
        <div className="rounded-xl bg-white px-3 py-3">
          <p className="text-xs font-black uppercase text-[#166534]">Kelompok Permen B</p>
          <IkonUlang ikon="🟢" jumlah={4} />
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa jumlah permen biru di kelompok A?
          <input
            value={jumlahA}
            onChange={(e) => setJumlahA(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="........ permen"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Nama tulisan huruf dari lambang kelompok A
          <input
            value={hurufA}
            onChange={(e) => setHurufA(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="enam"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa jumlah permen hijau di kelompok B?
          <input
            value={jumlahB}
            onChange={(e) => setJumlahB(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="........ permen"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Kantong B isinya lebih ........ (banyak / sedikit) daripada kantong A
          <input
            value={banding}
            onChange={(e) => setBanding(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="text-sm font-bold text-[#1C01A5]">
            Kantong kecil pertama
            <input
              value={kiri}
              onChange={(e) => setKiri(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            />
          </label>
          <label className="text-sm font-bold text-[#1C01A5]">
            Kantong kecil kedua
            <input
              value={kanan}
              onChange={(e) => setKanan(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            />
          </label>
        </div>
        <p className="text-xs font-semibold text-slate-600">
          Jika 4 permen di kelompok B diurai menjadi dua kantong kecil yang sama rata.
        </p>
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
          cuplikan={[jumlahA, hurufA, jumlahB, banding, kiri, kanan].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung lagi: kelompok A ada 6, kelompok B ada 4 dan lebih sedikit."
        />
      </div>
    </div>
  );
}

function KuisAturan() {
  const kuis = useKuisMateri();
  const butir = [
    {
      soal: "1. Lima permen ditulis dengan lambang berapa?",
      pilihan: ["4", "5", "6"],
      benar: "5",
    },
    {
      soal: "2. Empat permen merah dibanding dua permen hijau. Permen merah...",
      pilihan: ["lebih banyak", "lebih sedikit", "sama banyak"],
      benar: "lebih banyak",
    },
    {
      soal: "3. Angka 3 dan angka 2 adalah pasangan pembentuk angka...",
      pilihan: ["4", "5", "6"],
      benar: "5",
    },
  ] as const;
  const [pilihan, setPilihan] = useState<Record<number, string>>({});

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Empat aturan permen</p>
      {butir.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK1_BAB1.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article key={item.soal} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-semibold text-slate-700">{item.soal}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.pilihan.map((angka) => (
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
              <HasilJawabanKuis status={status} cuplikan={ketuk || undefined} pesanSalah="Coba pilihan yang lain." />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function KuisMundur() {
  const kuis = useKuisMateri();
  const id = idEvaluasi(6);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const salin = isi.toLowerCase();
    const ada = (angka: string, kata: string) => new RegExp(`\\b${angka}\\b`).test(salin) || new RegExp(`\\b${kata}\\b`).test(salin);
    const ok = ada("2", "dua") && ada("4", "empat") && !ada("1", "satu") && !ada("3", "tiga");
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        7. Tuliskan nomor aktivitas yang termasuk Menghitung Mundur.
      </p>
      <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
        <li>(1) Sani: 3, 4, 5, 6</li>
        <li>(2) Riko: 5, 4, 3, 2</li>
        <li>(3) Lani: 1, 2, 3, 4</li>
        <li>(4) Dodi: 4, 3, 2, 1</li>
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder="nomor ........ dan ........"
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
        <HasilJawabanKuis status={status} cuplikan={isi.trim() || undefined} pesanSalah="Cari urutan yang angkanya makin kecil." />
      </div>
    </article>
  );
}

function KuisCocok() {
  const kuis = useKuisMateri();
  const id = idEvaluasi(7);
  const [satu, setSatu] = useState("");
  const [dua, setDua] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const huruf = (teks: string) => {
      const rapat = teks.trim().toLowerCase();
      if (/\bb\b/.test(rapat) || rapat.includes("maju")) return "b";
      if (/\ba\b/.test(rapat) || rapat.includes("mundur")) return "a";
      return "";
    };
    if (huruf(satu) === "b" && huruf(dua) === "a") {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        8. Cocokkan kisah hitung permen dengan istilahnya.
      </p>
      <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
        <p>(1) Angka melompat berurutan menjadi semakin besar.</p>
        <p>A. Hitung Mundur</p>
        <p>(2) Angka berjalan turun menjadi semakin kecil.</p>
        <p>B. Hitung Maju</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Kisah (1) berpasangan dengan huruf
          <input
            value={satu}
            onChange={(e) => setSatu(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Kisah (2) berpasangan dengan huruf
          <input
            value={dua}
            onChange={(e) => setDua(e.target.value)}
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
          cuplikan={[satu, dua].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Makin besar itu maju. Makin kecil itu mundur."
        />
      </div>
    </article>
  );
}

function LembarKerjaSani() {
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
          soal='1. Sani menunjuk 5 permen sambil berkata: "Satu, dua, tiga, lima! Ada 5 permen!" Angka berapakah yang lupa diucapkan Sani?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Angka 2" },
            { huruf: "B", teks: "Angka 4" },
            { huruf: "C", teks: "Angka 3" },
          ]}
          anak={<IkonUlang ikon="🍬" jumlah={5} />}
        />
        <KuisPilih
          indeks={1}
          soal="2. Siti punya 6 permen dan ingin membaginya sama banyak kepada dua adik. Kombinasi yang paling tepat adalah..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Kantong pertama 4, kantong kedua 2." },
            { huruf: "B", teks: "Kantong pertama 3, kantong kedua 3." },
            { huruf: "C", teks: "Kantong pertama 5, kantong kedua 1." },
          ]}
          anak={<IkonUlang ikon="🍬" jumlah={6} />}
        />
        <KuisPilih
          indeks={2}
          soal="3. Mangkuk Sani berisi 7 permen. Mangkuk Riko berisi 4 permen. Agar sama banyak dengan Riko, Sani harus..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Mengeluarkan 3 butir permen dari mangkuknya." },
            { huruf: "B", teks: "Menambahkan 3 butir permen lagi." },
            { huruf: "C", teks: "Memindahkan semua permen Riko ke mangkuknya." },
          ]}
          anak={
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-xs font-black text-[#1C01A5]">🥣 Mangkuk Sani · 7</p>
                <IkonUlang ikon="🍬" jumlah={7} ukuran="text-xl" />
              </div>
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-xs font-black text-[#1C01A5]">🥣 Mangkuk Riko · 4</p>
                <IkonUlang ikon="🍬" jumlah={4} ukuran="text-xl" />
              </div>
            </div>
          }
        />
        <KuisPilih
          indeks={3}
          soal="4. Ada 8 permen hijau. Lambang angka dan nama bilangan yang tepat adalah..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Angka 6 dibaca ENAM" },
            { huruf: "B", teks: "Angka 8 dibaca DELAPAN" },
            { huruf: "C", teks: "Angka 7 dibaca TUJUH" },
          ]}
          anak={<IkonUlang ikon="🟢" jumlah={8} />}
        />
        <KuisPilih
          indeks={4}
          soal="5. Hitung mundur: 7 ➔ 6 ➔ 5 ➔ [🌟] ➔ 3. Angka rahasia pada bintang adalah..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Angka 4" },
            { huruf: "B", teks: "Angka 2" },
            { huruf: "C", teks: "Angka 1" },
          ]}
          anak={
            <div className="flex flex-wrap items-center gap-2 text-sm font-black text-[#1C01A5]">
              {["7", "6", "5", "🌟", "3"].map((petak) => (
                <span
                  key={petak}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-2 ${
                    petak === "🌟"
                      ? "border-2 border-dashed border-[#F0AB00] bg-white"
                      : "bg-[#1C01A5] text-white"
                  }`}
                >
                  {petak}
                </span>
              ))}
            </div>
          }
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Kelompok benda yang jumlahnya persis sama disebut:"
          alias={["sama banyak"]}
        />
        <KuisMundur />
        <KuisCocok />
        <KuisIsian
          indeks={8}
          soal="9. Pasangan angka 4. Kantong kiri berisi 1 permen. Kantong kanan harus berisi berapa?"
          alias={["3", "tiga"]}
          ketat
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              4 = 🍬 1 + 🍬 ?
            </p>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Kantong permen kuning: 4, 3, dan 2. Berapa jumlah seluruhnya?"
          alias={["9", "sembilan"]}
          ketat
          anak={
            <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <p>🍬🍬🍬🍬 · 4</p>
              <p>🍬🍬🍬 · 3</p>
              <p>🍬🍬 · 2</p>
            </div>
          }
        />
      </section>
    </div>
  );
}

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB1;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🍬🎁
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuA.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Ayo Membilang sampai dengan 10</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)}
          />
        </div>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menghitung, membaca, dan menulis angka 1 sampai 10 lewat benda di sekitarku.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa membandingkan banyak benda serta menghitung maju dan mundur dengan tepat.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menemukan pasangan bilangan pembentuk angka dengan mudah.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Kotak Mainan dari Paman
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Hari ini, Paman datang membawa sebuah kotak hadiah besar untuk Sani. Saat kotaknya dibuka,
              mata Sani takjub melihat isinya.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🍬🍬🍬🟢🟢🔵
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ada permen merah di wadah plastik, permen hijau yang berkumpul rapi, dan beberapa permen
              biru di atas meja.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Wah, permennya banyak sekali! Warnanya beda-beda, ada yang kelompoknya banyak dan ada yang
              sedikit.”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani menghitung, mengurutkan, dan memisahkan permen-permen ini ke dalam kantongnya!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} hanyaKanvas />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍬🔢
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
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuB.pengantar}</p>
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Lambang dan Nilai Permen
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
            <span>🍬 Permen</span>
            <span>Lambang</span>
            <span>Dibaca</span>
          </div>
          {BACA.slice(1).map((nama, i) => (
            <div
              key={nama}
              className={`grid grid-cols-3 items-center border-t border-[#F0AB00]/40 px-3 py-2 text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              <span>{Array.from({ length: i + 1 }, () => "🍬").join("")}</span>
              <span className="text-lg font-black text-[#1C01A5]">{i + 1}</span>
              <span>{nama}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#E23B3B]/30 bg-[#FFF1F2] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9F1239]">Wadah permen merah · 4</p>
            <IkonUlang ikon="🍬" jumlah={4} />
            <p className="text-sm font-bold text-slate-700">Lebih banyak</p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/30 bg-[#F0FDF4] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#166534]">Wadah permen hijau · 2</p>
            <IkonUlang ikon="🟢" jumlah={2} />
            <p className="text-sm font-bold text-slate-700">Lebih sedikit</p>
          </article>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            Hitung maju dan mundur
          </p>
          <p className="border-b border-[#1C01A5]/10 px-3 py-3 text-sm font-black text-[#1C01A5]">
            Maju ➔ 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6 ➔ 7 ➔ 8 ➔ 9 ➔ 10
          </p>
          <p className="px-3 py-3 text-sm font-black text-[#1C01A5]">
            Mundur ⬅️ 10 ➔ 9 ➔ 8 ➔ 7 ➔ 6 ➔ 5 ➔ 4 ➔ 3 ➔ 2 ➔ 1
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">Pasangan bilangan 5</p>
          <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">5</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <p className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">🍬🍬🍬 · 3</p>
            <p className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">🍬🍬 · 2</p>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            3 dan 2 adalah pasangan angka 5, karena jika disatukan jumlahnya tetap 5.
          </p>
        </article>
        <KuisAturan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "B")}
          pertanyaan="Tuliskan satu pasangan, misalnya 5 = 3 dan 2."
          alias={kumpulkanAlias(["5", "3 dan 2", "lima"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🍬🟢
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
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuC.pengantar}</p>
        <AktivitasDetektif />
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} hanyaKanvas />
        <JurnalPermenSani />
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
          Tantangan Para Juara · Ayo Membilang sampai dengan 10
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuD.pengantar}</p>
        <LembarKerjaSani />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari LKS, misalnya 4 atau sama banyak."
          alias={kumpulkanAlias(["4", "3 dan 3", "8", "sama banyak", "2 dan 4", "3", "9"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
