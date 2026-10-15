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
import { MISI_MTK4_BAB5, TEMA_MTK4_BAB5 } from "@/lib/misi-mtk-4-bab5";
import { MODUL_MTK4_BAB5 } from "@/lib/modul-resmi-mtk-4-bab5";
import {
  namaSamaSisi,
  namaSembarang,
  namaTrapesium,
  sisiDelapan,
  sisiDua,
  sisiEmpat,
  sisiEnam,
  sisiLima,
  sisiSatu,
  sisiSembilan,
  sisiTiga,
} from "@/lib/nilai-mtk-4-bab5";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB5.id;

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
      <HasilJawabanKuis status={status} pesanSalah="Lihat banyak sisinya, lalu susun ulang." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek sisi dan cara susunnya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function Kaca({ bentuk }: { bentuk: "segitiga" | "segiempat" }) {
  if (bentuk === "segitiga") {
    return <div className="mx-auto h-0 w-0 border-x-[36px] border-b-[56px] border-x-transparent border-b-sky-400" aria-hidden />;
  }
  return <div className="mx-auto h-16 w-16 rounded-md bg-sky-400" aria-hidden />;
}

const SISI_A = ["Segitiga", "Segiempat", "Segienam"];
const JENIS_B = ["Trapesium", "Persegi", "Segitiga sama kaki"];
const HASIL_D = ["Segilima", "Trapesium", "Belah ketupat"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB5.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪟👧👦🦉" judul="A. Bengkel Jendela" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mendeskripsikan ciri segitiga, segiempat, dan segi banyak.", "Menyusun bangun datar dengan lebih dari satu cara.", "Mengurai bangun datar dengan lebih dari satu cara."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Ciri segitiga" src="/doodle-mtk/mtk-4-bab5-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru mengamati kaca berbentuk segitiga di bengkel." kelas={kelas} kelamin={kelamin} penjelasan={["Segitiga punya sisi lurus dan tertutup. Sama sisi: semua sisi sama panjang. Sama kaki: dua sisi sama. Sembarang: semua sisi beda."]}>
          <Dialog nama="Farhan" anak="Kaca ini semua sisinya sama panjang." />
          <Dialog nama="Cinta" anak="Kaca kecil hanya sepasang sisi yang sama." />
          <Dialog nama="Igil" anak="Ada juga kaca yang semua sisinya beda." />
          <Dialog nama="Nisa" anak="Kita amati dulu, baru sebut namanya." />
          <Papan anak="semua sama    ·    sepasang sama    ·    semua beda" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Segitiga yang semua sisinya beda panjang. Sebutkan namanya." periksa={namaSembarang} petunjuk="Bukan yang semua sisinya sama, dan bukan yang hanya sepasang." benar="Segitiga sembarang." />
          <TulisBebas id={idKuis("A", 1)} judul="Banyak sisi" visual={<Kaca bentuk="segitiga" />} pertanyaan="Tulis banyak sisi pada segitiga." pesanSalah="Hitung sisi yang mengelilingi kaca." bantuan="Segitiga punya 3 sisi." umpan="3 sisi." periksa={sisiTiga} alias={["3"]} konteks="Segitiga punya 3 sisi." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Ciri segiempat" src="/doodle-mtk/mtk-4-bab5-sub2.jpg" alt="Bingkai jendela segiempat dan belah ketupat. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Jajargenjang punya dua pasang sisi berhadapan yang sejajar. Trapesium punya tepat satu pasang. Persegi: semua sisi sama dan sudutnya siku-siku."]}>
          <Dialog nama="Igil" anak="Kaca persegi ini semua sisinya sama, dan sudutnya siku-siku." />
          <Dialog nama="Nisa" anak="Kaca panjang sudutnya siku-siku. Sisi yang berhadapan sama panjang." />
          <Dialog nama="Cinta" anak="Belah ketupat semua sisinya sama. Sudutnya belum tentu siku-siku." />
          <Dialog nama="Farhan" anak="Ada kaca yang hanya satu pasang sisinya sejajar." />
          <Papan anak="sisi sama + siku    ·    sisi berhadapan sama    ·    satu pasang sejajar" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Segiempat yang punya tepat satu pasang sisi sejajar. Sebutkan namanya." periksa={namaTrapesium} petunjuk="Hanya satu pasang sisi yang sejajar." benar="Trapesium." />
          <TulisBebas id={idKuis("A", 3)} judul="Banyak sisi" visual={<Kaca bentuk="segiempat" />} pertanyaan="Tulis banyak sisi pada persegi." pesanSalah="Hitung sisi yang mengelilingi kaca." bantuan="Persegi punya 4 sisi." umpan="4 sisi." periksa={sisiEmpat} alias={["4"]} konteks="Persegi punya 4 sisi." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Menyusun bangun" src="/doodle-mtk/mtk-4-bab5-sub3.jpg" alt="Potongan kaca segitiga disusun menjadi jendela. Burung hantu bertopi biru memegang potongan." kelas={kelas} kelamin={kelamin} penjelasan={["Menyusun berarti menggabungkan beberapa bangun menjadi satu bangun baru. Cara pasangnya boleh lebih dari satu."]}>
          <Dialog nama="Farhan" anak="Enam segitiga kecil bisa disusun jadi satu segienam." />
          <Dialog nama="Nisa" anak="Empat segitiga kecil bisa jadi dua persegi." />
          <Dialog nama="Cinta" anak="Cara susunnya lebih dari satu." />
          <Dialog nama="Igil" anak="Itu komposisi. Banyak potongannya tetap." />
          <Papan anak="🔺🔺🔺🔺🔺🔺    atau    🔺🔺 = 🟦" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Ada segitiga di kiri, di tengah, dan di kanan. Semuanya disusun jadi satu trapesium. Ada berapa segitiga?" periksa={sisiTiga} petunjuk="Hitung semua segitiga yang disusun." benar="3 segitiga." />
          <TulisBebas id={idKuis("A", 5)} judul="Petak segitiga" visual={<Papan anak="3 baris × 3 kolom" />} pertanyaan="Tulis banyak segitiga pada susunan itu." pesanSalah="Kalikan banyak baris dengan banyak kolom." bantuan="3 × 3 = 9." umpan="9 segitiga." periksa={sisiSembilan} alias={["9"]} konteks="3 baris kali 3 kolom sama dengan 9 segitiga." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Mengurai bangun" src="/doodle-mtk/mtk-4-bab5-sub4.jpg" alt="Satu kaca persegi dipotong menjadi bagian. Burung hantu bertopi biru dan tiga anak melihat hasilnya." kelas={kelas} kelamin={kelamin} penjelasan={["Mengurai berarti memotong satu bangun menjadi beberapa bangun. Cara urainya boleh lebih dari satu."]}>
          <Dialog nama="Cinta" anak="Satu persegi bisa diurai jadi empat segitiga kecil yang sama." />
          <Dialog nama="Igil" anak="Persegi panjang bisa diurai jadi dua persegi yang sama." />
          <Dialog nama="Nisa" anak="Cara urainya lebih dari satu." />
          <Dialog nama="Farhan" anak="Itu dekomposisi. Satu kaca menjadi beberapa kaca." />
          <Papan anak="1 persegi  →  beberapa bagian" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Satu segienam diurai dari titik tengah menjadi segitiga. Ada berapa segitiga?" periksa={sisiEnam} petunjuk="Banyak segitiga sama dengan banyak sisi bangun itu." benar="6 segitiga." />
          <TulisBebas id={idKuis("A", 7)} judul="Persegi kecil" visual={<Papan anak="2 baris × 4 kolom" />} pertanyaan="Tulis banyak persegi kecil pada urutan itu." pesanSalah="Kalikan banyak baris dengan banyak kolom." bantuan="2 × 4 = 8." umpan="8 persegi kecil." periksa={sisiDelapan} alias={["8"]} konteks="2 baris kali 4 kolom sama dengan 8 persegi kecil." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Segitiga sama sisi juga boleh disebut..." visual={<Kaca bentuk="segitiga" />} pilihan={[{ huruf: "A", teks: "Sembarang" }, { huruf: "B", teks: "Sama kaki" }, { huruf: "C", teks: "Trapesium" }, { huruf: "D", teks: "Lingkaran" }]} benar="B" umpan="Semua ciri sama kaki ada pada sama sisi." salah="Lihat berapa sisi yang sama panjang." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan banyak sisi dengan namanya." baris={[{ kiri: "3 sisi", pilihan: SISI_A, benar: "Segitiga" }, { kiri: "4 sisi", pilihan: SISI_A, benar: "Segiempat" }, { kiri: "6 sisi", pilihan: SISI_A, benar: "Segienam" }]} umpan="3 sisi segitiga, 4 sisi segiempat, 6 sisi segienam." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun dari yang sisinya paling sedikit." acak={["4 sisi", "6 sisi", "3 sisi", "5 sisi"]} benar={["3 sisi", "4 sisi", "5 sisi", "6 sisi"]} umpan="3 sisi, 4 sisi, 5 sisi, 6 sisi." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Trapesium punya tepat satu pasang sisi sejajar.", benar: true }, { teks: "Persegi tidak punya sudut siku-siku.", benar: false }, { teks: "Satu kumpulan kaca bisa disusun dengan lebih dari satu cara.", benar: true }]} umpan="Yang pertama dan ketiga benar. Persegi punya sudut siku-siku." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Belah ketupat yang sudutnya siku-siku disebut..." visual={<Kaca bentuk="segiempat" />} pilihan={[{ huruf: "A", teks: "Trapesium" }, { huruf: "B", teks: "Lingkaran" }, { huruf: "C", teks: "Persegi" }, { huruf: "D", teks: "Segitiga" }]} benar="C" umpan="Sisi sama dan sudut siku-siku. Itu persegi." salah="Persegi punya sisi sama dan sudut siku-siku." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB5.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🪟" judul="B. Peta Jendela" anak="Intisari ciri dan susun" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Macam segitiga" src="/doodle-mtk/mtk-4-bab5-sub1.jpg" alt="Kaca segitiga di bengkel jendela." kelas={kelas} kelamin={kelamin} penjelasan={["Amati sisi yang sama panjang. Sama sisi, sama kaki, dan sembarang adalah tiga macam segitiga."]}>
          <PetaContoh pusat="3 macam" cabang={[{ ikon: "🔺", judul: "Sama sisi", isi: "semua sisi sama" }, { ikon: "🔷", judul: "Sama kaki", isi: "sepasang sisi sama" }, { ikon: "🦉", judul: "Sembarang", isi: "semua sisi beda" }]} kolom={["Macam", "Ciri"]} baris={[["Sama sisi", "semua sama"], ["Sama kaki", "sepasang sama"], ["Sembarang", "semua beda"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Segilima punya berapa sisi? Sebutkan angkanya." periksa={sisiLima} petunjuk="Nama segilima mengikuti banyak sisinya." benar="5 sisi." />
          <TulisBebas id={idKuis("B", 1)} judul="Sudut segienam" visual={<Papan anak="segienam" />} pertanyaan="Tulis banyak sudut pada segienam." pesanSalah="Banyak sudut sama dengan banyak sisi." bantuan="Segienam punya 6 sudut." umpan="6 sudut." periksa={sisiEnam} alias={["6"]} konteks="Segienam punya 6 sudut." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Macam segiempat" src="/doodle-mtk/mtk-4-bab5-sub2.jpg" alt="Bingkai jendela segiempat." kelas={kelas} kelamin={kelamin} penjelasan={["Lihat sisi yang sejajar dan sudut yang siku-siku. Itu membedakan jajargenjang, trapesium, dan persegi."]}>
          <PetaContoh pusat="Sejajar" cabang={[{ ikon: "🟧", judul: "Jajargenjang", isi: "berhadapan sejajar" }, { ikon: "🪟", judul: "Trapesium", isi: "tepat satu pasang" }, { ikon: "🟦", judul: "Persegi", isi: "sisi sama dan siku" }]} kolom={["Bangun", "Ciri"]} baris={[["Jajargenjang", "berhadapan sejajar"], ["Trapesium", "tepat satu pasang"], ["Persegi", "sisi sama, siku"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Jajargenjang punya berapa pasang sisi berhadapan yang sejajar?" periksa={sisiDua} petunjuk="Bukan tepat satu pasang." benar="2 pasang." />
          <TulisBebas id={idKuis("B", 3)} judul="Sudut siku" visual={<Kaca bentuk="segiempat" />} pertanyaan="Tulis banyak sudut siku-siku pada persegi panjang." pesanSalah="Setiap pojok persegi panjang siku-siku." bantuan="Ada 4 sudut siku-siku." umpan="4 sudut." periksa={sisiEmpat} alias={["4"]} konteks="Persegi panjang punya 4 sudut siku-siku." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Cara menyusun" src="/doodle-mtk/mtk-4-bab5-sub3.jpg" alt="Potongan kaca disusun menjadi jendela." kelas={kelas} kelamin={kelamin} penjelasan={["Dua segitiga yang sama dapat menjadi persegi panjang. Enam segitiga sama dapat menjadi segienam."]}>
          <PetaContoh pusat="Susun" cabang={[{ ikon: "🔺", judul: "Dua segitiga", isi: "jadi persegi panjang" }, { ikon: "🔷", judul: "Enam segitiga", isi: "jadi segienam" }, { ikon: "🔁", judul: "Cara lain", isi: "banyaknya tetap" }]} kolom={["Potongan", "Hasil"]} baris={[["2 segitiga", "persegi panjang"], ["6 segitiga", "segienam"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Ada dua kaca persegi dan satu kaca segitiga. Semuanya disusun jadi satu jendela. Ada berapa kaca?" periksa={sisiTiga} petunjuk="Jumlahkan kaca persegi dan kaca segitiga." benar="3 kaca." />
          <TulisBebas id={idKuis("B", 5)} judul="Dua baris" visual={<Papan anak="2 baris × 4 kolom" />} pertanyaan="Tulis banyak persegi kecil pada susunan itu." pesanSalah="Kalikan banyak baris dengan banyak kolom." bantuan="2 × 4 = 8." umpan="8 persegi kecil." periksa={sisiDelapan} alias={["8"]} konteks="2 baris kali 4 kolom sama dengan 8 persegi kecil." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Cara mengurai" src="/doodle-mtk/mtk-4-bab5-sub4.jpg" alt="Satu kaca dipotong menjadi beberapa bagian." kelas={kelas} kelamin={kelamin} penjelasan={["Satu persegi dapat diurai menjadi dua segitiga. Cara lain: kedua diagonal membuat empat segitiga."]}>
          <PetaContoh pusat="Urai" cabang={[{ ikon: "✂️", judul: "Satu garis", isi: "dua segitiga" }, { ikon: "🟦", judul: "Cara lain", isi: "potong lagi" }, { ikon: "🦉", judul: "Tetap satu", isi: "asalnya satu kaca" }]} kolom={["Cara", "Hasil"]} baris={[["Satu garis", "2 segitiga"], ["Cara lain", "bagian baru"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Satu persegi dipotong kedua diagonalnya. Ada berapa segitiga?" periksa={sisiEmpat} petunjuk="Dua garis silang membagi bagian yang sama." benar="4 segitiga." />
          <TulisBebas id={idKuis("B", 7)} judul="Petak kecil" visual={<Papan anak="3 baris × 3 kolom" />} pertanyaan="Tulis banyak persegi kecil pada urutan itu." pesanSalah="Kalikan banyak baris dengan banyak kolom." bantuan="3 × 3 = 9." umpan="9 persegi kecil." periksa={sisiSembilan} alias={["9"]} konteks="3 baris kali 3 kolom sama dengan 9 persegi kecil." />
        </Adegan>
        <Pilih id={idKuis("B", 8)} pertanyaan="Mana yang boleh disebut layang-layang?" pilihan={[{ huruf: "A", teks: "Lingkaran" }, { huruf: "B", teks: "Belah ketupat" }, { huruf: "C", teks: "Segitiga" }, { huruf: "D", teks: "Trapesium" }]} benar="B" umpan="Semua ciri layang-layang ada pada belah ketupat." salah="Layang-layang punya dua pasang sisi berdekatan yang sama." />
        <KuisCocok id={idKuis("B", 9)} perintah="Pasangkan ciri dengan namanya." baris={[{ kiri: "Tepat 1 pasang sejajar", pilihan: JENIS_B, benar: "Trapesium" }, { kiri: "4 sisi sama dan siku", pilihan: JENIS_B, benar: "Persegi" }, { kiri: "2 sisi sama", pilihan: JENIS_B, benar: "Segitiga sama kaki" }]} umpan="Trapesium, persegi, dan segitiga sama kaki." />
        <SusunToken id={idKuis("B", 10)} perintah="Susun dari yang sisinya paling sedikit." acak={["5 sisi", "3 sisi", "6 sisi", "4 sisi"]} benar={["3 sisi", "4 sisi", "5 sisi", "6 sisi"]} umpan="3 sisi, 4 sisi, 5 sisi, 6 sisi." />
        <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Segitiga sama sisi boleh disebut sama kaki.", benar: true }, { teks: "Trapesium punya dua pasang sisi sejajar.", benar: false }, { teks: "Satu persegi hanya bisa diurai dengan satu cara.", benar: false }]} umpan="Hanya yang pertama benar. Trapesium tepat satu pasang. Persegi bisa diurai dengan lebih dari satu cara." />
        <Pilih id={idKuis("B", 12)} pertanyaan="Satu persegi diurai jadi 2 persegi panjang. Tiap persegi panjang diurai jadi 2 segitiga. Ada berapa segitiga?" visual={<Papan anak="1 persegi → 2 bagian → segitiga" />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "6" }]} benar="C" umpan="2 × 2 = 4 segitiga." salah="Kalikan banyak bagian dengan segitiga di setiap bagian." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB5.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪟🦉" judul={kartu.judul} anak="Sepuluh pos jendela" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab5-permainan.jpg" alt="Sepuluh kaca jendela kosong berjajar. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal ciri dan susun. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB5} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB5} penutup="Bengkel sepi. Igil menempelkan stempel kaca." bunga="🪟🔷🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB5.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Bengkel Jendela" : skor >= 6 ? "🪟 Penjaga Kaca" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Ciri dan susunanmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru jendela." : "Ayo amati sisi dan susunannya lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab5-evaluasi.jpg" alt="Meja bengkel dengan kertas kosong dan potongan kaca. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Sisi segitiga" visual={<Kaca bentuk="segitiga" />} pertanyaan="Tulis banyak sisi pada segitiga." pesanSalah="Hitung sisi yang mengelilingi kaca." bantuan="Segitiga punya 3 sisi." umpan="3 sisi." periksa={sisiTiga} alias={["3"]} konteks="Segitiga punya 3 sisi." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Mana ciri persegi yang tidak selalu ada pada persegi panjang?" pilihan={[{ huruf: "A", teks: "4 sisi" }, { huruf: "B", teks: "4 sudut siku-siku" }, { huruf: "C", teks: "Semua sisi sama panjang" }, { huruf: "D", teks: "Sisi berhadapan sama" }]} benar="C" umpan="Persegi panjang belum tentu semua sisinya sama." salah="Persegi panjang punya sudut siku-siku, tetapi sisinya belum tentu semua sama." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Segitiga yang ketiga sisinya sama panjang. Sebutkan namanya." periksa={namaSamaSisi} petunjuk="Lihat yang semua sisinya sama panjang." benar="Segitiga sama sisi." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Satu layang-layang diurai jadi segitiga. Biasanya ada berapa segitiga?" visual={<Papan anak="layang-layang" />} pilihan={[{ huruf: "A", teks: "4" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "6" }, { huruf: "D", teks: "8" }]} benar="B" umpan="Satu garis di tengah membuat 2 segitiga." salah="Layang-layang dapat dibagi pada diagonalnya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan ciri dengan bangunnya." baris={[{ kiri: "5 sisi", pilihan: HASIL_D, benar: "Segilima" }, { kiri: "Tepat 1 pasang sejajar", pilihan: HASIL_D, benar: "Trapesium" }, { kiri: "4 sisi sama", pilihan: HASIL_D, benar: "Belah ketupat" }]} umpan="Segilima, trapesium, dan belah ketupat." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Petak kecil" visual={<Papan anak="2 baris × 2 kolom" />} pertanyaan="Tulis banyak persegi kecil pada urutan itu." pesanSalah="Kalikan banyak baris dengan banyak kolom." bantuan="2 × 2 = 4." umpan="4 persegi kecil." periksa={sisiEmpat} alias={["4"]} konteks="2 baris kali 2 kolom sama dengan 4 persegi kecil." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Segitiga sama sisi boleh disebut sama kaki. Alasannya..." pilihan={[{ huruf: "A", teks: "Semua sisinya beda" }, { huruf: "B", teks: "Semua ciri sama kaki ada pada sama sisi" }, { huruf: "C", teks: "Hanya punya 1 sisi" }, { huruf: "D", teks: "Bukan segitiga" }]} benar="B" umpan="Dua sisi sama sudah ada pada sama kaki. Sama sisi punya lebih dari itu." salah="Bandingkan ciri yang dimiliki keduanya." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Enam segitiga sama disusun mengelilingi satu titik. Bangun yang mungkin..." visual={<Papan anak="🔺 di sekeliling titik" />} pilihan={[{ huruf: "A", teks: "Segitiga" }, { huruf: "B", teks: "Segiempat" }, { huruf: "C", teks: "Segienam" }, { huruf: "D", teks: "Lingkaran" }]} benar="C" umpan="Enam segitiga sama mengelilingi satu titik dapat menjadi segienam." salah="Hitung segitiga yang mengelilingi titik itu." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Trapesium punya tepat berapa pasang sisi sejajar? Sebutkan angkanya." periksa={sisiSatu} petunjuk="Bukan dua pasang." benar="1 pasang." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Persegi panjang diurai jadi dua persegi. Tiap persegi diurai jadi dua segitiga. Ada berapa segitiga?" visual={<Papan anak="2 persegi → segitiga" />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "8" }, { huruf: "D", teks: "4" }]} benar="D" umpan="2 persegi × 2 segitiga = 4 segitiga." salah="Kalikan banyak persegi dengan segitiga di setiap persegi." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab5({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab5-poin.jpg", alt: "Igil dan tiga anak di bengkel jendela memegang kaca." }}
        cuplikan={cuplikanKalimat(["Ciri bangun dilihat dari sisi, sudut, dan sisi yang sejajar.", "Menyusun menggabungkan beberapa bangun. Mengurai memotong satu bangun.", "Cara susun dan cara urai boleh lebih dari satu."])}
        poin={["Segitiga: sama sisi, sama kaki, atau sembarang.", "Sama sisi boleh disebut sama kaki.", "Trapesium punya tepat satu pasang sisi sejajar. Jajargenjang punya dua pasang.", "Persegi: semua sisi sama dan sudutnya siku-siku.", "Satu kumpulan kaca dapat disusun atau diurai dengan lebih dari satu cara."]}
        penutup="Amati sisinya dulu, baru susun atau urai."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
