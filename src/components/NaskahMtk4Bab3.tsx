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
  pitaEmpatBelas,
  pitaEmpatPuluhSembilan,
  pitaEnam,
  pitaEnamBelas,
  pitaLimaPuluhDua,
  pitaLimaPuluhLima,
  pitaSatu,
  pitaTiga,
  pitaTigaBelas,
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

const ATURAN_A = ["Naik 2", "Turun 2", "Naik 8"];
const ATURAN_B = ["Naik 12", "Turun 11", "Turun 6"];
const ATURAN_D = ["Naik 4", "Turun 14", "Naik 15"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB3.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🍊🍬🥚🦉" judul="A. Pola Gambar dan Pola Bilangan" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mengenali pola gambar yang membesar dan mengecil sampai 100.", "Mengembangkan pola gambar dengan tambah atau kurang.", "Mengenali pola bilangan yang membesar dan mengecil sampai 100.", "Mengembangkan pola bilangan dengan tambah atau kurang."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab A — Pola gambar membesar" src="/doodle-mtk/mtk-4-bab3-sub1.jpg" alt="Padang layang. Ekor pita makin panjang dari kiri ke kanan. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Pola gambar membesar berarti benda berikutnya lebih banyak. Jeruk tiap kumpulan bertambah 2."]}>
          <Dialog nama="Nisa" anak="Kumpulan jeruk pertama ada 2 buah." />
          <Dialog nama="Farhan" anak="Kumpulan kedua ada 4. Kumpulan ketiga ada 6." />
          <Dialog nama="Cinta" anak="Setiap kumpulan bertambah 2 jeruk." />
          <Dialog nama="Igil" anak="Gambar berikutnya lebih banyak. Kumpulan ke-7 ada 14 jeruk." />
          <Papan anak="2  →  4  →  6  →  8  →  10  →  12  →  14" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Jeruk 2, 4, 6. Berapa kumpulan ke-7?" periksa={pitaEmpatBelas} petunjuk="Tambahkan 2 pada setiap kumpulan." benar="14 jeruk." />
          <TulisBebas id={idKuis("A", 1)} judul="Gambar berikutnya" visual={<Papan anak="4 · 8 · 12 · ⬜" />} pertanyaan="Tulis banyak buah berikutnya." pesanSalah="Cari selisihnya dulu." bantuan="Naik 4. 12 + 4 = 16." umpan="16." periksa={pitaEnamBelas} alias={["16"]} konteks="4, 8, 12, berikutnya 16." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tambah tetap</p>
          <PetaContoh pusat="Naik 2" cabang={[{ ikon: "🍊", judul: "Kumpulan 1", isi: "2 jeruk" }, { ikon: "➕", judul: "Selisih", isi: "selalu +2" }, { ikon: "7️⃣", judul: "Kumpulan 7", isi: "14 jeruk" }]} kolom={["Kumpulan", "Banyak"]} baris={[["1", "2"], ["2", "4"], ["3", "6"], ["7", "14"]]} />
        </Adegan>
        <Adegan utama judul="Sub-bab A — Pola gambar mengecil" src="/doodle-mtk/mtk-4-bab3-sub2.jpg" alt="Padang layang. Ekor pita makin pendek. Burung hantu bertopi biru melepas pita bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Pola gambar mengecil berarti benda berikutnya lebih sedikit. Permen tiap kumpulan berkurang 2."]}>
          <Dialog nama="Farhan" anak="Kumpulan permen pertama ada 9." />
          <Dialog nama="Nisa" anak="Berikutnya 7, lalu 5." />
          <Dialog nama="Cinta" anak="Setiap kumpulan berkurang 2 permen." />
          <Dialog nama="Igil" anak="Gambar berikutnya lebih sedikit. Kumpulan ke-5 tinggal 1 permen." />
          <Papan anak="9  →  7  →  5  →  3  →  1" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Permen 9, 7, 5. Berapa kumpulan ke-5?" periksa={pitaSatu} petunjuk="Kurangi 2 pada setiap kumpulan." benar="1 permen." />
          <TulisBebas id={idKuis("A", 3)} judul="Makin sedikit" visual={<Papan anak="24 · 20 · 16 · 12 · ⬜" />} pertanyaan="Tulis banyak benda berikutnya." pesanSalah="Polanya turun." bantuan="Turun 4. 12 − 4 = 8." umpan="8." periksa={pitaDelapan} alias={["8"]} konteks="24, 20, 16, 12, berikutnya 8." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Kurang tetap</p>
          <PetaContoh pusat="Turun 2" cabang={[{ ikon: "🍬", judul: "Kumpulan 1", isi: "9 permen" }, { ikon: "➖", judul: "Selisih", isi: "selalu −2" }, { ikon: "5️⃣", judul: "Kumpulan 5", isi: "1 permen" }]} kolom={["Kumpulan", "Banyak"]} baris={[["1", "9"], ["2", "7"], ["3", "5"], ["5", "1"]]} />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Pola bilangan membesar" src="/doodle-mtk/mtk-4-bab3-sub3.jpg" alt="Empat kartu pita kosong, tumpukan pita makin tinggi, tanpa angka. Burung hantu bertopi biru menunjuk." kelas={kelas} kelamin={kelamin} penjelasan={["Pola bilangan membesar berarti angka berikutnya lebih besar. Jangan menebak 12 kalau selisihnya 2."]}>
          <Dialog nama="Igil" anak="Lihat bilangan 3, 5, 7, 9, 11." />
          <Dialog nama="Cinta" anak="Aku kira berikutnya 12." />
          <Dialog nama="Nisa" anak="Selisihnya 2. Jadi 11 + 2 = 13." />
          <Dialog nama="Farhan" anak="Telur hari pertama 20, kedua 28, ketiga 36. Hari kelima ada 52." />
          <Papan anak="3  →  5  →  7  →  9  →  11  →  13" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="3, 5, 7, 9, 11. Sebutkan bilangan berikutnya." periksa={pitaTigaBelas} petunjuk="Cari selisih dua bilangan yang bersebelahan." benar="13. Naik 2." />
          <TulisBebas id={idKuis("A", 5)} judul="Telur naik" visual={<Papan anak="20 · 28 · 36 · 44 · ⬜" />} pertanyaan="Tulis telur pada hari kelima." pesanSalah="Aturannya sama di setiap hari." bantuan="Naik 8. 44 + 8 = 52." umpan="52." periksa={pitaLimaPuluhDua} alias={["52"]} konteks="20, 28, 36, 44, hari kelima 52." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Makin besar</p>
          <PetaContoh pusat="Naik 2" cabang={[{ ikon: "🔢", judul: "Deret", isi: "3, 5, 7, 9, 11" }, { ikon: "➕", judul: "Berikutnya", isi: "11 + 2 = 13" }, { ikon: "🥚", judul: "Telur", isi: "hari ke-5 = 52" }]} kolom={["Hari", "Telur"]} baris={[["1", "20"], ["2", "28"], ["3", "36"], ["5", "52"]]} />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Pola bilangan mengecil" src="/doodle-mtk/mtk-4-bab3-sub4.jpg" alt="Empat tumpukan pita yang makin kecil, tanpa angka. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Pola bilangan mengecil berarti angka berikutnya lebih kecil. Kelapa berkurang 5 tiap hari."]}>
          <Dialog nama="Cinta" anak="23, 18, 13, 8." />
          <Dialog nama="Farhan" anak="Selisihnya 5. Berikutnya 3." />
          <Dialog nama="Nisa" anak="Bilangan berikutnya lebih kecil. Itu pola mengecil." />
          <Dialog nama="Igil" anak="Televisi Januari 70, lalu berkurang 6. Juni ada 40. Kelapa hari pertama 36, hari ke-7 ada 6." />
          <Papan anak="23  →  18  →  13  →  8  →  3" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="23, 18, 13, 8. Sebutkan bilangan berikutnya." periksa={pitaTiga} petunjuk="Hitung selisihnya, lalu kurangkan lagi." benar="3. Turun 5." />
          <TulisBebas id={idKuis("A", 7)} judul="Kelapa turun" visual={<Papan anak="36 · 31 · 26 · 21 · 16 · 11 · ⬜" />} pertanyaan="Tulis kelapa pada hari ke-7." pesanSalah="Polanya turun." bantuan="Turun 5. 11 − 5 = 6." umpan="6." periksa={pitaEnam} alias={["6"]} konteks="36, 31, 26, 21, 16, 11, hari ke-7 ada 6." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Makin kecil</p>
          <PetaContoh pusat="Turun 5" cabang={[{ ikon: "🥥", judul: "Hari 1", isi: "36 kelapa" }, { ikon: "➖", judul: "Selisih", isi: "selalu −5" }, { ikon: "7️⃣", judul: "Hari 7", isi: "6 kelapa" }]} kolom={["Hari", "Kelapa"]} baris={[["1", "36"], ["2", "31"], ["4", "21"], ["7", "6"]]} />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Jeruk 2 – 4 – 6 – ⬜. Kumpulan ke-4 ada..." visual={<Papan anak="2 · 4 · 6 · ⬜" />} pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "10" }, { huruf: "D", teks: "4" }]} benar="B" umpan="Naik 2. 6 + 2 = 8." salah="Kurangi dua kumpulan yang bersebelahan." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan barisan dengan aturannya." baris={[{ kiri: "2 · 4 · 6", pilihan: ATURAN_A, benar: "Naik 2" }, { kiri: "9 · 7 · 5", pilihan: ATURAN_A, benar: "Turun 2" }, { kiri: "20 · 28 · 36", pilihan: ATURAN_A, benar: "Naik 8" }]} umpan="Naik 2, turun 2, dan naik 8." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun rak buku dari yang paling kecil. Aturannya naik 4." acak={["13", "5", "17", "9"]} benar={["5", "9", "13", "17"]} umpan="5, 9, 13, 17." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "2, 4, 6 membesar.", benar: true }, { teks: "9, 7, 5 membesar.", benar: false }, { teks: "3, 5, 7, 9, 11 berikutnya 13.", benar: true }]} umpan="Yang pertama dan ketiga benar. 9, 7, 5 mengecil." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Mana yang tidak ikut naik 9?" visual={<Papan anak="13 · 22 · 31 · 49" />} pilihan={[{ huruf: "A", teks: "13" }, { huruf: "B", teks: "22" }, { huruf: "C", teks: "31" }, { huruf: "D", teks: "49" }]} benar="D" umpan="13, 22, 31 naik 9. Seharusnya 40, bukan 49." salah="Cek selisih tiap pasangan." />
        <Pilih id={idKuis("A", 13)} pertanyaan="Rak buku 5 – 9 – 13. Rak kelima ada..." visual={<Papan anak="5 · 9 · 13 · 17 · ⬜" />} pilihan={[{ huruf: "A", teks: "17" }, { huruf: "B", teks: "21" }, { huruf: "C", teks: "25" }, { huruf: "D", teks: "15" }]} benar="B" umpan="Naik 4. Rak ke-4 ada 17. Rak ke-5 ada 21." salah="Tambahkan 4 pada setiap rak." />
        <Pilih id={idKuis("B", 0)} pertanyaan="Kursi 20 – 23 – 26. Baris kelima ada..." visual={<Papan anak="20 · 23 · 26 · 29 · ⬜" />} pilihan={[{ huruf: "A", teks: "29" }, { huruf: "B", teks: "32" }, { huruf: "C", teks: "35" }, { huruf: "D", teks: "26" }]} benar="B" umpan="Naik 3. Baris ke-5 ada 32." salah="Selisihnya 3." />
        <KuisCocok id={idKuis("B", 1)} perintah="Pasangkan barisan dengan aturannya." baris={[{ kiri: "7 · 19 · 31", pilihan: ATURAN_B, benar: "Naik 12" }, { kiri: "96 · 85 · 74", pilihan: ATURAN_B, benar: "Turun 11" }, { kiri: "70 · 64 · 58", pilihan: ATURAN_B, benar: "Turun 6" }]} umpan="Naik 12, turun 11, dan turun 6." />
        <SusunToken id={idKuis("B", 2)} perintah="Susun kelapa dari yang paling banyak. Aturannya turun 5." acak={["26", "36", "21", "31"]} benar={["36", "31", "26", "21"]} umpan="36, 31, 26, 21." />
        <KuisBenarSalah id={idKuis("B", 3)} perintah="Pilih benar atau salah." baris={[{ teks: "20, 28, 36 naik 8.", benar: true }, { teks: "23, 18, 13 naik 5.", benar: false }, { teks: "70, 64, 58 turun 6.", benar: true }]} umpan="Yang pertama dan ketiga benar. 23, 18, 13 turun 5." />
        <Pilih id={idKuis("B", 4)} pertanyaan="Bioskop 10 – 14 – 18. Baris ke-10 ada..." visual={<Papan anak="10 · 14 · 18 · … · ⬜" />} pilihan={[{ huruf: "A", teks: "42" }, { huruf: "B", teks: "46" }, { huruf: "C", teks: "50" }, { huruf: "D", teks: "40" }]} benar="B" umpan="Naik 4. Baris ke-10 ada 46." salah="Tambahkan 4 sebanyak sembilan langkah dari 10." />
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
  const lencana = skor >= 9 ? "🥇 Juru Pola" : skor >= 6 ? "🍊 Penjaga Pola" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Polamu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru pola." : "Ayo cari aturannya lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab3-evaluasi.jpg" alt="Meja kecil di padang layang dengan pensil dan kertas kosong. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Bilangan berikutnya" visual={<Papan anak="7 · 19 · 31 · 43 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Cari selisihnya." bantuan="Naik 12. 43 + 12 = 55." umpan="55." periksa={pitaLimaPuluhLima} alias={["55"]} konteks="7, 19, 31, 43, berikutnya 55." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Permen 9 – 7 – 5. Kumpulan ke-4 ada..." visual={<Papan anak="9 · 7 · 5 · ⬜" />} pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "5" }, { huruf: "D", teks: "7" }]} benar="B" umpan="Turun 2. 5 − 2 = 3." salah="Gambarnya makin sedikit." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. 1, 4, 7, 10. Sebutkan berikutnya." periksa={pitaTigaBelas} petunjuk="Dua bilangan yang bersebelahan punya selisih yang sama." benar="13." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Mana yang tidak ikut naik 6?" visual={<Papan anak="6 · 12 · 24" />} pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "12" }, { huruf: "C", teks: "18" }, { huruf: "D", teks: "24" }]} benar="D" umpan="6 lalu 12 naik 6. Berikutnya 18, bukan 24." salah="Cek tiap selisih." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan barisan dengan aturannya." baris={[{ kiri: "5 · 9 · 13", pilihan: ATURAN_D, benar: "Naik 4" }, { kiri: "91 · 77 · 63", pilihan: ATURAN_D, benar: "Turun 14" }, { kiri: "12 · 27 · 42", pilihan: ATURAN_D, benar: "Naik 15" }]} umpan="Naik 4, turun 14, dan naik 15." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Turun dari 91" visual={<Papan anak="91 · 77 · 63 · ⬜" />} pertanyaan="Tulis bilangan berikutnya." pesanSalah="Polanya turun." bantuan="Turun 14. 63 − 14 = 49." umpan="49." periksa={pitaEmpatPuluhSembilan} alias={["49"]} konteks="91, 77, 63, berikutnya 49." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Kursi 20 – 23 – 26. Baris ketujuh ada..." visual={<Papan anak="20 · 23 · 26 · … · ⬜" />} pilihan={[{ huruf: "A", teks: "35" }, { huruf: "B", teks: "38" }, { huruf: "C", teks: "41" }, { huruf: "D", teks: "32" }]} benar="B" umpan="Naik 3. Baris ke-7 ada 38." salah="Selisihnya tetap." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Televisi Januari 70, lalu berkurang 6 tiap bulan. Agustus ada..." visual={<Papan anak="70 · 64 · 58 · 52 · …" />} pilihan={[{ huruf: "A", teks: "34" }, { huruf: "B", teks: "28" }, { huruf: "C", teks: "22" }, { huruf: "D", teks: "40" }]} benar="B" umpan="Januari 70, Agustus adalah bulan ke-8. 70 − 42 = 28." salah="Kurangi 6 sebanyak tujuh langkah." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. 96, 85, 74, 63. Sebutkan berikutnya." periksa={pitaLimaPuluhDua} petunjuk="Hitung berapa yang dikurangi." benar="52." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Bioskop 10 – 14 – 18. Baris ke-10 ada..." visual={<Papan anak="10 · 14 · 18 · … · ⬜" />} pilihan={[{ huruf: "A", teks: "42" }, { huruf: "B", teks: "46" }, { huruf: "C", teks: "50" }, { huruf: "D", teks: "40" }]} benar="B" umpan="Naik 4. Baris ke-10 ada 46." salah="Tambahkan 4 pada setiap baris." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab3({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab3-poin.jpg", alt: "Igil dan tiga anak memegang kartu kosong di padang layang." }}
        cuplikan={cuplikanKalimat(["Jeruk 2, 4, 6. Kumpulan ke-7 ada 14. Permen 9, 7, 5. Kumpulan ke-5 ada 1.", "3, 5, 7, 9, 11 berikutnya 13. Telur hari kelima ada 52.", "Kelapa hari ke-7 ada 6. Bioskop baris ke-10 ada 46."])}
        poin={["Jeruk 2, 4, 6. Tambah 2. Kumpulan ke-7 ada 14.", "Permen 9, 7, 5, 3. Kurang 2. Kumpulan ke-5 ada 1.", "3, 5, 7, 9, 11 berikutnya 13. Telur 20, 28, 36, hari kelima 52.", "23, 18, 13, 8 berikutnya 3. Televisi Januari 70 turun 6, Juni ada 40.", "Kelapa hari pertama 36 turun 5, hari ke-7 ada 6. Bioskop baris ke-10 ada 46."]}
        penutup="Cari selisih dulu, baru lanjutkan polanya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
