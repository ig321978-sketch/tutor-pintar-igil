"use client";

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
import { MISI_MTK4_BAB2, TEMA_MTK4_BAB2 } from "@/lib/misi-mtk-4-bab2";
import { MODUL_MTK4_BAB2 } from "@/lib/modul-resmi-mtk-4-bab2";
import {
  bacaEnamPersepuluh,
  bacaTujuhPersepuluh,
  lebihBesarEmpatPerLima,
  lebihBesarSeperempat,
  lebihBesarSetengahDariSeperempat,
  lebihBesarSepertiga,
  lebihBesarTujuhDelapan,
  persenDuaPuluh,
  persenDuaPuluhLima,
  persenEmpatPuluh,
  persenSembilan,
  persenTujuhLima,
  senilaiDuaPerEnam,
  senilaiEnamPerSembilan,
  senilaiLimaPerSepuluh,
  senilaiSembilanPerDuaBelas,
  tulisDelapanPerseratus,
  tulisEmpatPerseratus,
  urutKecilSeperempat,
  urutPenyebutSembilan,
  urutPerDelapan,
  urutSetengahBesar,
  urutUnitKecil,
} from "@/lib/nilai-mtk-4-bab2";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB2.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Nisa: "border-teal-300 bg-teal-50",
  Farhan: "border-orange-300 bg-orange-50",
  Cinta: "border-violet-300 bg-violet-50",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nisa: "👧",
  Farhan: "👦",
  Cinta: "👧",
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

function Irisan({ isi, dari, warna = "bg-rose-400" }: { isi: number; dari: number; warna?: string }) {
  return (
    <div className="mx-auto flex w-full max-w-xs gap-1" aria-hidden>
      {Array.from({ length: dari }, (_, indeks) => (
        <span key={indeks} className={`h-8 flex-1 rounded-md ${indeks < isi ? warna : "bg-slate-200"}`} />
      ))}
    </div>
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

function Adegan({
  judul,
  src,
  alt,
  kelas,
  kelamin,
  penjelasan,
  children,
  utama = true,
}: {
  judul: string;
  utama?: boolean;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className={utama ? "space-y-4 border-b-4 border-[#1C01A5] pb-8" : "space-y-3"}>
      <p className={utama ? "text-xl font-black leading-snug text-[#1C01A5]" : "text-xs font-black uppercase tracking-wide text-[#1C01A5]"}>{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan gambarnya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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
      } catch { setStatus(null); setCuplikan("Gagal menilai. Kirim lagi."); }
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat penyebut atau pembilangnya, lalu susun ulang." />
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
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>{nilai ? "Benar" : "Salah"}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Gambar lagi irisan yang sama besar, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const PERSEN_A = ["50%", "25%", "20%"];
const SENILAI_B = ["1/2", "1/3", "1/4"];
const PASANG_D = ["1/2", "1/4", "3/4"];

function Lambang({ atas, bawah, keterangan }: { atas: string; bawah: string; keterangan: string }) {
  return (
    <p className="flex flex-col items-center gap-2 text-center">
      <span className="inline-flex flex-col items-center leading-none">
        <span className="text-3xl font-black text-[#1C01A5]">{atas}</span>
        <span className="my-1 h-1 w-10 rounded-full bg-[#1C01A5]" />
        <span className="text-3xl font-black text-[#1C01A5]">{bawah}</span>
      </span>
      <span className="text-sm font-bold text-slate-600">{keterangan}</span>
    </p>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB2.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍰👧👦🦉" judul="A. Dapur Bolu" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Membandingkan dan mengurutkan pecahan berpembilang satu.", "Membandingkan dan mengurutkan pecahan berpenyebut sama.", "Mengenali pecahan senilai dari gambar dan simbol.", "Menyatakan pecahan desimal persepuluhan dan perseratusan.", "Menghubungkan pecahan desimal perseratusan dengan persen."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Pecahan berpembilang satu" src="/doodle-mtk/mtk-4-bab2-sub1.jpg" alt="Dapur dengan bolu utuh dan bolu yang diiris tipis. Satu iris kecil di piring. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Satu pizza dibagi sama. Satu iris ditulis pembilang satu. Penyebut yang lebih besar membuat iris lebih kecil."]}>
          <Dialog nama="Igil" anak="Satu pizza dipotong menjadi 4 bagian yang sama." />
          <Dialog nama="Nisa" anak="Tiap anak mendapat 1 dari 4. Ditulis 1/4." />
          <Dialog nama="Farhan" anak="Angka 1 di atas garis. Namanya pembilang." />
          <Dialog nama="Cinta" anak="Angka 4 di bawah garis. Namanya penyebut." />
          <Lambang atas="1" bawah="4" keterangan="satu dari empat bagian yang sama" />
          <Dialog nama="Farhan" anak="Boluku dibagi 2. Aku ambil 1/2." />
          <Dialog nama="Cinta" anak="Boluku dibagi 8. Aku ambil 1/8." />
          <Dialog nama="Nisa" anak="Bolu sama besar. Iris Cinta lebih tipis." />
          <Dialog nama="Igil" anak="1/2 lebih besar dari 1/8. Penyebut 2 lebih kecil." />
          <Irisan isi={1} dari={2} />
          <Irisan isi={1} dari={8} warna="bg-orange-400" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Mana yang lebih besar, 1/3 atau 1/6? Sebutkan pecahannya." periksa={lebihBesarSepertiga} petunjuk="Pembilang sama-sama satu. Penyebut yang lebih kecil, potongannya lebih besar." benar="1/3 lebih besar." />
          <TulisBebas id={idKuis("A", 1)} judul="Urut dari yang besar" visual={<Papan anak="1/8    1/2    1/4" />} pertanyaan="Urutkan dari yang paling besar ke paling kecil. Tulis seperti 1/2." pesanSalah="Penyebut kecil dulu." bantuan="1/2, lalu 1/4, lalu 1/8." umpan="1/2, 1/4, 1/8." periksa={urutSetengahBesar} alias={["1/2 1/4 1/8"]} konteks="Dari besar ke kecil: 1/2, 1/4, 1/8." />
          <Dialog nama="Nisa" anak="Daerah arsir 1/2 lebih luas daripada 1/4. Kita tulis 1/2 > 1/4." />
          <Dialog nama="Farhan" anak="1/10 lebih kecil daripada 1/5. Kita tulis 1/10 < 1/5." />
          <Dialog nama="Cinta" anak="Tiara punya bawang putih 1/2 kg dan gula 1/4 kg." />
          <Dialog nama="Igil" anak="Bawang putih lebih berat. Penyebut 2 lebih kecil dari 4." />
          <Papan anak="1/2 > 1/4     1/10 < 1/5" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Satu iris</p>
          <PetaContoh pusat="Pembilang 1" cabang={[{ ikon: "🍕", judul: "Seperdua", isi: "1/2 lebih besar" }, { ikon: "🍰", judul: "Seperempat", isi: "1/4 lebih kecil" }, { ikon: "⚖️", judul: "Bawang", isi: "1/2 kg menang" }]} kolom={["Kiri", "Tanda", "Kanan"]} baris={[["1/2", ">", "1/4"], ["1/10", "<", "1/5"], ["1/2 kg", ">", "1/4 kg"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Mana yang lebih besar, 1/4 atau 1/9?" periksa={lebihBesarSeperempat} petunjuk="Pembilang sama. Penyebut kecil, potongan besar." benar="1/4 lebih besar." />
          <TulisBebas id={idKuis("B", 1)} visual={<Papan anak="1/2 · 1/10 · 1/5" />} pertanyaan="Urutkan dari yang paling kecil." pesanSalah="Penyebut besar berarti potongan kecil." bantuan="1/10, 1/5, 1/2." umpan="1/10, 1/5, 1/2." periksa={urutUnitKecil} alias={["1/10 1/5 1/2"]} konteks="Dari kecil: 1/10, 1/5, 1/2." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pecahan berpenyebut sama" src="/doodle-mtk/mtk-4-bab2-sub2.jpg" alt="Satu bolu diiris sama besar, beberapa iris seukuran di piring. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Penyebut sama berarti irisan sama besar. Pembilang yang lebih besar, bagiannya lebih banyak."]}>
          <Dialog nama="Nisa" anak="Satu kue dibagi 3. Satu iris adalah 1/3. Dua iris adalah 2/3." />
          <Dialog nama="Igil" anak="Penyebutnya sama-sama 3. Daerah 1/3 lebih kecil. Tulis 1/3 < 2/3." />
          <Dialog nama="Farhan" anak="Sepuluh kotak. Dua berwarna lebih banyak dari satu. 2/10 > 1/10." />
          <Irisan isi={1} dari={3} warna="bg-sky-400" />
          <Irisan isi={2} dari={3} />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Mana yang lebih besar, 3/8 atau 7/8?" periksa={lebihBesarTujuhDelapan} petunjuk="Penyebutnya sama. Bandingkan pembilangnya." benar="7/8 lebih besar." />
          <TulisBebas id={idKuis("A", 3)} judul="Urut penyebut sembilan" visual={<Papan anak="7/9 · 1/9 · 4/9 · 2/9" />} pertanyaan="Urutkan dari yang paling kecil. Tulis pecahannya berurutan." pesanSalah="Penyebut sama. Urutkan pembilang dari kecil." bantuan="1/9, 2/9, 4/9, 7/9." umpan="1/9, 2/9, 4/9, 7/9." periksa={urutPenyebutSembilan} alias={["1/9 2/9 4/9 7/9"]} konteks="Urutan: 1/9, 2/9, 4/9, 7/9." />
          <Dialog nama="Cinta" anak="Tongkat Asep panjangnya 3/6 meter. Tongkat Azizah 2/6 meter." />
          <Dialog nama="Nisa" anak="Penyebut sama. Pembilang 3 lebih besar. Tongkat Asep lebih panjang." />
          <Dialog nama="Farhan" anak="Wiwin mendapat roti 1/3. Tomas mendapat 2/3." />
          <Dialog nama="Igil" anak="Wiwin paling sedikit. Satu semangka: Helen 1/4, sisa Putu 3/4. Putu lebih besar." />
          <Papan anak="3/6 > 2/6     1/3 < 2/3" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Iris sama</p>
          <PetaContoh pusat="Penyebut sama" cabang={[{ ikon: "🍰", judul: "Dua iris", isi: "2/3 lebih besar" }, { ikon: "📏", judul: "Tongkat", isi: "3/6 lebih panjang" }, { ikon: "🍉", judul: "Semangka", isi: "Putu 3/4" }]} kolom={["Kiri", "Tanda", "Kanan"]} baris={[["1/3", "<", "2/3"], ["2/10", ">", "1/10"], ["3/6", ">", "2/6"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Mana yang lebih besar, 2/5 atau 4/5?" periksa={lebihBesarEmpatPerLima} petunjuk="Penyebut sama. Bandingkan pembilang." benar="4/5 lebih besar." />
          <TulisBebas id={idKuis("B", 3)} visual={<Papan anak="6/8 · 1/8 · 5/8 · 3/8" />} pertanyaan="Urutkan dari kecil ke besar." pesanSalah="Pembilang dari kecil ke besar." bantuan="1/8, 3/8, 5/8, 6/8." umpan="1/8, 3/8, 5/8, 6/8." periksa={urutPerDelapan} alias={["1/8 3/8 5/8 6/8"]} konteks="Urutan: 1/8, 3/8, 5/8, 6/8." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Pecahan senilai" src="/doodle-mtk/mtk-4-bab2-sub3.jpg" alt="Dua bolu persegi. Satu diarsir setengah utuh, satu lagi diiris empat dengan dua iris terarsir. Burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Senilai berarti luasnya sama, walaupun jumlah iris berbeda. Kali atau bagi pembilang dan penyebut dengan bilangan yang sama."]}>
          <Dialog nama="Igil" anak="Lipat kertas jadi 4 kotak sama. Warnai 1 kotak. Itu 1/4." />
          <Dialog nama="Nisa" anak="Kertas lain dilipat jadi 16 kotak. Warnai 4 kotak." />
          <Dialog nama="Farhan" anak="Luas warnanya sama. Jadi 1/4 = 4/16." />
          <Dialog nama="Cinta" anak="Coklat dibagi 6. Putu mendapat 2/6. Coklat lain dibagi 3. Putu mendapat 1/3." />
          <Dialog nama="Igil" anak="Dua potong itu sama besar. 2/6 = 1/3." />
          <Papan anak="1/4 = 4/16     2/6 = 1/3" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="1/3 sama dengan berapa per 6? Sebutkan pembilangnya." periksa={senilaiDuaPerEnam} petunjuk="Penyebut 3 menjadi 6. Pembilang ikut dikali bilangan yang sama." benar="2/6. Pembilangnya 2." />
          <TulisBebas id={idKuis("A", 5)} judul="Pembilang yang hilang" visual={<Papan anak="3/4 = ⬜/12" />} pertanyaan="Tulis pecahan senilainya, atau tulis pembilang yang hilang." pesanSalah="Penyebut 4 menjadi 12. Kali dengan bilangan yang sama." bantuan="3/4 = 9/12." umpan="9/12." periksa={senilaiSembilanPerDuaBelas} alias={["9/12", "9"]} konteks="3/4 = 9/12." />
          <Dialog nama="Nisa" anak="Cara pertama: kali pembilang dan penyebut dengan bilangan yang sama." />
          <Dialog nama="Farhan" anak="1/3 dikali 2 di atas dan di bawah. Jadinya 2/6." />
          <Dialog nama="Cinta" anak="Cara kedua: bagi keduanya dengan bilangan yang sama." />
          <Dialog nama="Igil" anak="2/4 dibagi 2 menjadi 1/2. 3/9 dibagi 3 menjadi 1/3." />
          <Papan anak="1/3 × 2 = 2/6     3/9 ÷ 3 = 1/3" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Kali sama</p>
          <PetaContoh pusat="Senilai" cabang={[{ ikon: "📄", judul: "Lipatan", isi: "1/4 = 4/16" }, { ikon: "🍫", judul: "Coklat", isi: "2/6 = 1/3" }, { ikon: "✂️", judul: "Bagi", isi: "3/9 = 1/3" }]} kolom={["Awal", "Cara", "Hasil"]} baris={[["1/3", "× 2", "2/6"], ["2/4", "÷ 2", "1/2"], ["1/4", "× 4", "4/16"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="2/3 sama dengan berapa per 9?" periksa={senilaiEnamPerSembilan} petunjuk="Penyebut 3 menjadi 9. Pembilang ikut dikali." benar="6/9." />
          <TulisBebas id={idKuis("B", 5)} visual={<Papan anak="1/2 = ⬜/10" />} pertanyaan="Tulis pecahan senilainya." pesanSalah="Kali atas dan bawah dengan bilangan yang sama." bantuan="1/2 = 5/10." umpan="5/10." periksa={senilaiLimaPerSepuluh} alias={["5/10", "5"]} konteks="1/2 = 5/10." />
        </Adegan>
        <Adegan utama judul="Sub-bab 4 — Desimal persepuluh dan perseratus" src="/doodle-mtk/mtk-4-bab2-sub4.jpg" alt="Sepuluh roti dan seratus biskuit di meja dapur, tanpa angka. Burung hantu bertopi biru di samping tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Satu angka di belakang koma berarti persepuluh. Dua angka berarti perseratus."]}>
          <Dialog nama="Igil" anak="Ada 10 roti. Satu roti dilapisi selai." />
          <Dialog nama="Nisa" anak="Itu 1 dari 10. Ditulis 1/10." />
          <Dialog nama="Farhan" anak="Bentuk desimalnya 0,1. Tiga roti berselai ditulis 3/10 = 0,3." />
          <Dialog nama="Cinta" anak="Ada 100 biskuit. Satu berselai. Itu 1/100 = 0,01." />
          <Dialog nama="Igil" anak="Tujuh biskuit berselai: 7/100 = 0,07." />
          <Papan anak="1/10 = 0,1     7/100 = 0,07" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Bacalah 0,7 sebagai pecahan persepuluhan." periksa={bacaTujuhPersepuluh} petunjuk="Hitung angka di belakang koma. Satu angka berarti persepuluh." benar="Tujuh persepuluh." />
          <TulisBebas id={idKuis("A", 7)} judul="Jadi pecahan" visual={<Papan anak="0,08" />} pertanyaan="Tulis 0,08 sebagai pecahan perseratus." pesanSalah="Dua angka di belakang koma berarti perseratus." bantuan="0,08 = 8/100." umpan="8/100." periksa={tulisDelapanPerseratus} alias={["8/100", "delapan perseratus"]} konteks="0,08 = 8/100." />
          <Dialog nama="Nisa" anak="Satu angka di belakang koma, penyebutnya 10. 0,1 = 1/10." />
          <Dialog nama="Farhan" anak="Dua angka di belakang koma, penyebutnya 100. 0,25 = 25/100." />
          <Dialog nama="Cinta" anak="4/10 = 0,4. 5/10 = 0,5. 9/10 = 0,9." />
          <Dialog nama="Igil" anak="15/100 = 0,15. 62/100 = 0,62. 81/100 = 0,81. Nol di depan koma tetap ditulis." />
          <Papan anak="4/10 = 0,4     15/100 = 0,15" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Koma</p>
          <PetaContoh pusat="Desimal" cabang={[{ ikon: "🍞", judul: "Sepuluh roti", isi: "1/10 = 0,1" }, { ikon: "🍪", judul: "Seratus biskuit", isi: "7/100 = 0,07" }, { ikon: "👀", judul: "Hitung angka", isi: "0,25 = 25/100" }]} kolom={["Pecahan", "Angka koma", "Desimal"]} baris={[["1/10", "satu", "0,1"], ["3/10", "satu", "0,3"], ["15/100", "dua", "0,15"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Bacalah 0,6." periksa={bacaEnamPersepuluh} petunjuk="Satu angka di belakang koma." benar="Enam persepuluh." />
          <TulisBebas id={idKuis("B", 7)} visual={<Papan anak="0,04" />} pertanyaan="Tulis 0,04 sebagai pecahan." pesanSalah="Dua angka di belakang koma." bantuan="0,04 = 4/100." umpan="4/100." periksa={tulisEmpatPerseratus} alias={["4/100"]} konteks="0,04 = 4/100." />
        </Adegan>
        <Adegan utama judul="Sub-bab 5 — Perseratus dan persen" src="/doodle-mtk/mtk-4-bab2-sub5.jpg" alt="Papan diskon kosong di dapur, kisi seratus titik tanpa angka. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Persen adalah pecahan berpenyebut seratus. Lambangnya %."]}>
          <Dialog nama="Igil" anak="Di swalayan, diskon ditulis dengan tanda %." />
          <Dialog nama="Nisa" anak="Persen adalah pecahan berpenyebut 100." />
          <Dialog nama="Farhan" anak="5% artinya 5/100." />
          <Dialog nama="Cinta" anak="0,75 sama dengan 75/100. Itu 75%." />
          <Papan anak="0,75 = 75/100 = 75%" />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="0,2 sama dengan berapa persen?" periksa={persenDuaPuluh} petunjuk="Ubah dulu menjadi perseratus, lalu sebutkan persennya." benar="20 persen." />
          <TulisBebas id={idKuis("A", 9)} judul="Tulis persen" visual={<Papan anak="75/100" />} pertanyaan="Tulis 75/100 sebagai persen." pesanSalah="Pembilang perseratus langsung menjadi persen." bantuan="75/100 = 75%." umpan="75%." periksa={persenTujuhLima} alias={["75%", "75 persen"]} konteks="75/100 = 75%." />
          <Dialog nama="Nisa" anak="Cara biasa: ubah desimal menjadi pecahan, lalu tulis persen." />
          <Dialog nama="Farhan" anak="0,35 = 35/100 = 35%." />
          <Dialog nama="Cinta" anak="Cara langsung: kali dengan 100%. Geser koma dua langkah ke kanan." />
          <Dialog nama="Igil" anak="0,25 menjadi 25%. 0,36 menjadi 36%. 2,36 menjadi 236%." />
          <Dialog nama="Nisa" anak="20 siswa dari 50 sedang olahraga. 20/50 = 40/100 = 40%." />
          <Dialog nama="Farhan" anak="30 siswa dari 100 ikut lomba lari. Itu 30%." />
          <Dialog nama="Cinta" anak="Nazilla benar 6 dari 10 soal. 6/10 sama dengan 60%." />
          <Papan anak="0,35 = 35%     20/50 = 40%" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Dari seratus</p>
          <PetaContoh pusat="Persen" cabang={[{ ikon: "🏷️", judul: "Diskon", isi: "5% = 5/100" }, { ikon: "➡️", judul: "Geser koma", isi: "0,25 jadi 25%" }, { ikon: "🏃", judul: "Olahraga", isi: "20/50 = 40%" }]} kolom={["Desimal", "Pecahan", "Persen"]} baris={[["0,75", "75/100", "75%"], ["0,35", "35/100", "35%"], ["0,25", "25/100", "25%"]]} />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="0,09 sama dengan berapa persen?" periksa={persenSembilan} petunjuk="Dua angka di belakang koma menjadi persen." benar="9 persen." />
          <TulisBebas id={idKuis("B", 9)} visual={<Papan anak="40/100" />} pertanyaan="Tulis sebagai persen." pesanSalah="Pembilang perseratus adalah persennya." bantuan="40/100 = 40%." umpan="40%." periksa={persenEmpatPuluh} alias={["40%", "40 persen"]} konteks="40/100 = 40%." />
        </Adegan>
        <Pilih id={idKuis("A", 10)} pertanyaan="Mana yang lebih besar, 1/10 atau 1/5?" visual={<><Irisan isi={1} dari={10} warna="bg-orange-400" /><Irisan isi={1} dari={5} /></>} pilihan={[{ huruf: "A", teks: "1/10" }, { huruf: "B", teks: "1/5" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "1/15" }]} benar="B" umpan="1/10 < 1/5. Penyebut 5 lebih kecil." salah="Pembilang sama-sama 1. Bandingkan penyebut." />
        <KuisCocok id={idKuis("A", 11)} perintah="Pasangkan pecahan dengan persennya." baris={[{ kiri: "1/2", pilihan: PERSEN_A, benar: "50%" }, { kiri: "1/4", pilihan: PERSEN_A, benar: "25%" }, { kiri: "1/5", pilihan: PERSEN_A, benar: "20%" }]} umpan="Setengah 50%, seperempat 25%, seperlima 20%." />
        <SusunToken id={idKuis("A", 12)} perintah="Susun dari yang paling besar." acak={["1/6", "1/2", "1/4", "1/3"]} benar={["1/2", "1/3", "1/4", "1/6"]} umpan="1/2, 1/3, 1/4, 1/6." />
        <KuisBenarSalah id={idKuis("A", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "1/2 lebih besar dari 1/4.", benar: true }, { teks: "1/10 lebih besar dari 1/5.", benar: false }, { teks: "2/6 senilai dengan 1/3.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1/5 lebih besar dari 1/10." />
        <Pilih id={idKuis("A", 14)} pertanyaan="1/4 = ⬜/16. Pembilang yang hilang..." visual={<Papan anak="1/4 = ⬜/16" />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "8" }, { huruf: "D", teks: "16" }]} benar="B" umpan="4 × 4 = 16, jadi 1 × 4 = 4." salah="Kali pembilang dan penyebut dengan bilangan yang sama." />
        <Pilih id={idKuis("A", 15)} pertanyaan="0,35 sama dengan..." visual={<Papan anak="0,35" />} pilihan={[{ huruf: "A", teks: "3%" }, { huruf: "B", teks: "35%" }, { huruf: "C", teks: "350%" }, { huruf: "D", teks: "0,35%" }]} benar="B" umpan="0,35 = 35/100 = 35%." salah="Dua angka di belakang koma berarti perseratus." />
        <Pilih id={idKuis("B", 10)} pertanyaan="Mana yang lebih besar?" visual={<Papan anak="0,8    atau    0,75" />} pilihan={[{ huruf: "A", teks: "0,75" }, { huruf: "B", teks: "0,8" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "0,08" }]} benar="B" umpan="0,8 = 0,80. Lebih besar dari 0,75." salah="Samakan dulu jumlah angka di belakang koma." />
        <KuisCocok id={idKuis("B", 11)} perintah="Pasangkan dengan pecahan senilainya." baris={[{ kiri: "2/4", pilihan: SENILAI_B, benar: "1/2" }, { kiri: "2/6", pilihan: SENILAI_B, benar: "1/3" }, { kiri: "2/8", pilihan: SENILAI_B, benar: "1/4" }]} umpan="2/4 = 1/2, 2/6 = 1/3, 2/8 = 1/4." />
        <SusunToken id={idKuis("B", 12)} perintah="Susun dari yang paling kecil." acak={["7/10", "1/10", "5/10", "3/10"]} benar={["1/10", "3/10", "5/10", "7/10"]} umpan="1/10, 3/10, 5/10, 7/10." />
        <KuisBenarSalah id={idKuis("B", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "3/9 senilai dengan 1/3.", benar: true }, { teks: "Tongkat 2/6 lebih panjang dari tongkat 3/6.", benar: false }, { teks: "0,25 sama dengan 25%.", benar: true }]} umpan="Yang pertama dan ketiga benar. Tongkat 3/6 lebih panjang." />
        <Pilih id={idKuis("B", 14)} pertanyaan="Mana yang lebih panjang, tongkat 3/6 atau 2/6?" visual={<><Irisan isi={3} dari={6} /><Irisan isi={2} dari={6} warna="bg-orange-400" /></>} pilihan={[{ huruf: "A", teks: "2/6" }, { huruf: "B", teks: "3/6" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "6/6" }]} benar="B" umpan="Penyebut sama. Pembilang 3 lebih besar." salah="Hitung bagian tongkat yang terpakai." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB2.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍰🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab2-permainan.jpg" alt="Sepuluh batu loncatan kosong di dapur. Burung hantu bertopi biru memegang stempel. Bolu di samping tiga anak." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB2} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB2} penutup="Dapur sepi. Igil menempelkan stempel irisan." bunga="🍰🧁🥤🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB2.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Bagi Bolu" : skor >= 6 ? "🍰 Penjaga Irisan" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Irisan bolumu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru bagi." : "Ayo bagi lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab2-evaluasi.jpg" alt="Meja dapur dengan pensil dan kertas kosong. Burung hantu bertopi biru berdiri di samping, bolu di belakang." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Urutkan potongan" visual={<Papan anak="1/2 · 1/4 · 1/3" />} pertanyaan="Urutkan dari yang paling kecil." pesanSalah="Pembilang satu. Penyebut besar lebih kecil." bantuan="1/4, 1/3, 1/2." umpan="1/4, 1/3, 1/2." periksa={urutKecilSeperempat} alias={["1/4 1/3 1/2"]} konteks="Dari kecil: 1/4, 1/3, 1/2." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Tongkat siapa yang lebih panjang?" visual={<><Irisan isi={3} dari={6} /><Irisan isi={2} dari={6} warna="bg-orange-400" /></>} pilihan={[{ huruf: "A", teks: "Azizah, 2/6" }, { huruf: "B", teks: "Asep, 3/6" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "Tidak bisa dibanding" }]} benar="B" umpan="Penyebut sama. Pembilang 3 lebih besar." salah="Bandingkan pembilangnya." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. 1/3 sama dengan berapa per 6?" periksa={senilaiDuaPerEnam} petunjuk="Penyebut 3 menjadi 6. Pembilang ikut dikali." benar="2/6." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. 0,4 sama dengan..." pilihan={[{ huruf: "A", teks: "4/100" }, { huruf: "B", teks: "40/10" }, { huruf: "C", teks: "4/10" }, { huruf: "D", teks: "4/4" }]} benar="C" umpan="Satu angka di belakang koma: 4/10." salah="Hitung angka di belakang koma." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan desimal dengan pecahannya." baris={[{ kiri: "0,5", pilihan: PASANG_D, benar: "1/2" }, { kiri: "0,25", pilihan: PASANG_D, benar: "1/4" }, { kiri: "0,75", pilihan: PASANG_D, benar: "3/4" }]} umpan="Setengah, seperempat, dan tiga per empat." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Jadi persen" visual={<Papan anak="0,25" />} pertanyaan="Tulis 0,25 sebagai persen." pesanSalah="0,25 = 25/100." bantuan="25%." umpan="25%." periksa={persenDuaPuluhLima} alias={["25%", "25 persen"]} konteks="0,25 = 25%." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. 1/2 – 2/4 – 3/6 – ⬜. Berikutnya yang senilai..." visual={<Papan anak="1/2 · 2/4 · 3/6 · ⬜" />} pilihan={[{ huruf: "A", teks: "4/6" }, { huruf: "B", teks: "3/8" }, { huruf: "C", teks: "4/8" }, { huruf: "D", teks: "5/6" }]} benar="C" umpan="Naik satu pembilang dan dua penyebut. 4/8." salah="Semua pecahan di deret itu sama dengan setengah." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Mana yang bukan senilai 1/3?" pilihan={[{ huruf: "A", teks: "2/6" }, { huruf: "B", teks: "3/9" }, { huruf: "C", teks: "4/12" }, { huruf: "D", teks: "2/5" }]} benar="D" umpan="2/6, 3/9, dan 4/12 sama dengan 1/3. 2/5 tidak." salah="Kali atau bagi atas dan bawah dengan bilangan yang sama." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Mana yang lebih berat, bawang putih 1/2 kg atau gula 1/4 kg?" periksa={lebihBesarSetengahDariSeperempat} petunjuk="Pembilang sama-sama satu. Bandingkan penyebut." benar="Bawang putih 1/2 kg lebih berat." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Dari 50 siswa, 20 sedang olahraga. Itu sama dengan..." pilihan={[{ huruf: "A", teks: "20%" }, { huruf: "B", teks: "50%" }, { huruf: "C", teks: "40%" }, { huruf: "D", teks: "2%" }]} benar="C" umpan="20/50 = 40/100 = 40%." salah="Ubah dulu menjadi pecahan berpenyebut 100." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab2({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab2-poin.jpg", alt: "Igil dan tiga anak memegang kartu kosong di dapur, bolu di belakang." }}
        cuplikan={cuplikanKalimat(["Pembilang di atas garis, penyebut di bawah.", "Pembilang satu dibanding dari penyebut. Penyebut sama dibanding dari pembilang.", "Senilai dikali atau dibagi sama. Dua angka di belakang koma menjadi persen."])}
        poin={["1/2 lebih besar dari 1/4. Bawang putih 1/2 kg lebih berat dari gula 1/4 kg.", "1/3 lebih kecil dari 2/3. Tongkat Asep 3/6 m lebih panjang dari tongkat Azizah 2/6 m.", "1/4 = 4/16 dan 2/6 = 1/3. Kali atau bagi atas dan bawah dengan bilangan yang sama.", "1/10 = 0,1. 7/100 = 0,07. Satu angka di belakang koma berarti persepuluh.", "0,75 = 75%. 20 siswa dari 50 sama dengan 40%. Geser koma dua langkah ke kanan."]}
        penutup="Gambar dulu irisan yang sama, baru tulis simbolnya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
