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
import { MISI_MTK4_BAB6, TEMA_MTK4_BAB6 } from "@/lib/misi-mtk-4-bab6";
import { MODUL_MTK4_BAB6 } from "@/lib/modul-resmi-mtk-4-bab6";
import {
  jumlahDelapan,
  jumlahDelapanBelas,
  jumlahDuaBelas,
  jumlahEmpatBelas,
  jumlahEnam,
  jumlahLima,
  jumlahSebelas,
  jumlahSepuluh,
  jumlahSembilan,
  jumlahTiga,
  jumlahTujuh,
} from "@/lib/nilai-mtk-4-bab6";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB6.id;

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
      <HasilJawabanKuis status={status} pesanSalah="Lihat kuncinya, lalu susun dari yang paling sedikit." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek kunci gambar atau ujung batang, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function DeretMangga({ jumlah }: { jumlah: number }) {
  return (
    <p className="text-center text-3xl leading-relaxed tracking-wide">
      {Array.from({ length: jumlah }, () => "🥭").join(" ")}
    </p>
  );
}

function Batang({ tinggi }: { tinggi: number }) {
  return (
    <div className="mx-auto flex h-28 w-16 items-end justify-center rounded-lg bg-amber-50" aria-hidden>
      <div className="w-10 rounded-t-md bg-amber-500" style={{ height: `${tinggi}%` }} />
    </div>
  );
}

const HASIL_A = ["5 mangga", "6 mangga", "8 mangga"];
const JENIS_B = ["Piktogram", "Diagram batang", "Kunci gambar"];
const HASIL_D = ["6 mangga", "8 mangga", "11 mangga"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🥭👧👦🦉" judul="A. Lapak Mangga" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Menyajikan data dalam bentuk piktogram.", "Menginterpretasikan data dalam bentuk piktogram.", "Menyajikan data dalam bentuk diagram batang.", "Menginterpretasikan data dalam bentuk diagram batang."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Menyusun piktogram" src="/doodle-mtk/mtk-4-bab6-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru menyusun gambar mangga di lapak." kelas={kelas} kelamin={kelamin} penjelasan={["Piktogram menyajikan data dengan gambar. Satu baris memakai gambar yang sama. Baca judul dan kuncinya."]}>
          <Dialog nama="Nisa" anak="Hari ini aku jual 6 mangga." />
          <Dialog nama="Farhan" anak="Aku jual 4." />
          <Dialog nama="Cinta" anak="Aku jual 8. Satu gambar untuk satu mangga." />
          <Dialog nama="Igil" anak="Gambarnya harus sama. Jangan lupa judul dan kunci." />
          <Papan anak="🥭 = 1 mangga" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Mangga, mangga, mangga. Satu gambar berarti satu mangga. Berapa mangga?" periksa={jumlahTiga} petunjuk="Hitung gambar yang disebut." benar="3 mangga." />
          <TulisBebas id={idKuis("A", 1)} judul="Gambar mangga" visual={<DeretMangga jumlah={5} />} pertanyaan="Satu gambar = 1 mangga. Tulis banyak mangga." pesanSalah="Hitung gambarnya." bantuan="Ada 5 gambar. Kunci 1, jadi 5." umpan="5 mangga." periksa={jumlahLima} alias={["5"]} konteks="Lima gambar dengan kunci 1 sama dengan 5 mangga." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Membaca piktogram" src="/doodle-mtk/mtk-4-bab6-sub2.jpg" alt="Papan gambar mangga di lapak. Burung hantu bertopi biru menunjuk kuncinya." kelas={kelas} kelamin={kelamin} penjelasan={["Jika satu gambar mewakili lebih dari satu mangga, kalikan banyak gambar dengan kunci."]}>
          <Dialog nama="Igil" anak="Di papan ini ada 4 gambar. Kuncinya satu gambar = 2 mangga." />
          <Dialog nama="Nisa" anak="4 kali 2 sama dengan 8 mangga." />
          <Dialog nama="Farhan" anak="Kalau kuncinya bukan 1, jangan cuma hitung gambarnya." />
          <Dialog nama="Cinta" anak="Aku baca kunci dulu, baru menghitung." />
          <Papan anak="🥭🥭🥭🥭    kunci 2" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Ada 6 gambar. Satu gambar = 2 mangga. Berapa banyaknya?" periksa={jumlahDuaBelas} petunjuk="Kalikan banyak gambar dengan nilai kuncinya." benar="12 mangga." />
          <TulisBebas id={idKuis("A", 3)} judul="Kunci dua" visual={<DeretMangga jumlah={7} />} pertanyaan="Satu gambar = 2 mangga. Tulis banyak mangga." pesanSalah="Hitung gambar, lalu kalikan dengan kunci." bantuan="7 kali 2 sama dengan 14." umpan="14 mangga." periksa={jumlahEmpatBelas} alias={["14"]} konteks="Tujuh gambar dengan kunci 2 sama dengan 14 mangga." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Menyusun diagram batang" src="/doodle-mtk/mtk-4-bab6-sub3.jpg" alt="Diagram batang kosong di lapak mangga. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Diagram batang memakai batang tegak atau mendatar. Ujung batang mengikuti data. Judul dan angka pada sumbu wajib ada."]}>
          <Dialog nama="Cinta" anak="Batang Senin sampai 4." />
          <Dialog nama="Farhan" anak="Batang Selasa sampai 7." />
          <Dialog nama="Nisa" anak="Batang Rabu sampai 5. Yang paling tinggi paling banyak." />
          <Dialog nama="Igil" anak="Sumbu angka dan judul harus ada." />
          <Papan anak="Senin 4    ·    Selasa 7    ·    Rabu 5" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Batang hari Kamis lebih tinggi dari 8 dan lebih rendah dari 10. Ujungnya tepat di tengah. Berapa mangga?" periksa={jumlahSembilan} petunjuk="Cari bilangan di antara dua angka itu." benar="9 mangga." />
          <TulisBebas id={idKuis("A", 5)} judul="Tinggi batang" visual={<Batang tinggi={55} />} pertanyaan="Batang ini 2 lebih tinggi dari 4. Tulis tingginya." pesanSalah="Jumlahkan dua angka itu." bantuan="4 ditambah 2 sama dengan 6." umpan="6." periksa={jumlahEnam} alias={["6"]} konteks="Empat ditambah dua sama dengan 6." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Membaca diagram batang" src="/doodle-mtk/mtk-4-bab6-sub4.jpg" alt="Dua batang yang tingginya berbeda di lapak mangga. Burung hantu bertopi biru membandingkannya." kelas={kelas} kelamin={kelamin} penjelasan={["Batang lebih tinggi atau lebih panjang berarti lebih banyak. Selisih sama dengan yang besar dikurangi yang kecil."]}>
          <Dialog nama="Nisa" anak="Senin 8 mangga. Selasa 3." />
          <Dialog nama="Farhan" anak="8 dikurangi 3 sama dengan 5. Senin lebih banyak." />
          <Dialog nama="Cinta" anak="Batang yang lebih pendek lebih sedikit." />
          <Dialog nama="Igil" anak="Batang mendatar: yang lebih panjang lebih banyak." />
          <Papan anak="8 − 3 = 5" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Batang A sampai 10. Batang B sampai 4. Berapa selisihnya?" periksa={jumlahEnam} petunjuk="Kurangkan yang besar dengan yang kecil." benar="Selisihnya 6." />
          <TulisBebas id={idKuis("A", 7)} judul="Dua batang" visual={<Batang tinggi={70} />} pertanyaan="Batang tinggi 12. Batang pendek 5. Tulis selisihnya." pesanSalah="Kurangkan yang besar dengan yang kecil." bantuan="12 dikurangi 5 sama dengan 7." umpan="7." periksa={jumlahTujuh} alias={["7"]} konteks="Dua belas dikurangi lima sama dengan 7." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Ada 4 gambar. Satu gambar = 3 mangga. Banyaknya..." visual={<DeretMangga jumlah={4} />} pilihan={[{ huruf: "A", teks: "7" }, { huruf: "B", teks: "12" }, { huruf: "C", teks: "9" }, { huruf: "D", teks: "4" }]} benar="B" umpan="4 kali 3 sama dengan 12." salah="Kalikan banyak gambar dengan kuncinya." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan data dengan hasilnya." baris={[{ kiri: "5 gambar, kunci 1", pilihan: HASIL_A, benar: "5 mangga" }, { kiri: "3 gambar, kunci 2", pilihan: HASIL_A, benar: "6 mangga" }, { kiri: "Batang sampai 8", pilihan: HASIL_A, benar: "8 mangga" }]} umpan="5 mangga, 6 mangga, dan 8 mangga." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun dari yang paling sedikit." acak={["9", "15", "4", "11"]} benar={["4", "9", "11", "15"]} umpan="4, 9, 11, 15." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Satu gambar selalu berarti 1.", benar: false }, { teks: "Batang lebih tinggi berarti lebih banyak.", benar: true }, { teks: "Judul piktogram boleh dikosongkan.", benar: false }]} umpan="Hanya yang kedua benar. Kunci bisa lebih dari 1. Judul wajib ada." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Data 6, 9, 4, dan 7. Mana yang paling banyak?" visual={<Papan anak="6 · 9 · 4 · 7" />} pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "9" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "7" }]} benar="B" umpan="9 paling besar." salah="Bandingkan keempat angka itu." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🥭" judul="B. Peta Mangga" anak="Intisari gambar dan batang" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Gambar satu-satu" src="/doodle-mtk/mtk-4-bab6-sub1.jpg" alt="Barisan gambar mangga di lapak." kelas={kelas} kelamin={kelamin} penjelasan={["Jika kunci 1, banyak mangga sama dengan banyak gambar. Gambar dalam satu baris harus sama."]}>
          <PetaContoh pusat="Kunci 1" cabang={[{ ikon: "🥭", judul: "Gambar sama", isi: "satu baris" }, { ikon: "👁️", judul: "Hitung", isi: "gambar = mangga" }, { ikon: "🏷️", judul: "Judul", isi: "wajib ada" }]} kolom={["Gambar", "Mangga"]} baris={[["3 gambar", "3 mangga"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Gambar mangga ada dua baris. Tiap baris 4 gambar. Satu gambar = 1. Berapa mangga?" periksa={jumlahDelapan} petunjuk="Kalikan banyak baris dengan gambar di setiap baris." benar="8 mangga." />
          <TulisBebas id={idKuis("B", 1)} judul="Banyak gambar" visual={<Papan anak="2 + 4 mangga" />} pertanyaan="Satu gambar = 1. Tulis banyak gambar yang harus dibuat." pesanSalah="Jumlahkan mangganya dulu." bantuan="2 ditambah 4 sama dengan 6." umpan="6 gambar." periksa={jumlahEnam} alias={["6"]} konteks="Dua ditambah empat sama dengan 6. Kunci 1, jadi 6 gambar." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Gambar dikali kunci" src="/doodle-mtk/mtk-4-bab6-sub2.jpg" alt="Kunci gambar mangga di papan lapak." kelas={kelas} kelamin={kelamin} penjelasan={["Banyak mangga sama dengan banyak gambar kali nilai kunci. Setengah gambar berarti setengah dari kunci."]}>
          <PetaContoh pusat="Kunci 2" cabang={[{ ikon: "🥭", judul: "Lima gambar", isi: "di satu baris" }, { ikon: "✖️", judul: "Dikali", isi: "nilai kunci" }, { ikon: "🧮", judul: "Hasilnya", isi: "10 mangga" }]} kolom={["Hitung", "Hasil"]} baris={[["5 × 2", "10 mangga"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Ada 4 gambar. Satu gambar = 2. Berapa mangga?" periksa={jumlahDelapan} petunjuk="Kalikan banyak gambar dengan kuncinya." benar="8 mangga." />
          <TulisBebas id={idKuis("B", 3)} judul="Gambar di papan" visual={<DeretMangga jumlah={9} />} pertanyaan="Satu gambar = 2 mangga. Tulis banyak mangga." pesanSalah="Hitung gambar, lalu kalikan dengan kunci." bantuan="9 kali 2 sama dengan 18." umpan="18 mangga." periksa={jumlahDelapanBelas} alias={["18"]} konteks="Sembilan gambar dengan kunci 2 sama dengan 18 mangga." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Batang tegak" src="/doodle-mtk/mtk-4-bab6-sub3.jpg" alt="Diagram batang di lapak mangga." kelas={kelas} kelamin={kelamin} penjelasan={["Batang tegak: yang lebih tinggi lebih banyak. Batang mendatar: yang lebih panjang lebih banyak. Angka pada sumbu wajib ada."]}>
          <PetaContoh pusat="Batang" cabang={[{ ikon: "📊", judul: "Tegak", isi: "lebih tinggi lebih banyak" }, { ikon: "↔️", judul: "Mendatar", isi: "lebih panjang lebih banyak" }, { ikon: "🔢", judul: "Sumbu", isi: "angka wajib" }]} kolom={["Contoh", "Ujung"]} baris={[["Batang contoh", "sampai 5"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Ujung batang lebih tinggi dari 10 dan lebih rendah dari 12. Tepat di tengah. Berapa?" periksa={jumlahSebelas} petunjuk="Cari bilangan di antara dua angka itu." benar="11." />
          <TulisBebas id={idKuis("B", 5)} judul="Tambah tinggi" visual={<Batang tinggi={48} />} pertanyaan="Batang ini 3 lebih tinggi dari 4. Tulis tingginya." pesanSalah="Jumlahkan dua angka itu." bantuan="4 ditambah 3 sama dengan 7." umpan="7." periksa={jumlahTujuh} alias={["7"]} konteks="Empat ditambah tiga sama dengan 7." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Selisih batang" src="/doodle-mtk/mtk-4-bab6-sub4.jpg" alt="Dua batang mangga yang dibandingkan." kelas={kelas} kelamin={kelamin} penjelasan={["Selisih sama dengan data yang besar dikurangi yang kecil. Batang yang sama tinggi berarti sama banyak."]}>
          <PetaContoh pusat="Selisih" cabang={[{ ikon: "📈", judul: "Yang besar", isi: "8 mangga" }, { ikon: "📉", judul: "Yang kecil", isi: "3 mangga" }, { ikon: "➖", judul: "Hasil kurang", isi: "5 mangga" }]} kolom={["Hitung", "Hasil"]} baris={[["8 − 3", "5"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Batang 16 dan batang 7. Sebutkan selisihnya." periksa={jumlahSembilan} petunjuk="Kurangkan yang besar dengan yang kecil." benar="Selisihnya 9." />
          <TulisBebas id={idKuis("B", 7)} judul="Dua ujung" visual={<Papan anak="13 dan 6" />} pertanyaan="Tulis selisih kedua batang itu." pesanSalah="Kurangkan yang besar dengan yang kecil." bantuan="13 dikurangi 6 sama dengan 7." umpan="7." periksa={jumlahTujuh} alias={["7"]} konteks="Tiga belas dikurangi enam sama dengan 7." />
        </Adegan>
        <Pilih id={idKuis("B", 8)} pertanyaan="2 gambar mewakili 10 mangga. Satu gambar mewakili..." visual={<DeretMangga jumlah={2} />} pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "5" }, { huruf: "D", teks: "20" }]} benar="C" umpan="10 dibagi 2 sama dengan 5." salah="Bagi jumlah mangga dengan banyak gambar." />
        <KuisCocok id={idKuis("B", 9)} perintah="Pasangkan tampilan dengan namanya." baris={[{ kiri: "Gambar berulang", pilihan: JENIS_B, benar: "Piktogram" }, { kiri: "Batang tegak", pilihan: JENIS_B, benar: "Diagram batang" }, { kiri: "Satu gambar = 4", pilihan: JENIS_B, benar: "Kunci gambar" }]} umpan="Piktogram, diagram batang, dan kunci gambar." />
        <SusunToken id={idKuis("B", 10)} perintah="Susun dari yang paling sedikit." acak={["12", "3", "16", "8"]} benar={["3", "8", "12", "16"]} umpan="3, 8, 12, 16." />
        <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Diagram batang boleh tanpa angka di sumbu.", benar: false }, { teks: "Gambar dalam satu baris harus sama.", benar: true }, { teks: "Batang lebih pendek berarti lebih banyak.", benar: false }]} umpan="Hanya yang kedua benar. Sumbu wajib punya angka. Batang pendek lebih sedikit." />
        <Pilih id={idKuis("B", 12)} pertanyaan="Kunci 2. Ada 2 gambar penuh dan 1 setengah. Banyaknya..." visual={<Papan anak="🥭 🥭 ½" />} pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "3" }]} benar="A" umpan="2 kali 2, ditambah 1, sama dengan 5." salah="Gambar penuh dikali kunci, lalu tambah setengah kunci." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🥭🦉" judul={kartu.judul} anak="Sepuluh pos mangga" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab6-permainan.jpg" alt="Sepuluh mangga berjajar dua baris. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal gambar dan batang. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB6} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB6} penutup="Lapak tutup. Igil menempelkan stempel mangga." bunga="🥭📊🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB6.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Lapak Mangga" : skor >= 6 ? "🥭 Penjaga Data" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Gambar dan batangmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru lapak." : "Ayo baca kunci dan ujung batang lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab6-evaluasi.jpg" alt="Meja lapak dengan kertas kosong dan mangga. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Kunci dua" visual={<DeretMangga jumlah={5} />} pertanyaan="Satu gambar = 2 mangga. Tulis banyak mangga." pesanSalah="Hitung gambar, lalu kalikan dengan kunci." bantuan="5 kali 2 sama dengan 10." umpan="10 mangga." periksa={jumlahSepuluh} alias={["10"]} konteks="Lima gambar dengan kunci 2 sama dengan 10 mangga." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Data 8, 3, 6, dan 5. Mana yang paling sedikit?" visual={<Papan anak="8 · 3 · 6 · 5" />} pilihan={[{ huruf: "A", teks: "8" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "6" }, { huruf: "D", teks: "5" }]} benar="B" umpan="3 paling kecil." salah="Bandingkan keempat angka itu." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Gambar di baris atas: mangga, mangga, mangga, mangga. Baris bawah: mangga, mangga, mangga. Satu gambar = 1. Berapa mangga?" periksa={jumlahTujuh} petunjuk="Jumlahkan gambar di kedua baris." benar="7 mangga." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Satu gambar = 4. Ada 3 gambar. Banyaknya..." visual={<DeretMangga jumlah={3} />} pilihan={[{ huruf: "A", teks: "7" }, { huruf: "B", teks: "12" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "34" }]} benar="B" umpan="3 kali 4 sama dengan 12." salah="Kalikan banyak gambar dengan kuncinya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan data dengan hasilnya." baris={[{ kiri: "6 gambar, kunci 1", pilihan: HASIL_D, benar: "6 mangga" }, { kiri: "4 gambar, kunci 2", pilihan: HASIL_D, benar: "8 mangga" }, { kiri: "Batang sampai 11", pilihan: HASIL_D, benar: "11 mangga" }]} umpan="6 mangga, 8 mangga, dan 11 mangga." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Selisih" visual={<Papan anak="16 dan 9" />} pertanyaan="Tulis selisih kedua batang itu." pesanSalah="Kurangkan yang besar dengan yang kecil." bantuan="16 dikurangi 9 sama dengan 7." umpan="7." periksa={jumlahTujuh} alias={["7"]} konteks="Enam belas dikurangi sembilan sama dengan 7." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Senin: 5 gambar, kunci 2. Selasa: batang sampai 7. Mana yang lebih banyak?" visual={<Papan anak="Senin 🥭×5    Selasa batang 7" />} pilihan={[{ huruf: "A", teks: "Senin" }, { huruf: "B", teks: "Selasa" }, { huruf: "C", teks: "Sama banyak" }, { huruf: "D", teks: "Tidak bisa dibanding" }]} benar="A" umpan="Senin 5 kali 2 sama dengan 10. Sepuluh lebih banyak dari 7." salah="Hitung Senin dulu, lalu bandingkan dengan Selasa." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Data 8, 8, dan 3. Berapa kategori yang sama banyak?" visual={<Papan anak="8 · 8 · 3" />} pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "3" }, { huruf: "D", teks: "0" }]} benar="B" umpan="Dua kategori sama-sama 8." salah="Cari angka yang muncul lebih dari sekali." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Satu gambar = 5. Ada 2 gambar. Berapa mangga?" periksa={jumlahSepuluh} petunjuk="Kalikan banyak gambar dengan kuncinya." benar="10 mangga." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Data 12, 7, 12, dan 4. Selisih yang paling banyak dan yang paling sedikit..." visual={<Papan anak="12 · 7 · 12 · 4" />} pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "12" }, { huruf: "D", teks: "3" }]} benar="B" umpan="12 dikurangi 4 sama dengan 8." salah="Cari yang terbesar dan yang terkecil, lalu kurangkan." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab6({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab6-poin.jpg", alt: "Igil dan tiga anak di lapak mangga memegang gambar mangga." }}
        cuplikan={cuplikanKalimat(["Piktogram memakai gambar dan kunci. Diagram batang memakai batang dan angka.", "Banyak data sama dengan banyak gambar kali kunci.", "Batang lebih tinggi atau lebih panjang berarti lebih banyak."])}
        poin={["Satu baris piktogram memakai gambar yang sama.", "Baca kunci dulu. Kunci 1 berarti hitung gambarnya.", "Jika kunci lebih dari 1, kalikan. Setengah gambar berarti setengah kunci.", "Diagram batang wajib punya judul dan angka pada sumbu.", "Batang tegak: lebih tinggi lebih banyak. Batang mendatar: lebih panjang lebih banyak.", "Selisih sama dengan data besar dikurangi data kecil."]}
        penutup="Baca kunci atau ujung batang dulu, baru hitung."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
