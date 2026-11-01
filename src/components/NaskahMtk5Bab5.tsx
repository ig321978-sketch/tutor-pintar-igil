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
import { MISI_MTK5_BAB5, TEMA_MTK5_BAB5 } from "@/lib/misi-mtk-5-bab5";
import { MODUL_MTK5_BAB5 } from "@/lib/modul-resmi-mtk-5-bab5";
import {
  hasil7,
  hasil8,
  hasil12,
  hasil14,
  hasil15,
  hasil18,
  hasil20,
  hasil22,
  hasil24,
  hasil25,
  hasil36,
  hasil39,
  hasil45,
  hasil64,
  hasil96,
  hasil200,
  hasil216,
  hasil225,
} from "@/lib/nilai-mtk-5-bab5";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB5.id;
const PASANGAN_LUAS = ["10", "16", "7"];
const PASANGAN_KAWAT = ["200", "125", "225"];
const PASANGAN_UJI = ["24", "18", "12"];

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
  Lala: "border-violet-300 bg-violet-50",
  Gio: "border-orange-300 bg-orange-50",
  Nia: "border-emerald-300 bg-emerald-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Lala: "👧",
  Gio: "👦",
  Nia: "👧",
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

const GAMBAR_UBIN = {
  ubin: { src: "/doodle-mtk/mtk-5-bab5-ubin.jpg", alt: "Lala, Gio, dan Nia memasang ubin di tepi kanal. Igil memakai topi biru." },
  petak: { src: "/doodle-mtk/mtk-5-bab5-petak.jpg", alt: "Lala, Gio, dan Nia melihat kertas petak. Igil di samping kertas." },
  lipat: { src: "/doodle-mtk/mtk-5-bab5-lipat.jpg", alt: "Nia melipat kertas segitiga. Igil memperhatikan." },
  layang: { src: "/doodle-mtk/mtk-5-bab5-layang.jpg", alt: "Ubin belah ketupat dan layang-layang di tepi kanal. Igil di ubin tengah." },
  kawat: { src: "/doodle-mtk/mtk-5-bab5-kawat.jpg", alt: "Gio dan Lala memegang bingkai kawat. Igil di bingkai." },
  pos: { src: "/doodle-mtk/mtk-5-bab5-pos.jpg", alt: "Batu loncatan di tepi kanal. Igil di batu pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab5-meja.jpg", alt: "Meja kecil dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab5-kartu.jpg", alt: "Lala, Gio, Nia, dan Igil memegang kartu kosong di tepi kanal." },
} as const;

function GambarUbin({ jenis }: { jenis: keyof typeof GAMBAR_UBIN }) {
  const gambar = GAMBAR_UBIN[jenis];
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
  jenis: keyof typeof GAMBAR_UBIN;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarUbin jenis={jenis} />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan hitungannya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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

function PetakIsi() {
  const [nyala, setNyala] = useState<boolean[]>(Array.from({ length: 12 }, () => false));
  const jumlah = nyala.filter(Boolean).length;
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Ketuk setiap petak sampai tertutup.</p>
      <div className="mx-auto mt-3 grid max-w-xs grid-cols-4 gap-1">
        {nyala.map((hidup, indeks) => (
          <button key={indeks} type="button" onClick={() => setNyala((lama) => lama.map((item, urut) => (urut === indeks ? true : item)))} className={`h-10 rounded-md ${hidup ? "bg-violet-500" : "bg-violet-100 ring-2 ring-violet-200"}`} aria-label={`Petak ${indeks + 1}`} />
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">
        {jumlah === 12 ? "12 satuan luas. 4 × 3 = 12." : `${jumlah} petak tertutup.`}
      </p>
    </div>
  );
}

function LipatSegitiga() {
  const [lipat, setLipat] = useState(false);
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Segitiga alas 4 dan tinggi 4.</p>
      <button type="button" onClick={() => setLipat(true)} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">Lipat jadi persegi panjang</button>
      <p className="mt-3 text-sm font-bold text-slate-700">{lipat ? "Jadi persegi panjang 4 × 2. Luasnya 8." : "Belum dilipat."}</p>
    </div>
  );
}

function BagianLuas() {
  const [layang, setLayang] = useState(false);
  const [segitiga, setSegitiga] = useState(false);
  const lengkap = layang && segitiga;
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Ketuk dua bagian, lalu jumlahkan luasnya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setLayang(true)} className={`rounded-full px-3 py-2 text-sm font-black ${layang ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-950 ring-2 ring-violet-200"}`}>Layang 10</button>
        <button type="button" onClick={() => setSegitiga(true)} className={`rounded-full px-3 py-2 text-sm font-black ${segitiga ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200"}`}>Segitiga 5</button>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{lengkap ? "10 + 5 = 15. Luas gabungan 15." : "Kedua bagian belum lengkap."}</p>
    </div>
  );
}

function KawatPilih() {
  const [pilih, setPilih] = useState("");
  const hasil = pilih === "15 × 15" ? "Bentuk persegi. Hitung sisi kali sisi." : pilih === "20 × 10" ? "Bentuk panjang. Hitung panjang kali lebar." : pilih === "5 × 25" ? "Bentuk pipih. Hitung panjang kali lebar." : "Ketuk salah satu bentangan.";
  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Kawat yang sama. Pilih bentangannya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["20 × 10", "5 × 25", "15 × 15"].map((ukuran) => (
          <button key={ukuran} type="button" onClick={() => setPilih(ukuran)} className={`rounded-full px-3 py-2 text-sm font-black ${pilih === ukuran ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-950 ring-2 ring-orange-200"}`}>{ukuran}</button>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{hasil}</p>
    </div>
  );
}

const PILIH_PETAK = ["8", "12", "7"];
const PILIH_KALI = ["21", "18", "16"];
const PILIH_ALAS = ["12", "18", "10"];

function Lambang({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      {baris.map((teks) => <p key={teks} className="mt-2 text-lg font-black text-[#1C01A5]">{teks}</p>)}
    </div>
  );
}

function SubbabLuas({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Konsep luas daerah"
      selesaiTeks="Empat halaman luas selesai."
      grup={[[idKuis("A", 0), idKuis("A", 1)], [idKuis("B", 0), idKuis("B", 1)], [idKuis("A", 11), idKuis("A", 15), idKuis("A", 16)], [idKuis("A", 10), idKuis("A", 17), idKuis("A", 18)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Luas adalah ukuran daerah di dalam tepi.", "Satu petak 1 m kali 1 m sama dengan 1 meter persegi."])} />
          <Dialog nama="Lala" anak="Luas daerah bangun datar adalah ukuran daerah di dalam tepinya. Satu petak 1 cm × 1 cm = 1 cm². Satu sentimeter persegi." />
          <Dialog nama="Gio" anak="Di kanal ini ubinnya lebih besar. 1 m × 1 m = 1 m². Satu meter persegi. Satu ubin menutup satu satuan luas." />
          <Dialog nama="Nia" anak="Lantai yang lebih besar butuh lebih banyak ubin. Kalau luasnya sama, banyak ubinnya juga sama." />
          <PetakIsi />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Lantai panjang 2 m dan lebar 4 m ditutup ubin 1 m². Berapa luasnya?" periksa={hasil8} petunjuk="Kalikan panjang dengan lebar." benar="8 m²." />
          <TulisBebas id={idKuis("A", 1)} judul="Petak rapat" visual={<Papan anak="3 baris · 5 kolom" />} pertanyaan="Tulis banyak petak utuhnya." pesanSalah="Kalikan baris dengan kolom." bantuan="3 × 5 = 15." umpan="15 satuan." periksa={hasil15} alias={["15"]} konteks="3 × 5 = 15." />
        </>,
        <>
          <Dialog nama="Igil" anak="Pada kertas petak, bangun A berisi 9 petak utuh. B berisi 12. C berisi 15. D berisi 16. Itu luas masing-masing." />
          <Dialog nama="Nia" anak="Aku memotong petak E, lalu menggesernya. Bentuknya berubah, luasnya tetap 9. Petak F tetap 15. Petak G tetap 9." />
          <TabelInfoGrafis judul="Infografis: Petak dan denah" kepala={["Bagian", "Cara", "Catatan"]} baris={[["Ruang tamu", "hitung ubin", "satu ubin satu satuan"], ["Dua kamar", "dua daerah sama", "jumlahkan keduanya"], ["Dapur dan mandi", "ubin kecil", "ikut dijumlah"], ["Petak digeser", "bentuk berubah", "luas tetap"]]} kaki="Jumlahkan bagian denah. Bentuk berubah, luas tetap." />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Dua kamar masing-masing 9 m². Berapa luas keduanya?" periksa={hasil18} petunjuk="Kalikan 2 dengan 9." benar="18 m²." />
          <TulisBebas id={idKuis("B", 1)} judul="Denah lantai" visual={<Papan anak="tamu 13 · dua kamar 18 · dapur 6 · kamar mandi 2" />} pertanyaan="Tulis jumlah luasnya." pesanSalah="Jumlahkan keempat bagian." bantuan="13 + 18 + 6 + 2." umpan="39 m²." periksa={hasil39} alias={["39"]} konteks="13 + 18 + 6 + 2 = 39." />
        </>,
        <>
          <GambarUbin jenis="ubin" />
          <SusunToken id={idKuis("A", 11)} perintah="Susun cara menghitung luas dengan petak." acak={["Tulis satuan", "Tutup rapat", "Hitung petak"]} benar={["Tutup rapat", "Hitung petak", "Tulis satuan"]} umpan="Tutup dulu, hitung, lalu tulis satuannya." pesanSalah="Mulai dari menutup petak tanpa celah." />
          <KuisBenarSalah id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "Luas adalah daerah di dalam tepi.", benar: true }, { teks: "Bentuk berubah selalu mengubah luas.", benar: false }, { teks: "1 m × 1 m = 1 m².", benar: true }]} umpan="Bentuk boleh berubah. Luasnya bisa tetap." />
          <KuisCocok id={idKuis("A", 16)} perintah="Pasangkan petak dengan luasnya." baris={[{ kiri: "4 baris dan 2 kolom", pilihan: PILIH_PETAK, benar: "8" }, { kiri: "2 × 6", pilihan: PILIH_PETAK, benar: "12" }, { kiri: "7 petak utuh", pilihan: PILIH_PETAK, benar: "7" }]} umpan="8, 12, dan 7." />
        </>,
        <>
          <Dialog nama="Lala" anak="Lambang luas petak adalah banyak petak utuh, atau panjang kali lebar." />
          <Lambang judul="Lambang petak" baris={["1 × 1 = 1", "panjang × lebar"]} />
          <Pilih id={idKuis("A", 10)} pertanyaan="Dua lantai sama luas. Banyak ubin 1 m² yang menutupinya..." pilihan={[{ huruf: "A", teks: "tetap sama" }, { huruf: "B", teks: "selalu lebih banyak" }, { huruf: "C", teks: "selalu lebih sedikit" }, { huruf: "D", teks: "tidak bisa diketahui" }]} benar="A" umpan="Luas sama, banyak ubin sama." salah="Bandingkan luasnya dulu, baru hitung ubinnya." />
          <Pilih id={idKuis("A", 17)} pertanyaan="4 baris dan 3 kolom petak utuh. Luasnya..." pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "16" }, { huruf: "D", teks: "9" }]} benar="A" umpan="4 × 3 = 12." salah="Kalikan baris dengan kolom." />
          <Pilih id={idKuis("A", 18)} pertanyaan="Dua daerah masing-masing 6 satuan. Jumlahnya..." pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "36" }, { huruf: "D", teks: "0" }]} benar="A" umpan="6 + 6 = 12." salah="Jumlahkan kedua daerah." />
        </>,
      ]}
    />
  );
}

function SubbabPersegi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Luas persegi panjang dan persegi"
      selesaiTeks="Empat halaman persegi selesai."
      grup={[[idKuis("A", 2), idKuis("A", 3)], [idKuis("B", 2), idKuis("B", 3)], [idKuis("B", 15), idKuis("B", 16), idKuis("B", 17)], [idKuis("A", 12), idKuis("A", 19), idKuis("A", 20)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Luas persegi panjang sama dengan panjang kali lebar.", "Luas persegi sama dengan sisi kali sisi."])} />
          <Dialog nama="Gio" anak="Luas persegi panjang = panjang × lebar. Contohnya 5 × 2 = 10, 4 × 3 = 12, 2 × 3 = 6, dan 2 × 1 = 2." />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Persegi panjang panjang 6 cm dan lebar 4 cm. Berapa luasnya?" periksa={hasil24} petunjuk="Kalikan panjang dengan lebar." benar="24 cm²." />
          <TulisBebas id={idKuis("A", 3)} judul="Ubin persegi" visual={<Papan anak="persegi · sisi 6 cm" />} pertanyaan="Tulis luasnya." pesanSalah="Kalikan sisi dengan sisi." bantuan="6 × 6 = 36." umpan="36 cm²." periksa={hasil36} alias={["36"]} konteks="6 × 6 = 36." />
        </>,
        <>
          <Dialog nama="Lala" anak="Luas persegi = sisi × sisi. Keempat sisinya sama, jadi panjang dan lebarnya sama." />
          <Dialog nama="Igil" anak="Pada petak buku, persegi A luasnya 1, B luasnya 4, C luasnya 9, dan D luasnya 16. Persegi juga boleh dihitung sebagai persegi panjang." />
          <TabelInfoGrafis judul="Infografis: Kali ukuran" kepala={["Bangun", "Cara", "Contoh"]} baris={[["Persegi panjang", "panjang × lebar", "5 × 2 = 10"], ["Petak lain", "panjang × lebar", "4 × 3 = 12"], ["Persegi", "sisi × sisi", "4 × 4 = 16"], ["Persegi kecil", "sisi × sisi", "3 × 3 = 9"]]} kaki="Persegi adalah persegi panjang yang sisinya sama." />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Persegi dengan sisi 5 cm. Berapa luasnya?" periksa={hasil25} petunjuk="Kalikan sisi dengan sisi." benar="25 cm²." />
          <TulisBebas id={idKuis("B", 3)} judul="Sisi delapan" visual={<Papan anak="persegi · sisi 8 cm" />} pertanyaan="Tulis luasnya." pesanSalah="Kalikan sisi dengan sisi." bantuan="8 × 8 = 64." umpan="64 cm²." periksa={hasil64} alias={["64"]} konteks="8 × 8 = 64." />
        </>,
        <>
          <GambarUbin jenis="petak" />
          <SusunToken id={idKuis("B", 15)} perintah="Susun luas dari yang paling kecil." acak={["49", "4", "16"]} benar={["4", "16", "49"]} umpan="4, lalu 16, lalu 49." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("B", 16)} perintah="Pilih benar atau salah." baris={[{ teks: "Luas persegi panjang = panjang × lebar.", benar: true }, { teks: "Luas persegi = sisi + sisi.", benar: false }, { teks: "Persegi boleh dihitung sebagai persegi panjang.", benar: true }]} umpan="Persegi memakai sisi kali sisi, bukan sisi ditambah sisi." />
          <KuisCocok id={idKuis("B", 17)} perintah="Pasangkan ukuran dengan luasnya." baris={[{ kiri: "7 × 3", pilihan: PILIH_KALI, benar: "21" }, { kiri: "9 × 2", pilihan: PILIH_KALI, benar: "18" }, { kiri: "4 × 4", pilihan: PILIH_KALI, benar: "16" }]} umpan="21, 18, dan 16." />
        </>,
        <>
          <Dialog nama="Gio" anak="Lambang luas persegi panjang adalah panjang kali lebar. Persegi memakai sisi kali sisi." />
          <Lambang judul="Lambang kali" baris={["panjang × lebar", "sisi × sisi"]} />
          <Pilih id={idKuis("A", 12)} pertanyaan="Luas persegi panjang sama dengan..." pilihan={[{ huruf: "A", teks: "panjang + lebar" }, { huruf: "B", teks: "panjang × lebar" }, { huruf: "C", teks: "2 × panjang saja" }, { huruf: "D", teks: "sisi + sisi" }]} benar="B" umpan="Panjang dikali lebar." salah="Yang dijumlah adalah keliling. Luas memakai kali." />
          <Pilih id={idKuis("A", 19)} pertanyaan="8 × 3 = ..." pilihan={[{ huruf: "A", teks: "24" }, { huruf: "B", teks: "11" }, { huruf: "C", teks: "16" }, { huruf: "D", teks: "32" }]} benar="A" umpan="8 × 3 = 24." salah="Kalikan panjang dengan lebar." />
          <Pilih id={idKuis("A", 20)} pertanyaan="Persegi sisi 7 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "49" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "28" }, { huruf: "D", teks: "36" }]} benar="A" umpan="7 × 7 = 49." salah="Kalikan sisi dengan sisi." />
        </>,
      ]}
    />
  );
}

function SubbabAlas({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Luas segitiga dan segi empat"
      selesaiTeks="Empat halaman alas dan tinggi selesai."
      grup={[[idKuis("A", 4), idKuis("A", 5)], [idKuis("B", 4), idKuis("B", 5)], [idKuis("A", 21), idKuis("A", 22), idKuis("A", 23)], [idKuis("A", 13), idKuis("A", 24), idKuis("A", 25)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Segitiga dihitung dari alas dan tinggi.", "Hasilnya diambil setengah."])} />
          <Dialog nama="Nia" anak="Luas segitiga = setengah × alas × tinggi. Aku coba dua soal dulu, baru melipat kertas." />
          <LipatSegitiga />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Segitiga alas 7 cm dan tinggi 4 cm. Berapa luasnya?" periksa={hasil14} petunjuk="Setengah dari alas kali tinggi." benar="14 cm²." />
          <TulisBebas id={idKuis("A", 5)} judul="Alas delapan" visual={<Papan anak="setengah × 8 × 3" />} pertanyaan="Tulis luas segitiga itu." pesanSalah="Kalikan dulu, lalu ambil setengah." bantuan="8 × 3 = 24. Setengahnya 12." umpan="12 cm²." periksa={hasil12} alias={["12"]} konteks="Setengah × 8 × 3 = 12." />
        </>,
        <>
          <Dialog nama="Igil" anak="Model di buku: alas 4 dan tinggi 4 menjadi persegi panjang 4 × 2. Luasnya 8. Rumusnya tetap setengah × alas × tinggi." />
          <Dialog nama="Nia" anak="Model kedua: alas 5 dan tinggi 4. Setengah × 5 × 4 = 10." />
          <Dialog nama="Gio" anak="Jajargenjang alas 4 dan tinggi 2. Luas = alas × tinggi = 4 × 2 = 8. Tidak dibagi dua." />
          <Dialog nama="Lala" anak="Setengah × (2 + 5) × 2 = 7. Setelah ubinnya digeser, tersusun 7 petak juga. Luas trapesium = setengah × (sisi atas + sisi alas) × tinggi." />
          <TabelInfoGrafis judul="Infografis: Alas dan tinggi" kepala={["Bangun", "Cara", "Contoh"]} baris={[["Segitiga", "setengah × alas × tinggi", "alas 4 tinggi 4"], ["Jajargenjang", "alas × tinggi", "4 × 2"], ["Trapesium", "setengah × (atas + alas) × tinggi", "atas 2 alas 5"]]} kaki="Segitiga dan trapesium memakai setengah. Jajargenjang tidak." />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Trapesium sisi atas 2 cm, sisi alas 5 cm, dan tinggi 2 cm. Berapa luasnya?" periksa={hasil7} petunjuk="Setengah dari jumlah dua sisi sejajar, kali tinggi." benar="7 cm²." />
          <TulisBebas id={idKuis("B", 5)} judul="Jajargenjang lain" visual={<Papan anak="alas 6 · tinggi 3" />} pertanyaan="Tulis luas jajargenjang itu." pesanSalah="Kalikan alas dengan tinggi." bantuan="6 × 3 = 18." umpan="18 cm²." periksa={hasil18} alias={["18"]} konteks="6 × 3 = 18." />
        </>,
        <>
          <GambarUbin jenis="lipat" />
          <SusunToken id={idKuis("A", 21)} perintah="Susun luas dari yang paling kecil." acak={["24", "6", "15"]} benar={["6", "15", "24"]} umpan="6, lalu 15, lalu 24." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 22)} perintah="Pilih benar atau salah." baris={[{ teks: "Luas segitiga memakai setengah.", benar: true }, { teks: "Luas jajargenjang juga dibagi dua.", benar: false }, { teks: "Luas trapesium memakai setengah jumlah dua sisi sejajar, kali tinggi.", benar: true }]} umpan="Jajargenjang adalah alas kali tinggi, tanpa dibagi dua." />
          <KuisCocok id={idKuis("A", 23)} perintah="Pasangkan ukuran dengan luasnya." baris={[{ kiri: "Setengah × 6 × 4", pilihan: PILIH_ALAS, benar: "12" }, { kiri: "Setengah × 6 × 6", pilihan: PILIH_ALAS, benar: "18" }, { kiri: "Setengah × (4 + 6) × 2", pilihan: PILIH_ALAS, benar: "10" }]} umpan="12, 18, dan 10." />
        </>,
        <>
          <Dialog nama="Nia" anak="Lambang segitiga adalah setengah kali alas kali tinggi. Jajargenjang tidak dibagi dua." />
          <Lambang judul="Lambang alas" baris={["setengah × alas × tinggi", "alas × tinggi"]} />
          <Pilih id={idKuis("A", 13)} pertanyaan="Segitiga alas 5 cm dan tinggi 4 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "20" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "9" }, { huruf: "D", teks: "4" }]} benar="B" umpan="Setengah × 5 × 4 = 10." salah="20 belum dibagi dua. Ambil setengahnya." />
          <Pilih id={idKuis("A", 24)} pertanyaan="Setengah × 10 × 6 = ..." pilihan={[{ huruf: "A", teks: "30" }, { huruf: "B", teks: "60" }, { huruf: "C", teks: "16" }, { huruf: "D", teks: "8" }]} benar="A" umpan="10 × 6 = 60. Setengahnya 30." salah="Kalikan dulu, lalu ambil setengah." />
          <Pilih id={idKuis("A", 25)} pertanyaan="Jajargenjang alas 7 cm dan tinggi 4 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "28" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "11" }, { huruf: "D", teks: "32" }]} benar="A" umpan="7 × 4 = 28. Jajargenjang tidak dibagi dua." salah="Kalikan alas dengan tinggi." />
        </>,
      ]}
    />
  );
}

function SubbabDiagonal({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Luas diagonal dan gabungan"
      selesaiTeks="Empat halaman gabungan selesai."
      grup={[[idKuis("A", 6), idKuis("A", 7)], [idKuis("B", 6), idKuis("B", 7)], [idKuis("A", 26), idKuis("A", 27), idKuis("A", 14)], [idKuis("A", 28), idKuis("B", 18), idKuis("B", 19)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Belah ketupat dan layang-layang memakai dua diagonal.", "Luasnya setengah kali kedua diagonal."])} />
          <Dialog nama="Igil" anak="Dua diagonal saling memotong. Luas belah ketupat dan layang-layang = setengah × diagonal 1 × diagonal 2." />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Belah ketupat diagonal 6 cm dan 4 cm. Berapa luasnya?" periksa={hasil12} petunjuk="Setengah dari perkalian kedua diagonal." benar="12 cm²." />
          <TulisBebas id={idKuis("A", 7)} judul="Layang lebar" visual={<Papan anak="setengah × 8 × 5" />} pertanyaan="Tulis luas layang-layang itu." pesanSalah="Kalikan kedua diagonal, lalu ambil setengah." bantuan="8 × 5 = 40. Setengahnya 20." umpan="20 cm²." periksa={hasil20} alias={["20"]} konteks="Setengah × 8 × 5 = 20." />
        </>,
        <>
          <Dialog nama="Nia" anak="Di buku, belah ketupat diagonal 2 dan 4. Setengah × 2 × 4 = 4. Ubinnya bisa disusun jadi persegi 2 × 2. Luasnya tetap 4." />
          <Dialog nama="Lala" anak="Layang-layang di buku diagonal 5 dan 4. Setengah × 5 × 4 = 10. Rumusnya sama dengan belah ketupat." />
          <BagianLuas />
          <Dialog nama="Gio" anak="Cara pertama: layang-layang 10 ditambah segitiga setengah × 5 × 2 = 5. Jumlahnya 15." />
          <Dialog nama="Igil" anak="Cara kedua: jajargenjang 5 × 2 = 10 ditambah segitiga 5. Jumlahnya juga 15. Untuk luas, bagian-bagiannya dijumlah. Keliling hanya menghitung tepi luar." />
          <TabelInfoGrafis judul="Infografis: Diagonal dan gabungan" kepala={["Bangun", "Cara", "Luas"]} baris={[["Belah ketupat", "setengah × dua diagonal", "contoh buku 4"], ["Layang-layang", "rumus yang sama", "contoh buku 10"], ["Gabungan", "jumlah bagian", "10 ditambah 5"]]} kaki="Dua cara boleh beda, luas gabungannya sama." />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Layang-layang diagonal 6 cm dan 8 cm. Berapa luasnya?" periksa={hasil24} petunjuk="Setengah dari 6 kali 8." benar="24 cm²." />
          <TulisBebas id={idKuis("B", 7)} judul="Dua bagian" visual={<Papan anak="bagian 10 dan bagian 5" />} pertanyaan="Tulis jumlah luasnya." pesanSalah="Jumlahkan kedua bagian." bantuan="10 + 5 = 15." umpan="15." periksa={hasil15} alias={["15"]} konteks="10 + 5 = 15." />
        </>,
        <>
          <GambarUbin jenis="layang" />
          <SusunToken id={idKuis("A", 26)} perintah="Susun luas dari yang paling kecil." acak={["27", "8", "18"]} benar={["8", "18", "27"]} umpan="8, lalu 18, lalu 27." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 27)} perintah="Pilih benar atau salah." baris={[{ teks: "Luas belah ketupat = setengah × dua diagonal.", benar: true }, { teks: "Luas gabungan dihitung dengan mengalikan semua bagian.", benar: false }, { teks: "Dua cara berbeda boleh menghasilkan luas yang sama.", benar: true }]} umpan="Bagian gabungan dijumlah, tidak dikali." />
          <KuisCocok id={idKuis("A", 14)} perintah="Pasangkan bangun dengan luasnya." baris={[{ kiri: "Persegi panjang 5 × 2", pilihan: PASANGAN_LUAS, benar: "10" }, { kiri: "Persegi sisi 4", pilihan: PASANGAN_LUAS, benar: "16" }, { kiri: "Trapesium 2, 5, tinggi 2", pilihan: PASANGAN_LUAS, benar: "7" }]} umpan="10, 16, dan 7." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang diagonal adalah setengah kali diagonal pertama kali diagonal kedua." />
          <Lambang judul="Lambang diagonal" baris={["setengah × d1 × d2", "bagian + bagian"]} />
          <Pilih id={idKuis("A", 28)} pertanyaan="Setengah × 7 × 4 = ..." pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "28" }, { huruf: "C", teks: "11" }, { huruf: "D", teks: "3" }]} benar="A" umpan="7 × 4 = 28. Setengahnya 14." salah="Kalikan dulu, lalu ambil setengah." />
          <Pilih id={idKuis("B", 18)} pertanyaan="Setengah × 9 × 2 = ..." pilihan={[{ huruf: "A", teks: "9" }, { huruf: "B", teks: "18" }, { huruf: "C", teks: "7" }, { huruf: "D", teks: "11" }]} benar="A" umpan="9 × 2 = 18. Setengahnya 9." salah="Jangan lupa mengambil setengah." />
          <Pilih id={idKuis("B", 19)} pertanyaan="Bagian 12 digabung bagian 7. Luasnya..." pilihan={[{ huruf: "A", teks: "19" }, { huruf: "B", teks: "84" }, { huruf: "C", teks: "5" }, { huruf: "D", teks: "12" }]} benar="A" umpan="12 + 7 = 19." salah="Jumlahkan kedua bagian." />
        </>,
      ]}
    />
  );
}

function SubbabKawat({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Hubungan keliling dan luas"
      selesaiTeks="Empat halaman kawat selesai."
      grup={[[idKuis("A", 8), idKuis("A", 9)], [idKuis("B", 8), idKuis("B", 9)], [idKuis("B", 13), idKuis("B", 11), idKuis("B", 10)], [idKuis("B", 12), idKuis("B", 14), idKuis("B", 20)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Kawat yang sama panjang bisa dibentuk ulang.", "Kelilingnya tetap. Luasnya bisa berbeda."])} />
          <Dialog nama="Gio" anak="Kawat ini 60 cm. Aku ubah bentuknya. Kelilingnya tetap 60 cm. Luas di dalamnya belum tentu sama." />
          <KawatPilih />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Persegi panjang panjang 12 cm dan lebar 8 cm. Berapa luasnya?" periksa={hasil96} petunjuk="Kalikan panjang dengan lebar." benar="96 cm²." />
          <TulisBebas id={idKuis("A", 9)} judul="Petak 9 dan 5" visual={<Papan anak="panjang 9 · lebar 5" />} pertanyaan="Tulis luasnya." pesanSalah="Kalikan panjang dengan lebar." bantuan="9 × 5 = 45." umpan="45 cm²." periksa={hasil45} alias={["45"]} konteks="9 × 5 = 45." />
        </>,
        <>
          <Dialog nama="Lala" anak="Bentangan 20 × 10 dan 10 × 20 luasnya sama. Bentangan 5 × 25 lebih pipih. Persegi 15 × 15 perlu dihitung sendiri." />
          <Dialog nama="Igil" anak="Keliling sama belum tentu luasnya sama. Hitung tiap bentangan, lalu bandingkan." />
          <TabelInfoGrafis judul="Infografis: Kawat yang sama" kepala={["Bentangan", "Cara", "Yang dicek"]} baris={[["20 × 10", "panjang × lebar", "hitung luasnya"], ["5 × 25", "panjang × lebar", "hitung luasnya"], ["15 × 15", "sisi × sisi", "hitung luasnya"]]} kaki="Kelilingnya tetap sama. Luasnya dihitung satu per satu." />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Kawat dibentangkan menjadi persegi sisi 15 cm. Berapa luasnya?" periksa={hasil225} petunjuk="Kalikan sisi dengan sisi." benar="225 cm²." />
          <TulisBebas id={idKuis("B", 9)} judul="Bentangan lebar" visual={<Papan anak="panjang 20 cm · lebar 10 cm" />} pertanyaan="Tulis luas bentangan itu." pesanSalah="Kalikan panjang dengan lebar." bantuan="20 × 10 = 200." umpan="200 cm²." periksa={hasil200} alias={["200"]} konteks="20 × 10 = 200." />
        </>,
        <>
          <GambarUbin jenis="kawat" />
          <SusunToken id={idKuis("B", 13)} perintah="Susun dari yang paling kecil: trapesium 7, persegi panjang 10, persegi 16." acak={["16", "7", "10"]} benar={["7", "10", "16"]} umpan="7, lalu 10, lalu 16." pesanSalah="Bandingkan 7, 10, dan 16." />
          <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Keliling yang sama pasti luasnya sama.", benar: false }, { teks: "Persegi termasuk persegi panjang.", benar: true }, { teks: "15 × 15 lebih luas daripada 20 × 10.", benar: true }]} umpan="Keliling sama bisa luasnya beda. 225 lebih luas dari 200." />
          <KuisCocok id={idKuis("B", 10)} perintah="Pasangkan bentangan dengan luasnya." baris={[{ kiri: "20 × 10", pilihan: PASANGAN_KAWAT, benar: "200" }, { kiri: "5 × 25", pilihan: PASANGAN_KAWAT, benar: "125" }, { kiri: "15 × 15", pilihan: PASANGAN_KAWAT, benar: "225" }]} umpan="200, 125, dan 225." />
        </>,
        <>
          <Dialog nama="Lala" anak="Lambang bentangan tetap panjang kali lebar, walaupun kelilingnya sama." />
          <Lambang judul="Lambang bentangan" baris={["7 × 6 = 42", "keliling sama, luas boleh beda"]} />
          <Pilih id={idKuis("B", 12)} pertanyaan="Belah ketupat diagonal 2 cm dan 4 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "8" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "2" }, { huruf: "D", teks: "6" }]} benar="B" umpan="Setengah × 2 × 4 = 4." salah="8 belum dibagi dua." />
          <Pilih id={idKuis("B", 14)} pertanyaan="Layang-layang luas 10 digabung segitiga luas 5. Luas gabungannya..." pilihan={[{ huruf: "A", teks: "15" }, { huruf: "B", teks: "50" }, { huruf: "C", teks: "5" }, { huruf: "D", teks: "2" }]} benar="A" umpan="10 + 5 = 15. Bagiannya dijumlah." salah="Jangan dikalikan. Jumlahkan luas kedua bagian." />
          <Pilih id={idKuis("B", 20)} pertanyaan="8 × 6 = ..." pilihan={[{ huruf: "A", teks: "48" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "28" }, { huruf: "D", teks: "36" }]} benar="A" umpan="8 × 6 = 48." salah="Kalikan panjang dengan lebar." />
        </>,
      ]}
    />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB5.kartu[0];
  const [tab, setTab] = useState(0);
  const judulSubbab = ["Konsep luas daerah", "Luas persegi panjang dan persegi", "Luas segitiga dan segi empat", "Luas diagonal dan gabungan", "Hubungan keliling dan luas"];
  useJudulDompetMateri(judulSubbab[tab] ?? judulSubbab[0]);
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🟦🦉" judul={kartu.judul} anak="Lima sub-bab di tepi kanal" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <TabSubbab label={["Sub-Bab A", "Sub-Bab B", "Sub-Bab C", "Sub-Bab D", "Sub-Bab E"]} aktif={tab} onPilih={setTab} />
        {tab === 0 ? <SubbabLuas kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 1 ? <SubbabPersegi kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 2 ? <SubbabAlas kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 3 ? <SubbabDiagonal kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 4 ? <SubbabKawat kelas={kelas} kelamin={kelamin} /> : null}
      </div>
    </KartuBingkai>
  );
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB5.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🟦🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarUbin jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB5} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB5} penutup="Lentera ubin menyala. Igil menempelkan cap ubin." bunga="🟦🪁🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB5.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Ubin Senja" : skor >= 6 ? "🟦 Penjaga Petak" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Petakmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru ubin." : "Ayo hitung lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarUbin jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Layang-layang" visual={<Papan anak="diagonal 24 cm dan 18 cm" />} pertanyaan="Tulis luasnya." pesanSalah="Setengah dari perkalian kedua diagonal." bantuan="Setengah × 24 × 18 = 12 × 18." umpan="216 cm²." periksa={hasil216} alias={["216"]} konteks="Setengah × 24 × 18 = 216." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Jajargenjang alas 16 cm dan tinggi 8 cm, digabung segitiga alas 16 cm dan tinggi 12 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "128 cm²" }, { huruf: "B", teks: "224 cm²" }, { huruf: "C", teks: "96 cm²" }, { huruf: "D", teks: "208 cm²" }]} benar="B" umpan="128 + 96 = 224 cm²." salah="Hitung jajargenjang, lalu setengah segitiga, lalu jumlahkan." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Layang-layang diagonal 5 cm dan 4 cm digabung trapesium sisi atas 2 cm, sisi alas 4 cm, dan tinggi 4 cm. Berapa luas gabungannya?" periksa={hasil22} petunjuk="Hitung masing-masing, lalu jumlahkan." benar="22 cm²." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Persegi dengan sisi 6 cm. Luasnya..." pilihan={[{ huruf: "A", teks: "12 cm²" }, { huruf: "B", teks: "36 cm²" }, { huruf: "C", teks: "18 cm²" }, { huruf: "D", teks: "30 cm²" }]} benar="B" umpan="6 × 6 = 36 cm²." salah="Kalikan sisi dengan sisi." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan bangun dengan luasnya." baris={[{ kiri: "Persegi panjang 6 × 4", pilihan: PASANGAN_UJI, benar: "24" }, { kiri: "Segitiga alas 6 tinggi 6", pilihan: PASANGAN_UJI, benar: "18" }, { kiri: "Belah ketupat diagonal 6 dan 4", pilihan: PASANGAN_UJI, benar: "12" }]} umpan="24, 18, dan 12." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Tiga bagian" visual={<Papan anak="2 × 4 · 3 × 2 · trapesium atas 3, alas 1, tinggi 4" />} pertanyaan="Tulis jumlah luasnya." pesanSalah="Hitung tiga bagian, lalu jumlahkan." bantuan="8 + 6 + 8." umpan="22 cm²." periksa={hasil22} alias={["22"]} konteks="8 + 6 + 8 = 22." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Luas persegi untuk sisi 1, 2, 3 adalah 1, 4, 9. Berikutnya..." visual={<Papan anak="1 · 4 · 9 · ⬜" />} pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "15" }, { huruf: "C", teks: "16" }, { huruf: "D", teks: "25" }]} benar="C" umpan="Sisi berikutnya 4. 4 × 4 = 16." salah="Luas persegi naik sesuai sisi kali sisi." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Kawat yang sama panjang. Mana yang paling luas?" pilihan={[{ huruf: "A", teks: "20 × 10" }, { huruf: "B", teks: "15 × 15" }, { huruf: "C", teks: "5 × 25" }, { huruf: "D", teks: "10 × 20" }]} benar="B" umpan="15 × 15 = 225, lebih luas dari 200 dan 125." salah="Bandingkan luasnya, bukan kelilingnya." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Trapesium sisi atas 8 cm, sisi alas 4 cm, dan tinggi 3 cm. Berapa luasnya?" periksa={hasil18} petunjuk="Setengah dari jumlah dua sisi sejajar, kali tinggi." benar="18 cm²." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Denah lantai: ruang tamu 13 m², dua kamar 18 m², dapur 6 m², dan kamar mandi 2 m². Jumlahnya..." pilihan={[{ huruf: "A", teks: "39 m²" }, { huruf: "B", teks: "29 m²" }, { huruf: "C", teks: "37 m²" }, { huruf: "D", teks: "41 m²" }]} benar="A" umpan="13 + 18 + 6 + 2 = 39 m²." salah="Jumlahkan keempat bagian." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab5({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarUbin jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Luas adalah ukuran daerah di dalam tepi.",
          "Bagian gabungan dijumlahkan.",
          "Keliling yang sama bisa punya luas berbeda.",
        ])}
        poin={[
          "Luas adalah ukuran daerah di dalam tepi. 1 m × 1 m = 1 m².",
          "Ruang tamu 13 m². Dua kamar 18 m². Dapur 6 m². Kamar mandi 2 m². Total 39 m². Petak yang digeser luasnya tetap, misalnya 9.",
          "Persegi panjang: panjang × lebar. Ukuran 5 dan 2 menjadi 10. Persegi: sisi × sisi. Sisi 4 menjadi 16.",
          "Segitiga: setengah × alas × tinggi. Contohnya 8 dan 10. Jajargenjang 4 × 2 = 8. Trapesium 7.",
          "Belah ketupat diagonal 2 dan 4 luasnya 4. Layang-layang diagonal 5 dan 4 luasnya 10. Gabungan 10 + 5 = 15.",
          "Kawat yang kelilingnya sama: 200, 125, dan 225. Yang paling luas 225.",
        ]}
        penutup="Hitung petak atau kalikan ukuran. Bentuk boleh berubah, luas tetap."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
