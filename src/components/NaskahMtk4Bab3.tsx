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
import { MISI_MTK4_BAB3, TEMA_MTK4_BAB3 } from "@/lib/misi-mtk-4-bab3";
import { MODUL_MTK4_BAB3 } from "@/lib/modul-resmi-mtk-4-bab3";
import {
  pitaDelapan,
  pitaDelapanBelas,
  pitaDuaPuluh,
  pitaDuaPuluhDelapan,
  pitaDuaPuluhSembilan,
  pitaDuaPuluhTujuh,
  pitaEmpatBelas,
  pitaEmpatPuluh,
  pitaEmpatPuluhDua,
  pitaEmpatPuluhTujuh,
  pitaEnam,
  pitaEnamPuluhEmpat,
  pitaEnamPuluhEnam,
  pitaLimaPuluhDua,
  pitaLimaPuluhSembilan,
  pitaSembilanBelas,
  pitaTigaPuluhSembilan,
  pitaTujuhPuluhSembilan,
} from "@/lib/nilai-mtk-4-bab3";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB3.id;

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
      <HasilJawabanKuis status={status} pesanSalah="Lihat aturannya, lalu susun ulang." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek selisih dua bilangan yang bersebelahan, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const ATURAN_A = ["Naik 3", "Turun 4", "Naik 10"];
const ATURAN_B = ["Naik 6", "Turun 9", "Naik 2"];
const ATURAN_D = ["Naik 3", "Turun 4", "Naik 10"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB3.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁👧👦🦉" judul="A. Padang Layang" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mengenali pola gambar yang membesar dan mengecil sampai 100.", "Mengembangkan pola gambar dengan tambah atau kurang.", "Mengenali pola bilangan yang membesar dan mengecil sampai 100.", "Mengembangkan pola bilangan dengan tambah atau kurang."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Pola gambar membesar" src="/doodle-mtk/mtk-4-bab3-sub1.jpg" alt="Padang layang. Ekor pita makin panjang dari kiri ke kanan. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Pola gambar membesar berarti benda berikutnya lebih banyak. Cari berapa yang ditambah."]}>
          <Dialog nama="Nisa" anak="Layang pertama punya 2 pita." />
          <Dialog nama="Farhan" anak="Layang kedua punya 5 pita. Layang ketiga punya 8." />
          <Dialog nama="Cinta" anak="Setiap layang bertambah 3 pita." />
          <Dialog nama="Igil" anak="Itu pola gambar membesar. Berikutnya selalu ditambah 3." />
          <Papan anak="2  →  5  →  8  →  …" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="4, 8, 12, 16. Berapa pita berikutnya?" periksa={pitaDuaPuluh} petunjuk="Kurangi dua bilangan yang bersebelahan, lalu tambahkan selisih itu." benar="20. Naik 4." />
          <TulisBebas id={idKuis("A", 1)} judul="Gambar berikutnya" visual={<Papan anak="3 · 7 · 11 · 15 · ⬜" />} pertanyaan="Tulis banyak pita berikutnya." pesanSalah="Cari selisihnya dulu." bantuan="Naik 4. 15 + 4 = 19." umpan="19." periksa={pitaSembilanBelas} alias={["19"]} konteks="3, 7, 11, 15, berikutnya 19." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Pola gambar mengecil" src="/doodle-mtk/mtk-4-bab3-sub2.jpg" alt="Padang layang. Ekor pita makin pendek. Burung hantu bertopi biru melepas pita bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Pola gambar mengecil berarti benda berikutnya lebih sedikit. Cari berapa yang dikurangi."]}>
          <Dialog nama="Farhan" anak="Tumpukan pita: 20, lalu 15, lalu 10." />
          <Dialog nama="Nisa" anak="Setiap tumpukan berkurang 5." />
          <Dialog nama="Cinta" anak="Gambarnya makin sedikit. Itu pola mengecil." />
          <Dialog nama="Igil" anak="Kurangkan dengan aturan yang sama." />
          <Papan anak="20  →  15  →  10  →  …" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="18, 15, 12, 9. Berapa berikutnya?" periksa={pitaEnam} petunjuk="Lihat berapa yang berkurang di setiap langkah." benar="6. Turun 3." />
          <TulisBebas id={idKuis("A", 3)} judul="Makin sedikit" visual={<Papan anak="30 · 26 · 22 · 18 · ⬜" />} pertanyaan="Tulis banyak benda berikutnya." pesanSalah="Polanya turun." bantuan="Turun 4. 18 − 4 = 14." umpan="14." periksa={pitaEmpatBelas} alias={["14"]} konteks="30, 26, 22, 18, berikutnya 14." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pola bilangan membesar" src="/doodle-mtk/mtk-4-bab3-sub3.jpg" alt="Empat kartu pita kosong, tumpukan pita makin tinggi, tanpa angka. Burung hantu bertopi biru menunjuk." kelas={kelas} kelamin={kelamin} penjelasan={["Pola bilangan membesar berarti angka berikutnya lebih besar. Tambahkan aturan yang sama."]}>
          <Dialog nama="Igil" anak="Lihat bilangan 12, 18, 24." />
          <Dialog nama="Cinta" anak="18 − 12 = 6. 24 − 18 = 6." />
          <Dialog nama="Nisa" anak="Aturannya naik 6." />
          <Dialog nama="Farhan" anak="Bilangan berikutnya selalu ditambah 6." />
          <Papan anak="12  →  18  →  24  →  …" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="8, 13, 18, 23. Sebutkan bilangan berikutnya." periksa={pitaDuaPuluhDelapan} petunjuk="Cari selisih dua bilangan yang bersebelahan." benar="28. Naik 5." />
          <TulisBebas id={idKuis("A", 5)} judul="Bilangan naik" visual={<Papan anak="11 · 20 · 29 · 38 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Aturannya sama di setiap langkah." bantuan="Naik 9. 38 + 9 = 47." umpan="47." periksa={pitaEmpatPuluhTujuh} alias={["47"]} konteks="11, 20, 29, 38, berikutnya 47." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pola bilangan mengecil" src="/doodle-mtk/mtk-4-bab3-sub4.jpg" alt="Empat tumpukan pita yang makin kecil, tanpa angka. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Pola bilangan mengecil berarti angka berikutnya lebih kecil. Kurangkan aturan yang sama."]}>
          <Dialog nama="Cinta" anak="50, 44, 38." />
          <Dialog nama="Farhan" anak="50 − 44 = 6. Angkanya turun 6." />
          <Dialog nama="Nisa" anak="Bilangan berikutnya lebih kecil." />
          <Dialog nama="Igil" anak="Pola mengecil memakai pengurangan. Angkanya sampai 100." />
          <Papan anak="50  →  44  →  38  →  …" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="90, 82, 74. Sebutkan bilangan berikutnya." periksa={pitaEnamPuluhEnam} petunjuk="Hitung selisihnya, lalu kurangkan lagi." benar="66. Turun 8." />
          <TulisBebas id={idKuis("A", 7)} judul="Bilangan turun" visual={<Papan anak="100 · 91 · 82 · 73 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Polanya turun." bantuan="Turun 9. 73 − 9 = 64." umpan="64." periksa={pitaEnamPuluhEmpat} alias={["64"]} konteks="100, 91, 82, 73, berikutnya 64." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="6 – 11 – 16 – 21 – ⬜. Berikutnya..." visual={<Papan anak="6 · 11 · 16 · 21 · ⬜" />} pilihan={[{ huruf: "A", teks: "24" }, { huruf: "B", teks: "26" }, { huruf: "C", teks: "25" }, { huruf: "D", teks: "22" }]} benar="B" umpan="Naik 5. 21 + 5 = 26." salah="Kurangi dua bilangan yang bersebelahan." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan barisan dengan aturannya." baris={[{ kiri: "12 · 15 · 18", pilihan: ATURAN_A, benar: "Naik 3" }, { kiri: "40 · 36 · 32", pilihan: ATURAN_A, benar: "Turun 4" }, { kiri: "7 · 17 · 27", pilihan: ATURAN_A, benar: "Naik 10" }]} umpan="Naik 3, turun 4, dan naik 10." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun dari yang paling kecil. Aturannya naik 7." acak={["26", "12", "33", "19"]} benar={["12", "19", "26", "33"]} umpan="12, 19, 26, 33." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "4, 8, 12 naik 4.", benar: true }, { teks: "30, 25, 20 naik 5.", benar: false }, { teks: "9, 16, 23 naik 7.", benar: true }]} umpan="Yang pertama dan ketiga benar. 30, 25, 20 turun 5." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Mana yang tidak ikut naik 4?" visual={<Papan anak="8 · 12 · 16 · 19" />} pilihan={[{ huruf: "A", teks: "8" }, { huruf: "B", teks: "12" }, { huruf: "C", teks: "16" }, { huruf: "D", teks: "19" }]} benar="D" umpan="8, 12, 16 naik 4. Seharusnya 20, bukan 19." salah="Cek selisih tiap pasangan." />
        <Pilih id={idKuis("A", 13)} pertanyaan="50 – 43 – 36 – ⬜. Berikutnya..." visual={<Papan anak="50 · 43 · 36 · ⬜" />} pilihan={[{ huruf: "A", teks: "30" }, { huruf: "B", teks: "29" }, { huruf: "C", teks: "28" }, { huruf: "D", teks: "22" }]} benar="B" umpan="Turun 7. 36 − 7 = 29." salah="Bilangannya makin kecil." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB3.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🦉" judul="B. Peta Padang" anak="Intisari pola pita" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Gambar membesar" src="/doodle-mtk/mtk-4-bab3-sub1.jpg" alt="Layang dengan ekor yang makin panjang." kelas={kelas} kelamin={kelamin} penjelasan={["Dua gambar yang bersebelahan dikurangi. Hasilnya adalah aturan tambah."]}>
          <PetaContoh pusat="Naik 4" cabang={[{ ikon: "🪁", judul: "Satu pita", isi: "awal 1" }, { ikon: "🎀", judul: "Lima pita", isi: "1 + 4" }, { ikon: "👀", judul: "Cek selisih", isi: "selisih tetap" }]} kolom={["Gambar", "Banyak"]} baris={[["1", "1"], ["2", "5"], ["3", "9"], ["4", "13"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="2, 6, 10, 14. Berapa berikutnya?" periksa={pitaDelapanBelas} petunjuk="Cari berapa yang ditambah." benar="18." />
          <TulisBebas id={idKuis("B", 1)} visual={<Papan anak="9 · 14 · 19 · 24 · ⬜" />} pertanyaan="Tulis banyak berikutnya." pesanSalah="Aturannya naik." bantuan="Naik 5. 24 + 5 = 29." umpan="29." periksa={pitaDuaPuluhSembilan} alias={["29"]} konteks="9, 14, 19, 24, berikutnya 29." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Gambar mengecil" src="/doodle-mtk/mtk-4-bab3-sub2.jpg" alt="Layang dengan ekor yang makin pendek." kelas={kelas} kelamin={kelamin} penjelasan={["Jika selisihnya berkurang, gambar berikutnya lebih sedikit."]}>
          <PetaContoh pusat="Turun 4" cabang={[{ ikon: "🎀", judul: "Delapan belas", isi: "awal" }, { ikon: "🪁", judul: "Empat belas", isi: "18 − 4" }, { ikon: "➖", judul: "Sepuluh", isi: "14 − 4" }]} kolom={["Langkah", "Banyak"]} baris={[["1", "18"], ["2", "14"], ["3", "10"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="40, 35, 30, 25. Berapa berikutnya?" periksa={pitaDuaPuluh} petunjuk="Lihat berapa yang dikurangi." benar="20." />
          <TulisBebas id={idKuis("B", 3)} visual={<Papan anak="24 · 20 · 16 · 12 · ⬜" />} pertanyaan="Tulis banyak berikutnya." pesanSalah="Polanya turun." bantuan="Turun 4. 12 − 4 = 8." umpan="8." periksa={pitaDelapan} alias={["8"]} konteks="24, 20, 16, 12, berikutnya 8." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Bilangan membesar" src="/doodle-mtk/mtk-4-bab3-sub3.jpg" alt="Tumpukan pita yang makin tinggi." kelas={kelas} kelamin={kelamin} penjelasan={["Tambahkan aturan yang sama pada bilangan terakhir."]}>
          <PetaContoh pusat="Naik 7" cabang={[{ ikon: "5️⃣", judul: "Mulai lima", isi: "5" }, { ikon: "➕", judul: "Tambah tujuh", isi: "5 + 7 = 12" }, { ikon: "🔁", judul: "Lanjut", isi: "12 + 7 = 19" }]} kolom={["Bilangan", "Cara"]} baris={[["5", "awal"], ["12", "5 + 7"], ["19", "12 + 7"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="15, 23, 31. Sebutkan berikutnya." periksa={pitaTigaPuluhSembilan} petunjuk="Kurangi dua bilangan yang bersebelahan." benar="39." />
          <TulisBebas id={idKuis("B", 5)} visual={<Papan anak="4 · 13 · 22 · 31 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Aturannya tetap." bantuan="Naik 9. 31 + 9 = 40." umpan="40." periksa={pitaEmpatPuluh} alias={["40"]} konteks="4, 13, 22, 31, berikutnya 40." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Bilangan mengecil" src="/doodle-mtk/mtk-4-bab3-sub4.jpg" alt="Tumpukan pita yang makin rendah." kelas={kelas} kelamin={kelamin} penjelasan={["Kurangkan aturan yang sama. Hasilnya lebih kecil."]}>
          <PetaContoh pusat="Turun 6" cabang={[{ ikon: "3️⃣", judul: "Tiga puluh", isi: "awal" }, { ikon: "➖", judul: "Dua puluh empat", isi: "30 − 6" }, { ikon: "🪁", judul: "Delapan belas", isi: "24 − 6" }]} kolom={["Bilangan", "Cara"]} baris={[["30", "awal"], ["24", "30 − 6"], ["18", "24 − 6"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="80, 73, 66. Sebutkan berikutnya." periksa={pitaLimaPuluhSembilan} petunjuk="Hitung selisihnya." benar="59." />
          <TulisBebas id={idKuis("B", 7)} visual={<Papan anak="55 · 48 · 41 · 34 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Polanya turun." bantuan="Turun 7. 34 − 7 = 27." umpan="27." periksa={pitaDuaPuluhTujuh} alias={["27"]} konteks="55, 48, 41, 34, berikutnya 27." />
        </Adegan>
        <Pilih id={idKuis("B", 8)} pertanyaan="7 – 16 – 25 – 34 – ⬜. Berikutnya..." visual={<Papan anak="7 · 16 · 25 · 34 · ⬜" />} pilihan={[{ huruf: "A", teks: "41" }, { huruf: "B", teks: "43" }, { huruf: "C", teks: "42" }, { huruf: "D", teks: "40" }]} benar="B" umpan="Naik 9. 34 + 9 = 43." salah="Selisih dua bilangan yang bersebelahan." />
        <KuisCocok id={idKuis("B", 9)} perintah="Pasangkan barisan dengan aturannya." baris={[{ kiri: "8 · 14 · 20", pilihan: ATURAN_B, benar: "Naik 6" }, { kiri: "45 · 36 · 27", pilihan: ATURAN_B, benar: "Turun 9" }, { kiri: "11 · 13 · 15", pilihan: ATURAN_B, benar: "Naik 2" }]} umpan="Naik 6, turun 9, dan naik 2." />
        <SusunToken id={idKuis("B", 10)} perintah="Susun dari yang paling besar. Aturannya turun 8." acak={["44", "60", "36", "52"]} benar={["60", "52", "44", "36"]} umpan="60, 52, 44, 36." />
        <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "50, 42, 34 turun 8.", benar: true }, { teks: "6, 13, 20 turun 7.", benar: false }, { teks: "15, 24, 33 naik 9.", benar: true }]} umpan="Yang pertama dan ketiga benar. 6, 13, 20 naik 7." />
        <Pilih id={idKuis("B", 12)} pertanyaan="100 – 92 – 84 – ⬜. Berikutnya..." visual={<Papan anak="100 · 92 · 84 · ⬜" />} pilihan={[{ huruf: "A", teks: "78" }, { huruf: "B", teks: "76" }, { huruf: "C", teks: "80" }, { huruf: "D", teks: "74" }]} benar="B" umpan="Turun 8. 84 − 8 = 76." salah="Angkanya makin kecil." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB3.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab3-permainan.jpg" alt="Sepuluh tiang layang kosong di padang. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB3} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB3} penutup="Padang sepi. Igil menempelkan stempel pita." bunga="🪁🎀🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB3.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Pola Layang" : skor >= 6 ? "🎀 Penjaga Pita" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Polamu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru pola." : "Ayo cari aturannya lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab3-evaluasi.jpg" alt="Meja kecil di padang layang dengan pensil dan kertas kosong. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Pita berikutnya" visual={<Papan anak="14 · 21 · 28 · 35 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Cari selisihnya." bantuan="Naik 7. 35 + 7 = 42." umpan="42." periksa={pitaEmpatPuluhDua} alias={["42"]} konteks="14, 21, 28, 35, berikutnya 42." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. 36 – 30 – 24 – 18 – ⬜. Berikutnya..." visual={<Papan anak="36 · 30 · 24 · 18 · ⬜" />} pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "12" }, { huruf: "C", teks: "10" }, { huruf: "D", teks: "16" }]} benar="B" umpan="Turun 6. 18 − 6 = 12." salah="Gambarnya makin sedikit." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. 7, 15, 23, 31. Sebutkan berikutnya." periksa={pitaTigaPuluhSembilan} petunjuk="Dua bilangan yang bersebelahan punya selisih yang sama." benar="39." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Mana yang tidak ikut naik 8?" visual={<Papan anak="20 · 28 · 36 · 45" />} pilihan={[{ huruf: "A", teks: "20" }, { huruf: "B", teks: "28" }, { huruf: "C", teks: "36" }, { huruf: "D", teks: "45" }]} benar="D" umpan="20, 28, 36 naik 8. Seharusnya 44, bukan 45." salah="Cek tiap selisih." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan barisan dengan aturannya." baris={[{ kiri: "14 · 17 · 20", pilihan: ATURAN_D, benar: "Naik 3" }, { kiri: "28 · 24 · 20", pilihan: ATURAN_D, benar: "Turun 4" }, { kiri: "5 · 15 · 25", pilihan: ATURAN_D, benar: "Naik 10" }]} umpan="Naik 3, turun 4, dan naik 10." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Turun dari 88" visual={<Papan anak="88 · 79 · 70 · 61 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Polanya turun." bantuan="Turun 9. 61 − 9 = 52." umpan="52." periksa={pitaLimaPuluhDua} alias={["52"]} konteks="88, 79, 70, 61, berikutnya 52." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. 2 – 9 – 16 – 23 – ⬜. Berikutnya..." visual={<Papan anak="2 · 9 · 16 · 23 · ⬜" />} pilihan={[{ huruf: "A", teks: "28" }, { huruf: "B", teks: "30" }, { huruf: "C", teks: "32" }, { huruf: "D", teks: "25" }]} benar="B" umpan="Naik 7. 23 + 7 = 30." salah="Selisihnya tetap." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Layang pertama 12 pita. Tiap layang bertambah 6. Layang keempat punya..." visual={<Papan anak="12 · 18 · 24 · ⬜" />} pilihan={[{ huruf: "A", teks: "24" }, { huruf: "B", teks: "18" }, { huruf: "C", teks: "30" }, { huruf: "D", teks: "36" }]} benar="C" umpan="12, 18, 24, 30. Layang keempat punya 30." salah="Tambahkan 6 sebanyak tiga langkah dari 12." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. 100, 93, 86. Sebutkan berikutnya." periksa={pitaTujuhPuluhSembilan} petunjuk="Hitung berapa yang dikurangi." benar="79." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. 5 – 11 – 17 – ⬜. Banyak pita berikutnya..." visual={<Papan anak="5 · 11 · 17 · ⬜" />} pilihan={[{ huruf: "A", teks: "22" }, { huruf: "B", teks: "23" }, { huruf: "C", teks: "24" }, { huruf: "D", teks: "20" }]} benar="B" umpan="Naik 6. 17 + 6 = 23." salah="Kurangi dua bilangan yang bersebelahan." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab3({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab3-poin.jpg", alt: "Igil dan tiga anak memegang kartu kosong di padang layang." }}
        cuplikan={cuplikanKalimat(["Pola membesar berarti berikutnya lebih banyak. Pola mengecil berarti berikutnya lebih sedikit.", "Kurangi dua bilangan yang bersebelahan. Selisih yang sama adalah aturannya.", "Naik ditambah. Turun dikurangi. Angkanya sampai seratus."])}
        poin={["Gambar membesar: 4, 8, 12, 16, berikutnya 20.", "Gambar mengecil: 18, 15, 12, 9, berikutnya 6.", "Bilangan membesar: 8, 13, 18, 23, berikutnya 28.", "Bilangan mengecil: 90, 82, 74, berikutnya 66.", "Aturan yang sama dipakai untuk membuat pola sendiri."]}
        penutup="Cari selisih dulu, baru lanjutkan polanya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
