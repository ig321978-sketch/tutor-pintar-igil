"use client";

import GambarCerita from "@/components/GambarCerita";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { PagerSubbab, TabSubbab } from "@/components/modul/EmpatHalamanMateri";
import { useJudulDompetMateri } from "@/components/modul/KepalaDompetMateri";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB6, TEMA_MTK5_BAB6 } from "@/lib/misi-mtk-5-bab6";
import { MODUL_MTK5_BAB6 } from "@/lib/modul-resmi-mtk-5-bab6";
import {
  hasil0,
  hasil2,
  hasil3,
  hasil4,
  hasil5,
  hasil30,
  hasil54,
  hasil60,
  hasil90,
  hasil108,
  hasil120,
  hasil135,
  hasil150,
  hasil180,
  hasil225,
  hasil240,
  hasil360,
  jawabLancip,
  jawabReleks,
  jawabSiku,
  jawabTumpul,
} from "@/lib/nilai-mtk-5-bab6";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB6.id;
const PASANGAN_JAM = ["30°", "90°", "150°"];
const PASANGAN_JENIS = ["lancip", "siku-siku", "tumpul"];
const PASANGAN_KHUSUS = ["sudut nol", "sudut lurus", "sudut penuh"];

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Seli: "border-rose-300 bg-rose-50",
  Jaka: "border-emerald-300 bg-emerald-50",
  Galih: "border-indigo-300 bg-indigo-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Seli: "👧",
  Jaka: "👦",
  Galih: "👦",
  Igil: "🦉",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>{WAJAH_DIALOG[nama] ?? "💬"}</span>
        {nama}
      </p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function Papan({ anak }: { anak: string }) {
  return (
    <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
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
  cuplikan?: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      {cuplikan && cuplikan.length > 0 ? (
        <div className="mt-3">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
        </div>
      ) : null}
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

const GAMBAR_MENARA = {
  menara: { src: "/doodle-mtk/mtk-5-bab6-menara.jpg", alt: "Seli, Jaka, dan Galih memandang menara jam. Igil di dinding taman." },
  lipat: { src: "/doodle-mtk/mtk-5-bab6-lipat.jpg", alt: "Galih melipat kertas. Seli menunjuk pojok lipatan. Igil di samping." },
  jam: { src: "/doodle-mtk/mtk-5-bab6-jam.jpg", alt: "Seli, Jaka, dan Galih melihat jam menara. Igil di tepi jam." },
  kipas: { src: "/doodle-mtk/mtk-5-bab6-kipas.jpg", alt: "Seli memegang kipas yang terbuka lebar. Igil di dekat kipas." },
  busur: { src: "/doodle-mtk/mtk-5-bab6-busur.jpg", alt: "Jaka memegang busur derajat. Igil duduk di rumput." },
  pos: { src: "/doodle-mtk/mtk-5-bab6-pos.jpg", alt: "Batu loncatan di taman senja. Igil di batu pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab6-meja.jpg", alt: "Meja kecil dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab6-kartu.jpg", alt: "Seli, Jaka, Galih, dan Igil memegang kartu kosong di taman menara." },
} as const;

function GambarMenara({ jenis }: { jenis: keyof typeof GAMBAR_MENARA }) {
  const gambar = GAMBAR_MENARA[jenis];
  return <GambarCerita src={gambar.src} alt={gambar.alt} />;
}

function Adegan({
  judul,
  jenis,
  kelas,
  kelamin,
  penjelasan,
  children,
}: {
  judul: string;
  jenis: keyof typeof GAMBAR_MENARA;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarMenara jenis={jenis} />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(nilai) => setTepat(nilai)} />
      {tepat && benar ? <p className="mt-2 text-sm font-bold text-emerald-800">{benar}</p> : null}
    </div>
  );
}

function Pilih({ id, pertanyaan, pilihan, benar, umpan, salah, visual }: { id: string; pertanyaan: string; pilihan: { huruf: string; teks: string }[]; benar: string; umpan: string; salah: string; visual?: ReactNode }) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button key={item.huruf} type="button" onClick={() => { setPilih(item.huruf); if (item.huruf === benar) kuis?.tandaiBenar(id); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, benar, "bg-[#1C01A5] text-white hover:bg-[#16017a]")}`}>
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisCocok({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { kiri: string; pilihan: string[]; benar: string }[]; umpan: string }) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, string>>({});
  const [aktif, setAktif] = useState(0);
  const [cek, setCek] = useState(false);
  const lengkap = baris.every((_, indeks) => peta[indeks]);
  const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk soal, lalu ketuk pasangannya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek ? "border-sky-200 bg-white" : peta[indeks] === item.benar ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50";
          return (
            <button key={item.kiri} type="button" onClick={() => setAktif(indeks)} className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}>
              <span>{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button key={`${aktif}-${kalimat}`} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [aktif]: kalimat })); setCek(false); }} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20">{kalimat}</button>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={() => { setCek(true); if (tepat) kuis?.tandaiBenar(id); }} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pasangan</button>
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan ukurannya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
    </article>
  );
}

function TulisBebas({ id, judul, visual, pertanyaan, pesanSalah, bantuan, umpan, periksa, alias = [], konteks }: { id: string; judul?: string; visual?: ReactNode; pertanyaan: string; pesanSalah: string; bantuan?: string; umpan: string; periksa: (teks: string) => boolean; alias?: string[]; konteks?: string }) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const [salahKe, setSalahKe] = useState(0);
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }) });
        const json = (await respons.json()) as { berhasil?: boolean; benar?: boolean; bacaan?: string; pesan?: string };
        if (!respons.ok || !json.berhasil) { setStatus(null); setCuplikan(json.pesan || "Gagal menilai. Kirim lagi."); return; }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(id);
        else setSalahKe((jumlah) => jumlah + 1);
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
    else setSalahKe((jumlah) => jumlah + 1);
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {visual ? <div>{visual}</div> : null}
      {judul ? <p className="text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">{pertanyaan}</p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      {bantuan && salahKe >= 2 && status === "salah" ? <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{bantuan}</p> : null}
      <Umpan status={status} teks={umpan} />
    </div>
  );
}

function SusunToken({ id, perintah, acak, benar, umpan, pesanSalah }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string; pesanSalah: string }) {
  const kuis = useKuisMateri();
  const [sisa, setSisa] = useState(() => acak.map((teks, indeks) => ({ id: indeks, teks })));
  const [susun, setSusun] = useState<{ id: number; teks: string }[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((item, indeks) => item.teks === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join("  ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSusun((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">{item.teks}</button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => { setSusun((lama) => { const akhir = lama[lama.length - 1]; if (akhir) setSisa((kartu) => [...kartu, akhir]); return lama.slice(0, -1); }); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Urungkan</button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">Periksa urutan</button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah={pesanSalah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { teks: string; benar: boolean }[]; umpan: string }) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, boolean | undefined>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const lengkap = baris.every((_, indeks) => peta[indeks] !== undefined);
  const periksa = () => {
    const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <div className="mt-3 space-y-3">
        {baris.map((item, indeks) => (
          <div key={item.teks} className="rounded-xl bg-white px-3 py-3">
            <p className="text-sm font-semibold text-slate-700">{item.teks}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((nilai) => (
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi pernyataannya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function LipatSiku() {
  const [langkah, setLangkah] = useState(0);
  const teks = langkah === 0 ? "Kertas masih lebar." : langkah === 1 ? "Lipatan mendatar sudah ada." : "Sudut siku-siku jadi. Pojok merah ini alat cek kita.";
  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Lipat kertas menjadi alat siku.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setLangkah((lama) => (lama < 1 ? 1 : lama))} className={`rounded-full px-3 py-2 text-sm font-black ${langkah >= 1 ? "bg-indigo-700 text-white" : "bg-indigo-50 text-indigo-950 ring-2 ring-indigo-200"}`}>Lipat mendatar</button>
        <button type="button" onClick={() => setLangkah((lama) => (lama >= 1 ? 2 : lama))} className={`rounded-full px-3 py-2 text-sm font-black ${langkah >= 2 ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-900 ring-2 ring-rose-200"}`}>Lipat tegak</button>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{teks}</p>
    </div>
  );
}

function BusurLangkah() {
  const [langkah, setLangkah] = useState(0);
  const tahap = [
    "Langkah 1. Pusat busur diletakkan di titik sudut.",
    "Langkah 2. Garis dasar menempel satu kaki. Kaki itu dibaca 0°.",
    "Langkah 3. Kaki yang lain menunjuk 125°. Ukuran sudutnya 125°.",
  ];
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Ikuti cara mengukur sudut.</p>
      <button type="button" onClick={() => setLangkah((lama) => Math.min(2, lama + 1))} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">Langkah berikut</button>
      <p className="mt-3 text-sm font-bold text-slate-700">{tahap[langkah]}</p>
    </div>
  );
}

function JamAngka() {
  const [pilih, setPilih] = useState("");
  const hasil = pilih === "4" ? "4 × 30 = 120°. Sudut terkecil 120°." : pilih === "7" ? "Dari 7 ke 12 ada 5 langkah. 5 × 30 = 150°." : pilih === "2" ? "2 × 30 = 60°. Sudut terkecil 60°." : "Ketuk salah satu pukul.";
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Sudut terkecil pada jam. Satu angka = 30°.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          ["4", "Pukul 4"],
          ["7", "Pukul 7"],
          ["2", "Pukul 2"],
        ].map(([kode, label]) => (
          <button key={kode} type="button" onClick={() => setPilih(kode)} className={`rounded-full px-3 py-2 text-sm font-black ${pilih === kode ? "bg-sky-700 text-white" : "bg-sky-50 text-sky-950 ring-2 ring-sky-200"}`}>{label}</button>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{hasil}</p>
    </div>
  );
}

function KipasPilih() {
  const [pilih, setPilih] = useState("");
  const hasil = pilih === "135" ? "135°. Ini yang paling lebar." : pilih === "105" ? "105°." : pilih === "130" ? "130°." : pilih === "85" ? "85°." : "Ketuk salah satu kipas.";
  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Empat kipas. Pilih lebarnya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["105", "130", "135", "85"].map((ukuran) => (
          <button key={ukuran} type="button" onClick={() => setPilih(ukuran)} className={`rounded-full px-3 py-2 text-sm font-black ${pilih === ukuran ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-950 ring-2 ring-rose-200"}`}>Kipas {ukuran}°</button>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{hasil}</p>
    </div>
  );
}

const PILIH_BANYAK = ["3", "1", "6"];
const PILIH_JENIS = ["lancip", "siku-siku", "tumpul"];
const PILIH_SELISIH = ["120°", "150°", "90°"];

function Lambang({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      {baris.map((teks) => <p key={teks} className="mt-2 text-lg font-black text-[#1C01A5]">{teks}</p>)}
    </div>
  );
}

function SubbabSiku({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Sudut siku-siku"
      selesaiTeks="Empat halaman sudut siku selesai."
      grup={[[idKuis("A", 0), idKuis("A", 1)], [idKuis("B", 0), idKuis("B", 1)], [idKuis("A", 3), idKuis("A", 15), idKuis("A", 16)], [idKuis("A", 2), idKuis("A", 17), idKuis("A", 18)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Sudut siku-siku bisa dibuat dengan melipat kertas.", "Pojok bingkai sering membentuk sudut siku-siku."])} />
          <Dialog nama="Seli" anak="Pojok bingkai foto di menara ini kelihatan pas. Tukang kayu mengeceknya dengan penggaris siku." />
          <Dialog nama="Galih" anak="Kita bisa membuat alat yang sama dari kertas. Lipat mendatar, lalu lipat tegak. Coba lihat pojok lipatannya." />
          <LipatSiku />
          <Dialog nama="Jaka" anak="Persegi panjang punya empat pojok yang pas dengan lipatan itu." />
          <Dialog nama="Igil" anak="Memutar gambar tidak mengubah besar sudut." />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Persegi panjang punya berapa sudut siku-siku?" periksa={hasil4} petunjuk="Hitung pojok yang pas dengan lipatan." benar="4 sudut siku-siku." />
          <TulisBebas id={idKuis("A", 1)} judul="Segi lima beratap" visual={<Papan anak="dua sisi tegak · atap di atas" />} pertanyaan="Tulis banyak sudut siku-sikunya." pesanSalah="Hitung pojok yang benar-benar siku." bantuan="Hanya dua pojok bawah yang siku." umpan="2 sudut siku-siku." periksa={hasil2} alias={["2"]} konteks="Segi lima beratap punya 2 sudut siku-siku." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis ini mengingat cara mengecek pojok, tanpa menuliskan jumlahnya." />
          <TabelInfoGrafis judul="Infografis: Sudut siku pada bangun" kepala={["Bangun", "Cara cek", "Catatan"]} baris={[["Persegi panjang", "semua pojok pada lipatan", "banyaknya empat"], ["Segi lima beratap", "hanya pojok bawah", "atapnya tidak siku"], ["Wajik", "cek satu per satu", "bisa tidak ada siku"], ["Gambar diputar", "pojok tidak berubah", "putaran tidak mengubah sudut"]]} kaki="Cek tiap pojok dengan lipatan kertas." />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Wajik pada soal itu bukan persegi. Berapa sudut siku-sikunya?" periksa={hasil0} petunjuk="Cek satu per satu pojok wajik itu." benar="0." />
          <TulisBebas id={idKuis("B", 1)} judul="Semua sudut segitiga" visual={<Papan anak="segitiga pada soal · bukan hanya yang siku" />} pertanyaan="Tulis banyak sudut pada segitiga." pesanSalah="Hitung semua titik sudutnya." bantuan="Nama segitiga datang dari tiga sudut." umpan="3 sudut." periksa={hasil3} alias={["3"]} konteks="Segitiga punya 3 sudut." />
        </>,
        <>
          <GambarMenara jenis="menara" />
          <SusunToken id={idKuis("A", 3)} perintah="Susun cara membuat alat siku dari kertas." acak={["Cek pojok", "Lipat tegak", "Lipat mendatar"]} benar={["Lipat mendatar", "Lipat tegak", "Cek pojok"]} umpan="Lipat mendatar, lipat tegak, lalu cek pojoknya." pesanSalah="Ikuti urutan dari kertas yang masih lebar." />
          <KuisBenarSalah id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "Lipatan kertas tegak dapat menjadi alat siku.", benar: true }, { teks: "Memutar gambar mengubah besar sudut.", benar: false }, { teks: "Pojok bingkai sering membentuk sudut siku.", benar: true }]} umpan="Putaran tidak mengubah pojok." />
          <KuisCocok id={idKuis("A", 16)} perintah="Pasangkan keterangan dengan banyak sudut sikunya." baris={[{ kiri: "Segitiga siku-siku", pilihan: PILIH_BANYAK, benar: "1" }, { kiri: "Bangun dengan tiga sudut siku", pilihan: PILIH_BANYAK, benar: "3" }, { kiri: "Bangun dengan enam sudut siku", pilihan: PILIH_BANYAK, benar: "6" }]} umpan="1, 3, dan 6." />
        </>,
        <>
          <Dialog nama="Galih" anak="Lambang sudut siku ditulis 90°. Banyak sudut siku dihitung satu per satu." />
          <Lambang judul="Lambang siku" baris={["satu pojok siku = 90°", "empat pojok siku pada persegi panjang"]} />
          <Pilih id={idKuis("A", 2)} pertanyaan="Pojok bingkai yang cocok dengan lipatan kertas disebut..." pilihan={[{ huruf: "A", teks: "sudut nol" }, { huruf: "B", teks: "sudut siku-siku" }, { huruf: "C", teks: "sudut lurus" }, { huruf: "D", teks: "sudut penuh" }]} benar="B" umpan="Lipatan kertas dan pojok bingkai sama-sama sudut siku-siku." salah="Ingat nama pojok yang dibuat lipatan kertas." />
          <Pilih id={idKuis("A", 17)} pertanyaan="Segiempat punya berapa titik sudut?" pilihan={[{ huruf: "A", teks: "4" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "5" }, { huruf: "D", teks: "6" }]} benar="A" umpan="Segiempat punya empat titik sudut." salah="Hitung titik sudutnya, bukan hanya yang siku." />
          <Pilih id={idKuis("A", 18)} pertanyaan="Segitiga sama sisi punya sudut siku sebanyak..." pilihan={[{ huruf: "A", teks: "0" }, { huruf: "B", teks: "1" }, { huruf: "C", teks: "2" }, { huruf: "D", teks: "3" }]} benar="A" umpan="Ketiga sudutnya lancip. Tidak ada yang siku." salah="Sama sisi tidak punya sudut siku." />
        </>,
      ]}
    />
  );
}

function SubbabJenis({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Bagian dan jenis sudut"
      selesaiTeks="Empat halaman jenis sudut selesai."
      grup={[[idKuis("A", 4), idKuis("A", 5)], [idKuis("B", 2), idKuis("B", 3)], [idKuis("B", 15), idKuis("B", 16), idKuis("B", 17)], [idKuis("A", 6), idKuis("B", 18), idKuis("B", 19)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Sudut punya dua kaki dan satu titik sudut.", "Ada sudut yang lebih kecil dan lebih besar dari siku."])} />
          <Dialog nama="Igil" anak="Sudut adalah daerah yang dibentuk dua garis yang bertemu di satu titik. Titik itu titik sudut. Dua garisnya kaki sudut." />
          <Dialog nama="Seli" anak="Gunting yang baru terbuka sedikit lebih kecil daripada pojok siku." />
          <Dialog nama="Galih" anak="Anak tangga yang miring lebih terbuka daripada lipatan kertas." />
          <Dialog nama="Jaka" anak="Pojok tanpa titik temu dua garis bukan sudut." />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Sudut yang lebih kecil dari sudut siku-siku disebut apa?" periksa={jawabLancip} petunjuk="Namanya dimulai dengan huruf l." benar="Sudut lancip." />
          <TulisBebas id={idKuis("A", 5)} judul="Lebih besar dari siku" visual={<Papan anak="lebih besar daripada lipatan kertas" />} pertanyaan="Tulis nama jenis sudut itu." pesanSalah="Bukan lancip. Ia lebih terbuka daripada siku." bantuan="Jenisnya sudut tumpul." umpan="Sudut tumpul." periksa={jawabTumpul} alias={["tumpul"]} konteks="Sudut yang lebih besar dari siku disebut tumpul." />
        </>,
        <>
          <Dialog nama="Seli" anak="Pada pukul 08.00, dua jarum membuka lebih lebar daripada pojok siku." />
          <Dialog nama="Jaka" anak="Pojok jendela ini menempel pas pada lipatan kertas kita." />
          <TabelInfoGrafis judul="Infografis: Tiga jenis pertama" kepala={["Ciri", "Contoh", "Jenis"]} baris={[["Lebih kecil dari siku", "gunting sedikit terbuka", "belum sama dengan siku"], ["Sama dengan siku", "pojok jendela", "pas dengan lipatan"], ["Lebih besar dari siku", "jarum yang lebih terbuka", "melewati siku"], ["Tanpa titik temu", "pojok kotak pensil", "bukan sudut"]]} kaki="Nama jenis mengikuti besarnya, bukan panjang kakinya." />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Pukul 08.00 membentuk sudut yang lebih besar dari siku. Jenisnya apa?" periksa={jawabTumpul} petunjuk="Lebih besar dari siku." benar="Sudut tumpul." />
          <TulisBebas id={idKuis("B", 3)} judul="Pojok jendela" visual={<Papan anak="cocok dengan lipatan kertas" />} pertanyaan="Tulis jenis sudutnya." pesanSalah="Ia sama dengan alat lipatan." bantuan="Jenisnya sudut siku-siku." umpan="Sudut siku-siku." periksa={jawabSiku} alias={["siku", "siku-siku"]} konteks="Pojok jendela itu sudut siku-siku." />
        </>,
        <>
          <GambarMenara jenis="lipat" />
          <SusunToken id={idKuis("B", 15)} perintah="Susun dari yang paling kecil." acak={["90°", "30°", "60°"]} benar={["30°", "60°", "90°"]} umpan="30°, lalu 60°, lalu 90°." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("B", 16)} perintah="Pilih benar atau salah." baris={[{ teks: "Sudut lancip lebih kecil dari 90°.", benar: true }, { teks: "Sudut tumpul lebih kecil dari 90°.", benar: false }, { teks: "Sudut siku-siku besarnya 90°.", benar: true }]} umpan="Tumpul lebih besar daripada siku." />
          <KuisCocok id={idKuis("B", 17)} perintah="Pasangkan ukuran dengan jenisnya." baris={[{ kiri: "40°", pilihan: PILIH_JENIS, benar: "lancip" }, { kiri: "90°", pilihan: PILIH_JENIS, benar: "siku-siku" }, { kiri: "100°", pilihan: PILIH_JENIS, benar: "tumpul" }]} umpan="Lancip, siku-siku, dan tumpul." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang jenis membandingkan ukuran dengan 90°." />
          <Lambang judul="Lambang jenis" baris={["lancip < 90°", "siku = 90°", "tumpul > 90°"]} />
          <Pilih id={idKuis("A", 6)} pertanyaan="Pojok kotak pensil yang tidak punya titik sudut..." pilihan={[{ huruf: "A", teks: "selalu sudut lancip" }, { huruf: "B", teks: "bukan sudut" }, { huruf: "C", teks: "sudut tumpul" }, { huruf: "D", teks: "sudut lurus" }]} benar="B" umpan="Tanpa titik temu dua garis, pojok itu bukan sudut." salah="Cek dulu apakah ada titik sudut dan dua kaki." />
          <Pilih id={idKuis("B", 18)} pertanyaan="70° termasuk sudut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "lurus" }]} benar="A" umpan="70 lebih kecil daripada 90." salah="Bandingkan dengan 90°." />
          <Pilih id={idKuis("B", 19)} pertanyaan="100° termasuk sudut..." pilihan={[{ huruf: "A", teks: "tumpul" }, { huruf: "B", teks: "lancip" }, { huruf: "C", teks: "siku-siku" }, { huruf: "D", teks: "lurus" }]} benar="A" umpan="100 lebih besar daripada 90 dan lebih kecil daripada 180." salah="Bandingkan 100 dengan 90." />
        </>,
      ]}
    />
  );
}

function SubbabUkur({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Mengukur sudut"
      selesaiTeks="Empat halaman mengukur selesai."
      grup={[[idKuis("A", 7), idKuis("A", 8)], [idKuis("A", 9), idKuis("A", 10)], [idKuis("A", 19), idKuis("A", 20), idKuis("A", 14)], [idKuis("A", 21), idKuis("A", 22), idKuis("A", 23)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Besar sudut diukur dengan busur derajat.", "Satuannya derajat."])} />
          <Dialog nama="Jaka" anak="Busur derajat punya titik pusat, garis dasar, skala dalam, dan skala luar." />
          <BusurLangkah />
          <Dialog nama="Igil" anak="Sudut siku-siku besarnya 90°. Pada jam, satu angka ke angka berikutnya besarnya 30°." />
          <Dialog nama="Seli" anak="Selalu ambil sudut yang lebih kecil di antara dua jarum." />
          <Dialog nama="Galih" anak="Kaki yang menempel pada garis dasar dibaca dari nol." />
          <KuisSuara id={idKuis("A", 7)} pertanyaan="Lipatan kertas siku-siku diukur dengan busur. Berapa derajat?" periksa={hasil90} petunjuk="Itu ukuran sudut siku-siku." benar="90°." />
          <TulisBebas id={idKuis("A", 8)} judul="Pukul empat" visual={<Papan anak="pukul 04.00 · sudut terkecil" />} pertanyaan="Tulis besar sudut terkecilnya." pesanSalah="Hitung langkah angka, lalu kali 30." bantuan="4 × 30 = 120." umpan="120°." periksa={hasil120} alias={["120"]} konteks="Pukul 04.00 sudut terkecilnya 120 derajat." />
        </>,
        <>
          <TabelInfoGrafis judul="Infografis: Sudut pada jam" kepala={["Langkah", "Cara", "Catatan"]} baris={[["Satu angka", "kali 30", "satu langkah jarum"], ["Sudut terkecil", "ambil yang lebih kecil", "jangan putaran panjang"], ["Garis dasar", "baca dari nol", "kaki yang menempel"], ["Pusat busur", "di titik sudut", "baru baca skala"]]} kaki="Satu langkah jarum jam adalah 30°." />
          <KuisSuara id={idKuis("A", 9)} pertanyaan="Pukul 07.00. Berapa sudut terkecil jarumnya?" periksa={hasil150} petunjuk="Dari angka 7 ke angka 12, hitung langkahnya." benar="150°." />
          <TulisBebas id={idKuis("A", 10)} judul="Pukul dua" visual={<Papan anak="pukul 02.00 · sudut terkecil" />} pertanyaan="Tulis besar sudut terkecilnya." pesanSalah="Jangan ambil putaran yang panjang." bantuan="2 × 30 = 60." umpan="60°." periksa={hasil60} alias={["60"]} konteks="Pukul 02.00 sudut terkecilnya 60 derajat." />
        </>,
        <>
          <GambarMenara jenis="busur" />
          <SusunToken id={idKuis("A", 19)} perintah="Susun dari yang paling kecil." acak={["150°", "30°", "90°"]} benar={["30°", "90°", "150°"]} umpan="30°, lalu 90°, lalu 150°." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 20)} perintah="Pilih benar atau salah." baris={[{ teks: "Sudut siku-siku besarnya 90°.", benar: true }, { teks: "Satu angka pada jam besarnya 30°.", benar: true }, { teks: "4 × 30 = 100.", benar: false }]} umpan="4 × 30 = 120, bukan 100." />
          <KuisCocok id={idKuis("A", 14)} perintah="Pasangkan pukul dengan sudut terkecilnya." baris={[{ kiri: "Pukul 01.00", pilihan: PASANGAN_JAM, benar: "30°" }, { kiri: "Pukul 09.00", pilihan: PASANGAN_JAM, benar: "90°" }, { kiri: "Pukul 07.00", pilihan: PASANGAN_JAM, benar: "150°" }]} umpan="30°, 90°, dan 150°." />
        </>,
        <>
          <Dialog nama="Jaka" anak="Lambang jam mengalikan banyak langkah dengan 30." />
          <Lambang judul="Lambang jam" baris={["1 langkah = 30°", "sudut terkecil yang dipakai"]} />
          <Pilih id={idKuis("A", 21)} pertanyaan="3 × 30 = ..." pilihan={[{ huruf: "A", teks: "90°" }, { huruf: "B", teks: "60°" }, { huruf: "C", teks: "120°" }, { huruf: "D", teks: "33°" }]} benar="A" umpan="3 × 30 = 90. Itu pukul 03.00." salah="Kalikan banyak langkah dengan 30." />
          <Pilih id={idKuis("A", 22)} pertanyaan="45° + 45° = ..." pilihan={[{ huruf: "A", teks: "90°" }, { huruf: "B", teks: "45°" }, { huruf: "C", teks: "80°" }, { huruf: "D", teks: "100°" }]} benar="A" umpan="45 + 45 = 90." salah="Jumlahkan kedua sudut." />
          <Pilih id={idKuis("A", 23)} pertanyaan="25° + 20° = ..." pilihan={[{ huruf: "A", teks: "45°" }, { huruf: "B", teks: "40°" }, { huruf: "C", teks: "50°" }, { huruf: "D", teks: "5°" }]} benar="A" umpan="25 + 20 = 45." salah="Jumlahkan kedua sudut." />
        </>,
      ]}
    />
  );
}

function SubbabLukis({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Melukis sudut"
      selesaiTeks="Empat halaman melukis selesai."
      grup={[[idKuis("B", 4), idKuis("B", 5)], [idKuis("B", 6), idKuis("B", 7)], [idKuis("A", 24), idKuis("A", 25), idKuis("A", 26)], [idKuis("A", 13), idKuis("B", 10), idKuis("B", 20)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Sudut dilukis dengan busur derajat.", "Skala yang dibaca harus dimulai dari nol."])} />
          <Dialog nama="Jaka" anak="Untuk melukis sudut, buat titik sudut dan satu kaki. Pusat busur di titik itu. Garis dasar menempel kaki." />
          <Dialog nama="Galih" anak="Kalau kakinya tidak mendatar, busur boleh miring. Kaki pada garis dasar tetap dibaca 0°." />
          <Dialog nama="Seli" anak="Setelah dilukis, cek jenisnya. Yang lebih kecil dari siku tetap lancip." />
          <Dialog nama="Igil" anak="Empat kipas di menara berukuran berbeda. Yang 85° masih lancip. Yang 130° sudah tumpul." />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Sudut 85° termasuk jenis apa?" periksa={jawabLancip} petunjuk="Bandingkan dengan 90°." benar="Sudut lancip." />
          <TulisBebas id={idKuis("B", 5)} judul="Seratus tiga puluh" visual={<Papan anak="130°" />} pertanyaan="Tulis jenis sudut itu." pesanSalah="Ia lebih besar dari 90° dan lebih kecil dari sudut lurus." bantuan="Jenisnya sudut tumpul." umpan="Sudut tumpul." periksa={jawabTumpul} alias={["tumpul"]} konteks="130 derajat adalah sudut tumpul." />
        </>,
        <>
          <KipasPilih />
          <TabelInfoGrafis judul="Infografis: Ukuran khusus" kepala={["Nama", "Bentuk", "Catatan"]} baris={[["Lurus", "garis yang lurus", "lebih besar dari tumpul"], ["Penuh", "jarum kembali", "satu putaran"], ["Nol", "kaki yang berimpit", "belum terbuka"], ["Releks", "lebih dari lurus", "belum satu putaran"]]} kaki="Ukuran khusus dipakai saat skala busur dilewati." />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Garis lurus membentuk sudut berapa derajat?" periksa={hasil180} petunjuk="Itu sudut lurus." benar="180°." />
          <TulisBebas id={idKuis("B", 7)} judul="Satu putaran" visual={<Papan anak="jarum kembali ke tempat semula" />} pertanyaan="Tulis besar satu putaran penuh." pesanSalah="Putaran penuh lebih besar daripada sudut lurus." bantuan="Satu putaran 360°." umpan="360°." periksa={hasil360} alias={["360"]} konteks="Satu putaran penuh 360 derajat." />
        </>,
        <>
          <GambarMenara jenis="kipas" />
          <SusunToken id={idKuis("A", 24)} perintah="Susun dari yang paling kecil." acak={["150°", "60°", "120°"]} benar={["60°", "120°", "150°"]} umpan="60°, lalu 120°, lalu 150°." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 25)} perintah="Pilih benar atau salah." baris={[{ teks: "Skala yang berlawanan menghasilkan ukuran yang lain.", benar: true }, { teks: "Kaki pada garis dasar dibaca 0°.", benar: true }, { teks: "Kaki yang miring tidak boleh diukur.", benar: false }]} umpan="Busur boleh miring. Yang penting, garis dasar menempel salah satu kaki." />
          <KuisCocok id={idKuis("A", 26)} perintah="Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "180° − 60°", pilihan: PILIH_SELISIH, benar: "120°" }, { kiri: "180° − 30°", pilihan: PILIH_SELISIH, benar: "150°" }, { kiri: "180° − 90°", pilihan: PILIH_SELISIH, benar: "90°" }]} umpan="120°, 150°, dan 90°." />
        </>,
        <>
          <Dialog nama="Jaka" anak="Lambang skala yang keliru adalah 180° dikurangi ukuran yang diminta." />
          <Lambang judul="Lambang skala" baris={["180° − ukuran", "garis dasar = 0°"]} />
          <Pilih id={idKuis("A", 13)} pertanyaan="Kamu ingin melukis 120°, tetapi membaca skala yang berlawanan. Ukuran yang terjadi adalah 180° − 120°. Hasilnya..." pilihan={[{ huruf: "A", teks: "120°" }, { huruf: "B", teks: "90°" }, { huruf: "C", teks: "60°" }, { huruf: "D", teks: "150°" }]} benar="C" umpan="60° itu lancip. Yang diminta 120°, yaitu tumpul." salah="Kurangkan 120 dari 180." />
          <Pilih id={idKuis("B", 10)} pertanyaan="Sudut 150° termasuk sudut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "lurus" }]} benar="C" umpan="150 lebih dari 90 dan kurang dari 180." salah="Bandingkan 150 dengan 90 dan 180." />
          <Pilih id={idKuis("B", 20)} pertanyaan="40° termasuk sudut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "lurus" }]} benar="A" umpan="40 lebih besar dari 0 dan lebih kecil dari 90." salah="Bandingkan 40 dengan 90." />
        </>,
      ]}
    />
  );
}

function SubbabBanding({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Membandingkan sudut"
      selesaiTeks="Empat halaman membandingkan selesai."
      grup={[[idKuis("A", 11), idKuis("A", 12)], [idKuis("B", 8), idKuis("B", 9)], [idKuis("B", 13), idKuis("B", 12), idKuis("B", 11)], [idKuis("B", 14), idKuis("A", 27), idKuis("A", 28)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Bandingkan ukuran sudutnya.", "Panjang kaki tidak mengubah besar sudut."])} />
          <Dialog nama="Igil" anak="Dua sudut bisa sama besar walaupun ujung kakinya kelihatan lebih jauh. Ukur dengan busur jika ragu." />
          <Dialog nama="Seli" anak="Empat kipas berukuran 105°, 130°, 135°, dan 85°. Yang paling lebar adalah yang angkanya paling besar." />
          <Dialog nama="Galih" anak="Sudut yang lebih dari garis lurus disebut releks. Contohnya 180° ditambah 45°." />
          <Dialog nama="Jaka" anak="Urutkan dari yang kecil ke yang besar, jangan dari panjang kakinya." />
          <KuisSuara id={idKuis("A", 11)} pertanyaan="Empat kipas berukuran 105°, 130°, 135°, dan 85°. Yang paling lebar berapa derajat?" periksa={hasil135} petunjuk="Pilih bilangan yang paling besar." benar="135°." />
          <TulisBebas id={idKuis("A", 12)} judul="Lebih dari lurus" visual={<Papan anak="180° + 45°" />} pertanyaan="Tulis jumlahnya." pesanSalah="Jumlahkan kedua ukuran itu." bantuan="180 + 45 = 225." umpan="225°. Itu sudut releks." periksa={hasil225} alias={["225"]} konteks="180 + 45 = 225." />
        </>,
        <>
          <TabelInfoGrafis judul="Infografis: Membandingkan ukuran" kepala={["Yang dilihat", "Yang tidak dilihat", "Catatan"]} baris={[["Angka derajat", "panjang kaki", "kaki panjang bisa sudut kecil"], ["Sudut terkecil", "putaran panjang", "ambil yang lebih kecil"], ["Jenis", "bentuk gambar", "ukur dulu jika ragu"]]} kaki="Bandingkan angkanya." />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Satu putaran 360° dikurangi 120°. Berapa sisanya?" periksa={hasil240} petunjuk="Kurangkan 120 dari 360." benar="240°." />
          <TulisBebas id={idKuis("B", 9)} judul="Segi lima" visual={<Papan anak="segi lima · semua sudutnya" />} pertanyaan="Tulis banyak sudut pada segi lima." pesanSalah="Hitung titik sudutnya, bukan hanya yang siku." bantuan="Segi lima punya 5 sudut." umpan="5 sudut." periksa={hasil5} alias={["5"]} konteks="Segi lima punya 5 sudut." />
        </>,
        <>
          <GambarMenara jenis="jam" />
          <JamAngka />
          <SusunToken id={idKuis("B", 13)} perintah="Susun dari yang paling kecil." acak={["135°", "85°", "105°"]} benar={["85°", "105°", "135°"]} umpan="85°, lalu 105°, lalu 135°." pesanSalah="Bandingkan 85, 105, dan 135." />
          <KuisBenarSalah id={idKuis("B", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "Makin jauh ujung dua kaki, sudutnya pasti makin besar.", benar: false }, { teks: "Sudut siku-siku besarnya 90°.", benar: true }, { teks: "Pukul 02.00 membentuk sudut lancip.", benar: true }]} umpan="Ujung kaki bisa menipu. 60° pada pukul 02.00 masih lancip." />
          <KuisCocok id={idKuis("B", 11)} perintah="Pasangkan ciri dengan jenisnya." baris={[{ kiri: "Lebih kecil dari siku", pilihan: PASANGAN_JENIS, benar: "lancip" }, { kiri: "Tepat 90°", pilihan: PASANGAN_JENIS, benar: "siku-siku" }, { kiri: "Antara 90° dan 180°", pilihan: PASANGAN_JENIS, benar: "tumpul" }]} umpan="Lancip, siku-siku, dan tumpul." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang perbandingan hanya melihat derajat. Kaki yang panjang tidak menambah sudut." />
          <Lambang judul="Lambang banding" baris={["85° < 105° < 135°", "panjang kaki tidak mengubah sudut"]} />
          <Pilih id={idKuis("B", 14)} pertanyaan="Persegi diputar. Sudut siku-sikunya..." pilihan={[{ huruf: "A", teks: "0" }, { huruf: "B", teks: "1" }, { huruf: "C", teks: "2" }, { huruf: "D", teks: "4" }]} benar="D" umpan="Memutar tidak mengubah sudut. Tetap 4." salah="Memutar gambar tidak mengubah pojoknya. Hitung lagi." />
          <Pilih id={idKuis("A", 27)} pertanyaan="20° termasuk sudut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "lurus" }]} benar="A" umpan="20 lebih kecil daripada 90." salah="Bandingkan 20 dengan 90." />
          <Pilih id={idKuis("A", 28)} pertanyaan="Dua sudut sama besar, tetapi satu kakinya digambar lebih panjang. Besar sudutnya..." pilihan={[{ huruf: "A", teks: "tetap sama" }, { huruf: "B", teks: "selalu lebih besar" }, { huruf: "C", teks: "selalu lebih kecil" }, { huruf: "D", teks: "hilang" }]} benar="A" umpan="Panjang kaki tidak mengubah besar sudut." salah="Yang diukur adalah bukaan dua kakinya." />
        </>,
      ]}
    />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB6.kartu[0];
  const [tab, setTab] = useState(0);
  const judulSubbab = ["Sudut siku-siku", "Bagian dan jenis sudut", "Mengukur sudut", "Melukis sudut", "Membandingkan sudut"];
  useJudulDompetMateri(judulSubbab[tab] ?? judulSubbab[0]);
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📐🦉" judul={kartu.judul} anak="Lima sub-bab di taman menara" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <TabSubbab label={["Sub-Bab A", "Sub-Bab B", "Sub-Bab C", "Sub-Bab D", "Sub-Bab E"]} aktif={tab} onPilih={setTab} />
        {tab === 0 ? <SubbabSiku kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 1 ? <SubbabJenis kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 2 ? <SubbabUkur kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 3 ? <SubbabLukis kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 4 ? <SubbabBanding kelas={kelas} kelamin={kelamin} /> : null}
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB6.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📐🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarMenara jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB6} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB6} penutup="Menara jam menyala. Igil menempelkan cap sudut." bunga="📐🪁🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB6.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Sudut Senja" : skor >= 6 ? "📐 Penjaga Busur" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Sudutmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru sudut." : "Ayo ukur lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarMenara jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Pukul sebelas" visual={<Papan anak="pukul 11.00 · sudut terkecil" />} pertanyaan="Tulis besar sudut terkecilnya." pesanSalah="Hitung langkah dari angka 11 ke angka 12." bantuan="1 × 30 = 30." umpan="30°." periksa={hasil30} alias={["30"]} konteks="Pukul 11.00 sudut terkecilnya 30 derajat." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Sudut 25° termasuk sudut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "lurus" }]} benar="A" umpan="25 lebih dari 0 dan kurang dari 90." salah="Bandingkan 25 dengan 90." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Segitiga sama kaki punya sudut puncak 72°. Berapa besar satu sudut alasnya?" periksa={hasil54} petunjuk="Kurangi 72 dari 180, lalu bagi dua." benar="54°." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Sudut terkecil mana yang paling besar?" pilihan={[{ huruf: "A", teks: "pukul 11.00" }, { huruf: "B", teks: "pukul 08.00" }, { huruf: "C", teks: "pukul 06.00" }, { huruf: "D", teks: "pukul 02.00" }]} benar="C" umpan="Pukul 06.00 membentuk 180°. Itu yang paling besar." salah="Hitung tiap pukul, lalu bandingkan." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan ukuran dengan namanya." baris={[{ kiri: "0°", pilihan: PASANGAN_KHUSUS, benar: "sudut nol" }, { kiri: "180°", pilihan: PASANGAN_KHUSUS, benar: "sudut lurus" }, { kiri: "360°", pilihan: PASANGAN_KHUSUS, benar: "sudut penuh" }]} umpan="Sudut nol, sudut lurus, dan sudut penuh." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Dua sudut alas" visual={<Papan anak="54° + 54°" />} pertanyaan="Tulis jumlahnya." pesanSalah="Jumlahkan kedua sudut alas." bantuan="54 + 54 = 108." umpan="108°." periksa={hasil108} alias={["108"]} konteks="54 + 54 = 108." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Kaki yang menempel pada garis dasar busur menunjukkan..." pilihan={[{ huruf: "A", teks: "90°" }, { huruf: "B", teks: "180°" }, { huruf: "C", teks: "0°" }, { huruf: "D", teks: "30°" }]} benar="C" umpan="Garis dasar yang menempel kaki sudut selalu 0°." salah="Ingat langkah saat pusat busur sudah diletakkan." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Jalak–Nuri 110°, Nuri–Bangau 90°, Bangau–Ketilang 25°, Ketilang–Jalak 130°. Pertemuan yang siku-siku adalah..." pilihan={[{ huruf: "A", teks: "Jalak–Nuri" }, { huruf: "B", teks: "Nuri–Bangau" }, { huruf: "C", teks: "Bangau–Ketilang" }, { huruf: "D", teks: "Ketilang–Jalak" }]} benar="B" umpan="Nuri–Bangau 90°. Itu sudut siku-siku." salah="Cari pertemuan yang sama dengan lipatan kertas." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Sudut 300° termasuk jenis apa?" periksa={jawabReleks} petunjuk="Bandingkan dengan 180° dan 360°." benar="Sudut releks." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Persegi yang diputar tetap punya sudut siku-siku sebanyak..." pilihan={[{ huruf: "A", teks: "0" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "3" }, { huruf: "D", teks: "4" }]} benar="D" umpan="Memutar gambar tidak mengubah keempat sudut sikunya." salah="Memutar tidak mengubah pojok persegi. Hitung lagi." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab6({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarMenara jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sudut dibentuk dua kaki dan satu titik sudut.",
          "Sudut siku-siku besarnya 90 derajat.",
          "Satu angka pada jam besarnya 30 derajat.",
        ])}
        poin={[
          "Sudut adalah daerah dua garis yang bertemu. Ada dua kaki dan satu titik sudut. Pojok tanpa titik sudut bukan sudut.",
          "Lipatan kertas membuat sudut siku-siku, yaitu 90°. Persegi panjang punya 4. Segi lima beratap punya 2. Wajik soal itu 0. Persegi yang diputar tetap 4.",
          "Lebih kecil dari siku disebut lancip. Lebih besar dari siku disebut tumpul. Pukul 08.00 tumpul. Pojok jendela siku-siku.",
          "Satu angka jam = 30°. Pukul 01.00 → 30°. Pukul 04.00 → 120°. Pukul 02.00 → 60°. Pukul 07.00 → 150°. Ambil sudut yang lebih kecil.",
          "Kipas: 105°, 130°, 135°, dan 85°. Yang paling lebar 135°. Sudut lurus 180°. Satu putaran 360°. Contoh sudut releks 240°.",
          "Garis dasar busur yang menempel kaki sudut menunjukkan 0°. Skala yang terbalik pada 120° menghasilkan 60°.",
        ]}
        penutup="Cek siku dengan lipatan. Ukur dengan busur. Ambil sudut jam yang lebih kecil."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
