"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB5 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB5 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { QuestLangkah, type LangkahQuest } from "@/components/QuestLangkah";
import { BenarSalahTiga, JudulHalaman, SusunTiga, empatHalaman } from "@/components/modul/GigitanQuest";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB5 } from "@/lib/modul-resmi-mtk-1-bab5";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB5.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function bacakan(teks: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = "id-ID";
  window.speechSynthesis.speak(suara);
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
      <NamaDialog nama={nama} />
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
      <p className="text-center text-4xl font-normal" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">{anak}</p> : null}
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
    </>
  );
}

function JudulSubBab({
  judul,
  kelas,
  kelamin,
  naskah,
}: {
  judul: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  naskah: string[];
}) {
  return (
    <>
      <h5 className="mt-5 text-left text-base font-black tracking-wide text-[#1C01A5] sm:text-lg">{judul}</h5>
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah([naskah], 2_000, 3_000)} />
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
  src,
  alt,
  children,
}: {
  judul: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="space-y-3 rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
      <p className="text-xs font-black uppercase text-[#166534]">{judul}</p>
      <GambarCerita src={src} alt={alt} />
      <div className="space-y-2">{children}</div>
    </article>
  );
}

function BingkaiTitik({ titik }: { titik: number }) {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-xl border-2 border-[#1C01A5]/20 bg-white p-2">
      {Array.from({ length: 10 }, (_, indeks) => (
        <span key={indeks} className="text-center text-lg" aria-hidden>
          {indeks < titik ? "🔵" : "⚪"}
        </span>
      ))}
    </div>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
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
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk gambar, lalu ketuk angkanya.</p>
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
              <span className="text-lg">{item.kiri}</span>
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Lihat ikatannya, lalu pasangkan lagi." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
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
}) {
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
            pertanyaan,
            konteks: konteks || umpan,
            alias,
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
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) {
          kuis?.tandaiBenar(id);
          sesudahBenar?.();
        }
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) {
      kuis?.tandaiBenar(id);
      sesudahBenar?.();
    }
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

const BELASAN = [
  ["11", "Sebelas", "🎀 ●"],
  ["12", "Dua belas", "🎀 ●●"],
  ["13", "Tiga belas", "🎀 ●●●"],
  ["14", "Empat belas", "🎀 ●●●●"],
  ["15", "Lima belas", "🎀 ●●●●●"],
  ["16", "Enam belas", "🎀 ●●●●●●"],
  ["17", "Tujuh belas", "🎀 ●●●●●●●"],
  ["18", "Delapan belas", "🎀 ●●●●●●●●"],
  ["19", "Sembilan belas", "🎀 ●●●●●●●●●"],
  ["20", "Dua puluh", "🎀🎀"],
] as const;

function TabelBelasan() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-teal-300">
      <div className="grid grid-cols-3 bg-teal-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span>Angka</span>
        <span>Dibaca</span>
        <span>Gambar</span>
      </div>
      {BELASAN.map(([angka, nama, gambar]) => (
        <button
          key={angka}
          type="button"
          onClick={() => bacakan(nama)}
          className="grid w-full grid-cols-3 border-t border-sky-200 bg-white px-3 py-2 text-left text-sm font-bold text-[#1C01A5] hover:bg-teal-50"
        >
          <span>{angka}</span>
          <span>{nama}</span>
          <span>{gambar}</span>
        </button>
      ))}
      <p className="border-t border-sky-200 px-3 py-2 text-xs font-semibold text-slate-600">
        Ketuk tiap baris untuk mendengar cara membacanya.
      </p>
    </div>
  );
}

function SusunKereta() {
  const kuis = useKuisMateri();
  const acak = [17, 11, 20, 14, 16];
  const benar = [11, 14, 16, 17, 20];
  const [susun, setSusun] = useState<number[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = acak.filter((angka) => !susun.includes(angka));
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((angka, indeks) => angka === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(idKuis("B", 1));
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">Susun gerbong dari angka paling kecil ke paling besar!</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">🚂 {susun.join(" – ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, angka]);
            }}
            className="rounded-xl bg-white px-3 py-2 text-lg font-black text-[#1C01A5] ring-2 ring-sky-200"
          >
            {angka}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
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
        <button type="button" onClick={periksa} className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Mulai dari angka yang paling kecil." />
        <Umpan status={status} teks="Benar! 11 – 14 – 16 – 17 – 20." />
      </div>
    </article>
  );
}

function KartuBeda() {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, "D");
  const kartu = [
    ["A", "15"],
    ["B", "🎀 ●●●●●"],
    ["C", "10 + 5"],
    ["D", "🎀 ●●●●"],
  ];
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">
        Tiga kartu menunjukkan angka yang sama. Satu kartu berbeda. Ketuk kartu yang berbeda!
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {kartu.map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setPilih(huruf);
              if (huruf === "D") kuis?.tandaiBenar(idKuis("B", 2));
            }}
            className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              huruf,
              "D",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Kartu lain sama dengan 15. Hitung bulatan yang lepas." />
        <Umpan status={status} teks="Kartu D isinya 14. Kartu lain semuanya 15." />
      </div>
    </article>
  );
}

function IsiHitung({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan" kelas={kelas} kelamin={kelamin} naskah={["Besok hari tujuh belas Agustus. Kampung memasang bendera kecil.", "Igil butuh bendera sebanyak angka di kertasnya."]} />
        <Adegan judul="Pagi di gang kampung" src="/doodle-mtk/mtk-1-bab5-pagi.jpg" alt="Gang kampung berhias umbul-umbul. Bendera kecil mendarat di kaki Bimo.">
          <Dialog nama="Igil" anak="Anak-anak, tolong pasang bendera kecil di sepanjang pagar!" />
          <Dialog nama="Bimo" anak="Wah, pagarnya panjang sekali." />
          <Dialog nama="Rara" anak="Igil memegang kertas. Angkanya begini." />
          <p className="text-center text-3xl font-black text-[#1C01A5]">20</p>
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 1)} idKanvas={idKuis("A", 2)} pertanyaanSuara="Igil butuh berapa bendera?" aliasSuara={["20", "dua puluh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 20." aliasKanvas={["20", "dua puluh"]} konteksKanvas="Pagar butuh 20 bendera." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Ikat bendera" kepala={["Langkah", "Aturan", "Hasil"]} baris={[["Kumpulkan", "setiap 10", "satu ikat"], ["Ikat", "pita rapat", "1 puluhan"], ["Sisa", "tidak diikat", "satuan"]]} kaki="Berantakan mudah salah. Ikat setiap sepuluh." />
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Bendera diikat setiap berapa?" aliasSuara={["10", "sepuluh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka sepuluh." aliasKanvas={["10", "sepuluh"]} konteksKanvas="Setiap ikatan berisi 10 bendera." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🎀 <IkonUlang ikon="🇮🇩" jumlah={10} ukuran="text-xl" /></p>
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Satu ikat isinya berapa bendera?" aliasSuara={["10", "sepuluh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 1 ikat = 10." aliasKanvas={["1 ikat = 10", "1ikat=10"]} konteksKanvas="Satu ikatan sama dengan sepuluh bendera." />
        <p className="text-center text-2xl">🎀 <IkonUlang ikon="🇮🇩" jumlah={3} ukuran="text-xl" /></p>
        <KuisAkhirAdegan idSuara={idKuis("A", 7)} idKanvas={idKuis("A", 8)} pertanyaanSuara="Satu ikat dan tiga bendera lepas. Semuanya berapa?" aliasSuara={["13", "tiga belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 13." aliasKanvas={["13", "tiga belas"]} konteksKanvas="Satu puluhan dan tiga satuan sama dengan 13." />
        <SusunTiga id={idKuis("A", 13)} perintah="Susun dari ikatan yang paling sedikit." acak={["2 ikat", "1 ikat", "0 ikat"]} benar={["0 ikat", "1 ikat", "2 ikat"]} umpan="Nol, satu, lalu dua ikat." />
        <BenarSalahTiga id={idKuis("A", 14)} perintah="Pilih benar atau salah." baris={[{ teks: "Satu ikat berisi sepuluh bendera.", benar: true }, { teks: "Bendera lepas ikut dihitung.", benar: true }, { teks: "Dua ikat sama dengan sepuluh.", benar: false }]} umpan="Dua ikat sama dengan dua puluh." />
        <SusunTiga id={idKuis("A", 15)} perintah="Susun cara menghitung." acak={["Ikat", "Hitung", "Kumpulkan"]} benar={["Kumpulkan", "Hitung", "Ikat"]} umpan="Kumpulkan, hitung sampai sepuluh, lalu ikat." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-sm font-semibold text-slate-700">Belas artinya sepuluh lebih sedikit. Angka 11 namanya sebelas.</p>
      <KuisAkhirAdegan idSuara={idKuis("A", 9)} idKanvas={idKuis("A", 10)} pertanyaanSuara="Tiga belas sama dengan sepuluh dan berapa?" aliasSuara={["3", "tiga"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan nama angka 11." aliasKanvas={["sebelas"]} konteksKanvas="Angka 11 dibaca sebelas, bukan satu belas." />
      <p className="text-center text-3xl">🎀🎀</p>
      <KuisAkhirAdegan idSuara={idKuis("A", 11)} idKanvas={idKuis("A", 12)} pertanyaanSuara="Dua ikat bendera sama dengan berapa?" aliasSuara={["20", "dua puluh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 2 ikat = 20." aliasKanvas={["2 ikat = 20", "2ikat=20"]} konteksKanvas="Dua ikatan penuh sama dengan 20." />
      <p className="text-center text-2xl">🎀 <IkonUlang ikon="🇮🇩" jumlah={5} /></p>
      <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Ada satu ikat dan lima bendera lepas. Semuanya berapa? Ucapkan dengan keras!" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["lima belas", "15"])} petunjuk="Sebutkan jumlah semuanya." sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")} />
      {suara === "benar" ? <p className="text-sm font-bold text-emerald-800">Cuit-cuit! Kamu hebat sekali!</p> : null}
      {suara === "salah" ? <p className="text-sm font-bold text-rose-800">Mulai dari sepuluh, lalu lanjut hitung bendera yang lepas.</p> : null}
      <KuisTulisKartu id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis angka banyaknya semua bendera!" alias={["18", "delapan belas"]} konteks="Satu ikat sepuluh bendera ditambah delapan bendera lepas sama dengan 18." visual={<p className="text-center text-2xl">🎀 <IkonUlang ikon="🇮🇩" jumlah={8} ukuran="text-xl" /></p>} sesudahNilai={(benar) => { if (!benar) setSalahKanvas((jumlah) => jumlah + 1); }} />
      {salahKanvas >= 2 ? <p className="text-sm font-bold text-[#1C01A5]">Puluhan satu ikat. Satuan delapan bendera lepas.</p> : null}
      <Pilih id={idKuis("A", 16)} pertanyaan="1 ikat dan 4 lepas ditulis..." pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "41" }, { huruf: "C", teks: "5" }]} benar="A" umpan="Puluhan dulu, baru satuan." salah="Angka 1 di kiri, angka 4 di kanan." />
      <Pilih id={idKuis("A", 17)} pertanyaan="Nama angka 11 adalah..." pilihan={[{ huruf: "A", teks: "satu belas" }, { huruf: "B", teks: "sebelas" }, { huruf: "C", teks: "sepuluh" }]} benar="B" umpan="Sebelas adalah nama istimewa." salah="Bukan satu belas." />
      <Pilih id={idKuis("A", 18)} pertanyaan="Dua ikat penuh, lepasnya nol. Angkanya..." pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "20" }]} benar="C" umpan="Dua puluhan sama dengan 20." salah="Dua ikat, bukan dua bendera." />
    </div>
  );
}

function IsiMaju({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Menghitung Maju dan Mundur" kelas={kelas} kelamin={kelamin} naskah={["Sebelas, dua belas, tiga belas, empat belas, lima belas.", "Ingat sepuluh, lalu lanjut hitung."]} />
        <Adegan judul="Membilang di pagar" src="/doodle-mtk/mtk-1-bab5-adegan-4.jpg" alt="Papan angka 11 sampai 15. Rara menunjuk, Bimo mengikuti.">
          <Dialog nama="Rara" anak="Aku mulai dari sebelas." />
          <Dialog nama="Bimo" anak="Dua belas, tiga belas, empat belas..." />
          <Dialog nama="Igil" anak="Ingat sepuluh di kepala. Jangan mulai lagi dari satu." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("B", 4)} idKanvas={idKuis("B", 5)} pertanyaanSuara="Setelah empat belas, angka berapa?" aliasSuara={["15", "lima belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 12, 13, 14." aliasKanvas={["12, 13, 14", "12 13 14"]} konteksKanvas="Maju satu-satu: dua belas, tiga belas, empat belas." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Maju dan Mundur" kepala={["Arah", "Urutan", "Contoh"]} baris={[["Maju", "kecil ke besar", "11, 12, 13"], ["Mundur", "besar ke kecil", "15, 14, 13"], ["Lanjut", "ingat 10", "jangan ulang dari 1"]]} kaki="Maju bertambah. Mundur berkurang." />
        <KuisAkhirAdegan idSuara={idKuis("B", 6)} idKanvas={idKuis("B", 7)} pertanyaanSuara="Sebelum lima belas, kalau mundur, angkanya berapa?" aliasSuara={["14", "empat belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 15, 14, 13." aliasKanvas={["15, 14, 13", "15 14 13"]} konteksKanvas="Mundur: lima belas, empat belas, tiga belas." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-lg font-black text-[#1C01A5]">11 · 12 · 13 · 14 · 15 · 16 · 17</p>
        <SusunKereta />
        <SusunTiga id={idKuis("B", 8)} perintah="Susun mundur dari 16." acak={["14", "15", "13"]} benar={["15", "14", "13"]} umpan="15, 14, lalu 13." />
        <BenarSalahTiga id={idKuis("B", 9)} perintah="Pilih benar atau salah." baris={[{ teks: "Maju berarti angkanya bertambah.", benar: true }, { teks: "Setelah 19 adalah 18 kalau maju.", benar: false }, { teks: "Dua puluh ada sesudah sembilan belas.", benar: true }]} umpan="Maju dari 19 menuju 20." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">11 … 20</p>
      <Pilih id={idKuis("B", 10)} pertanyaan="Setelah 16, angka majunya..." pilihan={[{ huruf: "A", teks: "15" }, { huruf: "B", teks: "17" }, { huruf: "C", teks: "61" }]} benar="B" umpan="16, lalu 17." salah="Maju bertambah satu." />
      <Pilih id={idKuis("B", 11)} pertanyaan="Mundur tiga langkah dari 20 berhenti di..." pilihan={[{ huruf: "A", teks: "17" }, { huruf: "B", teks: "23" }, { huruf: "C", teks: "18" }]} benar="A" umpan="19, 18, 17." salah="Mundur berarti berkurang." />
      <Pilih id={idKuis("B", 12)} pertanyaan="11, 12, 13, angka berikutnya..." pilihan={[{ huruf: "A", teks: "10" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "31" }]} benar="B" umpan="Tiga belas, lalu empat belas." salah="Lanjut satu langkah." />
    </div>
  );
}

function IsiNilai({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const pilihanAngka = ["12", "19", "20"];
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab C: Nilai Tempat" kelas={kelas} kelamin={kelamin} naskah={["Rak kiri untuk ikatan. Rak kanan untuk benda yang lepas.", "Tulis puluhan lebih dulu, baru satuannya."]} />
        <Adegan judul="Dua rak angka" src="/doodle-mtk/mtk-1-bab5-adegan-3.jpg" alt="Satu ikat bendera di rak kiri dan bendera lepas di rak kanan.">
          <Dialog nama="Igil" anak="Rak kiri untuk ikatan. Rak kanan untuk yang lepas." />
          <Dialog nama="Rara" anak="Aku tulis angka kiri lebih dulu." />
          <Dialog nama="Bimo" anak="Empat belas adalah satu dan empat, bukan empat dan satu." />
        </Adegan>
        <p className="text-center text-4xl font-black"><span className="text-blue-700">1</span><span className="text-sky-600">8</span></p>
        <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Angka 18 punya berapa puluhan dan berapa satuan? Ucapkan!" periksa={(transkrip) => ucapanMemuat(transkrip, [["satu puluhan", "1 puluhan", "satu ikat"], ["delapan satuan", "8 satuan", "delapan"]])} petunjuk="Sebutkan puluhan dan satuannya." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "B")} pertanyaan="Tulis angka yang dibacakan Igil: enam belas!" alias={["16", "enam belas"]} konteks="Enam belas ditulis 16. Empat satu, yaitu 61, salah." visual={<p className="text-center text-lg font-black text-[#1C01A5]">enam belas</p>} />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Nilai Tempat" kepala={["Rak", "Isi", "Contoh 13"]} baris={[["Kiri", "puluhan", "1 ikat"], ["Kanan", "satuan", "3 lepas"], ["Bacaan", "belasan", "tiga belas"]]} kaki="Kiri puluhan, kanan satuan." />
        <KuisAkhirAdegan idSuara={idKuis("A", 19)} idKanvas={idKuis("A", 20)} pertanyaanSuara="Angka 15. Satuannya berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 10 + 5." aliasKanvas={["10 + 5", "10+5"]} konteksKanvas="Lima belas sama dengan sepuluh tambah lima." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🎀 <IkonUlang ikon="●" jumlah={3} /></p>
        <KuisCocok id={idKuis("B", 0)} perintah="Tarik garis dari gambar ke angka yang benar!" baris={[{ kiri: "🎀 ●●", pilihan: pilihanAngka, benar: "12" }, { kiri: "🎀 ●●●●●●●●●", pilihan: pilihanAngka, benar: "19" }, { kiri: "🎀🎀", pilihan: pilihanAngka, benar: "20" }]} umpan="Satu ikat dua lepas = 12. Satu ikat sembilan lepas = 19. Dua ikat = 20." />
        <SusunTiga id={idKuis("A", 21)} perintah="Susun dari satuan yang paling kecil." acak={["1 dan 8", "1 dan 2", "1 dan 5"]} benar={["1 dan 2", "1 dan 5", "1 dan 8"]} umpan="12, 15, lalu 18." />
        <BenarSalahTiga id={idKuis("A", 22)} perintah="Pilih benar atau salah." baris={[{ teks: "Angka kiri adalah puluhan.", benar: true }, { teks: "41 sama dengan empat belas.", benar: false }, { teks: "Rak kanan untuk benda lepas.", benar: true }]} umpan="Empat belas ditulis 14." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">16 = 10 + 6</p>
      <Pilih id={idKuis("A", 23)} pertanyaan="Puluhan pada angka 17 adalah..." pilihan={[{ huruf: "A", teks: "7" }, { huruf: "B", teks: "1" }, { huruf: "C", teks: "17" }]} benar="B" umpan="Angka kiri 1 berarti satu puluhan." salah="Lihat angka di kiri." />
      <Pilih id={idKuis("A", 24)} pertanyaan="19 = 10 + ..." pilihan={[{ huruf: "A", teks: "9" }, { huruf: "B", teks: "1" }, { huruf: "C", teks: "19" }]} benar="A" umpan="Sembilan satuan." salah="Lihat angka kanan." />
      <Pilih id={idKuis("A", 25)} pertanyaan="Tujuh belas ditulis..." pilihan={[{ huruf: "A", teks: "71" }, { huruf: "B", teks: "17" }, { huruf: "C", teks: "7" }]} benar="B" umpan="Puluhan dulu." salah="Bukan tujuh satu." />
    </div>
  );
}

function IsiBanding({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab D: Membandingkan Bilangan" kelas={kelas} kelamin={kelamin} naskah={["Kalau puluhannya sama, lihat satuannya."]} />
        <Adegan judul="Dua kantong bendera" src="/doodle-mtk/mtk-1-bab5-adegan-5.jpg" alt="Rara memegang kertas 19. Bimo memegang kertas 12.">
          <Dialog nama="Rara" anak="Kantongku bertanda 19." />
          <Dialog nama="Bimo" anak="Kantongku bertanda 12." />
          <Dialog nama="Igil" anak="Puluhannya sama. Lihat angka kanannya." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 26)} idKanvas={idKuis("A", 27)} pertanyaanSuara="Yang lebih besar, 19 atau 12?" aliasSuara={["19", "sembilan belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 19 > 12." aliasKanvas={["19 > 12", "19>12"]} konteksKanvas="Sembilan belas lebih besar daripada dua belas." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Membandingkan" kepala={["Cek", "Cara", "Contoh"]} baris={[["Puluhan", "yang lebih banyak menang", "2 ikat dan 1 ikat"], ["Satuan", "kalau puluhan sama", "lihat angka kanan"], ["Tanda", "lebih besar atau lebih kecil", "pakai > atau <"]]} kaki="Puluhan sama? Lihat satuannya." />
        <KuisAkhirAdegan idSuara={idKuis("A", 28)} idKanvas={idKuis("A", 29)} pertanyaanSuara="Yang lebih besar, 16 atau 13?" aliasSuara={["16", "enam belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 16 > 13." aliasKanvas={["16 > 13", "16>13"]} konteksKanvas="Enam belas lebih besar daripada tiga belas." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🎀●●●●● &nbsp; 🎀●●</p>
        <KartuBeda />
        <SusunTiga id={idKuis("A", 30)} perintah="Susun dari yang paling kecil." acak={["19", "12", "16"]} benar={["12", "16", "19"]} umpan="12, 16, lalu 19." />
        <BenarSalahTiga id={idKuis("A", 31)} perintah="Pilih benar atau salah." baris={[{ teks: "19 lebih besar daripada 12.", benar: true }, { teks: "Puluhan 2 lebih kecil daripada puluhan 1.", benar: false }, { teks: "Kalau puluhan sama, lihat satuan.", benar: true }]} umpan="Dua puluhan lebih banyak daripada satu." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">&lt; &nbsp; &gt; &nbsp; =</p>
      <Pilih id={idKuis("A", 32)} pertanyaan="14 ... 17. Tanda yang tepat..." pilihan={[{ huruf: "A", teks: ">" }, { huruf: "B", teks: "<" }, { huruf: "C", teks: "=" }]} benar="B" umpan="14 lebih kecil daripada 17." salah="Angka kiri lebih kecil." />
      <Pilih id={idKuis("A", 33)} pertanyaan="10 + 8 dan 18. Keduanya..." pilihan={[{ huruf: "A", teks: "sama" }, { huruf: "B", teks: "10 lebih besar" }, { huruf: "C", teks: "18 lebih kecil" }]} benar="A" umpan="10 + 8 = 18." salah="Hitung dulu sepuluh tambah delapan." />
      <Pilih id={idKuis("A", 34)} pertanyaan="Yang paling banyak..." pilihan={[{ huruf: "A", teks: "13" }, { huruf: "B", teks: "11" }, { huruf: "C", teks: "20" }]} benar="C" umpan="20 adalah dua puluhan." salah="Bandingkan puluhannya." />
    </div>
  );
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB5.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🇮🇩🎀🏆"
        judul={kartu.judul}
        anak="Sepuluh tiang lomba · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB5}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB5}
        penutup="Dua puluh tiang pagar sudah siap. Igil mengikat pita terakhir."
        bunga="🇮🇩🎀🎟️🚩"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9 ? "🎆 Pahlawan Angka Merdeka" : skor >= 6 ? "🇮🇩 Pengibar Bendera Cerdas" : "🐦 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu jagoan angka sampai 20!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi pahlawan angka!"
        : "Ayo mengikat bendera lagi bersama Igil, kamu pasti bisa!";
  const kartu = MODUL_MTK1_BAB5.kartu[3];
  const pasangan = ["Dua belas", "Dua puluh", "1 puluhan 5 satuan"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝⭐"
        judul={kartu.judul}
        anak="Tantangan Para Juara · Ayo Membilang sampai dengan 20"
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
          judul="1. Hitung kelereng"
          visual={
            <div className="grid gap-2 sm:grid-cols-2">
              <BingkaiTitik titik={10} />
              <BingkaiTitik titik={7} />
            </div>
          }
          pertanyaan="Tulis banyaknya semua kelereng!"
          pesanSalah="Bingkai penuh 10, lalu tujuh kelereng lagi."
          umpan="10 + 7 = 17."
          alias={["17", "tujuh belas"]}
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["17", "tujuh belas"])}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Angka 19 punya rumah nilai tempat yang mana?"
          pilihan={[
            { huruf: "A", teks: "9 puluhan dan 1 satuan" },
            { huruf: "B", teks: "1 puluhan dan 9 satuan" },
            { huruf: "C", teks: "19 puluhan" },
          ]}
          benar="B"
          umpan="19 = 1 puluhan dan 9 satuan."
          salah="Angka kiri adalah puluhan."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-center text-3xl font-black text-rose-700">51</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan='3. Bimo menulis "lima belas" sebagai 51. Apakah Bimo benar? Ucapkan Benar atau Salah, lalu sebutkan cara menulis yang benar.'
            periksa={(transkrip) =>
              ucapanMemuat(transkrip, [
                ["salah"],
                ["15", "lima belas", "satu lima"],
              ])
            }
            petunjuk="Katakan salah, lalu sebutkan 15."
          />
        </div>
        <TulisBebas
          id={idKuis("D", 3)}
          judul="4. Angka yang hilang"
          visual={<p className="text-center text-lg font-black text-[#1C01A5]">🚂 12 – 13 – ⬜ – 15 – ⬜ – ⬜ – 18</p>}
          pertanyaan="Tulis tiga angka yang hilang!"
          pesanSalah="Yang hilang adalah 14, 16, dan 17."
          umpan="14, 16, dan 17."
          konteks="Benar hanya jika ketiga angka 14, 16, dan 17 terbaca."
          periksa={(teks) =>
            ["14", "16", "17"].every((angka) => jawabanTulisMemuatAlias(teks, [angka])) ||
            ucapanMemuat(teks, [
              ["empat belas"],
              ["enam belas"],
              ["tujuh belas"],
            ])
          }
        />
        <SoalRekamSuara
          id={idKuis("D", 4)}
          pertanyaan="5. Puluhanku 1. Satuanku lebih besar dari 6, tapi lebih kecil dari 8. Siapa aku?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh belas", "17"])}
          petunjuk="Sebutkan angkanya."
        />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Angka 14 digambar dengan ikatan dan bulatan lepas. Gambar yang benar?"
          pilihan={[
            { huruf: "A", teks: "1 ikat dan 4 bulatan lepas" },
            { huruf: "B", teks: "4 ikat dan 1 bulatan lepas" },
            { huruf: "C", teks: "14 ikat" },
          ]}
          benar="A"
          umpan="1 ikat + 4 bulatan = 14."
          salah="Satu ikat berisi sepuluh. Sisanya adalah satuan."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Mana kantong kelereng yang paling banyak?"
          pilihan={[
            { huruf: "A", teks: "🎀 ●●●●●● (16)" },
            { huruf: "B", teks: "Angka 13" },
            { huruf: "C", teks: "10 + 8" },
          ]}
          benar="C"
          umpan="10 + 8 = 18. Itu yang paling banyak."
          salah="Bandingkan 16, 13, dan 18."
        />
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan kartu yang nilainya sama!"
          baris={[
            { kiri: "10 + 2", pilihan: pasangan, benar: "Dua belas" },
            { kiri: "🎀🎀", pilihan: pasangan, benar: "Dua puluh" },
            { kiri: "15", pilihan: pasangan, benar: "1 puluhan 5 satuan" },
          ]}
          umpan="10 + 2 = dua belas. Dua ikat = dua puluh. 15 = 1 puluhan 5 satuan."
        />
        <Pilih
          id={idKuis("D", 8)}
          pertanyaan="9. Pagar punya 20 tiang. Rara membawa 1 ikat dan 7 bendera lepas. Apakah benderanya cukup?"
          visual={<p>🎀 dan 7 bendera lepas</p>}
          pilihan={[
            { huruf: "A", teks: "Cukup, karena ada 20" },
            { huruf: "B", teks: "Tidak cukup, karena baru 17" },
            { huruf: "C", teks: "Cukup, karena ada 27" },
          ]}
          benar="B"
          umpan="1 ikat + 7 = 17. 17 belum sampai 20."
          salah="Satu ikat adalah 10, ditambah 7 menjadi 17."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kartu [1] dan [8] disusun jadi angka belasan. Kalau ditukar, masih belasan?"
          visual={<p>[ 1 ] [ 8 ]</p>}
          pilihan={[
            { huruf: "A", teks: "18, dan kalau ditukar tetap belasan" },
            { huruf: "B", teks: "18, dan kalau ditukar jadi 81, bukan belasan" },
            { huruf: "C", teks: "81, dan itu masih belasan" },
          ]}
          benar="B"
          umpan="18 belasan. Ditukar jadi 81, bukan belasan lagi."
          salah="Puluhan ditulis lebih dulu. 18 bukan 81."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Sepuluh diikat jadi satu."
          alias={["sepuluh diikat jadi satu", "1 ikat = 10", "satu ikat sepuluh"]}
          konteks="Kalimat kuncinya: sepuluh diikat jadi satu."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Bendera kecil sudah siap. Kamu bisa membilang sampai 20.</p>
      </div>
    </KartuBingkai>
  );
}

function langkahBab5(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartuA = MODUL_MTK1_BAB5.kartu[0];
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID, "D")];
  const butir = ["Membilang, membaca, dan menulis bilangan 11 sampai 20.", "Menghitung maju dan mundur pada bilangan belasan.", "Mengenal puluhan dan satuan dengan mengelompokkan benda per sepuluh.", "Membandingkan bilangan sampai 20."];
  const halaman = (Isi: (props: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) => ReactNode, kuis: string[][]) =>
    [0, 1, 2, 3].map((n) => ({ isi: <Isi halaman={n} kelas={kelas} kelamin={kelamin} />, kuis: kuis[n] }));
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Membilang sampai 20" }, "hitung", halaman(IsiHitung, [
      [idKuis("A", 1), idKuis("A", 2)],
      [idKuis("A", 3), idKuis("A", 4)],
      [idKuis("A", 5), idKuis("A", 6), idKuis("A", 7), idKuis("A", 8), idKuis("A", 13), idKuis("A", 14), idKuis("A", 15)],
      [idKuis("A", 9), idKuis("A", 10), idKuis("A", 11), idKuis("A", 12), idKuis("A", 0), idKuisTulisKartu(ID, "A"), idKuis("A", 16), idKuis("A", 17), idKuis("A", 18)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Maju dan mundur" }, "maju", halaman(IsiMaju, [
      [idKuis("B", 4), idKuis("B", 5)],
      [idKuis("B", 6), idKuis("B", 7)],
      [idKuis("B", 1), idKuis("B", 8), idKuis("B", 9)],
      [idKuis("B", 10), idKuis("B", 11), idKuis("B", 12)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab C", kelompok: "Nilai tempat" }, "nilai", halaman(IsiNilai, [
      [idKuis("B", 3), idKuisTulisKartu(ID, "B")],
      [idKuis("A", 19), idKuis("A", 20)],
      [idKuis("B", 0), idKuis("A", 21), idKuis("A", 22)],
      [idKuis("A", 23), idKuis("A", 24), idKuis("A", 25)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab D", kelompok: "Membandingkan" }, "banding", halaman(IsiBanding, [
      [idKuis("A", 26), idKuis("A", 27)],
      [idKuis("A", 28), idKuis("A", 29)],
      [idKuis("B", 2), idKuis("A", 30), idKuis("A", 31)],
      [idKuis("A", 32), idKuis("A", 33), idKuis("A", 34)],
    ])),
    { kode: "misi", bagian: "Misi", judul: "Misi bendera", kuis: kuisMisi, isi: <KartuC kelas={kelas} kelamin={kelamin} /> },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <KepalaKartu ikon="🇮🇩🎀🦉" judul={kartuA.judul} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={butir} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB5.kartu[3].voice, 2_000, 3_000)} poin={["Sepuluh diikat jadi satu. 1 ikat = 10 = 1 puluhan.", "Kiri puluhan, kanan satuan.", "Belas artinya sepuluh lebih sedikit. Tiga belas = 10 + 3.", "Ingat sepuluh, lalu lanjut hitung.", "Tulis puluhan dulu. 14, bukan 41.", "Dua ikat penuh = 20.", "Puluhan sama? Lihat satuannya. 19 lebih besar dari 12."]} penutup="Dua ikat penuh, jadi dua puluh. Kiri puluhan, kanan satuan." />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    { kode: "evaluasi", bagian: "Evaluasi", judul: "Lembar evaluasi", isi: <LembarEvaluasi kelas={kelas} kelamin={kelamin} />, kuis: kuisEvaluasi },
  ];
}

export default function NaskahMtk1Bab5({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab5(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab5-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Bendera siap. Bab ini selesai."
    />
  );
}
