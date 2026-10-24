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
  jarakTigaRatus,
  namaSamaSisi,
  namaSembarang,
  namaTrapesium,
  sisiDua,
  sisiEmpat,
  sisiEnam,
  sisiLima,
  sisiSatu,
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
        <Adegan utama judul="Sub-bab A — Ciri segitiga" src="/doodle-mtk/mtk-4-bab5-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru mengamati kaca berbentuk segitiga di bengkel." kelas={kelas} kelamin={kelamin} penjelasan={["Segitiga punya 3 sisi dan 3 sudut. Sama kaki punya 2 sisi sama. Sama sisi punya semua sisi sama. Sembarang tidak punya sisi yang sama."]}>
          <Dialog nama="Farhan" anak="Kaca ABC: dua sisi sama panjang. Itu sama kaki." />
          <Dialog nama="Cinta" anak="Kaca PQR: ketiga sisinya sama. Itu sama sisi." />
          <Dialog nama="Igil" anak="Sama sisi boleh disebut sama kaki. Semua cirinya ada di sana." />
          <Dialog nama="Nisa" anak="Kaca DEF semua sisinya beda. Itu sembarang." />
          <Papan anak="sama kaki 2  ·  sama sisi 3  ·  sembarang beda" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tiga macam sisi</p>
          <PetaContoh pusat="3 sisi" cabang={[{ ikon: "🔺", judul: "Sama kaki", isi: "2 sisi sama" }, { ikon: "🔷", judul: "Sama sisi", isi: "semua sisi sama" }, { ikon: "🦉", judul: "Sembarang", isi: "tidak ada yang sama" }]} kolom={["Macam", "Ciri sisi"]} baris={[["Sama kaki", "2 sama"], ["Sama sisi", "3 sama"], ["Sembarang", "tidak ada yang sama"]]} />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Segitiga yang semua sisinya beda panjang. Sebutkan namanya." periksa={namaSembarang} petunjuk="Bukan yang semua sisinya sama, dan bukan yang hanya dua sisi sama." benar="Segitiga sembarang." />
          <TulisBebas id={idKuis("A", 1)} judul="Banyak sisi" visual={<Kaca bentuk="segitiga" />} pertanyaan="Tulis banyak sisi pada segitiga." pesanSalah="Hitung sisi yang mengelilingi kaca." bantuan="Segitiga punya 3 sisi." umpan="3 sisi." periksa={sisiTiga} alias={["3"]} konteks="Segitiga punya 3 sisi." />
        </Adegan>
        <Adegan utama judul="Sub-bab A — Ciri segiempat" src="/doodle-mtk/mtk-4-bab5-sub2.jpg" alt="Bingkai jendela segiempat dan belah ketupat. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Jajargenjang punya dua pasang sisi berhadapan yang sejajar. Trapesium punya tepat satu pasang. Persegi adalah belah ketupat yang sudutnya siku-siku."]}>
          <Dialog nama="Igil" anak="Persegi panjang ABCD punya 4 sudut siku-siku." />
          <Dialog nama="Nisa" anak="Belah ketupat semua sisinya sama, dan dua pasang sisinya sejajar." />
          <Dialog nama="Cinta" anak="Kalau belah ketupat itu siku-siku, namanya persegi." />
          <Dialog nama="Farhan" anak="Trapesium punya tepat satu pasang sisi sejajar. Jangan lupa kata tepat." />
          <Papan anak="trapesium: tepat 1 pasang    ·    jajargenjang: 2 pasang" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tepat sepasang</p>
          <PetaContoh pusat="Sejajar" cabang={[{ ikon: "🟧", judul: "Jajargenjang", isi: "2 pasang sejajar" }, { ikon: "🪟", judul: "Trapesium", isi: "tepat 1 pasang" }, { ikon: "🟦", judul: "Persegi", isi: "sisi sama dan siku" }]} kolom={["Bangun", "Ciri"]} baris={[["Jajargenjang", "2 pasang"], ["Trapesium", "tepat 1 pasang"], ["Persegi", "sisi sama, siku"]]} />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Segiempat yang punya tepat satu pasang sisi sejajar. Sebutkan namanya." periksa={namaTrapesium} petunjuk="Hanya tepat satu pasang sisi yang sejajar." benar="Trapesium." />
          <TulisBebas id={idKuis("A", 3)} judul="Banyak sisi" visual={<Kaca bentuk="segiempat" />} pertanyaan="Tulis banyak sisi pada persegi." pesanSalah="Hitung sisi yang mengelilingi kaca." bantuan="Persegi punya 4 sisi." umpan="4 sisi." periksa={sisiEmpat} alias={["4"]} konteks="Persegi punya 4 sisi." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Menyusun bangun" src="/doodle-mtk/mtk-4-bab5-sub3.jpg" alt="Potongan kaca segitiga disusun menjadi jendela. Burung hantu bertopi biru memegang potongan." kelas={kelas} kelamin={kelamin} penjelasan={["Menyusun berarti menggabungkan beberapa bangun menjadi satu bangun baru. Cara pasangnya boleh lebih dari satu."]}>
          <Dialog nama="Farhan" anak="Tiga lidi tersambung jadi segitiga. Empat lidi jadi segiempat." />
          <Dialog nama="Nisa" anak="Lima lidi jadi segilima. Enam lidi jadi segienam." />
          <Dialog nama="Cinta" anak="Enam segitiga sama bisa disusun jadi satu segienam." />
          <Dialog nama="Igil" anak="Itu menyusun. Cara pasangnya boleh lebih dari satu." />
          <Papan anak="3 lidi → segitiga    ·    6 lidi → segienam" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Menyusun</p>
          <PetaContoh pusat="Gabung" cabang={[{ ikon: "🥢", judul: "3 lidi", isi: "segitiga" }, { ikon: "🪟", judul: "4 lidi", isi: "segiempat" }, { ikon: "🔷", judul: "6 segitiga", isi: "segienam" }]} kolom={["Potongan", "Hasil"]} baris={[["3 lidi", "segitiga"], ["5 lidi", "segilima"], ["6 segitiga", "segienam"]]} />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Segitiga sama kaki punya berapa sisi yang sama panjang? Sebutkan angkanya." periksa={sisiDua} petunjuk="Bukan ketiga sisinya." benar="2 sisi." />
          <TulisBebas id={idKuis("A", 5)} judul="Lima lidi" visual={<Papan anak="5 lidi tersambung" />} pertanyaan="Tulis banyak sisi pada segilima." pesanSalah="Banyak sisi sama dengan banyak lidi yang tersambung." bantuan="Lima lidi membuat 5 sisi." umpan="5 sisi." periksa={sisiLima} alias={["5"]} konteks="Segilima punya 5 sisi." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Mengurai bangun" src="/doodle-mtk/mtk-4-bab5-sub4.jpg" alt="Satu kaca persegi dipotong menjadi bagian. Burung hantu bertopi biru dan tiga anak melihat hasilnya." kelas={kelas} kelamin={kelamin} penjelasan={["Mengurai berarti memotong satu bangun menjadi beberapa bangun. Cara urainya boleh lebih dari satu."]}>
          <Dialog nama="Cinta" anak="Satu segienam diurai dari titik tengah jadi 6 segitiga." />
          <Dialog nama="Igil" anak="Taman itu segienam. Satu sisi 50 m." />
          <Dialog nama="Nisa" anak="Kelilingnya 50 × 6 = 300 m." />
          <Dialog nama="Farhan" anak="Satu kaca boleh diurai dengan lebih dari satu cara." />
          <Papan anak="50 m × 6 = 300 m" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Mengurai</p>
          <PetaContoh pusat="300 m" cabang={[{ ikon: "🌳", judul: "Taman", isi: "segienam" }, { ikon: "📏", judul: "Satu sisi", isi: "50 m" }, { ikon: "✂️", judul: "Dari tengah", isi: "6 segitiga" }]} kolom={["Cara", "Hasil"]} baris={[["1 sisi", "50 m"], ["6 sisi", "300 m"], ["Dari tengah", "6 segitiga"]]} />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Satu segienam diurai dari titik tengah menjadi segitiga. Ada berapa segitiga?" periksa={sisiEnam} petunjuk="Banyak segitiga sama dengan banyak sisi bangun itu." benar="6 segitiga." />
          <TulisBebas id={idKuis("A", 7)} judul="Keliling taman" visual={<Papan anak="50 m × 6" />} pertanyaan="Tulis jarak keliling taman segienam itu." pesanSalah="Kalikan panjang satu sisi dengan banyak sisi." bantuan="50 × 6 = 300." umpan="300 m." periksa={jarakTigaRatus} alias={["300"]} konteks="50 meter kali 6 sama dengan 300 meter." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Segitiga sama sisi juga boleh disebut..." visual={<Kaca bentuk="segitiga" />} pilihan={[{ huruf: "A", teks: "Sembarang" }, { huruf: "B", teks: "Sama kaki" }, { huruf: "C", teks: "Trapesium" }, { huruf: "D", teks: "Lingkaran" }]} benar="B" umpan="Semua ciri sama kaki ada pada sama sisi." salah="Lihat berapa sisi yang sama panjang." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan banyak sisi dengan namanya." baris={[{ kiri: "3 sisi", pilihan: SISI_A, benar: "Segitiga" }, { kiri: "4 sisi", pilihan: SISI_A, benar: "Segiempat" }, { kiri: "6 sisi", pilihan: SISI_A, benar: "Segienam" }]} umpan="3 sisi segitiga, 4 sisi segiempat, 6 sisi segienam." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun dari yang sisinya paling sedikit." acak={["4 sisi", "6 sisi", "3 sisi", "5 sisi"]} benar={["3 sisi", "4 sisi", "5 sisi", "6 sisi"]} umpan="3 sisi, 4 sisi, 5 sisi, 6 sisi." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Trapesium punya tepat satu pasang sisi sejajar.", benar: true }, { teks: "Persegi tidak punya sudut siku-siku.", benar: false }, { teks: "Satu kumpulan kaca bisa disusun dengan lebih dari satu cara.", benar: true }]} umpan="Yang pertama dan ketiga benar. Persegi punya sudut siku-siku." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Belah ketupat yang sudutnya siku-siku disebut..." visual={<Kaca bentuk="segiempat" />} pilihan={[{ huruf: "A", teks: "Trapesium" }, { huruf: "B", teks: "Lingkaran" }, { huruf: "C", teks: "Persegi" }, { huruf: "D", teks: "Segitiga" }]} benar="C" umpan="Sisi sama dan sudut siku-siku. Itu persegi." salah="Persegi punya sisi sama dan sudut siku-siku." />
        <Pilih id={idKuis("B", 0)} pertanyaan="Mana yang boleh disebut layang-layang?" pilihan={[{ huruf: "A", teks: "Lingkaran" }, { huruf: "B", teks: "Belah ketupat" }, { huruf: "C", teks: "Segitiga" }, { huruf: "D", teks: "Trapesium" }]} benar="B" umpan="Belah ketupat punya dua pasang sisi berdekatan yang sama." salah="Layang-layang punya dua pasang sisi berdekatan yang sama." />
        <KuisCocok id={idKuis("B", 1)} perintah="Pasangkan ciri dengan namanya." baris={[{ kiri: "Tepat 1 pasang sejajar", pilihan: JENIS_B, benar: "Trapesium" }, { kiri: "4 sisi sama dan siku", pilihan: JENIS_B, benar: "Persegi" }, { kiri: "2 sisi sama", pilihan: JENIS_B, benar: "Segitiga sama kaki" }]} umpan="Trapesium, persegi, dan segitiga sama kaki." />
        <SusunToken id={idKuis("B", 2)} perintah="Susun dari yang sisinya paling sedikit." acak={["5 sisi", "3 sisi", "6 sisi", "4 sisi"]} benar={["3 sisi", "4 sisi", "5 sisi", "6 sisi"]} umpan="3 sisi, 4 sisi, 5 sisi, 6 sisi." />
        <KuisBenarSalah id={idKuis("B", 3)} perintah="Pilih benar atau salah." baris={[{ teks: "Segitiga sama sisi boleh disebut sama kaki.", benar: true }, { teks: "Trapesium punya dua pasang sisi sejajar.", benar: false }, { teks: "Satu persegi hanya bisa diurai dengan satu cara.", benar: false }]} umpan="Hanya yang pertama benar. Trapesium tepat satu pasang. Persegi bisa diurai dengan lebih dari satu cara." />
        <Pilih id={idKuis("B", 4)} pertanyaan="Satu persegi diurai jadi 2 persegi panjang. Tiap persegi panjang diurai jadi 2 segitiga. Ada berapa segitiga?" visual={<Papan anak="1 persegi → 2 bagian → segitiga" />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "6" }]} benar="C" umpan="2 × 2 = 4 segitiga." salah="Kalikan banyak bagian dengan segitiga di setiap bagian." />
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
        <TulisBebas id={idKuis("D", 5)} judul="6. Sudut siku" visual={<Papan anak="persegi panjang ABCD" />} pertanyaan="Tulis banyak sudut siku-siku pada persegi panjang." pesanSalah="Setiap pojok persegi panjang siku-siku." bantuan="Ada 4 sudut siku-siku." umpan="4 sudut." periksa={sisiEmpat} alias={["4"]} konteks="Persegi panjang punya 4 sudut siku-siku." />
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
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab5-poin.jpg", alt: "Igil dan tiga anak di bengkel jendela memegang kaca." }}
        cuplikan={cuplikanKalimat(["Ciri bangun dilihat dari sisi, sudut, dan sisi yang sejajar.", "Sama sisi boleh disebut sama kaki. Trapesium punya tepat satu pasang.", "Menyusun menggabungkan. Mengurai memotong. Caranya boleh lebih dari satu."])}
        poin={["Sama kaki: 2 sisi sama. Sama sisi: semua sisi sama. Sembarang: tidak ada yang sama.", "Sama sisi boleh disebut sama kaki. Siku-siku boleh sekaligus sama kaki.", "Trapesium tepat 1 pasang sejajar. Jajargenjang 2 pasang. Persegi adalah belah ketupat yang siku-siku.", "Layang-layang punya dua pasang sisi berdekatan yang sama panjang.", "Taman segienam, satu sisi 50 m, kelilingnya 300 m."]}
        penutup="Amati sisinya dulu, baru susun atau urai."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
