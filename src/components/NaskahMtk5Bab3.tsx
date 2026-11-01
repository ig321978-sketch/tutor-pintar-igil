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
import { MISI_MTK5_BAB3, TEMA_MTK5_BAB3 } from "@/lib/misi-mtk-5-bab3";
import { MODUL_MTK5_BAB3 } from "@/lib/modul-resmi-mtk-5-bab3";
import {
  duaPerLima,
  duaPuluhDuaPerDelapan,
  empatPerEnam,
  hasilDuaPerLimaBelas,
  hasilDuaPuluhSatuPerDuaPuluh,
  hasilEmpat,
  hasilEmpatBelasPerLimaBelas,
  hasilJarak,
  hasilLimaDuaPerLima,
  hasilLimaPerDelapan,
  hasilLimaPerEnam,
  hasilSatu,
  hasilSatuPerDuaPuluh,
  hasilSatuPerTujuh,
  hasilSetengah,
  hasilTigaPerDelapan,
  hasilTigaPerLima,
  hasilTujuhPerEmpatPuluh,
  lebihKecilSeperlima,
  lompatanTerjauh,
  satuPerDua,
  tigaPerEmpat,
  urutanPita,
} from "@/lib/nilai-mtk-5-bab3";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB3.id;
const PASANGAN_JUMLAH = ["3/8", "5 2/5", "5/6"];
const PASANGAN_SELISIH = ["1/3", "3 1/3", "1/6"];
const PASANGAN_UJI = ["6/7", "2 7/8", "3 33/40"];

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
  Sari: "border-amber-300 bg-amber-50",
  Bima: "border-indigo-300 bg-indigo-50",
  Wulan: "border-emerald-300 bg-emerald-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Sari: "👧",
  Bima: "👦",
  Wulan: "👧",
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

const GAMBAR_DAPUR = {
  roti: { src: "/doodle-mtk/mtk-5-bab3-roti.jpg", alt: "Sari, Bima, dan Wulan di dapur roti tepi sungai. Igil berdiri di meja." },
  lompat: { src: "/doodle-mtk/mtk-5-bab3-lompat.jpg", alt: "Bima melompat di tanah dekat dapur. Sari, Wulan, dan Igil melihat." },
  tambah: { src: "/doodle-mtk/mtk-5-bab3-tambah.jpg", alt: "Dua potong roti digeser jadi satu di talenan. Igil di dekatnya." },
  beda: { src: "/doodle-mtk/mtk-5-bab3-beda.jpg", alt: "Tiga warung di tepi sungai. Sari, Bima, Wulan, dan Igil berjalan di antaranya." },
  kurang: { src: "/doodle-mtk/mtk-5-bab3-kurang.jpg", alt: "Roti bulat dengan satu potongan terangkat. Igil di samping piring." },
  pos: { src: "/doodle-mtk/mtk-5-bab3-pos.jpg", alt: "Batu loncatan di tepi sungai. Igil berdiri di batu pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab3-meja.jpg", alt: "Meja kecil dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab3-kartu.jpg", alt: "Sari, Bima, Wulan, dan Igil memegang kartu kosong di dapur senja." },
} as const;

function GambarDapur({ jenis }: { jenis: keyof typeof GAMBAR_DAPUR }) {
  const gambar = GAMBAR_DAPUR[jenis];
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
  jenis: keyof typeof GAMBAR_DAPUR;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarDapur jenis={jenis} />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(hasil) => setTepat(hasil)} />
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

function SusunToken({ id, perintah, acak, benar, umpan }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string }) {
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
      <HasilJawabanKuis status={status} pesanSalah="Urutkan dari yang paling kecil." />
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

function jalurIris(indeks: number, jumlah: number): string {
  const mulai = (indeks / jumlah) * Math.PI * 2 - Math.PI / 2;
  const akhir = ((indeks + 1) / jumlah) * Math.PI * 2 - Math.PI / 2;
  const x0 = 50 + 42 * Math.cos(mulai);
  const y0 = 50 + 42 * Math.sin(mulai);
  const x1 = 50 + 42 * Math.cos(akhir);
  const y1 = 50 + 42 * Math.sin(akhir);
  const besar = jumlah === 1 ? 1 : 0;
  return `M 50 50 L ${x0.toFixed(2)} ${y0.toFixed(2)} A 42 42 0 ${besar} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function RotiIris() {
  const [jumlah, setJumlah] = useState(2);
  const [nyala, setNyala] = useState<boolean[]>([true, false]);
  const isi = nyala.filter(Boolean).length;
  const ganti = (nilai: number) => {
    setJumlah(nilai);
    setNyala(Array.from({ length: nilai }, (_, indeks) => indeks === 0));
  };
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Roti bulan</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {[2, 3, 4, 6, 8].map((nilai) => (
          <button key={nilai} type="button" onClick={() => ganti(nilai)} className={`rounded-full px-3 py-1 text-sm font-black ${jumlah === nilai ? "bg-[#1C01A5] text-white" : "bg-amber-100 text-[#1C01A5]"}`}>{nilai} iris</button>
        ))}
      </div>
      <svg viewBox="0 0 100 100" className="mx-auto mt-3 h-40 w-40">
        {nyala.map((aktif, indeks) => (
          <path key={indeks} d={jalurIris(indeks, jumlah)} fill={aktif ? "#F0AB00" : "#F8F1DE"} stroke="#1C01A5" strokeWidth="1.2" onClick={() => setNyala((lama) => lama.map((item, urut) => (urut === indeks ? !item : item)))} />
        ))}
      </svg>
      <p className="text-center text-sm font-semibold text-slate-700">Ketuk iris untuk mengambil. Sekarang {isi}/{jumlah}.</p>
    </div>
  );
}

function GarisLompat() {
  const titik = [
    { nama: "7/8", kiri: "22%" },
    { nama: "2 3/4", kiri: "69%" },
    { nama: "3 1/2", kiri: "88%" },
  ];
  const [pilih, setPilih] = useState("");
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Garis lompatan</p>
      <div className="relative mt-8 h-3 rounded-full bg-slate-200">
        {titik.map((item) => (
          <button key={item.nama} type="button" onClick={() => setPilih(item.nama)} className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C01A5] text-[10px] font-black text-white" style={{ left: item.kiri }} aria-label={item.nama} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs font-bold text-slate-500"><span>0</span><span>4 m</span></div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{pilih ? `${pilih} ada di garis. Makin kanan, makin jauh.` : "Ketuk titik. Makin kanan, lompatannya makin jauh."}</p>
    </div>
  );
}

function BatangDelapan() {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-black text-[#1C01A5]">Delapan iris</p>
      <div className="mt-2 grid grid-cols-8 gap-1">
        {Array.from({ length: 8 }, (_, indeks) => (
          <span key={indeks} className={`h-10 rounded-md ${indeks < 2 ? "bg-emerald-400" : indeks === 2 ? "bg-indigo-400" : "bg-white ring-2 ring-amber-200"}`} />
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Hijau 2/8. Biru 1/8. Jumlah 3/8. Penyebutnya tetap.</p>
    </div>
  );
}

function LidiEnam() {
  const [buka, setBuka] = useState(false);
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Samakan ke 6</p>
      <p className="mt-2 text-sm font-bold text-slate-700">1/2 = 3/6</p>
      <div className="mt-1 grid grid-cols-6 gap-1">{Array.from({ length: 6 }, (_, indeks) => <span key={`a-${indeks}`} className={`h-8 rounded ${indeks < 3 ? "bg-amber-400" : "bg-slate-100"}`} />)}</div>
      <p className="mt-2 text-sm font-bold text-slate-700">1/3 = 2/6</p>
      <div className="mt-1 grid grid-cols-6 gap-1">{Array.from({ length: 6 }, (_, indeks) => <span key={`b-${indeks}`} className={`h-8 rounded ${indeks < 2 ? "bg-emerald-400" : "bg-slate-100"}`} />)}</div>
      <button type="button" onClick={() => setBuka(true)} className="mt-3 rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Jumlahkan</button>
      {buka ? <p className="mt-2 text-sm font-semibold text-emerald-800">3/6 + 2/6 = 5/6.</p> : null}
    </div>
  );
}

function SisaKotak() {
  const [buka, setBuka] = useState(false);
  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Sisa kertas</p>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {Array.from({ length: 6 }, (_, indeks) => (
          <span key={indeks} className={`h-10 rounded-md ${indeks < 4 ? "bg-amber-300" : "bg-slate-100"} ${buka && indeks < 3 ? "ring-4 ring-rose-500" : ""}`} />
        ))}
      </div>
      <button type="button" onClick={() => setBuka(true)} className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-sm font-black text-white">Tandai yang sudah</button>
      <p className="mt-2 text-sm font-semibold text-slate-700">{buka ? "2/3 = 4/6. 1/2 = 3/6. Yang tersisa 1/6." : "Kuning adalah 2/3, yaitu 4 kotak dari 6."}</p>
    </div>
  );
}

const PILIH_BENTUK = ["1/3", "2/7", "5/8"];
const PILIH_BANDING = ["1/8", "3/4", "2/6"];
const PILIH_SAMA = ["3/6", "5/7", "7/8"];

function Irisan({ judul, penuh, isi, catatan }: { judul: string; penuh: number; isi: number; catatan: string }) {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: penuh }, (_, indeks) => (
          <span key={indeks} className={`h-8 flex-1 rounded ${indeks < isi ? "bg-amber-400" : "bg-white ring-1 ring-amber-300"}`} />
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{catatan}</p>
    </div>
  );
}

function Lambang({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      {baris.map((teks) => (
        <p key={teks} className="mt-2 text-lg font-black text-[#1C01A5]">{teks}</p>
      ))}
    </div>
  );
}

function SubbabBentuk({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Bentuk pecahan"
      selesaiTeks="Empat halaman bentuk pecahan selesai."
      grup={[[idKuis("A", 0), idKuis("A", 1)], [idKuis("B", 0), idKuis("B", 1)], [idKuis("A", 15), idKuis("A", 16), idKuis("A", 17)], [idKuis("A", 13), idKuis("A", 18), idKuis("A", 19)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Pecahan adalah bagian dari sesuatu yang utuh.", "Angka atas pembilang. Angka bawah penyebut.", "Pecahan campuran menaruh bilangan bulat di depan."])} />
          <Dialog nama="Sari" anak="Roti ini kupotong dua bagian sama besar. Satu bagian untuk Igil." />
          <Dialog nama="Bima" anak="Satu dari dua ditulis 1/2. Angka 1 di atas, angka 2 di bawah." />
          <Dialog nama="Wulan" anak="Angka atas disebut pembilang. Angka bawah disebut penyebut." />
          <Dialog nama="Igil" anak="Pecahan biasa hanya dua angka itu. Pecahan campuran menaruh bilangan bulat di depan, seperti 2 1/2." />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Satu roti dibagi 4 sama besar. Tiga bagian diambil. Sebutkan pecahannya." periksa={tigaPerEmpat} petunjuk="Pembilang 3, penyebut 4." benar="3/4." />
          <TulisBebas id={idKuis("A", 1)} judul="Dua dari lima" visual={<Papan anak="2 bagian dari 5" />} pertanyaan="Tulis pecahan untuk 2 bagian dari 5 bagian yang sama." pesanSalah="Angka yang diambil di atas, banyak bagian di bawah." bantuan="Pembilang 2, penyebut 5." umpan="2/5." periksa={duaPerLima} alias={["2/5", "dua per lima"]} konteks="2 bagian dari 5 ditulis 2/5." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis ini mengingat nama bagiannya. Contohnya tetap 1/2." />
          <TabelInfoGrafis
            judul="Infografis: Bagian dari utuh"
            kepala={["Nama", "Letak", "Contoh"]}
            baris={[
              ["Pembilang", "angka atas", "1 pada 1/2"],
              ["Penyebut", "angka bawah", "2 pada 1/2"],
              ["Campuran", "bulat di depan", "2 1/2"],
            ]}
            kaki="Pecahan menyebut bagian yang diambil dari seluruhnya."
          />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Satu bagian dari dua bagian yang sama. Sebutkan pecahannya." periksa={satuPerDua} petunjuk="Satu di atas, dua di bawah." benar="1/2." />
          <TulisBebas id={idKuis("B", 1)} judul="Empat dari enam" visual={<Papan anak="4 bagian dari 6" />} pertanyaan="Tulis pecahan untuk 4 bagian dari 6 bagian yang sama." pesanSalah="Yang diambil di atas, seluruh bagian di bawah." bantuan="4/6. Boleh juga 2/3." umpan="4/6, senilai dengan 2/3." periksa={empatPerEnam} alias={["4/6", "2/3"]} konteks="4 bagian dari 6 ditulis 4/6." />
        </>,
        <>
          <GambarDapur jenis="roti" />
          <RotiIris />
          <Irisan judul="Gambar 3 bagian dari 8" penuh={8} isi={3} catatan="Kuning adalah bagian yang diambil. Putih masih utuh." />
          <SusunToken id={idKuis("A", 15)} perintah="Susun dari yang paling kecil." acak={["1/2", "1/8", "1/4"]} benar={["1/8", "1/4", "1/2"]} umpan="1/8, lalu 1/4, lalu 1/2." />
          <KuisBenarSalah id={idKuis("A", 16)} perintah="Pilih benar atau salah." baris={[{ teks: "3/4 berarti 3 bagian dari 4 bagian yang sama.", benar: true }, { teks: "Penyebut adalah angka yang di atas.", benar: false }, { teks: "2 1/3 adalah pecahan campuran.", benar: true }]} umpan="Penyebut ada di bawah. Campuran punya bilangan bulat di depan." />
          <KuisCocok id={idKuis("A", 17)} perintah="Pasangkan bagian dengan pecahannya." baris={[{ kiri: "1 bagian dari 3", pilihan: PILIH_BENTUK, benar: "1/3" }, { kiri: "2 bagian dari 7", pilihan: PILIH_BENTUK, benar: "2/7" }, { kiri: "5 bagian dari 8", pilihan: PILIH_BENTUK, benar: "5/8" }]} umpan="1/3, 2/7, dan 5/8." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang ini memakai angka saja. Pembilang di atas, penyebut di bawah." />
          <Lambang judul="Lambang pecahan" baris={["1/2 = 2/4", "2 1/2 = 5/2"]} />
          <Pilih id={idKuis("A", 13)} pertanyaan="5/10 disederhanakan menjadi..." pilihan={[{ huruf: "A", teks: "5/5" }, { huruf: "B", teks: "1/2" }, { huruf: "C", teks: "1/5" }, { huruf: "D", teks: "10/5" }]} benar="B" umpan="Bagi pembilang dan penyebut dengan 5. 5/10 = 1/2." salah="Pembilang dan penyebut dibagi bilangan yang sama." />
          <Pilih id={idKuis("A", 18)} pertanyaan="3/6 disederhanakan menjadi..." pilihan={[{ huruf: "A", teks: "3/3" }, { huruf: "B", teks: "1/2" }, { huruf: "C", teks: "1/3" }, { huruf: "D", teks: "6/3" }]} benar="B" umpan="Bagi pembilang dan penyebut dengan 3. 3/6 = 1/2." salah="Pembilang dan penyebut dibagi bilangan yang sama." />
          <Pilih id={idKuis("A", 19)} pertanyaan="Yang merupakan pecahan campuran adalah..." pilihan={[{ huruf: "A", teks: "5/3" }, { huruf: "B", teks: "2 1/3" }, { huruf: "C", teks: "1/3" }, { huruf: "D", teks: "3/2" }]} benar="B" umpan="Campuran menaruh bilangan bulat di depan pecahan." salah="Pecahan biasa hanya punya pembilang dan penyebut." />
        </>,
      ]}
    />
  );
}

function SubbabBanding({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Membandingkan dan mengurutkan pecahan"
      selesaiTeks="Empat halaman membandingkan selesai."
      grup={[[idKuis("A", 2), idKuis("A", 3)], [idKuis("B", 2), idKuis("B", 3)], [idKuis("A", 11), idKuis("A", 12), idKuis("A", 20)], [idKuis("A", 10), idKuis("A", 21), idKuis("A", 22)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Ubah campuran menjadi pecahan biasa.", "Samakan penyebut, lalu bandingkan pembilang.", "Makin ke kanan pada garis, nilainya makin besar."])} />
          <Dialog nama="Sari" anak="Tiga lompatanku: 2 3/4 m, 3 1/2 m, dan 7/8 m." />
          <Dialog nama="Bima" anak="2 3/4 = (2 × 4 + 3) / 4 = 11/4. 3 1/2 = (3 × 2 + 1) / 2 = 7/2." />
          <Dialog nama="Wulan" anak="Penyebut 4, 2, dan 8. KPK-nya 8. 11/4 = 22/8. 7/2 = 28/8. 7/8 tetap 7/8." />
          <Dialog nama="Igil" anak="Pembilang 7, 22, dan 28. Dari yang terdekat: 7/8, lalu 2 3/4, lalu 3 1/2. Yang terjauh 3 1/2." />
          <Dialog nama="Sari" anak="Ada juga tiga pita: 2 2/5 m, 2 1/4 m, dan 2 1/2 m. Urutannya masih kosong." />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Mana yang lebih kecil, 1/2 atau 1/5? Sebutkan pecahannya." periksa={lebihKecilSeperlima} petunjuk="Penyebut lebih besar tidak selalu berarti nilainya lebih besar." benar="1/5 lebih kecil." />
          <TulisBebas id={idKuis("A", 3)} judul="Tiga pita" visual={<Papan anak="2 2/5 m · 2 1/4 m · 2 1/2 m" />} pertanyaan="Tulis urutan pita dari yang terpendek." pesanSalah="Samakan penyebut 20, lalu bandingkan pembilang." bantuan="1/4 = 5/20, 2/5 = 8/20, 1/2 = 10/20." umpan="2 1/4, lalu 2 2/5, lalu 2 1/2." periksa={urutanPita} alias={["2 1/4", "2 2/5", "2 1/2"]} konteks="Urutan terpendek: 2 1/4, 2 2/5, 2 1/2." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis lompatan merangkum caranya. Hasil terjauh belum ditulis di tabel." />
          <TabelInfoGrafis
            judul="Infografis: Urutkan lompatan"
            kepala={["Langkah", "Yang dikerjakan", "Contoh"]}
            baris={[
              ["Campuran", "ubah ke pecahan biasa", "2 3/4 menjadi 11/4"],
              ["Penyebut", "cari KPK", "4, 2, dan 8"],
              ["Pembilang", "bandingkan setelah sama", "yang besar lebih jauh"],
            ]}
            kaki="Samakan penyebut, lalu lihat pembilangnya."
          />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Dari 2 3/4, 3 1/2, dan 7/8, lompatan mana yang terjauh?" periksa={lompatanTerjauh} petunjuk="Lihat pembilang setelah penyebutnya 8." benar="3 1/2." />
          <TulisBebas id={idKuis("B", 3)} judul="Penyebut 8" visual={<Papan anak="2 3/4 = ⬜/8" />} pertanyaan="Tulis 2 3/4 sebagai pecahan berpenyebut 8." pesanSalah="11/4 dikali 2 pada pembilang dan penyebut." bantuan="11/4 = 22/8." umpan="22/8." periksa={duaPuluhDuaPerDelapan} alias={["22/8"]} konteks="2 3/4 = 22/8." />
        </>,
        <>
          <GambarDapur jenis="lompat" />
          <Irisan judul="Gambar 1/4 dan 1/2" penuh={4} isi={1} catatan="Satu kotak kuning dari empat. Dua kotak kuning baru sama dengan 1/2." />
          <SusunToken id={idKuis("A", 11)} perintah="Susun dari yang paling kecil." acak={["3 1/2", "7/8", "2 3/4"]} benar={["7/8", "2 3/4", "3 1/2"]} umpan="7/8, lalu 2 3/4, lalu 3 1/2." />
          <KuisBenarSalah id={idKuis("A", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "Penyebut yang lebih besar selalu membuat pecahan lebih besar.", benar: false }, { teks: "2 1/2 lebih besar dari 2 1/4.", benar: true }, { teks: "7/8 lebih besar dari 3 1/2.", benar: false }]} umpan="Hanya pernyataan kedua yang benar. 1/5 lebih kecil daripada 1/2." />
          <KuisCocok id={idKuis("A", 20)} perintah="Pasangkan pertanyaan dengan pecahannya." baris={[{ kiri: "Yang lebih kecil, 1/8 atau 1/3", pilihan: PILIH_BANDING, benar: "1/8" }, { kiri: "Yang lebih besar, 3/4 atau 1/4", pilihan: PILIH_BANDING, benar: "3/4" }, { kiri: "Yang lebih kecil, 2/6 atau 2/3", pilihan: PILIH_BANDING, benar: "2/6" }]} umpan="1/8, 3/4, dan 2/6." />
        </>,
        <>
          <Dialog nama="Bima" anak="Lambang perbandingan memakai pecahan senilai. Penyebut disamakan, pembilang yang dibandingkan." />
          <Lambang judul="Lambang banding" baris={["2/5 = 4/10", "1/5 = 2/10", "2/5 > 1/5"]} />
          <Pilih id={idKuis("A", 10)} pertanyaan="Tanda yang tepat untuk 1/2 ... 1/3 adalah..." visual={<Papan anak="1/2  ?  1/3" />} pilihan={[{ huruf: "A", teks: "<" }, { huruf: "B", teks: ">" }, { huruf: "C", teks: "=" }, { huruf: "D", teks: "tidak bisa dibanding" }]} benar="B" umpan="1/2 = 3/6 dan 1/3 = 2/6. 3 lebih besar dari 2." salah="Samakan penyebutnya dulu." />
          <Pilih id={idKuis("A", 21)} pertanyaan="Tanda yang tepat untuk 3/5 ... 3/7 adalah..." pilihan={[{ huruf: "A", teks: "<" }, { huruf: "B", teks: ">" }, { huruf: "C", teks: "=" }, { huruf: "D", teks: "tidak bisa dibanding" }]} benar="B" umpan="Pembilang sama. Penyebut 5 lebih kecil, jadi 3/5 lebih besar." salah="Penyebut yang lebih besar membuat potongannya lebih kecil." />
          <Pilih id={idKuis("A", 22)} pertanyaan="Tanda yang tepat untuk 4/9 ... 5/9 adalah..." pilihan={[{ huruf: "A", teks: "<" }, { huruf: "B", teks: ">" }, { huruf: "C", teks: "=" }, { huruf: "D", teks: "tidak bisa dibanding" }]} benar="A" umpan="Penyebutnya sama. 4 lebih kecil daripada 5." salah="Kalau penyebut sama, bandingkan pembilangnya." />
        </>,
      ]}
    />
  );
}

function SubbabJumlahSama({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Penjumlahan pecahan, penyebut sama"
      selesaiTeks="Empat halaman penjumlahan selesai."
      grup={[[idKuis("A", 4), idKuis("A", 5)], [idKuis("B", 4), idKuis("B", 5)], [idKuis("A", 23), idKuis("A", 24), idKuis("A", 25)], [idKuis("A", 26), idKuis("A", 27), idKuis("A", 28)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Kalau penyebutnya sama, jumlahkan pembilangnya.", "Penyebut tidak ikut dijumlah.", "Pada campuran, jumlahkan bulat dengan bulat, pecahan dengan pecahan."])} />
          <Dialog nama="Wulan" anak="Roti ini 8 iris. Aku ambil 2 iris. Bima ambil 1 iris." />
          <Dialog nama="Bima" anak="2/8 + 1/8 = 3/8. Penyebutnya tetap 8." />
          <BatangDelapan />
          <Dialog nama="Sari" anak="Ada 10 kancing. Dua untuk Wulan, tiga untuk Bima. 2/10 + 3/10 = 5/10." />
          <Dialog nama="Igil" anak="5/10 senilai dengan 1/2. Pembilang dan penyebut dibagi 5." />
          <Dialog nama="Wulan" anak="Pita merah 2 1/5 m, pita hijau 3 1/5 m. Bulat 2 + 3 = 5. Pecahan 1/5 + 1/5 = 2/5. Panjangnya 5 2/5 m." />
          <Dialog nama="Bima" anak="Cara lain: 11/5 + 16/5 = 27/5. Itu sama dengan 5 2/5." />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Berapa hasil 1/4 + 3/4?" periksa={hasilSatu} petunjuk="Penyebutnya sudah sama." benar="1, atau 4/4." />
          <TulisBebas id={idKuis("A", 5)} judul="Belanja dapur" visual={<Papan anak="1 1/2 kg + 2 1/2 kg" />} pertanyaan="Tulis berat seluruhnya." pesanSalah="Jumlahkan bulatnya, lalu pecahannya." bantuan="1 + 2 = 3. 1/2 + 1/2 = 1. Jadi 4." umpan="4 kg." periksa={hasilEmpat} alias={["4", "empat"]} konteks="1 1/2 + 2 1/2 = 4." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis jumlah mengingat roti, kancing, dan pita." />
          <TabelInfoGrafis
            judul="Infografis: Penyebut sama"
            kepala={["Hitungan", "Cara", "Hasil"]}
            baris={[
              ["2/8 + 1/8", "jumlah pembilang", "3/8"],
              ["2/10 + 3/10", "penyebut tetap", "5/10"],
              ["2 1/5 + 3 1/5", "bulat, lalu pecahan", "5 2/5"],
            ]}
            kaki="Penyebut tidak ikut dijumlah."
          />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Berapa hasil 2/8 + 1/8?" periksa={hasilTigaPerDelapan} petunjuk="Penyebutnya sama-sama 8." benar="3/8." />
          <TulisBebas id={idKuis("B", 5)} judul="Dua pita" visual={<Papan anak="2 1/5 + 3 1/5" />} pertanyaan="Tulis panjang kedua pita." pesanSalah="Jumlahkan 2 dengan 3, lalu 1/5 dengan 1/5." bantuan="5 dan 2/5." umpan="5 2/5. Bentuk biasa: 27/5." periksa={hasilLimaDuaPerLima} alias={["5 2/5", "27/5"]} konteks="2 1/5 + 3 1/5 = 5 2/5." />
        </>,
        <>
          <GambarDapur jenis="tambah" />
          <Irisan judul="Gambar 2/9 ditambah 4/9" penuh={9} isi={6} catatan="Dua kotak lalu empat kotak. Penyebutnya tetap 9." />
          <SusunToken id={idKuis("A", 23)} perintah="Susun dari yang paling kecil." acak={["5/7", "1/7", "3/7"]} benar={["1/7", "3/7", "5/7"]} umpan="1/7, lalu 3/7, lalu 5/7." />
          <KuisBenarSalah id={idKuis("A", 24)} perintah="Pilih benar atau salah." baris={[{ teks: "2/9 + 4/9 = 6/9.", benar: true }, { teks: "2/9 + 4/9 = 6/18.", benar: false }, { teks: "Pada penyebut yang sama, penyebut ikut dijumlah.", benar: false }]} umpan="Pembilang dijumlah. Penyebut tetap." />
          <KuisCocok id={idKuis("A", 25)} perintah="Pasangkan jumlah dengan hasilnya." baris={[{ kiri: "1/6 + 2/6", pilihan: PILIH_SAMA, benar: "3/6" }, { kiri: "3/7 + 2/7", pilihan: PILIH_SAMA, benar: "5/7" }, { kiri: "1/8 + 6/8", pilihan: PILIH_SAMA, benar: "7/8" }]} umpan="3/6, 5/7, dan 7/8." />
        </>,
        <>
          <Dialog nama="Wulan" anak="Lambang penjumlahan ini hanya memakai penyebut yang sudah sama." />
          <Lambang judul="Lambang jumlah" baris={["1/7 + 2/7 = 3/7", "4/9 + 1/9 = 5/9"]} />
          <Pilih id={idKuis("A", 26)} pertanyaan="3/8 + 4/8 = ..." pilihan={[{ huruf: "A", teks: "7/8" }, { huruf: "B", teks: "7/16" }, { huruf: "C", teks: "1/8" }, { huruf: "D", teks: "12/8" }]} benar="A" umpan="Pembilang 3 + 4 = 7. Penyebut tetap 8." salah="Jangan jumlahkan penyebutnya." />
          <Pilih id={idKuis("A", 27)} pertanyaan="4 1/6 + 1 2/6 = ..." pilihan={[{ huruf: "A", teks: "5 3/6" }, { huruf: "B", teks: "5 3/12" }, { huruf: "C", teks: "3 3/6" }, { huruf: "D", teks: "4 3/6" }]} benar="A" umpan="Bulat 4 + 1 = 5. Pecahan 1/6 + 2/6 = 3/6." salah="Jumlahkan bulat dengan bulat, pecahan dengan pecahan." />
          <Pilih id={idKuis("A", 28)} pertanyaan="6/10 + 2/10 = ..." pilihan={[{ huruf: "A", teks: "8/20" }, { huruf: "B", teks: "8/10" }, { huruf: "C", teks: "4/10" }, { huruf: "D", teks: "12/10" }]} benar="B" umpan="6 + 2 = 8. Penyebut tetap 10." salah="Penyebut tidak dijumlah." />
        </>,
      ]}
    />
  );
}

function SubbabJumlahBeda({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Penjumlahan pecahan, penyebut beda"
      selesaiTeks="Empat halaman penyebut beda selesai."
      grup={[[idKuis("A", 6), idKuis("A", 7)], [idKuis("B", 6), idKuis("B", 7)], [idKuis("B", 16), idKuis("B", 17), idKuis("A", 14)], [idKuis("B", 14), idKuis("B", 18), idKuis("B", 19)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Kalau penyebutnya beda, cari KPK dulu.", "Buat pecahan senilai, lalu jumlahkan pembilang."])} />
          <Dialog nama="Sari" anak="1/2 roti ditambah 1/3 roti. KPK 2 dan 3 adalah 6. 1/2 = 3/6. 1/3 = 2/6. Jumlahnya 5/6." />
          <LidiEnam />
          <Dialog nama="Bima" anak="1/3 kertas ditambah 4/6 kertas. 1/3 = 2/6. 2/6 + 4/6 = 6/6, yaitu 1 kertas penuh." />
          <Dialog nama="Wulan" anak="Dari warungku ke warung Bima 1 1/2 km, lalu ke warung Sari 2 1/4 km. Lebar warung Bima 1/200 km." />
          <Dialog nama="Igil" anak="1 1/2 = 300/200. 2 1/4 = 450/200. Ditambah 1/200 menjadi 751/200, yaitu 3 151/200 km." />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Berapa hasil 4/5 + 1/4?" periksa={hasilDuaPuluhSatuPerDuaPuluh} petunjuk="KPK dari 5 dan 4 adalah 20." benar="21/20, atau 1 1/20." />
          <TulisBebas id={idKuis("A", 7)} judul="Dua iris beda" visual={<Papan anak="3/5 + 1/3" />} pertanyaan="Tulis hasilnya." pesanSalah="KPK dari 5 dan 3 adalah 15." bantuan="9/15 + 5/15 = 14/15." umpan="14/15." periksa={hasilEmpatBelasPerLimaBelas} alias={["14/15"]} konteks="3/5 + 1/3 = 14/15." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis ini merangkum dua roti dan jarak warung." />
          <TabelInfoGrafis
            judul="Infografis: Samakan penyebut"
            kepala={["Langkah", "Yang dikerjakan", "Contoh"]}
            baris={[
              ["KPK", "cari kelipatan terdekat", "2 dan 3 bertemu di 6"],
              ["Senilai", "kali pembilang dan penyebut", "1/2 menjadi 3/6"],
              ["Jumlah", "pembilang saja", "penyebut baru tetap"],
            ]}
            kaki="Cari KPK, buat pecahan senilai, lalu jumlahkan pembilang."
          />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Berapa hasil 1/2 + 1/3?" periksa={hasilLimaPerEnam} petunjuk="Ubah keduanya ke penyebut 6." benar="5/6." />
          <TulisBebas id={idKuis("B", 7)} judul="Jarak tiga warung" visual={<Papan anak="1 1/2 + 2 1/4 + 1/200" />} pertanyaan="Tulis jarak seluruhnya." pesanSalah="Samakan ke penyebut 200." bantuan="300/200 + 450/200 + 1/200 = 751/200." umpan="3 151/200 km, atau 751/200 km." periksa={hasilJarak} alias={["3 151/200", "751/200"]} konteks="Jumlah jaraknya 3 151/200." />
        </>,
        <>
          <GambarDapur jenis="beda" />
          <Irisan judul="Gambar penyebut 12" penuh={12} isi={5} catatan="Lima kotak dari dua belas. Ini gambar, bukan hasil soal di bawah." />
          <SusunToken id={idKuis("B", 16)} perintah="Susun dari yang paling kecil." acak={["7/9", "2/9", "4/9"]} benar={["2/9", "4/9", "7/9"]} umpan="2/9, lalu 4/9, lalu 7/9." />
          <KuisBenarSalah id={idKuis("B", 17)} perintah="Pilih benar atau salah." baris={[{ teks: "KPK dari 4 dan 8 adalah 8.", benar: true }, { teks: "1/6 + 1/3 = 2/9.", benar: false }, { teks: "1/5 + 2/5 = 3/5.", benar: true }]} umpan="1/6 + 1/3 = 1/6 + 2/6 = 3/6. KPK 4 dan 8 adalah 8." />
          <KuisCocok id={idKuis("A", 14)} perintah="Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "2/8 + 1/8", pilihan: PASANGAN_JUMLAH, benar: "3/8" }, { kiri: "2 1/5 + 3 1/5", pilihan: PASANGAN_JUMLAH, benar: "5 2/5" }, { kiri: "1/2 + 1/3", pilihan: PASANGAN_JUMLAH, benar: "5/6" }]} umpan="3/8, 5 2/5, dan 5/6." />
        </>,
        <>
          <Dialog nama="Sari" anak="Lambang ini mencontohkan penyebut yang berbeda, lalu disamakan." />
          <Lambang judul="Lambang jumlah beda" baris={["1/2 + 1/4 = 2/4 + 1/4 = 3/4", "KPK(2, 4) = 4"]} />
          <Pilih id={idKuis("B", 14)} pertanyaan="KPK dari 3 dan 6 adalah..." pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "9" }, { huruf: "C", teks: "6" }, { huruf: "D", teks: "18" }]} benar="C" umpan="Kelipatan 3 dan 6 bertemu paling dekat di 6." salah="KPK adalah kelipatan persekutuan yang terkecil, bukan yang terbesar." />
          <Pilih id={idKuis("B", 18)} pertanyaan="1/4 + 1/6 = ..." pilihan={[{ huruf: "A", teks: "5/12" }, { huruf: "B", teks: "2/10" }, { huruf: "C", teks: "1/5" }, { huruf: "D", teks: "2/12" }]} benar="A" umpan="KPK 4 dan 6 adalah 12. 3/12 + 2/12 = 5/12." salah="Jangan jumlahkan penyebutnya. Samakan dulu." />
          <Pilih id={idKuis("B", 19)} pertanyaan="2/5 + 1/2 = ..." pilihan={[{ huruf: "A", teks: "9/10" }, { huruf: "B", teks: "3/7" }, { huruf: "C", teks: "3/10" }, { huruf: "D", teks: "2/5" }]} benar="A" umpan="2/5 = 4/10. 1/2 = 5/10. Jumlah 9/10." salah="KPK 5 dan 2 adalah 10." />
        </>,
      ]}
    />
  );
}

function SubbabSelisih({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Pengurangan pecahan"
      selesaiTeks="Empat halaman pengurangan selesai."
      grup={[[idKuis("A", 8), idKuis("A", 9)], [idKuis("B", 8), idKuis("B", 9)], [idKuis("B", 13), idKuis("B", 11), idKuis("B", 10)], [idKuis("B", 12), idKuis("B", 20), idKuis("B", 21)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Kalau penyebutnya sama, kurangkan pembilangnya.", "Kalau beda, samakan penyebut dulu.", "Pada campuran, bulat dikurang bulat dan pecahan dikurang pecahan."])} />
          <Dialog nama="Bima" anak="Kertas yang harus dilukis 2/3. Yang sudah 1/3. Sisa 2/3 − 1/3 = 1/3." />
          <Dialog nama="Sari" anak="Jalan ke dapur 5 2/3 km. Yang sudah ditempuh 2 1/3 km. Bulat 5 − 2 = 3. Pecahan 2/3 − 1/3 = 1/3. Sisa 3 1/3 km." />
          <Dialog nama="Wulan" anak="Tugas 2/3 kertas, yang sudah 1/2. KPK-nya 6. 2/3 = 4/6. 1/2 = 3/6. Sisa 1/6." />
          <SisaKotak />
          <Dialog nama="Igil" anak="Tali yang perlu 4 1/2 m. Yang ada 2 1/3 m. 27/6 − 14/6 = 13/6, yaitu 2 1/6 m." />
          <Dialog nama="Bima" anak="Cara lain: bulat 4 − 2 = 2. Pecahan 1/2 − 1/3 = 1/6. Jadi 2 1/6." />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Berapa hasil 2/7 − 1/7?" periksa={hasilSatuPerTujuh} petunjuk="Penyebutnya sudah sama." benar="1/7." />
          <TulisBebas id={idKuis("A", 9)} judul="Penyebut beda" visual={<Papan anak="1/3 − 1/5" />} pertanyaan="Tulis hasilnya." pesanSalah="KPK dari 3 dan 5 adalah 15." bantuan="5/15 − 3/15 = 2/15." umpan="2/15." periksa={hasilDuaPerLimaBelas} alias={["2/15"]} konteks="1/3 − 1/5 = 2/15." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis selisih merangkum cara kertas, jalan, dan tali." />
          <TabelInfoGrafis
            judul="Infografis: Selisih pecahan"
            kepala={["Langkah", "Yang dikerjakan", "Catatan"]}
            baris={[
              ["Penyebut sama", "kurangi pembilang", "penyebut tetap"],
              ["Penyebut beda", "samakan dulu", "pakai KPK"],
              ["Campuran", "bulat, lalu pecahan", "pecahan yang kurang diubah"],
            ]}
            kaki="Kurangkan pembilang setelah penyebutnya sama."
          />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Persediaan 2 1/4 kg. Yang dipakai 2 1/5 kg. Berapa sisanya?" periksa={hasilSatuPerDuaPuluh} petunjuk="Bulatnya sama. Samakan pecahan ke penyebut 20." benar="1/20 kg." />
          <TulisBebas id={idKuis("B", 9)} judul="Sisa apel" visual={<Papan anak="8 apel · yang diberikan 6 · lalu 2 lagi" />} pertanyaan="Tulis pecahan sisa apel dari seluruh apel." pesanSalah="6/8 − 2/8." bantuan="Sisanya 4/8, senilai dengan 1/2." umpan="4/8, atau 1/2." periksa={hasilSetengah} alias={["4/8", "1/2"]} konteks="6/8 − 2/8 = 4/8." />
        </>,
        <>
          <GambarDapur jenis="kurang" />
          <Irisan judul="Gambar 5 dari 8, lalu 1 diambil" penuh={8} isi={4} catatan="Empat kotak masih kuning. Gambar ini tidak memakai angka soal di bawah." />
          <SusunToken id={idKuis("B", 13)} perintah="Susun dari yang paling kecil." acak={["1/2", "1/6", "1/3"]} benar={["1/6", "1/3", "1/2"]} umpan="1/6, lalu 1/3, lalu 1/2." />
          <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Pada penjumlahan penyebut sama, penyebut ikut dijumlahkan.", benar: false }, { teks: "1/3 + 4/6 = 1.", benar: true }, { teks: "5 2/3 − 2 1/3 = 3 1/3.", benar: true }]} umpan="Penyebut tidak ikut dijumlah. Dua pernyataan terakhir benar." />
          <KuisCocok id={idKuis("B", 10)} perintah="Pasangkan selisih dengan hasilnya." baris={[{ kiri: "2/3 − 1/3", pilihan: PASANGAN_SELISIH, benar: "1/3" }, { kiri: "5 2/3 − 2 1/3", pilihan: PASANGAN_SELISIH, benar: "3 1/3" }, { kiri: "2/3 − 1/2", pilihan: PASANGAN_SELISIH, benar: "1/6" }]} umpan="1/3, 3 1/3, dan 1/6." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang pengurangan memakai pembilang yang dikurangi. Penyebut tetap setelah disamakan." />
          <Lambang judul="Lambang selisih" baris={["3/5 − 1/5 = 2/5", "4/7 − 2/7 = 2/7"]} />
          <Pilih id={idKuis("B", 12)} pertanyaan="4 1/2 − 2 1/3 = ..." pilihan={[{ huruf: "A", teks: "2 1/6" }, { huruf: "B", teks: "2 1/5" }, { huruf: "C", teks: "6 5/6" }, { huruf: "D", teks: "1 1/6" }]} benar="A" umpan="27/6 − 14/6 = 13/6 = 2 1/6." salah="Samakan ke penyebut 6, lalu kurangkan." />
          <Pilih id={idKuis("B", 20)} pertanyaan="5/8 − 1/8 = ..." pilihan={[{ huruf: "A", teks: "4/8" }, { huruf: "B", teks: "4/16" }, { huruf: "C", teks: "6/8" }, { huruf: "D", teks: "1/8" }]} benar="A" umpan="5 − 1 = 4. Penyebut tetap 8." salah="Jangan kurangkan penyebutnya." />
          <Pilih id={idKuis("B", 21)} pertanyaan="3/4 − 1/2 = ..." pilihan={[{ huruf: "A", teks: "1/4" }, { huruf: "B", teks: "2/2" }, { huruf: "C", teks: "1/2" }, { huruf: "D", teks: "4/6" }]} benar="A" umpan="1/2 = 2/4. 3/4 − 2/4 = 1/4." salah="Samakan ke penyebut 4." />
        </>,
      ]}
    />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB3.kartu[0];
  const [tab, setTab] = useState(0);
  const judulSubbab = ["Bentuk pecahan", "Membandingkan dan mengurutkan pecahan", "Penjumlahan pecahan, penyebut sama", "Penjumlahan pecahan, penyebut beda", "Pengurangan pecahan"];
  useJudulDompetMateri(judulSubbab[tab] ?? judulSubbab[0]);
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍞🦉" judul={kartu.judul} anak="Lima sub-bab di tepi sungai" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <TabSubbab label={["Sub-Bab A", "Sub-Bab B", "Sub-Bab C", "Sub-Bab D", "Sub-Bab E"]} aktif={tab} onPilih={setTab} />
        {tab === 0 ? <SubbabBentuk kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 1 ? <SubbabBanding kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 2 ? <SubbabJumlahSama kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 3 ? <SubbabJumlahBeda kelas={kelas} kelamin={kelamin} /> : null}
        {tab === 4 ? <SubbabSelisih kelas={kelas} kelamin={kelamin} /> : null}
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB3.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍞🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarDapur jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB3} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB3} penutup="Lampu dapur menyala. Igil menempelkan cap roti." bunga="🍞🥧🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB3.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Roti Bulan" : skor >= 6 ? "🍞 Penjaga Irisan" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Pecahanmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru roti." : "Ayo hitung lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarDapur jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Dua kabupaten" visual={<Papan anak="2/5 + 1/5" />} pertanyaan="Tulis jumlah kedua pecahan." pesanSalah="Penyebutnya sudah sama." bantuan="2 + 1 = 3. Penyebut tetap 5." umpan="3/5." periksa={hasilTigaPerLima} alias={["3/5", "tiga per lima"]} konteks="2/5 + 1/5 = 3/5." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. 1/20 + 1/6 = ..." pilihan={[{ huruf: "A", teks: "2/26" }, { huruf: "B", teks: "13/60" }, { huruf: "C", teks: "1/26" }, { huruf: "D", teks: "2/20" }]} benar="B" umpan="1/20 = 3/60. 1/6 = 10/60. Jumlah 13/60." salah="Jangan jumlahkan penyebutnya. KPK 20 dan 6 adalah 60." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Berapa hasil 3/10 − 1/8?" periksa={hasilTujuhPerEmpatPuluh} petunjuk="KPK dari 10 dan 8 adalah 40." benar="7/40." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. 1 1/8 − 1/8 = ..." pilihan={[{ huruf: "A", teks: "1/8" }, { huruf: "B", teks: "2/8" }, { huruf: "C", teks: "1" }, { huruf: "D", teks: "1 2/8" }]} benar="C" umpan="9/8 − 1/8 = 8/8 = 1." salah="Penyebutnya sama. Kurangkan pembilangnya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "4/7 + 2/7", pilihan: PASANGAN_UJI, benar: "6/7" }, { kiri: "6 − 3 1/8", pilihan: PASANGAN_UJI, benar: "2 7/8" }, { kiri: "2 1/5 + 1 5/8", pilihan: PASANGAN_UJI, benar: "3 33/40" }]} umpan="6/7, 2 7/8, dan 3 33/40." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Sisa campuran" visual={<Papan anak="2 1/3 − 1 5/6" />} pertanyaan="Tulis hasilnya." pesanSalah="Ubah keduanya ke penyebut 6." bantuan="14/6 − 11/6 = 3/6 = 1/2." umpan="1/2." periksa={hasilSetengah} alias={["1/2", "setengah"]} konteks="2 1/3 − 1 5/6 = 1/2." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Deret 2/9 – 4/9 – 6/9 – ⬜. Berikutnya..." visual={<Papan anak="2/9 · 4/9 · 6/9 · ⬜" />} pilihan={[{ huruf: "A", teks: "7/9" }, { huruf: "B", teks: "8/9" }, { huruf: "C", teks: "9/9" }, { huruf: "D", teks: "3/9" }]} benar="B" umpan="Pembilang naik 2. 6 + 2 = 8. Jadi 8/9." salah="Lihat selisih pembilang. Penyebut tetap 9." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. 1/4 + 1 1/3 = ..." pilihan={[{ huruf: "A", teks: "1 5/6" }, { huruf: "B", teks: "1 7/12" }, { huruf: "C", teks: "1 2/7" }, { huruf: "D", teks: "2 1/12" }]} benar="B" umpan="1/4 = 3/12. 1 1/3 = 16/12. Jumlah 19/12 = 1 7/12." salah="Samakan ke penyebut 12." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Berapa hasil 1 1/8 − 1/2?" periksa={hasilLimaPerDelapan} petunjuk="1/2 = 4/8. Ubah 1 1/8 menjadi 9/8." benar="5/8." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. KPK dari 4 dan 5 adalah..." pilihan={[{ huruf: "A", teks: "9" }, { huruf: "B", teks: "1" }, { huruf: "C", teks: "20" }, { huruf: "D", teks: "4" }]} benar="C" umpan="Kelipatan 4 dan 5 bertemu di 20. 1 adalah FPB-nya." salah="KPK lebih besar daripada kedua bilangan itu, kecuali salah satunya kelipatan yang lain." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab3({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarDapur jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Pembilang di atas, penyebut di bawah.",
          "Samakan penyebut sebelum menjumlah atau mengurang.",
          "Pada campuran, bulat dihitung sendiri dan pecahan dihitung sendiri.",
        ])}
        poin={[
          "1/2 berarti satu bagian dari dua. Pecahan campuran menaruh bilangan bulat di depan.",
          "2 3/4 = 11/4 = 22/8. 3 1/2 = 7/2 = 28/8. Urutan dari yang kecil: 7/8, 2 3/4, 3 1/2.",
          "Pita dari yang terpendek: 2 1/4, 2 2/5, 2 1/2.",
          "Penyebut sama: jumlahkan pembilang. 2/8 + 1/8 = 3/8. 2 1/5 + 3 1/5 = 5 2/5.",
          "Penyebut beda: cari KPK. 1/2 + 1/3 = 5/6. Jarak warung 3 151/200 km.",
          "2/3 − 1/3 = 1/3. 5 2/3 − 2 1/3 = 3 1/3 km.",
          "2/3 − 1/2 = 1/6. 4 1/2 − 2 1/3 = 2 1/6. Sisa 2 1/4 − 2 1/5 = 1/20.",
          "5/10 = 1/2. Pecahan senilai didapat dengan kali atau bagi pembilang dan penyebut dengan bilangan yang sama.",
        ]}
        penutup="Samakan penyebut. Jumlahkan atau kurangkan pembilang. Penyebut tetap."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
