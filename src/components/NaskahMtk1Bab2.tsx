"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB2 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB2 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB2.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function duaCaraDelapan(teks: string): boolean {
  const padat = teks.toLowerCase().replace(/\s+/g, "");
  const unik = new Set(
    [...padat.matchAll(/(\d+)\+(\d+)=8/g)]
      .map((temuan) => {
        const kiri = Number(temuan[1]);
        const kanan = Number(temuan[2]);
        if (kiri + kanan !== 8 || kiri > 10 || kanan > 10) return "";
        return [kiri, kanan].sort((a, b) => a - b).join("+");
      })
      .filter(Boolean),
  );
  return unik.size >= 2;
}

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Rara: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Igil: "border-amber-300 bg-amber-50",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <span className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </span>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Pilih({
  id,
  soal,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
  onNilai,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
  onNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              const tepat = item.huruf === benar;
              if (tepat) kuis?.tandaiBenar(id);
              onNilai?.(tepat);
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function KuisCocok({
  id,
  soal,
  baris,
  umpan,
  salah,
}: {
  id: string;
  soal: string;
  baris: { label: string; gambar: string; benar: string }[];
  umpan: string;
  salah: string;
}) {
  const kuis = useKuisMateri();
  const pilihan = [...new Set(baris.map((item) => item.benar))];
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = baris.every((item) => pilih[item.label] === item.benar);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-sky-50 p-4">
      <p className="text-sm font-semibold text-slate-700">{soal}</p>
      <div className="mt-3 grid gap-3">
        {baris.map((item) => (
          <div key={item.label} className="rounded-xl bg-white px-3 py-3">
            <p className="text-sm font-black text-[#1C01A5]">{item.label}</p>
            <p className="text-2xl leading-relaxed">{item.gambar}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pilihan.map((kalimat) => {
                const terpilih = pilih[item.label] === kalimat;
                const dasar = terpilih
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1C01A5] text-white hover:bg-[#16017a]";
                return (
                  <button
                    key={kalimat}
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setPilih((lama) => ({ ...lama, [item.label]: kalimat }));
                    }}
                    className={`rounded-xl px-3 py-2 text-sm font-black ${
                      status
                        ? kelasTombolHasilKuis(pilih[item.label] ?? "", kalimat, item.benar, dasar)
                        : dasar
                    }`}
                  >
                    {kalimat}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function SusunBalok() {
  const kuis = useKuisMateri();
  const pool = [
    { kunci: "4", tampil: "4" },
    { kunci: "=", tampil: "=" },
    { kunci: "7", tampil: "7" },
    { kunci: "+", tampil: "+" },
    { kunci: "3", tampil: "3" },
  ];
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((item) => !susun.includes(item.kunci));
  const periksa = () => {
    const kalimat = susun.join("");
    const ok = kalimat === "4+3=7" || kalimat === "3+4=7";
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("B", 1));
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold text-slate-700">
        Susun balok supaya jadi kalimat matematika yang benar.
      </p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-xl bg-white px-3 py-3">
        {susun.length === 0 ? (
          <p className="text-sm font-bold text-slate-400">Ketuk balok untuk menyusun.</p>
        ) : null}
        {susun.map((kunci) => (
          <span key={kunci} className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white">
            {kunci}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, item.kunci]);
            }}
            className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
          >
            {item.tampil}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Susun lagi. Hasilnya harus 7." />
        <Umpan status={status} teks="Benar! 4 + 3 = 7 dan 3 + 4 = 7 sama-sama benar." />
      </div>
    </article>
  );
}

function DuaCaraDelapan() {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pertanyaan: "Tulis 2 cara berbeda untuk mendapatkan angka 8.",
            konteks: "Benar hanya jika ada dua penjumlahan berbeda yang hasilnya 8, misalnya 4 + 4 = 8 dan 5 + 3 = 8.",
            alias: [],
            jawaban: data,
          }),
        });
        const json = (await respons.json()) as {
          berhasil?: boolean;
          benar?: boolean;
          bacaan?: string;
          pesan?: string;
        };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && duaCaraDelapan(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(idKuis("D", 4));
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    setCuplikan(data.trim());
    const ok = duaCaraDelapan(data);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("D", 4));
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      <p className="text-center text-lg font-black text-[#1C01A5]">⬜ + ⬜ = 8 &nbsp;&nbsp; ⬜ + ⬜ = 8</p>
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        5. Tulis 2 cara berbeda untuk mendapatkan angka 8.
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis
        status={status}
        cuplikan={cuplikan || undefined}
        pesanSalah="Tulis dua kalimat yang berbeda, misalnya 4 + 4 = 8 dan 5 + 3 = 8."
      />
      <Umpan status={status} teks="Hebat! Ada banyak jalan menuju angka 8." />
    </div>
  );
}

function KapalHarta() {
  return (
    <MisiPenjagaKebun
      misi={MISI_MTK1_BAB2}
      idMisi={(indeks) => idKuis("C", indeks)}
      idTulis={idKuisTulisKartu(ID, "C")}
      tema={TEMA_MTK1_BAB2}
      penutup="Istana pasir Igil selesai. Kerang ajaib berjejer di pantai."
      bunga="🐚🦀🏖️🚩"
    />
  );
}

function LembarEvaluasi() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const kuis = useKuisMateri();
  const skor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((indeks) => kuis?.sudahBenar(idKuis("D", indeks))).length;
  const lencana =
    skor >= 9 ? "👑 Raja Laut Penjumlahan. Luar biasa! Kamu kapten paling hebat!"
    : skor >= 6 ? "⛵ Pelaut Cerdas. Hebat! Sedikit lagi sampai ke harta karun!"
    : "🐚 Kerang Pintar. Ayo berlayar lagi bersama Igil, kamu pasti bisa!";

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-white p-4 sm:grid-cols-3">
        <label className="text-xs font-black uppercase text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Kelas
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">1</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Skor
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">⭐ {skor} / 10</span>
        </p>
      </div>

      <KuisTulisKartu
        id={idKuis("D", 0)}
        hanyaKanvas
        pertanyaan="1. Tulis jumlah semua kue."
        alias={kumpulkanAlias(["7", "tujuh"])}
        konteks="Tiga kue ditambah empat kue sama dengan tujuh."
        visual={<p className="text-center text-2xl">🧁🧁🧁 + 🧁🧁🧁🧁 = ⬜</p>}
      />
      <Pilih
        id={idKuis("D", 1)}
        soal="2. Ada 2 kupu-kupu. Datang 3 kupu-kupu lagi. Semuanya berapa?"
        benar="B"
        umpan="2 + 3 = 5."
        salah="Hitung semua kupu-kupu."
        visual={<p>🦋🦋 + 🦋🦋🦋</p>}
        pilihan={[
          { huruf: "A", teks: "4" },
          { huruf: "B", teks: "5" },
          { huruf: "C", teks: "6" },
        ]}
      />
      <KuisTulisKartu
        id={idKuis("D", 2)}
        hanyaKanvas
        pertanyaan="3. Angka berapa yang ada di dalam kotak?"
        alias={kumpulkanAlias(["5", "lima"])}
        konteks="Empat ditambah lima sama dengan sembilan."
        visual={<p className="text-center text-2xl font-black text-[#1C01A5]">4 + ⬜ = 9</p>}
      />
      <div>
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-sm font-semibold text-slate-700">4. Bimo berkata, “6 + 3 = 8!”</p>
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan="Apakah Bimo benar? Ucapkan Benar atau Salah, lalu sebutkan jawaban yang benar."
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["salah", "tidak benar", "tidak tepat", "keliru"],
              ["9", "sembilan"],
            ])
          }
          petunjuk="Sebut salah, lalu sebut angka yang benar."
        />
      </div>
      <Pilih
        id={idKuis("D", 4)}
        soal="5. Mana pasangan yang keduanya hasilnya 8?"
        benar="A"
        umpan="4 + 4 = 8 dan 5 + 3 = 8. Dua cara yang berbeda."
        salah="Kedua kalimat harus sama-sama menghasilkan 8."
        pilihan={[
          { huruf: "A", teks: "4 + 4 = 8 dan 5 + 3 = 8" },
          { huruf: "B", teks: "4 + 4 = 8 dan 3 + 3 = 6" },
          { huruf: "C", teks: "2 + 2 = 4 dan 6 + 2 = 8" },
        ]}
      />
      <Pilih
        id={idKuis("D", 5)}
        soal="6. Timbangan kiri 3 + 4. Pilih kartu supaya timbangan seimbang."
        benar="B"
        umpan="Timbangannya seimbang. 3 + 4 = 7 dan 5 + 2 = 7."
        salah="Hitung kedua sisi. Hasilnya harus sama."
        visual={<p>⚖️ 3 + 4 &nbsp;&nbsp; ❓</p>}
        pilihan={[
          { huruf: "A", teks: "2 + 4" },
          { huruf: "B", teks: "5 + 2" },
          { huruf: "C", teks: "6 + 3" },
        ]}
      />
      <Pilih
        id={idKuis("D", 6)}
        soal="7. Ibu membeli 5 tomat dan 5 wortel. Berapa sayur semuanya?"
        benar="B"
        umpan="5 + 5 = 10."
        salah="Jumlahkan tomat dan wortel."
        visual={<p>🍅🍅🍅🍅🍅 + 🥕🥕🥕🥕🥕</p>}
        pilihan={[
          { huruf: "A", teks: "8" },
          { huruf: "B", teks: "10" },
          { huruf: "C", teks: "55" },
        ]}
      />
      <KuisCocok
        id={idKuis("D", 7)}
        soal="8. Pasangkan kartu yang hasilnya sama."
        baris={[
          { label: "2 + 7", gambar: "2 + 7", benar: "4 + 5" },
          { label: "1 + 5", gambar: "1 + 5", benar: "6 + 0" },
          { label: "3 + 1", gambar: "3 + 1", benar: "2 + 2" },
        ]}
        umpan="Semua pasangan seimbang."
        salah="Hitung setiap kartu, lalu cari hasil yang sama."
      />
      <Pilih
        id={idKuis("D", 8)}
        soal="9. Bus punya 10 kursi. Sudah ada 6 anak. Berapa anak lagi supaya bus penuh?"
        benar="B"
        umpan="6 + 4 = 10. Perlu 4 anak lagi."
        salah="Sepuluh dikurangi enam."
        visual={<p>💺 × 10 · sudah 6 anak</p>}
        pilihan={[
          { huruf: "A", teks: "3" },
          { huruf: "B", teks: "4" },
          { huruf: "C", teks: "6" },
        ]}
      />
      <div>
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-2xl">🐤🐤🐤 + 🐤🐤🐤🐤🐤</p>
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="Buat cerita pendek dari gambar ini, lalu sebutkan hasilnya."
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["3", "tiga"],
              ["5", "lima"],
              ["8", "delapan"],
            ])
          }
          petunjuk="Sebut kedua jumlah, lalu sebut hasilnya."
        />
      </div>
      <p className="rounded-2xl bg-teal-50 px-4 py-3 text-sm font-extrabold text-[#1C01A5]">{lencana}</p>
    </div>
  );
}

export default function NaskahMtk1Bab2({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kartuA = MODUL_MTK1_BAB2.kartu[0];
  const kartuB = MODUL_MTK1_BAB2.kartu[1];
  const kartuC = MODUL_MTK1_BAB2.kartu[2];
  const kartuD = MODUL_MTK1_BAB2.kartu[3];
  const [kedip, setKedip] = useState(0);
  const kuis = useKuisMateri();

  return (
    <div className="space-y-5">
      <KartuBingkai latar="bg-sky-50/80">
        <p className="text-center text-4xl" aria-hidden>
          🏖️🦀🐚
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Penjumlahan sampai dengan 10</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <div className="mt-4 rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
          <TujuanBelajar
        butir={[
          "Menggabungkan dua kelompok benda.",
          "Memakai simbol + dan =.",
          "Menyelesaikan soal cerita penjumlahan sampai 10.",
        ]}
      />
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
            <p className="text-xl font-black tracking-wide text-[#0C4A6E]">Adegan 1 · Tiba di pantai</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-1.jpg"
              alt="Rara, Bimo, dan Igil tiba di pantai membawa ember. Igil si burung hantu ikut berjalan."
            />
            <p className="mt-2 text-center text-4xl" aria-hidden>
              🌊 ⛱️ 🕊️ 🪣
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Pantai biru, pasir kuning, dan payung merah putih. Rara dan Bimo membawa ember. Igil berjalan di samping mereka.</p>
          </article>
          <Dialog nama="Rara" anak="Hore, kita sampai di pantai!" />
          <Dialog nama="Bimo" anak="Ayo kita cari kerang!" />
          <Dialog nama="Igil" anak="Hoo! Aku bantu cari, ya!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 1)}
            idKanvas={idKuis("A", 2)}
            pertanyaanSuara="Rara, Bimo, dan Igil tiba di pantai. Ada berapa teman?"
            aliasSuara={["3", "tiga"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka banyak teman itu."
            aliasKanvas={["3", "tiga"]}
            konteksKanvas="Ada 3 teman: Rara, Bimo, dan Igil."
          />
          <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
            <p className="text-xl font-black tracking-wide text-[#92400E]">Adegan 2 · Menggabungkan kerang</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-2.jpg"
              alt="Ember Rara berisi 3 kerang. Ember Bimo berisi 2 kerang."
            />
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase text-[#92400E]">Ember Rara</p>
                <IkonUlang ikon="🐚" jumlah={3} ukuran="text-3xl" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-[#92400E]">Ember Bimo</p>
                <IkonUlang ikon="🐚" jumlah={2} ukuran="text-3xl" />
              </div>
            </div>
          </article>
          <Dialog nama="Rara" anak="Kerangku ada 3." />
          <Dialog nama="Bimo" anak="Kerangku ada 2." />
          <Dialog nama="Bimo" anak="Kalau digabung, jadi berapa?" />
          <p className="text-center text-sm font-bold text-[#1C01A5]">Satu, dua, tiga, empat, lima!</p>
          <p className="text-center text-2xl">
            <IkonUlang ikon="🐚" jumlah={3} /> + <IkonUlang ikon="🐚" jumlah={2} /> = <IkonUlang ikon="🐚" jumlah={5} />
          </p>
          <p className="text-center text-4xl font-black text-[#1C01A5]">3 + 2 = 5</p>
          <Dialog nama="Igil" anak="Jadi 5 kerang! Menggabungkan itu namanya menjumlahkan!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 3)}
            idKanvas={idKuis("A", 4)}
            pertanyaanSuara="Rara punya 3 kerang. Bimo punya 2 kerang. Semuanya berapa?"
            aliasSuara={["5", "lima"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 3 + 2 = 5."
            aliasKanvas={["3 + 2 = 5", "3+2=5"]}
            konteksKanvas="Tiga kerang ditambah dua kerang sama dengan lima. 3 + 2 = 5."
          />
          <article className="rounded-2xl border-2 border-[#7C3AED]/30 bg-[#F5F3FF] px-4 py-3">
            <p className="text-xl font-black text-[#5B21B6]">Adegan 3 · Kenalan dengan simbol</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-3.jpg"
              alt="Tanda tambah dan tanda sama dengan di pasir pantai."
            />
            <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">➕ &nbsp; 🟰</p>
          </article>
          <Dialog nama="Bimo" anak="Tanda silang itu apa?" />
          <Dialog nama="Igil" anak="Itu tanda tambah. Artinya digabung!" />
          <Dialog nama="Bimo" anak="Kalau dua garis itu?" />
          <Dialog nama="Rara" anak="Itu tanda sama dengan. Artinya hasilnya!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 5)}
            idKanvas={idKuis("A", 6)}
            pertanyaanSuara="Tanda tambah artinya apa?"
            aliasSuara={["digabung", "menggabungkan", "tambah"]}
            petunjukSuara="Ucapkan: digabung."
            pertanyaanKanvas="Tuliskan 2 + 1 = 3."
            aliasKanvas={["2 + 1 = 3", "2+1=3"]}
            konteksKanvas="Tanda tambah menggabungkan. Dua tambah satu sama dengan tiga."
          />
          <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 px-4 py-3">
            <p className="text-xl font-black tracking-wide text-[#92400E]">Adegan 4 · Istana pasir</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-4.jpg"
              alt="Istana pasir punya 4 bendera. Di sampingnya ada 3 bendera lagi."
            />
            <p className="mt-2 text-center text-3xl" aria-hidden>
              🏰
            </p>
            <p className="text-center text-2xl">
              <IkonUlang ikon="🚩" jumlah={4} /> + <IkonUlang ikon="🚩" jumlah={3} />
            </p>
          </article>
          <Dialog nama="Bimo" anak="Istanaku punya 4 bendera." />
          <Dialog nama="Bimo" anak="Aku tambah 3 bendera, ya!" />
          <Dialog nama="Igil" anak="Sekarang ada berapa bendera?" />
          <p className="text-center text-sm font-bold text-[#1C01A5]">Lima… enam… tujuh!</p>
          <p className="text-center text-4xl font-black text-[#1C01A5]">4 + 3 = 7</p>
          <p className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">Horeee! Menjumlahkan itu seru!</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 7)}
            idKanvas={idKuis("A", 8)}
            pertanyaanSuara="Istana pasir punya 4 bendera, lalu ditambah 3. Berapa semuanya?"
            aliasSuara={["7", "tujuh"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 4 + 3 = 7."
            aliasKanvas={["4 + 3 = 7", "4+3=7"]}
            konteksKanvas="Empat bendera ditambah tiga bendera sama dengan tujuh."
          />
        </div>
        <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="text-center text-2xl">
            <IkonUlang ikon="🦀" jumlah={2} /> + <IkonUlang ikon="🦀" jumlah={4} />
          </p>
          <SoalRekamSuara
            id={idKuis("A", 0)}
            pertanyaan="Ada 2 kepiting, lalu datang 4 kepiting lagi. Jadi berapa semuanya?"
            periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["6", "enam"])}
            petunjuk="Ucapkan dengan keras."
          />
          {kuis?.sudahBenar(idKuis("A", 0)) ? (
            <p className="text-sm font-bold text-emerald-800">Hoo! Kamu hebat!</p>
          ) : null}
        </div>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          hanyaKanvas
          pertanyaan="Tulis jumlah semua kerang di kotak."
          alias={kumpulkanAlias(["8", "delapan"])}
          konteks="Lima kerang ditambah tiga kerang sama dengan delapan."
          visual={
            <p className={`text-center text-2xl ${kedip >= 2 ? "animate-pulse" : ""}`}>
              🐚🐚🐚🐚🐚 + 🐚🐚🐚 = ⬜
            </p>
          }
          sesudahNilai={(benar) => {
            if (!benar) setKedip((lama) => lama + 1);
          }}
        />
      </KartuBingkai>

      <KartuBingkai latar="bg-emerald-50/80">
        <p className="text-center text-4xl" aria-hidden>
          ➕🧺🦘
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>
        <TabelInfoGrafis
          judul="Infografis: Ayo Menjumlahkan"
          kepala={["Gambar", "Kalimat", "Hasil"]}
          baris={[
            ["🍎🍎 + 🍎🍎🍎", "2 + 3", "5"],
            ["⭐⭐⭐⭐ + ⭐⭐", "4 + 2", "6"],
            ["5 lalu lompat 3", "5 + 3", "8"],
            ["6 jari + 4 jari", "6 + 4", "10"],
            ["🍩🍩🍩 + 🍩", "3 + 1", "4"],
            ["🍩 + 🍩🍩🍩", "1 + 3", "4"],
          ]}
          kaki="Dibalik tetap sama. 3 + 1 = 1 + 3"
        />
        <div className="mt-4 space-y-4">
          <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-black text-[#166534]">Poin 1 · Menjumlahkan = menggabungkan</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="🍎" jumlah={2} /> + <IkonUlang ikon="🍎" jumlah={3} /> = <IkonUlang ikon="🍎" jumlah={5} />
            </p>
            <p className="text-2xl font-black text-[#1C01A5]">2 + 3 = 5</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">2 dan 3 adalah benda yang digabung. + artinya digabung. = artinya hasilnya. 5 adalah jumlah semuanya.</p>
            <p className="text-sm font-bold text-[#1C01A5]">Dibaca: dua tambah tiga sama dengan lima.</p>
          </article>
          <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
            <p className="text-sm font-black text-[#0C4A6E]">Poin 2 · Hitung semua</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="⭐" jumlah={4} /> + <IkonUlang ikon="⭐" jumlah={2} />
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Gabungkan, hitung 1 sampai 6. Angka terakhir adalah hasilnya. 4 + 2 = 6.</p>
          </article>
          <article className="rounded-2xl border-2 border-cyan-300 bg-cyan-50 px-4 py-3">
            <p className="text-sm font-black text-[#92400E]">Poin 3 · Hitung lanjut, lompat kanguru</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Simpan 5 di kepala. Lompat 3 kali: 6, 7, 8.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((angka) => (
                <span
                  key={angka}
                  className={`rounded-full px-2 py-1 text-sm font-black ${
                    angka === "6" || angka === "7" || angka === "8"
                      ? "bg-[#1C01A5] text-white"
                      : "bg-white text-[#1C01A5]"
                  }`}
                >
                  {angka}
                </span>
              ))}
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">5 + 3 = 8</p>
          </article>
          <article className="rounded-2xl border-2 border-[#7C3AED]/30 bg-[#F5F3FF] px-4 py-3">
            <p className="text-sm font-black text-[#5B21B6]">Poin 4 · Pakai jari</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Angkat 6 jari, lalu 4 jari lagi. Semua jari terangkat. 6 + 4 = 10.</p>
          </article>
          <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 px-4 py-3">
            <p className="text-sm font-black text-[#9F1239]">Poin 5 · Dibalik, hasilnya tetap sama</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="🍩" jumlah={3} /> + <IkonUlang ikon="🍩" jumlah={1} /> = 4
            </p>
            <p className="text-center text-2xl">
              <IkonUlang ikon="🍩" jumlah={1} /> + <IkonUlang ikon="🍩" jumlah={3} /> = 4
            </p>
            <p className="text-sm font-semibold text-slate-700">3 + 1 = 4 dan 1 + 3 = 4. Mulai dari angka yang lebih besar supaya lebih cepat.</p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-3">
            <p className="text-sm font-black text-[#1C01A5]">Poin 6 · Teman sepuluh</p>
            <div className="mt-3 overflow-hidden rounded-2xl border-4 border-sky-400">
              {[
                ["1", "9"],
                ["2", "8"],
                ["3", "7"],
                ["4", "6"],
                ["5", "5"],
              ].map(([kiri, kanan], indeks) => (
                <div
                  key={kiri}
                  className={`grid grid-cols-3 items-center px-3 py-2 text-center ${
                    indeks % 2 === 0 ? "bg-sky-50" : "bg-[#F0FDF4]"
                  }`}
                >
                  <span className="text-2xl font-black text-[#1C01A5]">{kiri}</span>
                  <span className="text-2xl font-black text-[#1C01A5]">{kanan}</span>
                  <span className="text-lg font-black text-[#92400E]">= 10</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-3">
            <p className="text-sm font-black text-[#0F766E]">Poin 7 · Soal cerita</p>
            <p className="mt-2 text-center text-2xl">🎈🎈🎈🎈 + 🎈🎈</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Rara punya 4 balon. Ibu memberi 2 balon lagi.</p>
            <p className="mt-2 text-sm font-bold text-[#1C01A5]">Cari angka 4 dan 2. Kata “memberi lagi” berarti tambah. 4 + 2 = 6. Balon Rara sekarang ada 6.</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Kata kunci tambah: digabung, ditambah, diberi lagi, datang lagi, semuanya, jumlahnya.</p>
          </article>
        </div>
        <div className="mt-6 space-y-4">
          <KuisCocok
            id={idKuis("B", 0)}
            soal="Cocokkan gambar dengan kalimat matematika yang benar."
            baris={[
              { label: "Ikan", gambar: "🐟🐟 + 🐟🐟🐟🐟🐟", benar: "2 + 5 = 7" },
              { label: "Es krim", gambar: "🍦🍦🍦 + 🍦🍦🍦", benar: "3 + 3 = 6" },
              { label: "Lebah", gambar: "🐝 + 🐝🐝🐝🐝🐝🐝🐝🐝", benar: "1 + 8 = 9" },
            ]}
            umpan="Cocok! Ikan 2 + 5 = 7, es krim 3 + 3 = 6, lebah 1 + 8 = 9."
            salah="Hitung setiap gambar, lalu pilih kalimatnya."
          />
          <SusunBalok />
          <Pilih
            id={idKuis("B", 2)}
            soal="Tiga kartu hasilnya sama. Ketuk kartu yang berbeda."
            benar="C"
            umpan="Kartu C hasilnya 9. Kartu yang lain hasilnya 8."
            salah="Hitung setiap kartu. Cari yang hasilnya tidak sama."
            pilihan={[
              { huruf: "A", teks: "5 + 3" },
              { huruf: "B", teks: "6 + 2" },
              { huruf: "C", teks: "4 + 5" },
              { huruf: "D", teks: "7 + 1" },
            ]}
          />
          <div className="border-t-2 border-[#1C01A5]/10 pt-4">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <SoalRekamSuara
              id={idKuis("B", 3)}
              pertanyaan="Teman sepuluh dari angka 7 adalah berapa?"
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["3", "tiga"])}
              petunjuk="Ucapkan angkanya."
            />
          </div>
          <KuisTulisKartu
            id={idKuisTulisKartu(ID, "B")}
            hanyaKanvas
            pertanyaan="Bimo punya 3 bola. Bimo punya 5 bola. Tulis kalimat matematika dan hasilnya."
            alias={kumpulkanAlias(["3 + 5 = 8", "3+5=8", "5 + 3 = 8", "5+3=8"])}
            konteks="Tiga tambah lima sama dengan delapan."
            visual={
              <p className="text-center text-2xl">
                <IkonUlang ikon="⚽" jumlah={3} /> + <IkonUlang ikon="⚽" jumlah={5} />
              </p>
            }
          />
        </div>
      </KartuBingkai>

      <KartuBingkai latar="bg-violet-50/80">
        <p className="text-center text-4xl" aria-hidden>
          🏖️🐚🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh pos pantai · menghitung, membaca, menulis, membandingkan
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <KapalHarta />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
        poin={[
          "Tambah artinya gabung.",
          "Sama dengan artinya hasilnya.",
          "Simpan yang besar, lompat yang kecil.",
          "Dibalik tetap sama. 3 + 2 = 2 + 3.",
          "Tambah nol, angkanya tetap. 5 + 0 = 5.",
          "Cari angka, cari kata kunci, lalu hitung.",
        ]}
        penutup="Kalimat kunci: Tambah artinya gabung."
      />

      <KartuBingkai latar="bg-rose-50/80">
        <p className="text-center text-4xl" aria-hidden>
          📝
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)} />
        </div>
        <LembarEvaluasi />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Tambah artinya gabung."
          alias={kumpulkanAlias(["tambah artinya gabung"])}
          konteks="Tambah artinya dua kelompok dijadikan satu."
        />
      </KartuBingkai>
    </div>
  );
}
