"use client";

import GambarCerita from "@/components/GambarCerita";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import PetaContoh from "@/components/PetaContoh";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB2, TEMA_MTK5_BAB2 } from "@/lib/misi-mtk-5-bab2";
import { MODUL_MTK5_BAB2 } from "@/lib/modul-resmi-mtk-5-bab2";
import {
  duaBelas,
  duaPuluhEmpat,
  empat,
  empatPuluh,
  empatPuluhDua,
  empatPuluhLima,
  enam,
  enamPuluh,
  faktorDuaPuluh,
  faktorDuaPuluhDelapan,
  faktorEnamBelas,
  faktorLimaBelas,
  kelipatanEnam,
  kelipatanSebelas,
  lima,
  primaEmpatDelapan,
  primaPertama,
  primaSembilanEnam,
  primaTigaEnam,
  sembilanBukanPrima,
  tanggalDuaPuluhEmpat,
  tiga,
  tigaPuluhEnam,
  tigaPuluhLima,
} from "@/lib/nilai-mtk-5-bab2";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB2.id;

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
  Laras: "border-teal-300 bg-teal-50",
  Dimas: "border-orange-300 bg-orange-50",
  Sena: "border-rose-300 bg-rose-50",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Laras: "👧",
  Dimas: "👦",
  Sena: "👧",
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

const GAMBAR_BUKIT = {
  tepuk: { src: "/doodle-mtk/mtk-5-bab2-tepuk.jpg", alt: "Laras, Dimas, dan Sena bertepuk di bukit senja. Igil berdiri di depan. Dua layangan di langit." },
  jadwal: { src: "/doodle-mtk/mtk-5-bab2-jadwal.jpg", alt: "Dua layangan bertemu di langit senja. Igil menunjuk papan kosong." },
  pita: { src: "/doodle-mtk/mtk-5-bab2-pita.jpg", alt: "Pita panjang di meja bengkel layangan, digunting menjadi bagian sama. Igil di atas gulungan." },
  biji: { src: "/doodle-mtk/mtk-5-bab2-biji.jpg", alt: "Papan congklak berisi biji dua warna di bukit senja, di samping gulungan pita." },
  saring: { src: "/doodle-mtk/mtk-5-bab2-saring.jpg", alt: "Papan dengan pohon lingkaran kosong di bukit. Igil memegang kapur." },
  pos: { src: "/doodle-mtk/mtk-5-bab2-pos.jpg", alt: "Batu loncatan menuju puncak bukit. Igil berdiri di batu pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab2-meja.jpg", alt: "Meja kecil di bukit dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab2-kartu.jpg", alt: "Laras, Dimas, Sena, dan Igil memegang kartu kosong di bukit senja." },
} as const;

function GambarBukit({ jenis }: { jenis: keyof typeof GAMBAR_BUKIT }) {
  const gambar = GAMBAR_BUKIT[jenis];
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
  jenis: "tepuk" | "jadwal" | "pita" | "biji" | "saring" | "pos" | "meja" | "kartu";
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarBukit jenis={jenis} />
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

function PapanKelipatan() {
  const [langkah, setLangkah] = useState(4);
  const [pilih, setPilih] = useState<number | null>(null);
  const cocok = pilih !== null && pilih % langkah === 0;
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Papan tepuk kelipatan</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {[3, 4, 6].map((angka) => (
          <button key={angka} type="button" onClick={() => { setLangkah(angka); setPilih(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${langkah === angka ? "bg-[#1C01A5] text-white" : "bg-sky-100 text-[#1C01A5]"}`}>Kelipatan {angka}</button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1">
        {Array.from({ length: 24 }, (_, indeks) => indeks + 1).map((angka) => {
          const nyala = angka % langkah === 0;
          return (
            <button key={angka} type="button" onClick={() => setPilih(angka)} className={`rounded-lg py-2 text-sm font-black ${nyala ? "bg-amber-300 text-[#1C01A5]" : "bg-slate-100 text-slate-600"} ${pilih === angka ? "ring-2 ring-[#1C01A5]" : ""}`}>{angka}</button>
          );
        })}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        {pilih === null ? `Kotak kuning adalah kelipatan ${langkah}. Nol tidak ikut.` : cocok ? `${pilih} adalah kelipatan ${langkah}, karena ${pilih / langkah} × ${langkah} = ${pilih}.` : `${pilih} bukan kelipatan ${langkah}. Ada sisa kalau dibagi.`}
      </p>
    </div>
  );
}

function DuaLompat() {
  const empat = [4, 8, 12, 16, 20, 24];
  const enam = [6, 12, 18, 24];
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-black text-[#1C01A5]">Kelipatan yang sama</p>
      <p className="mt-2 text-sm font-bold text-slate-700">Laras, lompat 4: {empat.map((angka) => <span key={angka} className={`mx-1 inline-block rounded-full px-2 py-1 ${angka === 12 || angka === 24 ? "bg-emerald-500 text-white" : "bg-white"}`}>{angka}</span>)}</p>
      <p className="mt-2 text-sm font-bold text-slate-700">Dimas, lompat 6: {enam.map((angka) => <span key={angka} className={`mx-1 inline-block rounded-full px-2 py-1 ${angka === 12 || angka === 24 ? "bg-emerald-500 text-white" : "bg-white"}`}>{angka}</span>)}</p>
      <p className="mt-2 text-sm font-semibold text-emerald-800">Yang hijau ada di kedua daftar. Yang paling kecil adalah KPK, yaitu 12.</p>
    </div>
  );
}

function KalenderTemu() {
  return (
    <div className="rounded-2xl border-2 border-teal-200 bg-white p-3">
      <p className="text-center text-sm font-black text-[#1C01A5]">September</p>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {Array.from({ length: 30 }, (_, indeks) => indeks + 1).map((hari) => {
          const temu = hari === 5 || hari === 17;
          return <span key={hari} className={`rounded-lg py-2 text-center text-sm font-black ${temu ? "bg-[#1C01A5] text-white" : "bg-slate-100 text-slate-700"}`}>{hari}</span>;
        })}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Tanggal 5 mereka bersama. 5 + 12 = 17. Layangan berikutnya naik tanggal 17 September.</p>
    </div>
  );
}

function PitaFaktor() {
  const [bagi, setBagi] = useState(3);
  const habis = 12 % bagi === 0;
  const potong = habis ? 12 / bagi : 0;
  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Pita 12 petak</p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 12 }, (_, indeks) => {
          const warna = habis ? ["bg-rose-400", "bg-amber-300", "bg-teal-400", "bg-sky-400"][Math.floor(indeks / bagi) % 4] : "bg-slate-300";
          return <span key={indeks} className={`h-8 flex-1 rounded ${warna}`} />;
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 12].map((angka) => (
          <button key={angka} type="button" onClick={() => setBagi(angka)} className={`rounded-full px-3 py-1 text-sm font-black ${bagi === angka ? "bg-[#1C01A5] text-white" : "bg-rose-100 text-[#1C01A5]"}`}>Bagi {angka}</button>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{habis ? `Habis. ${potong} potong, tiap potong ${bagi} petak. ${bagi} adalah faktor 12.` : `Ada sisa. ${bagi} bukan faktor 12.`}</p>
    </div>
  );
}

function LubangBiji() {
  const faktor12 = new Set([1, 2, 3, 4, 6, 12]);
  const faktor18 = new Set([1, 2, 3, 6, 9, 18]);
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-black text-[#1C01A5]">Congklak faktor 12 dan 18</p>
      <div className="mt-2 grid grid-cols-6 gap-2">
        {Array.from({ length: 18 }, (_, indeks) => indeks + 1).map((angka) => {
          const merah = faktor12.has(angka);
          const putih = faktor18.has(angka);
          const kelas = merah && putih ? "bg-emerald-500 text-white" : merah ? "bg-rose-400 text-white" : putih ? "bg-sky-400 text-white" : "bg-white text-slate-500";
          return <span key={angka} className={`rounded-full py-2 text-center text-sm font-black ${kelas}`}>{angka}</span>;
        })}
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-700">Merah faktor 12. Biru faktor 18. Hijau ada di keduanya: 1, 2, 3, 6. Yang terbesar, 6, adalah FPB.</p>
    </div>
  );
}

const LANGKAH_SARING = [
  "Belum disaring. Semua bilangan masih ada.",
  "Coret 1. Satu bukan bilangan prima.",
  "Ambil 2. Coret kelipatan 2 yang berikutnya.",
  "Ambil 3. Coret kelipatan 3 yang berikutnya.",
  "Ambil 5. Coret kelipatan 5 yang berikutnya.",
  "Ambil 7. Kelipatan 7 yang lain sudah hilang. Yang tersisa adalah prima.",
];

function saring(angka: number, langkah: number): boolean {
  if (langkah >= 1 && angka === 1) return true;
  if (langkah >= 2 && angka % 2 === 0 && angka !== 2) return true;
  if (langkah >= 3 && angka % 3 === 0 && angka !== 3) return true;
  if (langkah >= 4 && angka % 5 === 0 && angka !== 5) return true;
  if (langkah >= 5 && angka % 7 === 0 && angka !== 7) return true;
  return false;
}

function SaringanPrima() {
  const [langkah, setLangkah] = useState(0);
  const sisa = Array.from({ length: 30 }, (_, indeks) => indeks + 1).filter((angka) => !saring(angka, langkah) && !(langkah >= 1 && angka === 1));
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Saringan Eratosthenes, 1 sampai 30</p>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {Array.from({ length: 30 }, (_, indeks) => indeks + 1).map((angka) => {
          const hilang = saring(angka, langkah);
          return <span key={angka} className={`rounded-lg py-2 text-center text-sm font-black ${hilang ? "bg-slate-200 text-slate-400 line-through" : "bg-violet-100 text-[#1C01A5]"}`}>{angka}</span>;
        })}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{LANGKAH_SARING[langkah]}</p>
      {langkah === 5 ? <p className="mt-1 text-sm font-bold text-violet-800">Prima sampai 30: {sisa.join(", ")}. Ada {sisa.length} bilangan.</p> : null}
      <button type="button" onClick={() => setLangkah((lama) => (lama >= 5 ? 0 : lama + 1))} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white">{langkah >= 5 ? "Ulangi saringan" : "Saring berikutnya"}</button>
    </div>
  );
}

function PohonEnamPuluh() {
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center">
      <p className="text-sm font-black text-[#1C01A5]">Pohon faktor 60</p>
      <p className="mt-2 text-lg font-black text-[#1C01A5]">60</p>
      <p className="text-sm font-bold text-slate-700">6 × 10</p>
      <p className="text-sm font-bold text-slate-700">2 × 3 &nbsp;&nbsp; 2 × 5</p>
      <p className="mt-2 text-sm font-black text-emerald-800">60 = 2 × 2 × 3 × 5</p>
    </div>
  );
}

function TanggaBagi() {
  const baris = [
    ["2", "36", "48", "keduanya", "18 dan 24"],
    ["2", "18", "24", "keduanya", "9 dan 12"],
    ["2", "9", "12", "hanya 12", "9 turun utuh, 6"],
    ["3", "9", "6", "keduanya", "3 dan 2"],
    ["3", "3", "2", "hanya 3", "1 dan 2"],
    ["2", "1", "2", "hanya 2", "1 dan 1"],
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead className="bg-[#1C01A5] text-white">
          <tr>
            <th className="px-2 py-2">Pembagi</th>
            <th className="px-2 py-2">36</th>
            <th className="px-2 py-2">48</th>
            <th className="px-2 py-2">Siapa yang habis?</th>
          </tr>
        </thead>
        <tbody>
          {baris.map((item) => (
            <tr key={`${item[0]}-${item[1]}-${item[2]}`} className={item[3] === "keduanya" ? "bg-emerald-50 font-bold" : "font-semibold"}>
              <td className="px-2 py-2">{item[0]}</td>
              <td className="px-2 py-2">{item[1]}</td>
              <td className="px-2 py-2">{item[2]}</td>
              <td className="px-2 py-2">{item[3]}. Hasilnya {item[4]}.</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-sm font-semibold text-slate-700">KPK = 2 × 2 × 2 × 3 × 3 × 2 = 144. FPB hanya baris hijau: 2 × 2 × 3 = 12.</p>
    </div>
  );
}

const PASANGAN_A = ["12", "4", "2"];
const PASANGAN_B = ["10", "20", "2 × 3 × 5"];
const PASANGAN_D = ["56", "6", "2 × 3 × 7"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB2.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁👧👦🦉" judul="A. Bukit Layangan Senja" anak="Laras, Dimas, Sena, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar
        butir={[
          "Menentukan kelipatan suatu bilangan.",
          "Menemukan kelipatan persekutuan dan KPK.",
          "Menentukan faktor dan pasangan faktor.",
          "Menemukan faktor persekutuan dan FPB.",
          "Memakai KPK dan FPB pada jadwal dan pembagian.",
          "Mengenal bilangan prima dan faktorisasi prima.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan judul="Sub-bab 1 — Kelipatan" jenis="tepuk" kelas={kelas} kelamin={kelamin} penjelasan={["Kelipatan adalah lompatan yang sama, mulai dari bilangan itu sendiri.", "Nol tidak masuk daftar kelipatan."]}>
          <Dialog nama="Laras" anak="Ekor layanganku bertambah 4 setiap lompatan: 4, 8, 12, 16, 20." />
          <Dialog nama="Dimas" anak="Kenapa tidak mulai dari 0? 0 kali 4 kan 0." />
          <Dialog nama="Sena" anak="Di daftar tepuk, kita mulai dari 4. Nol tidak ditepuk." />
          <Dialog nama="Igil" anak="Benar. 0 kali 4 sama dengan 0, tetapi 0 bukan kelipatan 4." />
          <Papan anak="Kelipatan 4: 4, 8, 12, 16, 20, ..." />
          <PapanKelipatan />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Sebutkan empat kelipatan 6 yang pertama." periksa={kelipatanEnam} petunjuk="Mulai dari 6, lalu lompat 6 sebanyak tiga kali lagi." benar="6, 12, 18, dan 24." />
          <TulisBebas id={idKuis("A", 1)} judul="Lompatan kedelapan" visual={<Papan anak="8 · 16 · 24 · ..." />} pertanyaan="Tulis kelipatan 8 yang kelima." pesanSalah="Lompat 8 sebanyak lima kali, mulai dari 8." bantuan="8, 16, 24, 32, lalu 40." umpan="40." periksa={empatPuluh} alias={["40", "empat puluh"]} konteks="Kelipatan 8 yang kelima adalah 40." />
          <Dialog nama="Igil" anak="Kelipatan 5 melompat lima: 5, 10, 15, 20. Cara yang sama dipakai untuk 8 dan 9." />
          <Dialog nama="Laras" anak="Bilangan kelipatan 3 didapat dari 1 kali 3, 2 kali 3, 3 kali 3, dan seterusnya." />
        </Adegan>

        <Adegan judul="Sub-bab 2 — Kelipatan persekutuan dan KPK" jenis="jadwal" kelas={kelas} kelamin={kelamin} penjelasan={["Tulis dua daftar kelipatan. Tandai yang sama.", "Yang paling kecil adalah KPK, waktu pertemuan terdekat."]}>
          <Dialog nama="Laras" anak="Aku menaikkan layangan setiap 4 hari." />
          <Dialog nama="Dimas" anak="Aku setiap 6 hari. Hari ini, 5 September, kita bersama." />
          <Dialog nama="Sena" anak="Daftar 4 dan daftar 6 sama-sama punya 12 dan 24." />
          <Dialog nama="Igil" anak="Itu kelipatan persekutuan. Yang terkecil, 12, adalah KPK." />
          <DuaLompat />
          <KalenderTemu />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Berapa KPK dari 5 dan 9?" periksa={empatPuluhLima} petunjuk="Tulis kelipatan 5 dan kelipatan 9 sampai ketemu yang sama dan paling kecil." benar="Empat puluh lima." />
          <TulisBebas id={idKuis("A", 3)} judul="Dua lompatan" visual={<Papan anak="KPK 6 dan 8" />} pertanyaan="Tulis KPK dari 6 dan 8." pesanSalah="Cari bilangan yang sama di kedua daftar, lalu ambil yang terkecil." bantuan="Kelipatan 6 dan 8 bertemu di 24." umpan="24." periksa={duaPuluhEmpat} alias={["24", "dua puluh empat"]} konteks="KPK 6 dan 8 adalah 24." />
          <Dialog nama="Igil" anak="Untuk tiga bilangan, caranya sama. Kelipatan 2, 3, dan 4 sama-sama bertemu di 12. KPK-nya 12." />
          <Dialog nama="Sena" anak="Jadwal bersama selalu memakai KPK, bukan jumlah dua bilangan." />
        </Adegan>

        <Adegan judul="Sub-bab 3 — Faktor" jenis="pita" kelas={kelas} kelamin={kelamin} penjelasan={["Faktor membagi habis. Tidak boleh ada sisa.", "Faktor berpasangan. Kali dua pasangannya kembali ke bilangan semula."]}>
          <Dialog nama="Sena" anak="Pita ini 12 petak. Aku potong sama panjang, tanpa sisa." />
          <Dialog nama="Laras" anak="Kalau tiap potong 3 petak, dapat 4 potong. 3 kali 4 sama dengan 12." />
          <Dialog nama="Dimas" anak="Kalau dipaksa 5 petak, ada sisa. 5 bukan faktor 12." />
          <Dialog nama="Igil" anak="Faktor 12 adalah 1, 2, 3, 4, 6, dan 12. Pasangannya 1×12, 2×6, dan 3×4." />
          <PitaFaktor />
          <Papan anak="1 × 12    2 × 6    3 × 4" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Sebutkan semua faktor 16, dari yang kecil." periksa={faktorEnamBelas} petunjuk="Cari bilangan yang membagi 16 tanpa sisa." benar="1, 2, 4, 8, dan 16." />
          <TulisBebas id={idKuis("A", 5)} judul="Faktor dua puluh" visual={<Papan anak="Faktor dari 20" />} pertanyaan="Tulis semua faktor 20." pesanSalah="Yang membagi 20 tanpa sisa, urut dari yang kecil." bantuan="1, 2, 4, 5, 10, dan 20." umpan="1, 2, 4, 5, 10, 20." periksa={faktorDuaPuluh} alias={["1", "2", "4", "5", "10", "20"]} konteks="Faktor 20 adalah 1, 2, 4, 5, 10, dan 20." />
          <Dialog nama="Igil" anak="Faktor 18 berpasangan: 1 dengan 18, 2 dengan 9, 3 dengan 6. Jadi faktornya 1, 2, 3, 6, 9, dan 18." />
          <Dialog nama="Sena" anak="Cara pasangan ini juga dipakai untuk 24, 36, 54, 72, dan 96." />
        </Adegan>

        <Adegan judul="Sub-bab 4 — Faktor persekutuan dan FPB" jenis="biji" kelas={kelas} kelamin={kelamin} penjelasan={["Faktor yang dimiliki kedua bilangan disebut faktor persekutuan.", "Yang paling besar adalah FPB. Itu juga banyak kelompok paling banyak."]}>
          <Dialog nama="Dimas" anak="Di congklak, biji merah untuk faktor 12. Biji biru untuk faktor 18." />
          <Dialog nama="Laras" anak="Lubang yang berisi dua warna: 1, 2, 3, dan 6." />
          <Dialog nama="Sena" anak="Yang terbesar 6. FPB 12 dan 18 adalah 6." />
          <Dialog nama="Igil" anak="Pita merah 24 dan pita putih 18. Ikat paling banyak ada 6. Tiap ikat: 4 merah dan 3 putih." />
          <LubangBiji />
          <Papan anak="24 ÷ 6 = 4 merah    18 ÷ 6 = 3 putih" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Berapa FPB dari 8 dan 20?" periksa={empat} petunjuk="Cari faktor yang sama, lalu ambil yang terbesar." benar="Empat." />
          <TulisBebas id={idKuis("A", 7)} judul="Dua pita lain" visual={<Papan anak="FPB 12 dan 42" />} pertanyaan="Tulis FPB dari 12 dan 42." pesanSalah="Bandingkan faktor keduanya." bantuan="Faktor yang sama: 1, 2, 3, dan 6. Yang terbesar 6." umpan="6." periksa={enam} alias={["6", "enam"]} konteks="FPB 12 dan 42 adalah 6." />
          <Dialog nama="Igil" anak="FPB 6 dan 12 juga 6. FPB 12 dan 28 adalah 4. Kalau tidak ada prima yang berpasangan, seperti 15 dan 28, FPB-nya 1." />
          <Dialog nama="Laras" anak="Membagi barang jadi kelompok sama rata memakai FPB, bukan KPK." />
        </Adegan>

        <Adegan judul="Sub-bab 5 — Prima, pohon faktor, dan tangga bagi" jenis="saring" kelas={kelas} kelamin={kelamin} penjelasan={["Bilangan prima hanya dibagi 1 dan dirinya. Satu bukan prima.", "Pohon faktor dan tangga bagi membantu mencari KPK dan FPB."]}>
          <Dialog nama="Sena" anak="Prima hanya punya dua faktor: 1 dan bilangan itu sendiri." />
          <Dialog nama="Dimas" anak="Dua adalah prima terkecil. Tiga, lima, dan tujuh juga." />
          <Dialog nama="Laras" anak="Eratosthenes menyaring prima dengan mencoret kelipatan." />
          <Dialog nama="Igil" anak="Coret 1 dulu. Lalu coret kelipatan 2, 3, 5, 7, dan seterusnya. Bilangan yang diambil sendiri tidak dicoret." />
          <SaringanPrima />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Apakah 9 termasuk bilangan prima? Jawab ya atau bukan, lalu beri alasan singkat." periksa={sembilanBukanPrima} petunjuk="Coba bagi 9 dengan 3." benar="Bukan. 9 = 3 × 3." />
          <TulisBebas id={idKuis("A", 9)} judul="Pohon 36" visual={<Papan anak="36 = ⬜ × ⬜ × ⬜ × ⬜" />} pertanyaan="Tulis faktorisasi prima 36." pesanSalah="Urai sampai semuanya prima." bantuan="36 = 2 × 2 × 3 × 3." umpan="2 × 2 × 3 × 3." periksa={primaTigaEnam} alias={["2", "2", "3", "3"]} konteks="36 = 2 × 2 × 3 × 3." />
          <PohonEnamPuluh />
          <Dialog nama="Igil" anak="12 = 2 × 2 × 3. 196 = 2 × 2 × 7 × 7. 300 = 2 × 2 × 3 × 5 × 5. Pohon 270 boleh dimulai dari 2 × 135 atau dari 10 × 27, asal ujungnya prima: 2 × 3 × 3 × 3 × 5." />
          <Dialog nama="Sena" anak="72 = 2 × 2 × 2 × 3 × 3. 150 = 2 × 3 × 5 × 5. Prima yang berpasangan, 2 dan 3, dikali sekali: FPB = 6." />
          <Dialog nama="Dimas" anak="KPK menulis pasangan itu sekali, lalu semua yang tidak berpasangan: 2 × 3 × 2 × 2 × 3 × 5 × 5 = 1.800." />
          <TanggaBagi />
          <Dialog nama="Igil" anak="Di tangga, semua pembagi dikalikan untuk KPK. Hanya pembagi yang membagi semua bilangan dikalikan untuk FPB." />
        </Adegan>

        <Pilih id={idKuis("A", 10)} pertanyaan="Kelipatan 8 yang keempat adalah..." visual={<Papan anak="8 · 16 · 24 · ⬜" />} pilihan={[{ huruf: "A", teks: "24" }, { huruf: "B", teks: "32" }, { huruf: "C", teks: "40" }, { huruf: "D", teks: "16" }]} benar="B" umpan="8, 16, 24, lalu 32." salah="Mulai dari 8, lompat empat kali." />
        <KuisCocok id={idKuis("A", 11)} perintah="Pasangkan soal dengan jawabannya." baris={[{ kiri: "KPK 4 dan 6", pilihan: PASANGAN_A, benar: "12" }, { kiri: "Pasangan faktor 3 pada 12", pilihan: PASANGAN_A, benar: "4" }, { kiri: "Bilangan prima terkecil", pilihan: PASANGAN_A, benar: "2" }]} umpan="12, 4, dan 2." />
        <SusunToken id={idKuis("A", 12)} perintah="Susun kelipatan 6 ini dari yang paling kecil." acak={["18", "6", "24", "12"]} benar={["6", "12", "18", "24"]} umpan="6, 12, 18, 24." />
        <KuisBenarSalah id={idKuis("A", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "0 termasuk kelipatan 5.", benar: false }, { teks: "1 termasuk bilangan prima.", benar: false }, { teks: "FPB 9 dan 15 adalah 3.", benar: true }]} umpan="Dua pernyataan pertama salah. FPB 9 dan 15 memang 3." />
        <Pilih id={idKuis("A", 14)} pertanyaan="Laras setiap 4 hari, Dimas setiap 6 hari. Mereka bersama tanggal 5 September. Kapan mereka bersama lagi?" visual={<Papan anak="5 September + KPK(4, 6)" />} pilihan={[{ huruf: "A", teks: "11 September" }, { huruf: "B", teks: "17 September" }, { huruf: "C", teks: "9 September" }, { huruf: "D", teks: "24 September" }]} benar="B" umpan="KPK-nya 12. 5 + 12 = 17 September." salah="Tambahkan KPK pada tanggal 5, jangan menambahkan 4 atau 6 saja." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB2.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🦉" judul="B. Peta KPK dan FPB" anak="Lima peta hitung" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan judul="Peta kelipatan" jenis="tepuk" kelas={kelas} kelamin={kelamin} penjelasan={["Kelipatan didapat dari kali 1, kali 2, kali 3, dan seterusnya.", "Nol tidak ditulis di daftar."]}>
          <PetaContoh pusat="Lompat sama" cabang={[{ ikon: "🦘", judul: "Mulai", isi: "dari bilangannya" }, { ikon: "3️⃣", judul: "Contoh 3", isi: "3, 6, 9, 12" }, { ikon: "🚫", judul: "Bukan", isi: "0 tidak ikut" }]} kolom={["Bilangan", "Empat pertama"]} baris={[["3", "3 · 6 · 9 · 12"], ["4", "4 · 8 · 12 · 16"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Sebutkan empat kelipatan 11 yang pertama." periksa={kelipatanSebelas} petunjuk="Mulai dari 11, lalu tambah 11." benar="11, 22, 33, dan 44." />
          <TulisBebas id={idKuis("B", 1)} judul="Lompatan kesembilan" visual={<Papan anak="9 · 18 · 27 · ⬜" />} pertanyaan="Tulis kelipatan 9 yang keempat." pesanSalah="Lompat 9 sebanyak empat kali." bantuan="9, 18, 27, lalu 36." umpan="36." periksa={tigaPuluhEnam} alias={["36", "tiga puluh enam"]} konteks="Kelipatan 9 yang keempat adalah 36." />
        </Adegan>

        <Adegan judul="Peta KPK" jenis="jadwal" kelas={kelas} kelamin={kelamin} penjelasan={["Tandai bilangan yang muncul di setiap daftar.", "KPK adalah yang paling kecil di antara tanda itu."]}>
          <PetaContoh pusat="KPK 4 dan 6 = 12" cabang={[{ ikon: "4️⃣", judul: "Daftar 4", isi: "4, 8, 12, 16" }, { ikon: "6️⃣", judul: "Daftar 6", isi: "6, 12, 18, 24" }, { ikon: "📅", judul: "Jadwal", isi: "tambah KPK pada hari ini" }]} kolom={["Langkah", "Yang dilakukan"]} baris={[["1", "Tulis kelipatan"], ["2", "Tandai yang sama"], ["3", "Ambil yang terkecil"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Berapa KPK dari 3, 4, dan 5?" periksa={enamPuluh} petunjuk="Cari bilangan yang ada di ketiga daftar kelipatan." benar="Enam puluh." />
          <TulisBebas id={idKuis("B", 3)} judul="Juli di bukit" visual={<Papan anak="Bersama 14 Juli. Laras tiap 5 hari. Dimas tiap 2 hari." />} pertanyaan="Tulis tanggal mereka bersama lagi." pesanSalah="Cari KPK 5 dan 2, lalu tambahkan pada tanggal 14." bantuan="KPK 5 dan 2 adalah 10. 14 + 10 = 24." umpan="24 Juli." periksa={tanggalDuaPuluhEmpat} alias={["24", "dua puluh empat"]} konteks="Mereka bersama lagi tanggal 24 Juli." />
        </Adegan>

        <Adegan judul="Peta faktor" jenis="pita" kelas={kelas} kelamin={kelamin} penjelasan={["Dua faktor yang dikalikan menghasilkan bilangan semula adalah pasangan.", "Tuliskan setiap bilangan sekali, dari yang kecil."]}>
          <PetaContoh pusat="Pasangan 18" cabang={[{ ikon: "1️⃣", judul: "1 dan 18", isi: "1 × 18 = 18" }, { ikon: "2️⃣", judul: "2 dan 9", isi: "2 × 9 = 18" }, { ikon: "3️⃣", judul: "3 dan 6", isi: "3 × 6 = 18" }]} kolom={["Kecil", "Pasangan"]} baris={[["1", "18"], ["2", "9"], ["3", "6"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Sebutkan semua faktor 15." periksa={faktorLimaBelas} petunjuk="Cari yang membagi 15 tanpa sisa." benar="1, 3, 5, dan 15." />
          <TulisBebas id={idKuis("B", 5)} judul="Faktor 28" visual={<Papan anak="Faktor dari 28" />} pertanyaan="Tulis semua faktor 28." pesanSalah="Urutkan dari yang kecil. Jangan ada yang sisa." bantuan="1, 2, 4, 7, 14, dan 28." umpan="1, 2, 4, 7, 14, 28." periksa={faktorDuaPuluhDelapan} alias={["1", "2", "4", "7", "14", "28"]} konteks="Faktor 28 adalah 1, 2, 4, 7, 14, dan 28." />
        </Adegan>

        <Adegan judul="Peta FPB" jenis="biji" kelas={kelas} kelamin={kelamin} penjelasan={["Ambil faktor yang muncul di semua bilangan.", "FPB adalah yang terbesar. Banyak vas atau ikat paling banyak sama dengan FPB."]}>
          <PetaContoh pusat="FPB 12 dan 18 = 6" cabang={[{ ikon: "🔴", judul: "Sama", isi: "1, 2, 3, 6" }, { ikon: "🎀", judul: "24 dan 18", isi: "6 ikat" }, { ikon: "1️⃣", judul: "Tidak pasangan", isi: "FPB bisa 1" }]} kolom={["Ikat", "Isi"]} baris={[["6 ikat", "paling banyak"], ["Merah", "4 tiap ikat"], ["Putih", "3 tiap ikat"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Berapa FPB dari 15 dan 35?" periksa={lima} petunjuk="Lihat faktor yang sama, lalu pilih yang terbesar." benar="Lima." />
          <TulisBebas id={idKuis("B", 7)} judul="Paket layangan" visual={<Papan anak="36 gulungan · 48 kertas · 24 stiker" />} pertanyaan="Tulis banyak paket paling banyak. Tiap jenis barang di setiap paket harus sama banyak." pesanSalah="Cari FPB dari 36, 48, dan 24." bantuan="FPB-nya 12. Tiap paket: 3 gulungan, 4 kertas, 2 stiker." umpan="12 paket." periksa={duaBelas} alias={["12", "dua belas"]} konteks="Paket paling banyak ada 12." />
        </Adegan>

        <Adegan judul="Peta prima dan tangga" jenis="saring" kelas={kelas} kelamin={kelamin} penjelasan={["Prima yang berpasangan dikali sekali untuk FPB.", "KPK memakai pasangan itu sekali, lalu semua prima yang tersisa."]}>
          <PetaContoh pusat="72 dan 150" cabang={[{ ikon: "2️⃣", judul: "72", isi: "2 × 2 × 2 × 3 × 3" }, { ikon: "5️⃣", judul: "150", isi: "2 × 3 × 5 × 5" }, { ikon: "✅", judul: "Hasil", isi: "FPB 6 · KPK 1.800" }]} kolom={["Yang dikali", "Hasil"]} baris={[["FPB, yang berpasangan", "2 × 3 = 6"], ["KPK, pasangan + sisa", "1.800"]]} />
          <p className="text-sm font-semibold text-slate-700">Sampai 30 ada 10 bilangan prima. Kalau saringan dilanjutkan sampai 100, bilangan primanya ada 25. Hari dan pasaran yang sama kembali pada KPK dari 7 dan 5. Jika Pahing jatuh pada Selasa, Pahing berikutnya jatuh pada Minggu.</p>
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Sebutkan empat bilangan prima yang pertama." periksa={primaPertama} petunjuk="Mulai dari yang terkecil. Satu tidak ikut." benar="2, 3, 5, dan 7." />
          <TulisBebas id={idKuis("B", 9)} judul="Urai 96" visual={<Papan anak="96" />} pertanyaan="Tulis faktorisasi prima 96." pesanSalah="Bagi dua sampai tidak habis lagi, lalu lanjut ke prima berikutnya." bantuan="96 = 2 × 2 × 2 × 2 × 2 × 3." umpan="2 × 2 × 2 × 2 × 2 × 3." periksa={primaSembilanEnam} alias={["2", "3"]} konteks="96 = 2 × 2 × 2 × 2 × 2 × 3." />
        </Adegan>

        <Pilih id={idKuis("B", 10)} pertanyaan="KPK dari 9 dan 12 adalah..." visual={<Papan anak="9 = 3 × 3    12 = 2 × 2 × 3" />} pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "36" }, { huruf: "C", teks: "108" }, { huruf: "D", teks: "12" }]} benar="B" umpan="2 × 2 × 3 × 3 = 36. 3 adalah FPB." salah="Ambil pangkat tertinggi tiap prima, lalu kalikan." />
        <KuisCocok id={idKuis("B", 11)} perintah="Pasangkan soal dengan jawabannya." baris={[{ kiri: "FPB 20 dan 30", pilihan: PASANGAN_B, benar: "10" }, { kiri: "KPK 4 dan 5", pilihan: PASANGAN_B, benar: "20" }, { kiri: "Faktorisasi prima 30", pilihan: PASANGAN_B, benar: "2 × 3 × 5" }]} umpan="10, 20, dan 2 × 3 × 5." />
        <SusunToken id={idKuis("B", 12)} perintah="Susun faktor 10 dari yang paling kecil." acak={["5", "1", "10", "2"]} benar={["1", "2", "5", "10"]} umpan="1, 2, 5, 10." />
        <KuisBenarSalah id={idKuis("B", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "16 habis dibagi 6.", benar: false }, { teks: "KPK 2 dan 3 adalah 6.", benar: true }, { teks: "25 adalah bilangan prima.", benar: false }]} umpan="Hanya pernyataan kedua yang benar. 16 dibagi 6 bersisa. 25 = 5 × 5." />
        <Pilih id={idKuis("B", 14)} pertanyaan="Tiga lonceng berbunyi setiap 6 menit, 10 menit, dan 15 menit. Mereka bersama lagi setelah..." visual={<Papan anak="6 · 10 · 15" />} pilihan={[{ huruf: "A", teks: "30 menit" }, { huruf: "B", teks: "60 menit" }, { huruf: "C", teks: "1 menit" }, { huruf: "D", teks: "31 menit" }]} benar="A" umpan="KPK 6, 10, dan 15 adalah 30. FPB ketiganya 1." salah="Cari kelipatan yang sama dan paling kecil." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB2.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarBukit jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB2} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB2} penutup="Angin senja reda. Igil menempelkan stempel layangan." bunga="🪁🎀🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB2.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Layangan Bukit" : skor >= 6 ? "🪁 Penjaga Tali" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! KPK dan FPB-mu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru layangan." : "Ayo hitung lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarBukit jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Dua tali" visual={<Papan anak="KPK 14 dan 21" />} pertanyaan="Tulis KPK dari 14 dan 21." pesanSalah="Urai ke prima, lalu ambil pangkat tertinggi." bantuan="14 = 2 × 7. 21 = 3 × 7. KPK = 2 × 3 × 7 = 42." umpan="42." periksa={empatPuluhDua} alias={["42", "empat puluh dua"]} konteks="KPK 14 dan 21 adalah 42." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. FPB dari 18 dan 24 adalah..." pilihan={[{ huruf: "A", teks: "72" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "3" }, { huruf: "D", teks: "12" }]} benar="B" umpan="Faktor yang sama dan terbesar adalah 6. 72 adalah KPK." salah="12 tidak membagi 18. 72 terlalu besar untuk FPB." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Berapa FPB dari 9 dan 12?" periksa={tiga} petunjuk="Cari faktor yang sama, lalu yang terbesar." benar="Tiga." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Ada 16 siswa putri dan 24 siswa putra. Kelompok paling banyak, dengan banyak putri dan putra sama di setiap kelompok, adalah..." pilihan={[{ huruf: "A", teks: "4 kelompok" }, { huruf: "B", teks: "6 kelompok" }, { huruf: "C", teks: "8 kelompok" }, { huruf: "D", teks: "2 kelompok" }]} benar="C" umpan="FPB 16 dan 24 adalah 8. Tiap kelompok: 2 putri dan 3 putra." salah="Banyak kelompok paling banyak sama dengan FPB." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan soal dengan jawabannya." baris={[{ kiri: "KPK 7 dan 8", pilihan: PASANGAN_D, benar: "56" }, { kiri: "FPB 18 dan 30", pilihan: PASANGAN_D, benar: "6" }, { kiri: "Faktorisasi prima 42", pilihan: PASANGAN_D, benar: "2 × 3 × 7" }]} umpan="56, 6, dan 2 × 3 × 7." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Urai 48" visual={<Papan anak="48" />} pertanyaan="Tulis faktorisasi prima 48." pesanSalah="Bagi dua terus sampai tersisa prima lain." bantuan="48 = 2 × 2 × 2 × 2 × 3." umpan="2 × 2 × 2 × 2 × 3." periksa={primaEmpatDelapan} alias={["2", "3"]} konteks="48 = 2 × 2 × 2 × 2 × 3." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Deret 12 – 24 – 36 – ⬜. Berikutnya..." visual={<Papan anak="12 · 24 · 36 · ⬜" />} pilihan={[{ huruf: "A", teks: "40" }, { huruf: "B", teks: "48" }, { huruf: "C", teks: "42" }, { huruf: "D", teks: "60" }]} benar="B" umpan="Lompat 12. 36 + 12 = 48." salah="Lihat selisih dua bilangan yang bersebelahan." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Tiga lonceng berdentang setiap 15 detik, 24 detik, dan 36 detik. Mereka dentang bersama pukul 15.30. Dentang bersama lagi pukul..." pilihan={[{ huruf: "A", teks: "15.36" }, { huruf: "B", teks: "15.45" }, { huruf: "C", teks: "16.06" }, { huruf: "D", teks: "15.33" }]} benar="A" umpan="KPK-nya 360 detik, yaitu 6 menit. 15.30 + 6 menit = 15.36." salah="Ubah KPK detik menjadi menit, lalu tambahkan pada 15.30." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Pekan ada 7 hari. Pasaran ada 5 hari. Setelah berapa hari hari dan pasaran yang sama kembali?" periksa={tigaPuluhLima} petunjuk="Cari KPK dari 7 dan 5." benar="Tiga puluh lima hari." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Jika Pon jatuh pada hari Minggu, Pon berikutnya jatuh pada hari..." pilihan={[{ huruf: "A", teks: "Kamis" }, { huruf: "B", teks: "Jumat" }, { huruf: "C", teks: "Sabtu" }, { huruf: "D", teks: "Senin" }]} benar="B" umpan="Pasaran maju 5 hari. Minggu ditambah 5 hari jatuh pada Jumat." salah="Geser 5 hari dari Minggu." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab2({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarBukit jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Kelipatan melompat sama, mulai dari bilangan itu sendiri. Nol tidak ikut.",
          "KPK adalah kelipatan persekutuan yang terkecil. FPB adalah faktor persekutuan yang terbesar.",
          "Prima hanya dibagi satu dan dirinya. Satu bukan prima.",
        ])}
        poin={[
          "Kelipatan 4: 4, 8, 12, 16, 20. Empat kelipatan 6 yang pertama: 6, 12, 18, 24.",
          "KPK 4 dan 6 adalah 12. Tanggal 5 September ditambah 12 hari jatuh pada 17 September.",
          "Faktor 12: 1, 2, 3, 4, 6, 12. Pasangannya 1×12, 2×6, dan 3×4.",
          "FPB 12 dan 18 adalah 6. Pita 24 dan 18 menjadi 6 ikat: 4 merah dan 3 putih.",
          "Bilangan prima dimulai dari 2, 3, 5, 7. Sampai 100 ada 25 bilangan prima.",
          "60 = 2 × 2 × 3 × 5. 72 dan 150 punya FPB 6 dan KPK 1.800.",
          "Pada tangga bagi, semua pembagi dikalikan untuk KPK. Pembagi yang membagi semua bilangan dikalikan untuk FPB.",
          "Jadwal bersama memakai KPK. Kelompok sama rata memakai FPB. Hari dan pasaran yang sama kembali pada KPK 7 dan 5.",
        ]}
        penutup="Daftar yang sama dan paling kecil itu KPK. Faktor yang sama dan paling besar itu FPB."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
