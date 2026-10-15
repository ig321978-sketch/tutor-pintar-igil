"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB8 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB8 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB8 } from "@/lib/modul-resmi-mtk-1-bab8";
import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB8.id;

const GUDANG = [
  { kunci: "a", simbol: "🥛", rak: "susu" },
  { kunci: "b", simbol: "🥫", rak: "kaleng" },
  { kunci: "c", simbol: "🥛", rak: "susu" },
  { kunci: "d", simbol: "🍫", rak: "cokelat" },
  { kunci: "e", simbol: "🥫", rak: "kaleng" },
  { kunci: "f", simbol: "🥛", rak: "susu" },
  { kunci: "g", simbol: "🥫", rak: "kaleng" },
  { kunci: "h", simbol: "🥛", rak: "susu" },
];

const BENTUK = [
  { kunci: "a", simbol: "🔺", baris: "segitiga" },
  { kunci: "b", simbol: "⬛", baris: "segi" },
  { kunci: "c", simbol: "🔺", baris: "segitiga" },
  { kunci: "d", simbol: "⬛", baris: "segi" },
  { kunci: "e", simbol: "🔺", baris: "segitiga" },
  { kunci: "f", simbol: "🔺", baris: "segitiga" },
];

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function padat(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/\s+/g, "");
}

function bukanBelasan(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return !n.includes("belas") && !n.includes("puluh");
}

function adaAngka(teks: string, angka: string, kata: string): boolean {
  return jawabanTulisMemuatAlias(teks, [angka]) || normalisasiJawabanTulis(teks).includes(kata);
}

function jawabEnam(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "6", "enam");
}

function jawabSepuluh(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  if (n.includes("belas")) return false;
  if (jawabanTulisMemuatAlias(teks, ["10"])) return true;
  if (!n.includes("sepuluh")) return false;
  return !/(dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\s+puluh/.test(n);
}

function jawabSebelas(teks: string): boolean {
  if (padat(teks).includes("4+2+5=11")) return true;
  if (jawabanTulisMemuatAlias(teks, ["11"])) return true;
  return normalisasiJawabanTulis(teks).includes("sebelas");
}

function jawabKelinci(teks: string): boolean {
  return normalisasiJawabanTulis(teks).includes("kelinci");
}

function jawabCokelat(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return n.includes("cokelat") || n.includes("coklat");
}

function jawabBus(teks: string): boolean {
  return normalisasiJawabanTulis(teks).includes("bus");
}

function apelPisang(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "4", "empat") && adaAngka(teks, "3", "tiga");
}

function bolaTiga(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "5", "lima") && adaAngka(teks, "3", "tiga") && adaAngka(teks, "2", "dua");
}

function selisihEmpat(teks: string): boolean {
  if (padat(teks).includes("7-3=4")) return true;
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "4", "empat");
}

function selisihLima(teks: string): boolean {
  if (padat(teks).includes("8-3=5")) return true;
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "5", "lima");
}

function buahDiagram(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  const judul = /buah|toko|judul|apel|pisang|anggur|diagram|piktogram/.test(n);
  return judul && adaAngka(teks, "5", "lima") && adaAngka(teks, "2", "dua") && adaAngka(teks, "4", "empat");
}

function kueTabel(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return adaAngka(teks, "6", "enam") && adaAngka(teks, "4", "empat");
}

function adiSalah(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  if (!n.includes("salah")) return false;
  return (
    adaAngka(teks, "4", "empat") ||
    adaAngka(teks, "3", "tiga") ||
    n.includes("tidak sama") ||
    n.includes("beda")
  );
}

function tigaWarna(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const angka = n.match(/\d/g);
  if (angka && angka.length >= 3) return true;
  const kata = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"].filter(
    (item) => n.includes(item),
  );
  return kata.length >= 3;
}

function warnaPaling(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const warna = n.includes("merah") || n.includes("biru") || n.includes("hijau");
  const angka =
    /\d/.test(n) ||
    ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "selisih", "beda"].some(
      (kata) => n.includes(kata),
    );
  return warna && angka;
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

function KepalaKartu({
  ikon,
  judul,
  anak,
  kelas,
  kelamin,
  cuplikan,
}: {
  ikon: string;
  judul: string;
  anak?: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  cuplikan: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      <div className="mt-3 flex justify-center">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Adegan({
  judul,
  warna,
  src,
  alt,
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function KuisCocok({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { kiri: string; pilihan: string[]; benar: string }[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, string>>({});
  const [aktif, setAktif] = useState(0);
  const [cek, setCek] = useState(false);
  const lengkap = baris.every((_, indeks) => peta[indeks]);
  const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk benda, lalu ketuk pasangannya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek
            ? "border-sky-200 bg-white"
            : peta[indeks] === item.benar
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-300 bg-rose-50";
          return (
            <button
              key={item.kiri}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}
            >
              <span>{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button
            key={kalimat}
            type="button"
            onClick={() => {
              setPeta((lama) => ({ ...lama, [aktif]: kalimat }));
              setCek(false);
            }}
            className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          >
            {kalimat}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={() => {
          setCek(true);
          if (tepat) kuis?.tandaiBenar(id);
        }}
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba pasangkan lagi." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunBentuk({ id }: { id: string }) {
  const kuis = useKuisMateri();
  const [tempat, setTempat] = useState<Record<string, string>>({});
  const [aktif, setAktif] = useState("");
  const [cek, setCek] = useState(false);
  const baris = [
    { kunci: "segitiga", label: "🔺 Segitiga" },
    { kunci: "segi", label: "⬛ Segi empat" },
  ];
  const sisa = BENTUK.filter((item) => !tempat[item.kunci]);
  const lengkap = BENTUK.every((item) => tempat[item.kunci]);
  const tepat = BENTUK.every((item) => tempat[item.kunci] === item.baris);
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">Susun ikon ke baris yang tepat!</p>
      <p className="mt-1 text-xs font-semibold text-sky-900">Ketuk ikon, lalu ketuk barisnya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => setAktif(item.kunci)}
            className={`rounded-xl bg-white px-3 py-2 text-lg ring-2 ${aktif === item.kunci ? "ring-sky-600" : "ring-sky-200"}`}
          >
            {item.simbol}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {baris.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              if (!aktif) return;
              setTempat((lama) => ({ ...lama, [aktif]: item.kunci }));
              setAktif("");
              setCek(false);
            }}
            className="rounded-xl border-2 border-sky-200 bg-white px-3 py-2 text-left text-sm font-bold text-[#1C01A5]"
          >
            {item.label}
            <span className="mt-1 block text-lg">
              {BENTUK.filter((ikon) => tempat[ikon.kunci] === item.kunci).map((ikon) => ikon.simbol).join("") || "…"}
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={() => {
          setCek(true);
          if (tepat) kuis?.tandaiBenar(id);
        }}
        className="mt-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa
      </button>
      {cek ? <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Segitiga satu baris, segi empat baris lain." /> : null}
      {cek && tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">Segitiga 4. Segi empat 2.</p> : null}
    </article>
  );
}

function TulisBebas({
  id,
  judul,
  visual,
  pertanyaan,
  pesanSalah,
  umpan,
  periksa,
  alias = [],
  konteks,
  sesudahBenar,
  sesudahNilai,
}: {
  id: string;
  judul?: string;
  visual?: ReactNode;
  pertanyaan: string;
  pesanSalah: string;
  umpan: string;
  periksa: (teks: string) => boolean;
  alias?: string[];
  konteks?: string;
  sesudahBenar?: () => void;
  sesudahNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    const selesai = (ok: boolean, cuplikanBaru: string) => {
      setCuplikan(cuplikanBaru);
      setStatus(ok ? "benar" : "salah");
      sesudahNilai?.(ok);
      if (ok) {
        if (id) kuis?.tandaiBenar(id);
        sesudahBenar?.();
      }
    };
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }),
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
        selesai(json.benar === true || (bacaan.length > 0 && periksa(bacaan)), bacaan || "tulisan tangan");
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    selesai(periksa(data), data.trim());
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {visual ? <div>{visual}</div> : null}
      {judul ? <p className="text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        {pertanyaan}
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      <Umpan status={status} teks={umpan} />
    </div>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB8.kartu[0];
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu
        ikon="🍎🦉📊"
        judul={kartu.judul}
        anak="Mengenal Diagram"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
        <TujuanBelajar
        butir={[
          "Mengelompokkan benda menurut jenisnya.",
          "Menyusun dan membaca diagram gambar sederhana.",
        ]}
      />
      </div>
      <div className="mt-4 space-y-3">
        <Adegan
          judul="Kantin yang berantakan"
          warna="border-amber-200 bg-amber-50"
          src="/doodle-mtk/mtk-1-bab8-kantin.jpg"
          alt="Meja kantin penuh gelas, piring, dan sendok. Rara dan Bimo terkejut. Tupai Igil memakai celemek."
        >
          <p className="text-sm font-semibold text-slate-700">
            Sepulang istirahat, gelas, piring, dan sendok bertumpuk lalu runtuh.
          </p>
          <Dialog nama="Rara" anak="Igil pasti marah. Kita tidak tahu mau mulai dari mana." />
          <Dialog nama="Bimo" anak="Ini terlalu banyak!" />
          <Dialog nama="Igil" anak="Namaku Igil! Rahasianya… kelompokkan dulu!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 1)}
            idKanvas={idKuis("A", 2)}
            pertanyaanSuara="Rahasia Igil: apa yang dilakukan dulu?"
            aliasSuara={["kelompokkan", "kelompok"]}
            petunjukSuara="Ucapkan: kelompokkan."
            pertanyaanKanvas="Tuliskan kata kelompokkan."
            aliasKanvas={["kelompokkan", "kelompok"]}
            konteksKanvas="Benda yang berserakan dikelompokkan dulu."
          />
        </Adegan>
        <Adegan
          judul="Adegan 1 · Mulai dari mana?"
          warna="border-sky-200 bg-sky-50"
          src="/doodle-mtk/mtk-1-bab8-adegan-1.jpg"
          alt="Tiga kotak kosong berlabel gelas, piring, dan sendok. Benda masih berserakan di lantai."
        >
          <Dialog nama="Igil" anak="Aturan pertama: pisahkan berdasarkan jenis!" />
          <Dialog nama="Bimo" anak="Jadi gelas ke kotak gelas?" />
          <Dialog nama="Rara" anak="Aku ambil gelas!" />
          <p className="text-sm font-black text-[#1C01A5]">Satu jenis, satu kotak.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 3)}
            idKanvas={idKuis("A", 4)}
            pertanyaanSuara="Gelas dimasukkan ke kotak apa?"
            aliasSuara={["gelas"]}
            petunjukSuara="Sebutkan nama kotaknya."
            pertanyaanKanvas="Tuliskan kata gelas."
            aliasKanvas={["gelas"]}
            konteksKanvas="Gelas masuk ke kotak gelas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 2 · Menghitung kelompok"
          warna="border-emerald-200 bg-emerald-50"
          src="/doodle-mtk/mtk-1-bab8-adegan-2.jpg"
          alt="Tiga kotak: gelas 6, piring 4, dan sendok 8."
        >
          <Dialog nama="Rara" anak="Gelas ada 6." />
          <Dialog nama="Bimo" anak="Piring ada 4. Kalau ditanya yang paling banyak, aku masih harus hitung ulang." />
          <Dialog nama="Igil" anak="Sendok ada 8. Ayo lihat cara yang lebih pintar." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 5)}
            idKanvas={idKuis("A", 6)}
            pertanyaanSuara="Sendok ada berapa?"
            aliasSuara={["8", "delapan"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka banyak gelas."
            aliasKanvas={["6", "enam"]}
            konteksKanvas="Gelas ada 6."
          />
        </Adegan>
        <Adegan
          judul="Adegan 3 · Rahasia piktogram"
          warna="border-indigo-200 bg-indigo-50"
          src="/doodle-mtk/mtk-1-bab8-adegan-3.jpg"
          alt="Papan piktogram: gelas 6, piring 4, sendok 8."
        >
          <p className="text-sm font-black text-[#1C01A5]">🥤 6 · 🍽️ 4 · 🥄 8</p>
          <Dialog nama="Rara" anak="Aku bisa lihat langsung mana yang paling banyak!" />
          <Dialog nama="Bimo" anak="Sendok! Barisannya paling panjang!" />
          <Dialog nama="Igil" anak="Ini diagram gambar. Setiap gambar sama dengan satu benda." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 7)}
            idKanvas={idKuis("A", 8)}
            pertanyaanSuara="Baris yang paling panjang adalah benda apa?"
            aliasSuara={["sendok"]}
            petunjukSuara="Sebutkan nama bendanya."
            pertanyaanKanvas="Setiap gambar sama dengan berapa benda? Tuliskan angkanya."
            aliasKanvas={["1", "satu"]}
            konteksKanvas="Satu gambar sama dengan satu benda."
          />
        </Adegan>
        <Adegan
          judul="Adegan 4 · Menjawab pertanyaan"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab8-adegan-4.jpg"
          alt="Piktogram dengan tanda tanya. Baris piring paling pendek, baris sendok paling panjang."
        >
          <Dialog nama="Igil" anak="Mana yang paling sedikit?" />
          <Dialog nama="Bimo" anak="Piring! Barisannya paling pendek!" />
          <Dialog nama="Rara" anak="Sendok 8, piring 4. Selisihnya 4." />
          <p className="text-sm font-black text-[#1C01A5]">8 – 4 = 4</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 9)}
            idKanvas={idKuis("A", 10)}
            pertanyaanSuara="Benda apa yang paling sedikit?"
            aliasSuara={["piring"]}
            petunjukSuara="Sebutkan nama bendanya."
            pertanyaanKanvas="Tuliskan 8 - 4 = 4."
            aliasKanvas={["8 - 4 = 4", "8-4=4"]}
            konteksKanvas="Sendok 8 dikurangi piring 4 sama dengan 4."
          />
        </Adegan>
        <Adegan
          judul="Adegan 5 · Kantin rapi kembali"
          warna="border-lime-200 bg-lime-50"
          src="/doodle-mtk/mtk-1-bab8-adegan-5.jpg"
          alt="Kantin bersih. Igil tersenyum. Igil duduk di bahu Rara."
        >
          <Dialog nama="Igil" anak="Kantinnya rapi sekali! Siapa yang mengajari kalian?" />
          <Dialog nama="Rara" anak="Igil!" />
          <Dialog nama="Igil" anak="Kalau benda banyak dan berserakan, kelompokkan, lalu gambar!" />
          <Dialog nama="Igil" anak="Horeee! Kantin rapi!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 11)}
            idKanvas={idKuis("A", 12)}
            pertanyaanSuara="Siapa yang mengajari Rara dan Bimo?"
            aliasSuara={["tupi"]}
            petunjukSuara="Sebutkan namanya."
            pertanyaanKanvas="Tuliskan nama Igil."
            aliasKanvas={["tupi"]}
            konteksKanvas="Yang mengajari mereka adalah Igil."
          />
        </Adegan>
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">🐱🐱🐱🐱🐱 · 🐶🐶🐶 · 🐰🐰🐰🐰🐰🐰🐰</p>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Hewan apa yang paling banyak di diagram ini? Ucapkan dengan keras!"
          periksa={jawabKelinci}
          petunjuk="Lihat barisan yang paling panjang."
          sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")}
        />
        {suara === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">Tok-tok! Matamu tajam!</p> : null}
        {suara === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Lihat lagi! Barisan mana yang paling panjang?</p>
        ) : null}
      </div>
      <div className="mt-4">
        <TulisBebas
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Apel ada 4 dan pisang ada 3. Tulis jumlah apel dan jumlah pisang!"
          visual={<p className="text-center text-2xl">🍎🍎🍎🍎 · 🍌🍌🍌</p>}
          pesanSalah="Apel empat. Pisang tiga."
          umpan="Apel 4. Pisang 3."
          konteks="Ada empat apel dan tiga pisang. Kedua angka harus tertulis."
          periksa={apelPisang}
          sesudahNilai={(benar) => setSalahKanvas((n) => (benar ? 0 : n + 1))}
        />
        {salahKanvas >= 2 ? (
          <p className="text-sm font-bold text-[#1C01A5]">Kotak berkedip: apel 1, 2, 3, 4. Pisang 1, 2, 3.</p>
        ) : null}
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB8.kartu[1];
  const kelompok = ["🍎 Buah", "🥕 Sayur"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu
        ikon="📊🧺🖼️"
        judul={kartu.judul}
        anak="Dari tumpukan menjadi diagram"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 overflow-hidden rounded-2xl border-4 border-sky-400">
        <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
          Infografis: Diagram buah
        </p>
        {[
          ["Apel", "🍎", 7],
          ["Pisang", "🍌", 3],
          ["Anggur", "🍇", 5],
        ].map(([nama, ikon, jumlah], indeks) => (
          <div
            key={String(nama)}
            className={`grid grid-cols-[5.5rem_1fr_2rem] items-center gap-2 border-t border-sky-200 px-3 py-3 ${
              indeks % 2 === 0 ? "bg-sky-50" : "bg-[#F0FDF4]"
            }`}
          >
            <span className="text-sm font-black text-[#1C01A5]">{nama}</span>
            <span className="text-xl leading-none">{String(ikon).repeat(Number(jumlah))}</span>
            <span className="text-right text-lg font-black text-[#1C01A5]">{jumlah}</span>
          </div>
        ))}
        <p className="border-t-4 border-teal-300 bg-emerald-50 px-3 py-3 text-center text-sm font-black text-[#1C01A5]">
          Paling banyak apel 7. Paling sedikit pisang 3. Jumlah 15. Selisih 4.
        </p>
      </div>
      <TabelInfoGrafis
        kepala={["Baris", "Arti", "Jumlah"]}
        baris={[
          ["🐟 × 6 dan 🐢 × 4", "Ikan lebih banyak 2", "6 dan 4"],
          ["🍪🍪🍪 · 1 gambar = 2", "3 × 2 biskuit", "6"],
          ["🌻 × 5 dan 🌹 × 3", "Satu gambar = satu bunga", "5 dan 3"],
        ]}
        kaki="Satu jenis, satu baris. Lihat dulu, hitung kemudian."
      />
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Langkah mengelompokkan</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Lihat jenisnya, buat satu kotak untuk setiap jenis, pindahkan satu per satu, lalu hitung. Apel 4 dan pisang 2.
          </p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Satu jenis, satu kotak.</p>
        </article>
        <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Apa itu piktogram?</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
            <li>Setiap gambar mewakili 1 benda, kecuali judulnya bilang lain.</li>
            <li>Satu baris berisi gambar yang sejenis.</li>
            <li>Gambar disusun dari kiri ke kanan.</li>
            <li>Ada judul di atas diagram.</li>
          </ul>
          <p className="mt-2 text-sm font-semibold text-slate-700">🌻 Matahari 5. 🌹 Mawar 3.</p>
        </article>
        <article className="rounded-2xl border-2 border-cyan-300 bg-cyan-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Empat pertanyaan ajaib</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Apel 7, pisang 3, anggur 5. Paling banyak apel. Paling sedikit pisang. Jumlah 7 + 3 + 5 = 15. Selisih 7 – 3 = 4.
          </p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Lihat dulu, hitung kemudian.</p>
        </article>
        <article className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Membandingkan dua baris</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Ikan 6 dan kura-kura 4. Ikan lebih banyak 2.</p>
        </article>
        <article className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Satu gambar bisa mewakili dua benda</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Tiga gambar biskuit, dan 1 gambar = 2 biskuit. Jumlahnya 3 × 2 = 6. Selalu tanya: satu gambar mewakili berapa?
          </p>
        </article>
        <article className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Dari diagram ke tabel</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Apel 7, pisang 3, anggur 5. Diagram dan tabel menunjukkan hal yang sama.</p>
        </article>
      </div>
      <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Pasangkan benda ke kelompoknya!"
          baris={[
            { kiri: "🍎 Apel", pilihan: kelompok, benar: "🍎 Buah" },
            { kiri: "🥕 Wortel", pilihan: kelompok, benar: "🥕 Sayur" },
            { kiri: "🍌 Pisang", pilihan: kelompok, benar: "🍎 Buah" },
            { kiri: "🥦 Brokoli", pilihan: kelompok, benar: "🥕 Sayur" },
          ]}
          umpan="Apel dan pisang buah. Wortel dan brokoli sayur."
        />
        <SusunBentuk id={idKuis("B", 1)} />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Baris mana yang salah karena gambarnya bercampur?"
          pilihan={[
            { huruf: "A", teks: "Anjing: 🐶🐶🐶🐶🐶" },
            { huruf: "B", teks: "Kucing: 🐱🐱🐱🐱" },
            { huruf: "C", teks: "Ikan: 🐟🐶🐱🐟🐶" },
          ]}
          benar="C"
          umpan="Baris ikan isinya bercampur."
          salah="Pilih baris yang tidak sejenis."
        />
        <div>
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Kucing 4 ekor dan anjing 6 ekor. Berapa jumlah hewan semuanya?"
            periksa={jawabSepuluh}
            petunjuk="Jumlahkan 4 dan 6."
          />
        </div>
        <TulisBebas
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Bola 5, kelereng 3, boneka 2. Tulis ketiga jumlahnya!"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">⚽ 5 · 🔴 3 · 🧸 2</p>}
          pesanSalah="Tulis 5, 3, dan 2."
          umpan="Bola 5, kelereng 3, boneka 2."
          konteks="Tiga baris: lima bola, tiga kelereng, dua boneka."
          periksa={bolaTiga}
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB8.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🍎🦉🏆"
        judul={kartu.judul}
        anak="Sepuluh rak kantin · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB8}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB8}
        penutup="Kantin rapi kembali. Igil menempel stiker di setiap rak."
        bunga="🍎🍌🍇🐿️"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB8.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🏆 Manajer Data Hebat" : skor >= 6 ? "📊 Penata Kelompok Cerdas" : "🐿️ Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Diagrammu paling rapi!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi manajer data!"
        : "Ayo bereskan gudang lagi bersama Igil, kamu pasti bisa!";
  const kelompok = ["🥤 Minuman", "🍪 Makanan"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝📊"
        judul={kartu.judul}
        anak="Tantangan manajer data"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 grid gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/30 px-4 py-3 sm:grid-cols-3">
        <p className="text-sm font-black text-[#1C01A5]">Nama: {nama}</p>
        <p className="text-sm font-black text-[#1C01A5]">Kelas: 1</p>
        <p className="text-sm font-black text-[#1C01A5]">Skor: {skor} / 10</p>
      </div>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">
        {lencana}. {pesan}
      </p>
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Hitung ikonnya"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">🌻🌻🌻🌻🌻🌻</p>}
          pertanyaan="Berapa jumlah bunga matahari?"
          pesanSalah="Hitung ikon bunga dari kiri ke kanan."
          umpan="6 bunga matahari."
          alias={["6", "enam"]}
          periksa={jawabEnam}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Kucing 3, anjing 5, ikan 4. Hewan apa yang paling banyak?"
          pilihan={[
            { huruf: "A", teks: "Kucing" },
            { huruf: "B", teks: "Anjing" },
            { huruf: "C", teks: "Ikan" },
          ]}
          benar="B"
          umpan="Anjing 5, barisnya paling panjang."
          salah="Bandingkan angkanya."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Kucing 🐱🐱🐱🐱 dan ikan 🐠🐠🐠. Bimo berkata jumlahnya sama banyak.
          </p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan='3. Apakah Bimo benar? Ucapkan "Benar" atau "Salah", lalu sebutkan jumlahnya.'
            periksa={adiSalah}
            petunjuk="Kucing ada 4, ikan ada 3."
          />
        </div>
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Apel 5, pisang 2, anggur 4. Diagram yang benar?"
          pilihan={[
            { huruf: "A", teks: "Buah: apel 5, pisang 2, anggur 4" },
            { huruf: "B", teks: "Buah: apel 5, pisang 4, anggur 2" },
            { huruf: "C", teks: "Hewan: apel 5, pisang 2, anggur 4" },
          ]}
          benar="A"
          umpan="Judulnya buah. Apel 5, pisang 2, anggur 4."
          salah="Judul mengikuti jenis bendanya, dan angkanya tidak ditukar."
        />
        <TulisBebas
          id={idKuis("D", 4)}
          judul="5. Selisihnya berapa?"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">✏️ 8 · 🖍️ 3</p>}
          pertanyaan="Berapa selisih pensil dan krayon?"
          pesanSalah="8 dikurangi 3."
          umpan="8 – 3 = 5."
          alias={["5", "lima"]}
          konteks="Selisih 8 dan 3 adalah 5."
          periksa={selisihLima}
        />
        <KuisCocok
          id={idKuis("D", 5)}
          perintah="6. Pasangkan benda dengan kelompoknya!"
          baris={[
            { kiri: "🥛 Susu", pilihan: kelompok, benar: "🥤 Minuman" },
            { kiri: "🍪 Biskuit", pilihan: kelompok, benar: "🍪 Makanan" },
            { kiri: "🧃 Jus", pilihan: kelompok, benar: "🥤 Minuman" },
            { kiri: "🍞 Roti", pilihan: kelompok, benar: "🍪 Makanan" },
          ]}
          umpan="Susu dan jus minuman. Biskuit dan roti makanan."
        />
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="7. Mobil 4, bus 2, motor 5. Kendaraan apa yang paling sedikit?"
          periksa={jawabBus}
          petunjuk="Baris yang paling pendek."
        />
        <Pilih
          id={idKuis("D", 7)}
          pertanyaan="8. Diagram kue menunjukkan cupcake 6 dan donat 4. Tabel yang benar?"
          pilihan={[
            { huruf: "A", teks: "Cupcake 6, donat 4" },
            { huruf: "B", teks: "Cupcake 4, donat 6" },
            { huruf: "C", teks: "Cupcake 6, donat 6" },
          ]}
          benar="A"
          umpan="Cupcake 6. Donat 4."
          salah="Angka mengikuti jumlah ikonnya."
        />
        <Pilih
          id={idKuis("D", 8)}
          pertanyaan="9. Satu ikon sama dengan 2 susu. Ada 4 ikon. Jumlah susu sebenarnya?"
          pilihan={[
            { huruf: "A", teks: "4" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "8" },
          ]}
          benar="C"
          umpan="4 × 2 = 8."
          salah="Kalikan jumlah ikon dengan 2."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Merah paling banyak, hijau paling sedikit. Diagram yang benar?"
          pilihan={[
            { huruf: "A", teks: "Merah 5, biru 3, hijau 1" },
            { huruf: "B", teks: "Hijau 5, biru 3, merah 1" },
            { huruf: "C", teks: "Merah 2, biru 2, hijau 2" },
          ]}
          benar="A"
          umpan="Merah 5 paling banyak. Hijau 1 paling sedikit."
          salah="Yang paling banyak angkanya paling besar."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Satu gambar = satu benda."
          alias={["satu gambar satu benda", "satu gambar = satu benda", "satu benda"]}
          konteks="Kalimat kuncinya: satu gambar sama dengan satu benda."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Kamu sudah bisa membaca diagram gambar.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab8({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB8.kartu[3].voice, 2_000, 3_000)}
        poin={[
          "Satu jenis, satu kotak.",
          "Satu gambar sama dengan satu benda.",
          "Baris rapi, dari kiri ke kanan.",
          "Baris terpanjang berarti paling banyak.",
          "Jumlah semuanya ditambahkan. Selisihnya dikurangkan.",
          "Selalu pakai judul.",
          "Data harus benar dari awal.",
        ]}
        penutup="Satu jenis, satu kotak. Satu gambar, satu benda, Igil pun tersenyum!"
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
