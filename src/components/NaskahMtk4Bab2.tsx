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
  lebihBesarSeperempatDariDelapan,
  lebihBesarSepertiga,
  lebihBesarTujuhDelapan,
  persenDelapan,
  persenDuaPuluh,
  persenEmpatPuluh,
  persenSembilan,
  persenTujuhLima,
  senilaiDuaPerEnam,
  senilaiEnamPerDelapan,
  senilaiEnamPerSembilan,
  senilaiLimaPerSepuluh,
  senilaiSembilanPerDuaBelas,
  tulisDelapanPerseratus,
  tulisEmpatPerseratus,
  urutEvaluasiBesar,
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

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB2.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍰👧👦🦉" judul="A. Dapur Bolu" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Membandingkan dan mengurutkan pecahan berpembilang satu.", "Membandingkan dan mengurutkan pecahan berpenyebut sama.", "Mengenali pecahan senilai dari gambar dan simbol.", "Menyatakan pecahan desimal persepuluhan dan perseratusan.", "Menghubungkan pecahan perseratus dengan persen."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Pecahan berpembilang satu" src="/doodle-mtk/mtk-4-bab2-sub1.jpg" alt="Dapur dengan bolu utuh dan bolu yang diiris tipis. Satu iris kecil di piring. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Pembilang 1 berarti satu iris. Penyebut yang lebih besar membuat iris lebih kecil."]}>
          <Dialog nama="Farhan" anak="Boluku dibagi 2. Aku ambil 1/2." />
          <Dialog nama="Cinta" anak="Boluku dibagi 8. Aku ambil 1/8." />
          <Dialog nama="Nisa" anak="Bolu sama besar. Iris Cinta lebih tipis." />
          <Dialog nama="Igil" anak="1/2 lebih besar dari 1/8. Penyebut 2 lebih kecil." />
          <Irisan isi={1} dari={2} />
          <Irisan isi={1} dari={8} warna="bg-orange-400" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Mana yang lebih besar, 1/3 atau 1/6? Sebutkan pecahannya." periksa={lebihBesarSepertiga} petunjuk="Pembilang sama-sama satu. Penyebut yang lebih kecil, potongannya lebih besar." benar="1/3 lebih besar." />
          <TulisBebas id={idKuis("A", 1)} judul="Urut dari yang besar" visual={<Papan anak="1/8    1/2    1/4" />} pertanyaan="Urutkan dari yang paling besar ke paling kecil. Tulis seperti 1/2." pesanSalah="Penyebut kecil dulu." bantuan="1/2, lalu 1/4, lalu 1/8." umpan="1/2, 1/4, 1/8." periksa={urutSetengahBesar} alias={["1/2 1/4 1/8"]} konteks="Dari besar ke kecil: 1/2, 1/4, 1/8." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pecahan berpenyebut sama" src="/doodle-mtk/mtk-4-bab2-sub2.jpg" alt="Satu bolu diiris sama besar, beberapa iris seukuran di piring. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Penyebut sama berarti irisan sama besar. Pembilang yang lebih besar, bagiannya lebih banyak."]}>
          <Dialog nama="Nisa" anak="Bolu ini dibagi 6 iris yang sama." />
          <Dialog nama="Farhan" anak="Aku dapat 2 iris, jadi 2/6." />
          <Dialog nama="Cinta" anak="Aku dapat 5 iris, jadi 5/6." />
          <Dialog nama="Igil" anak="Penyebut sama. 5 lebih besar dari 2, jadi 5/6 lebih besar." />
          <Irisan isi={2} dari={6} warna="bg-sky-400" />
          <Irisan isi={5} dari={6} />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Mana yang lebih besar, 3/8 atau 7/8?" periksa={lebihBesarTujuhDelapan} petunjuk="Penyebutnya sama. Bandingkan pembilangnya." benar="7/8 lebih besar." />
          <TulisBebas id={idKuis("A", 3)} judul="Urut penyebut sembilan" visual={<Papan anak="7/9 · 1/9 · 4/9 · 2/9" />} pertanyaan="Urutkan dari yang paling kecil. Tulis pecahannya berurutan." pesanSalah="Penyebut sama. Urutkan pembilang dari kecil." bantuan="1/9, 2/9, 4/9, 7/9." umpan="1/9, 2/9, 4/9, 7/9." periksa={urutPenyebutSembilan} alias={["1/9 2/9 4/9 7/9"]} konteks="Urutan: 1/9, 2/9, 4/9, 7/9." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Pecahan senilai" src="/doodle-mtk/mtk-4-bab2-sub3.jpg" alt="Dua bolu persegi. Satu diarsir setengah utuh, satu lagi diiris empat dengan dua iris terarsir. Burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Senilai berarti luasnya sama, walaupun jumlah iris berbeda. Kali pembilang dan penyebut dengan bilangan yang sama."]}>
          <Dialog nama="Igil" anak="Setengah bolu bisa ditulis 1/2." />
          <Dialog nama="Nisa" anak="Kalau setengah itu dipotong lagi, jadi 2 iris dari 4. 2/4." />
          <Dialog nama="Farhan" anak="Dipotong lagi, 4 iris dari 8. 4/8." />
          <Dialog nama="Cinta" anak="1/2, 2/4, dan 4/8 sama besar. Itu pecahan senilai." />
          <Papan anak="1/2 = 2/4 = 4/8" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="1/3 sama dengan berapa per 6? Sebutkan pembilangnya." periksa={senilaiDuaPerEnam} petunjuk="Penyebut 3 menjadi 6. Pembilang ikut dikali bilangan yang sama." benar="2/6. Pembilangnya 2." />
          <TulisBebas id={idKuis("A", 5)} judul="Pembilang yang hilang" visual={<Papan anak="3/4 = ⬜/12" />} pertanyaan="Tulis pecahan senilainya, atau tulis pembilang yang hilang." pesanSalah="Penyebut 4 menjadi 12. Kali dengan bilangan yang sama." bantuan="3/4 = 9/12." umpan="9/12." periksa={senilaiSembilanPerDuaBelas} alias={["9/12", "9"]} konteks="3/4 = 9/12." />
        </Adegan>
        <Adegan utama judul="Sub-bab 4 — Desimal persepuluh dan perseratus" src="/doodle-mtk/mtk-4-bab2-sub4.jpg" alt="Gelas ukur berisi jus, dengan garis kosong tanpa angka, dan pita sepuluh bagian. Burung hantu bertopi biru di dapur." kelas={kelas} kelamin={kelamin} penjelasan={["Satu angka di belakang koma berarti persepuluh. Dua angka berarti perseratus."]}>
          <Dialog nama="Farhan" anak="Botol sirup terisi 0,4." />
          <Dialog nama="Nisa" anak="Itu 4 bagian dari 10. Jadi 4/10." />
          <Dialog nama="Cinta" anak="Kalau 0,40, ada dua angka di belakang koma." />
          <Dialog nama="Igil" anak="0,40 sama dengan 40/100. Nol di depan koma tetap ditulis." />
          <Papan anak="0,4 = 4/10     0,40 = 40/100" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Bacalah 0,7 sebagai pecahan persepuluhan." periksa={bacaTujuhPersepuluh} petunjuk="Hitung angka di belakang koma. Satu angka berarti persepuluh." benar="Tujuh persepuluh." />
          <TulisBebas id={idKuis("A", 7)} judul="Jadi pecahan" visual={<Papan anak="0,08" />} pertanyaan="Tulis 0,08 sebagai pecahan perseratus." pesanSalah="Dua angka di belakang koma berarti perseratus." bantuan="0,08 = 8/100." umpan="8/100." periksa={tulisDelapanPerseratus} alias={["8/100", "delapan perseratus"]} konteks="0,08 = 8/100." />
        </Adegan>
        <Adegan utama judul="Sub-bab 5 — Perseratus dan persen" src="/doodle-mtk/mtk-4-bab2-sub5.jpg" alt="Kisi seratus titik, sebagian berwarna, tanpa angka. Tiga anak dan burung hantu bertopi biru di dapur." kelas={kelas} kelamin={kelamin} penjelasan={["Persen berarti perseratus. Lima puluh dari seratus sama dengan lima puluh persen."]}>
          <Dialog nama="Igil" anak="Ada seratus kotak kecil. Lima puluh kotak berwarna." />
          <Dialog nama="Nisa" anak="Itu lima puluh per seratus." />
          <Dialog nama="Farhan" anak="Bisa juga ditulis nol koma lima puluh." />
          <Dialog nama="Cinta" anak="Dan lima puluh persen. Persen artinya dari seratus." />
          <Papan anak="50/100 = 0,50 = 50%" />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="0,2 sama dengan berapa persen?" periksa={persenDuaPuluh} petunjuk="Ubah dulu menjadi perseratus, lalu sebutkan persennya." benar="20 persen." />
          <TulisBebas id={idKuis("A", 9)} judul="Tulis persen" visual={<Papan anak="75/100" />} pertanyaan="Tulis 75/100 sebagai persen." pesanSalah="Pembilang perseratus langsung menjadi persen." bantuan="75/100 = 75%." umpan="75%." periksa={persenTujuhLima} alias={["75%", "75 persen"]} konteks="75/100 = 75%." />
        </Adegan>
        <Pilih id={idKuis("A", 10)} pertanyaan="Mana yang lebih besar?" visual={<><Irisan isi={1} dari={5} /><Irisan isi={1} dari={10} warna="bg-orange-400" /></>} pilihan={[{ huruf: "A", teks: "1/10" }, { huruf: "B", teks: "1/5" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "1/15" }]} benar="B" umpan="Penyebut 5 lebih kecil, jadi 1/5 lebih besar." salah="Pembilang sama-sama 1. Bandingkan penyebut." />
        <KuisCocok id={idKuis("A", 11)} perintah="Pasangkan pecahan dengan persennya." baris={[{ kiri: "1/2", pilihan: PERSEN_A, benar: "50%" }, { kiri: "1/4", pilihan: PERSEN_A, benar: "25%" }, { kiri: "1/5", pilihan: PERSEN_A, benar: "20%" }]} umpan="Setengah 50%, seperempat 25%, seperlima 20%." />
        <SusunToken id={idKuis("A", 12)} perintah="Susun dari yang paling besar." acak={["1/6", "1/2", "1/4", "1/3"]} benar={["1/2", "1/3", "1/4", "1/6"]} umpan="1/2, 1/3, 1/4, 1/6." />
        <KuisBenarSalah id={idKuis("A", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "3/7 lebih besar dari 1/7.", benar: true }, { teks: "1/2 sama dengan 1/4.", benar: false }, { teks: "0,5 sama dengan 50%.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1/2 lebih besar dari 1/4." />
        <Pilih id={idKuis("A", 14)} pertanyaan="2/5 = ⬜/10. Pembilang yang hilang..." visual={<Papan anak="2/5 = ⬜/10" />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "5" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "10" }]} benar="C" umpan="5 × 2 = 10, jadi 2 × 2 = 4." salah="Kali pembilang dan penyebut dengan bilangan yang sama." />
        <Pilih id={idKuis("A", 15)} pertanyaan="0,35 sama dengan..." visual={<Papan anak="0,35" />} pilihan={[{ huruf: "A", teks: "3%" }, { huruf: "B", teks: "35%" }, { huruf: "C", teks: "350%" }, { huruf: "D", teks: "0,35%" }]} benar="B" umpan="0,35 = 35/100 = 35%." salah="Dua angka di belakang koma berarti perseratus." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB2.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🦉" judul="B. Peta Dapur" anak="Intisari pecahan bolu" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Pembilang satu" src="/doodle-mtk/mtk-4-bab2-sub1.jpg" alt="Bolu utuh dan bolu beriris tipis." kelas={kelas} kelamin={kelamin} penjelasan={["Satu iris dari bolu yang dibagi sedikit lebih besar daripada satu iris dari bolu yang dibagi banyak."]}>
          <PetaContoh pusat="Pembilang 1" cabang={[{ ikon: "🍰", judul: "Seperempat", isi: "dibagi 4" }, { ikon: "🔪", judul: "Sepersembilan", isi: "dibagi 9, lebih kecil" }, { ikon: "🏆", judul: "Pemenang", isi: "1/4" }]} kolom={["Pecahan", "Arti"]} baris={[["1/4", "satu dari empat"], ["1/9", "satu dari sembilan"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Mana yang lebih besar, 1/4 atau 1/9?" periksa={lebihBesarSeperempat} petunjuk="Pembilang sama. Penyebut kecil, potongan besar." benar="1/4 lebih besar." />
          <TulisBebas id={idKuis("B", 1)} visual={<Papan anak="1/2 · 1/10 · 1/5" />} pertanyaan="Urutkan dari yang paling kecil." pesanSalah="Penyebut besar berarti potongan kecil." bantuan="1/10, 1/5, 1/2." umpan="1/10, 1/5, 1/2." periksa={urutUnitKecil} alias={["1/10 1/5 1/2"]} konteks="Dari kecil: 1/10, 1/5, 1/2." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Penyebut sama" src="/doodle-mtk/mtk-4-bab2-sub2.jpg" alt="Irisan bolu yang ukurannya sama." kelas={kelas} kelamin={kelamin} penjelasan={["Irisan sama besar. Hitung pembilangnya."]}>
          <PetaContoh pusat="Per lima" cabang={[{ ikon: "🍰", judul: "Dua iris", isi: "2/5" }, { ikon: "🍰", judul: "Empat iris", isi: "4/5" }, { ikon: "🏆", judul: "Lebih besar", isi: "4/5" }]} kolom={["Kiri", "Kanan", "Pemenang"]} baris={[["2/5", "4/5", "4/5"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Mana yang lebih besar, 2/5 atau 4/5?" periksa={lebihBesarEmpatPerLima} petunjuk="Penyebut sama. Bandingkan pembilang." benar="4/5 lebih besar." />
          <TulisBebas id={idKuis("B", 3)} visual={<Papan anak="6/8 · 1/8 · 5/8 · 3/8" />} pertanyaan="Urutkan dari kecil ke besar." pesanSalah="Pembilang dari kecil ke besar." bantuan="1/8, 3/8, 5/8, 6/8." umpan="1/8, 3/8, 5/8, 6/8." periksa={urutPerDelapan} alias={["1/8 3/8 5/8 6/8"]} konteks="Urutan: 1/8, 3/8, 5/8, 6/8." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Senilai" src="/doodle-mtk/mtk-4-bab2-sub3.jpg" alt="Dua bolu dengan arsiran yang luasnya sama." kelas={kelas} kelamin={kelamin} penjelasan={["Kali atau bagi pembilang dan penyebut dengan bilangan yang sama."]}>
          <PetaContoh pusat="Kali sama" cabang={[{ ikon: "✖️", judul: "Dua per tiga", isi: "kali 3" }, { ikon: "✅", judul: "Enam per sembilan", isi: "senilai" }, { ikon: "🍰", judul: "Setengah", isi: "jadi 5/10" }]} kolom={["Awal", "Pengali", "Hasil"]} baris={[["2/3", "× 3", "6/9"], ["1/2", "× 5", "5/10"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="2/3 sama dengan berapa per 9?" periksa={senilaiEnamPerSembilan} petunjuk="Penyebut 3 menjadi 9. Pembilang ikut dikali." benar="6/9." />
          <TulisBebas id={idKuis("B", 5)} visual={<Papan anak="1/2 = ⬜/10" />} pertanyaan="Tulis pecahan senilainya." pesanSalah="Kali atas dan bawah dengan bilangan yang sama." bantuan="1/2 = 5/10." umpan="5/10." periksa={senilaiLimaPerSepuluh} alias={["5/10", "5"]} konteks="1/2 = 5/10." />
        </Adegan>
        <Adegan utama judul="Sub-bab 4 — Desimal" src="/doodle-mtk/mtk-4-bab2-sub4.jpg" alt="Gelas ukur dan pita sepuluh bagian." kelas={kelas} kelamin={kelamin} penjelasan={["Satu angka di belakang koma: persepuluh. Dua angka: perseratus."]}>
          <PetaContoh pusat="Koma" cabang={[{ ikon: "🥤", judul: "Nol koma enam", isi: "6/10" }, { ikon: "💯", judul: "Nol koma nol empat", isi: "4/100" }, { ikon: "👀", judul: "Cek angka", isi: "hitung angka di belakang koma" }]} kolom={["Desimal", "Pecahan"]} baris={[["0,6", "6/10"], ["0,04", "4/100"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Bacalah 0,6." periksa={bacaEnamPersepuluh} petunjuk="Satu angka di belakang koma." benar="Enam persepuluh." />
          <TulisBebas id={idKuis("B", 7)} visual={<Papan anak="0,04" />} pertanyaan="Tulis 0,04 sebagai pecahan." pesanSalah="Dua angka di belakang koma." bantuan="0,04 = 4/100." umpan="4/100." periksa={tulisEmpatPerseratus} alias={["4/100"]} konteks="0,04 = 4/100." />
        </Adegan>
        <Adegan utama judul="Sub-bab 5 — Persen" src="/doodle-mtk/mtk-4-bab2-sub5.jpg" alt="Kisi titik tanpa angka." kelas={kelas} kelamin={kelamin} penjelasan={["Perseratus dan persen memakai dasar seratus."]}>
          <PetaContoh pusat="Dari 100" cabang={[{ ikon: "🥤", judul: "Nol koma nol sembilan", isi: "9%" }, { ikon: "💯", judul: "Empat puluh perseratus", isi: "40%" }, { ikon: "🔗", judul: "Hubungan", isi: "perseratus = persen" }]} kolom={["Perseratus", "Persen"]} baris={[["9/100", "9%"], ["40/100", "40%"]]} />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="0,09 sama dengan berapa persen?" periksa={persenSembilan} petunjuk="Dua angka di belakang koma menjadi persen." benar="9 persen." />
          <TulisBebas id={idKuis("B", 9)} visual={<Papan anak="40/100" />} pertanyaan="Tulis sebagai persen." pesanSalah="Pembilang perseratus adalah persennya." bantuan="40/100 = 40%." umpan="40%." periksa={persenEmpatPuluh} alias={["40%", "40 persen"]} konteks="40/100 = 40%." />
        </Adegan>
        <Pilih id={idKuis("B", 10)} pertanyaan="Mana yang lebih besar?" visual={<Papan anak="0,8    atau    0,75" />} pilihan={[{ huruf: "A", teks: "0,75" }, { huruf: "B", teks: "0,8" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "0,08" }]} benar="B" umpan="0,8 = 0,80. Lebih besar dari 0,75." salah="Samakan dulu jumlah angka di belakang koma." />
        <KuisCocok id={idKuis("B", 11)} perintah="Pasangkan dengan pecahan senilainya." baris={[{ kiri: "2/4", pilihan: SENILAI_B, benar: "1/2" }, { kiri: "2/6", pilihan: SENILAI_B, benar: "1/3" }, { kiri: "2/8", pilihan: SENILAI_B, benar: "1/4" }]} umpan="2/4 = 1/2, 2/6 = 1/3, 2/8 = 1/4." />
        <SusunToken id={idKuis("B", 12)} perintah="Susun dari yang paling kecil." acak={["7/10", "1/10", "5/10", "3/10"]} benar={["1/10", "3/10", "5/10", "7/10"]} umpan="1/10, 3/10, 5/10, 7/10." />
        <KuisBenarSalah id={idKuis("B", 13)} perintah="Pilih benar atau salah." baris={[{ teks: "4/6 senilai dengan 2/3.", benar: true }, { teks: "1/8 lebih besar dari 1/3.", benar: false }, { teks: "0,25 sama dengan 25%.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1/3 lebih besar dari 1/8." />
        <Pilih id={idKuis("B", 14)} pertanyaan="Mana yang lebih besar, 5/8 atau 2/8?" visual={<><Irisan isi={5} dari={8} /><Irisan isi={2} dari={8} warna="bg-orange-400" /></>} pilihan={[{ huruf: "A", teks: "2/8" }, { huruf: "B", teks: "5/8" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "8/8" }]} benar="B" umpan="Penyebut sama. Pembilang 5 lebih besar." salah="Hitung iris yang berwarna." />
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
        <TulisBebas id={idKuis("D", 0)} judul="1. Urutkan potongan" visual={<Papan anak="1/10 · 1/2 · 1/5 · 1/3" />} pertanyaan="Urutkan dari yang paling besar." pesanSalah="Pembilang satu. Penyebut kecil lebih besar." bantuan="1/2, 1/3, 1/5, 1/10." umpan="1/2, 1/3, 1/5, 1/10." periksa={urutEvaluasiBesar} alias={["1/2 1/3 1/5 1/10"]} konteks="Dari besar: 1/2, 1/3, 1/5, 1/10." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Mana yang lebih besar?" visual={<><Irisan isi={5} dari={9} /><Irisan isi={2} dari={9} warna="bg-orange-400" /></>} pilihan={[{ huruf: "A", teks: "2/9" }, { huruf: "B", teks: "5/9" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "9/9" }]} benar="B" umpan="Penyebut sama. Pembilang 5 lebih besar." salah="Hitung kotak yang berwarna." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. 3/4 sama dengan berapa per 8?" periksa={senilaiEnamPerDelapan} petunjuk="Penyebut 4 menjadi 8. Pembilang ikut dikali." benar="6/8." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. 0,4 sama dengan..." pilihan={[{ huruf: "A", teks: "4/100" }, { huruf: "B", teks: "40/10" }, { huruf: "C", teks: "4/10" }, { huruf: "D", teks: "4/4" }]} benar="C" umpan="Satu angka di belakang koma: 4/10." salah="Hitung angka di belakang koma." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan desimal dengan pecahannya." baris={[{ kiri: "0,5", pilihan: PASANG_D, benar: "1/2" }, { kiri: "0,25", pilihan: PASANG_D, benar: "1/4" }, { kiri: "0,75", pilihan: PASANG_D, benar: "3/4" }]} umpan="Setengah, seperempat, dan tiga per empat." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Jadi persen" visual={<Papan anak="0,08" />} pertanyaan="Tulis 0,08 sebagai persen." pesanSalah="0,08 = 8/100." bantuan="8%." umpan="8%." periksa={persenDelapan} alias={["8%", "8 persen"]} konteks="0,08 = 8%." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. 1/2 – 2/4 – 3/6 – ⬜. Berikutnya yang senilai..." visual={<Papan anak="1/2 · 2/4 · 3/6 · ⬜" />} pilihan={[{ huruf: "A", teks: "4/6" }, { huruf: "B", teks: "3/8" }, { huruf: "C", teks: "4/8" }, { huruf: "D", teks: "5/6" }]} benar="C" umpan="Naik satu pembilang dan dua penyebut. 4/8." salah="Semua pecahan di deret itu sama dengan setengah." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Mana yang bukan senilai 1/2?" pilihan={[{ huruf: "A", teks: "2/4" }, { huruf: "B", teks: "3/6" }, { huruf: "C", teks: "5/10" }, { huruf: "D", teks: "2/5" }]} benar="D" umpan="2/4, 3/6, dan 5/10 sama dengan 1/2. 2/5 tidak." salah="Kali atau bagi atas dan bawah dengan bilangan yang sama." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Mana yang lebih besar, 1/4 atau 1/8?" periksa={lebihBesarSeperempatDariDelapan} petunjuk="Pembilang sama-sama satu." benar="1/4 lebih besar." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Igil makan 2 iris dari bolu 8 iris. Itu sama dengan..." visual={<Irisan isi={2} dari={8} />} pilihan={[{ huruf: "A", teks: "2%" }, { huruf: "B", teks: "8%" }, { huruf: "C", teks: "20%" }, { huruf: "D", teks: "25%" }]} benar="D" umpan="2/8 = 1/4 = 25%." salah="Sederhanakan 2/8 dulu, lalu ubah ke perseratus." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab2({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab2-poin.jpg", alt: "Igil dan tiga anak memegang kartu kosong di dapur, bolu di belakang." }}
        cuplikan={cuplikanKalimat(["Pembilang di atas garis, penyebut di bawah.", "Pembilang satu: penyebut kecil, potongan besar. Penyebut sama: pembilang besar, bagian banyak.", "Senilai dikali sama. Dua angka di belakang koma menjadi persen."])}
        poin={["1/2 lebih besar dari 1/8 karena penyebutnya lebih kecil.", "5/6 lebih besar dari 2/6 karena pembilangnya lebih besar.", "1/2 = 2/4 = 4/8.", "0,7 = 7/10 dan 0,08 = 8/100.", "50/100 = 0,50 = 50%."]}
        penutup="Gambar dulu irisan yang sama, baru tulis simbolnya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
