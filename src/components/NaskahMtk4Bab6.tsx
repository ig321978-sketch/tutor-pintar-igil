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
  jumlahDua,
  jumlahDuaBelas,
  jumlahDuaPuluhEmpat,
  jumlahEmpatBelas,
  jumlahEnamBelas,
  jumlahLimaBelas,
  jumlahSembilan,
  jumlahTigaPuluhDua,
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

const BANYAK_A = ["8", "9", "1"];
const HARI_B = ["14 buku", "3 buku", "6 buku"];
const BANYAK_D = ["9", "8", "1"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🥭👧👦🦉" judul="A. Lapak Mangga" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Menampilkan data dalam bentuk piktogram.", "Menafsirkan data dari piktogram.", "Menampilkan data dalam bentuk diagram batang.", "Menafsirkan data dari diagram batang."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab A — Gambar satu-satu" src="/doodle-mtk/mtk-4-bab6-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru menyusun gambar mangga di lapak." kelas={kelas} kelamin={kelamin} penjelasan={["Piktogram memakai gambar untuk menghitung tiap jenis. Gambar dalam satu baris harus sama. Jika kuncinya satu, hitung gambarnya."]}>
          <Dialog nama="Nisa" anak="Di kelas ada 2 papan tulis, 1 jam dinding, 1 lemari, dan 8 hiasan dinding." />
          <Dialog nama="Farhan" anak="Hiasan dinding paling banyak. Jam dan lemari sama-sama paling sedikit." />
          <Dialog nama="Cinta" anak="Mainan Karel: 6 mobil, 4 robot, 3 pesawat, 1 puzzle, dan 9 kelereng." />
          <Dialog nama="Igil" anak="Jumlah mainan Karel 23. Kelereng paling banyak. Puzzle paling sedikit." />
          <Papan anak="hiasan 8    ·    jam 1    ·    kelereng 9" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Gambar sama</p>
          <PetaContoh pusat="Gambar" cabang={[{ ikon: "🥭", judul: "Satu baris", isi: "gambarnya sama" }, { ikon: "👁️", judul: "Kunci 1", isi: "hitung gambar" }, { ikon: "🏆", judul: "Paling banyak", isi: "hiasan 8" }]} kolom={["Benda", "Banyak"]} baris={[["Hiasan dinding", "8"], ["Jam dinding", "1"], ["Kelereng Karel", "9"]]} />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Hiasan dinding di kelas ada berapa? Sebutkan angkanya." periksa={jumlahDelapan} petunjuk="Itu benda yang paling banyak di kelas." benar="8 hiasan dinding." />
          <TulisBebas id={idKuis("A", 1)} judul="Kelereng Karel" visual={<Papan anak="mobil 6 · robot 4 · pesawat 3 · puzzle 1 · kelereng ?" />} pertanyaan="Tulis banyak kelereng Karel." pesanSalah="Lihat mainan yang paling banyak." bantuan="Kelereng Karel ada 9." umpan="9 kelereng." periksa={jumlahSembilan} alias={["9"]} konteks="Kelereng Karel ada 9 buah." />
        </Adegan>
        <Adegan utama judul="Sub-bab A — Baca kunci" src="/doodle-mtk/mtk-4-bab6-sub2.jpg" alt="Papan gambar mangga di lapak. Burung hantu bertopi biru menunjuk kuncinya." kelas={kelas} kelamin={kelamin} penjelasan={["Baca kunci dulu. Satu gambar bisa berarti 1 benda, atau lebih. Piktogram disebut juga diagram gambar."]}>
          <Dialog nama="Igil" anak="Warna kesukaan: ungu 4, kuning 2, hitam 1, merah 5. Satu gambar berarti 1 siswa." />
          <Dialog nama="Nisa" anak="Merah paling banyak. Jumlah keempat warna 4 + 2 + 1 + 5 = 12 siswa." />
          <Dialog nama="Farhan" anak="Kelas IV ada 8 gambar. Satu gambar = 4 siswa. Jadi 32 siswa." />
          <Dialog nama="Cinta" anak="Kelas I dan kelas II masing-masing 24 siswa. Kelas V paling sedikit." />
          <Papan anak="8 gambar × 4 = 32 siswa" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Baca kunci</p>
          <PetaContoh pusat="Kunci" cabang={[{ ikon: "🎨", judul: "Warna", isi: "jumlah 12" }, { ikon: "✖️", judul: "Kelas IV", isi: "8 × 4 = 32" }, { ikon: "🖼️", judul: "Nama lain", isi: "diagram gambar" }]} kolom={["Data", "Hasil"]} baris={[["4 warna", "12 siswa"], ["Kelas IV", "32 siswa"], ["Kelas I", "24 siswa"]]} />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Ungu 4, kuning 2, hitam 1, merah 5. Sebutkan jumlah siswanya." periksa={jumlahDuaBelas} petunjuk="Jumlahkan keempat warna itu." benar="12 siswa." />
          <TulisBebas id={idKuis("A", 3)} judul="Kelas IV" visual={<Papan anak="8 gambar × 4 siswa" />} pertanyaan="Tulis banyak siswa kelas IV." pesanSalah="Kalikan banyak gambar dengan kuncinya." bantuan="8 kali 4 sama dengan 32." umpan="32 siswa." periksa={jumlahTigaPuluhDua} alias={["32"]} konteks="Delapan gambar kali 4 siswa sama dengan 32 siswa." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Batang tegak" src="/doodle-mtk/mtk-4-bab6-sub3.jpg" alt="Diagram batang kosong di lapak mangga. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Diagram batang memakai persegi panjang. Batang tegak: yang lebih tinggi lebih banyak. Sumbu angka wajib ada."]}>
          <Dialog nama="Cinta" anak="Sepak bola diikuti 9 siswa. Batangnya paling tinggi." />
          <Dialog nama="Farhan" anak="Catur hanya 2 siswa." />
          <Dialog nama="Nisa" anak="Lomba matematika 15 siswa. Puisi hanya 3, itu yang paling sedikit." />
          <Dialog nama="Igil" anak="IPA 6 dan Pengetahuan Umum 6. Dua batang itu sama tinggi." />
          <Papan anak="sepak bola 9    ·    matematika 15    ·    puisi 3" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Lebih tinggi</p>
          <PetaContoh pusat="Tegak" cabang={[{ ikon: "⚽", judul: "Sepak bola", isi: "9 siswa" }, { ikon: "📐", judul: "Matematika", isi: "15 siswa" }, { ikon: "📏", judul: "Sumbu", isi: "angka wajib" }]} kolom={["Lomba", "Siswa"]} baris={[["Matematika", "15"], ["Puisi", "3"], ["IPA", "6"]]} />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Ekstrakurikuler sepak bola diikuti berapa siswa? Sebutkan angkanya." periksa={jumlahSembilan} petunjuk="Itu batang yang paling tinggi." benar="9 siswa." />
          <TulisBebas id={idKuis("A", 5)} judul="Lomba matematika" visual={<Batang tinggi={90} />} pertanyaan="Tulis banyak siswa yang mengikuti lomba matematika." pesanSalah="Lihat batang yang paling tinggi pada lomba." bantuan="Lomba matematika diikuti 15 siswa." umpan="15 siswa." periksa={jumlahLimaBelas} alias={["15"]} konteks="Lomba matematika diikuti 15 siswa." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Batang mendatar" src="/doodle-mtk/mtk-4-bab6-sub4.jpg" alt="Dua batang yang tingginya berbeda di lapak mangga. Burung hantu bertopi biru membandingkannya." kelas={kelas} kelamin={kelamin} penjelasan={["Batang mendatar dibaca dari panjangnya. Yang lebih panjang lebih banyak. Data yang sama boleh disajikan sebagai gambar atau batang."]}>
          <Dialog nama="Nisa" anak="Bunga kertas 9, paling banyak. Bunga matahari 3, paling sedikit." />
          <Dialog nama="Farhan" anak="Melati ada 8. Kertas ditambah anggrek: 9 + 7 = 16." />
          <Dialog nama="Cinta" anak="Ke sekolah, sepeda motor 14 siswa. Mobil hanya 3, paling sedikit." />
          <Dialog nama="Igil" anak="Renang 2 siswa, paling sedikit. Menyanyi paling banyak. Catur dan renang berjumlah 7." />
          <Papan anak="kertas 9    ·    matahari 3    ·    motor 14" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Lebih panjang</p>
          <PetaContoh pusat="Mendatar" cabang={[{ ikon: "🌸", judul: "Kertas", isi: "9 bunga" }, { ikon: "🌻", judul: "Matahari", isi: "3 bunga" }, { ikon: "🏍️", judul: "Motor", isi: "14 siswa" }]} kolom={["Data", "Banyak"]} baris={[["Bunga kertas", "9"], ["Bunga matahari", "3"], ["Sepeda motor", "14"]]} />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Lomba renang diikuti berapa siswa? Sebutkan angkanya." periksa={jumlahDua} petunjuk="Itu lomba yang paling sedikit." benar="2 siswa." />
          <TulisBebas id={idKuis("A", 7)} judul="Dua bunga" visual={<Papan anak="kertas 9 + anggrek 7" />} pertanyaan="Tulis jumlah bunga kertas dan bunga anggrek." pesanSalah="Jumlahkan kedua bunga itu." bantuan="9 ditambah 7 sama dengan 16." umpan="16 bunga." periksa={jumlahEnamBelas} alias={["16"]} konteks="Sembilan ditambah tujuh sama dengan 16 bunga." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Piktogram juga disebut..." visual={<DeretMangga jumlah={4} />} pilihan={[{ huruf: "A", teks: "Tabel saja" }, { huruf: "B", teks: "Diagram gambar" }, { huruf: "C", teks: "Diagram lingkaran" }, { huruf: "D", teks: "Cerita" }]} benar="B" umpan="Piktogram adalah diagram gambar." salah="Piktogram memakai gambar untuk menyajikan data." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan benda dengan banyaknya." baris={[{ kiri: "Hiasan dinding", pilihan: BANYAK_A, benar: "8" }, { kiri: "Kelereng Karel", pilihan: BANYAK_A, benar: "9" }, { kiri: "Jam dinding", pilihan: BANYAK_A, benar: "1" }]} umpan="Hiasan 8, kelereng 9, dan jam dinding 1." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun bunga dari yang paling sedikit." acak={["5", "9", "3", "4"]} benar={["3", "4", "5", "9"]} umpan="3, 4, 5, 9. Matahari, sepatu, mawar, lalu kertas." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Piktogram bukan diagram gambar.", benar: false }, { teks: "Batang tegak yang lebih tinggi lebih banyak.", benar: true }, { teks: "Kunci gambar boleh diabaikan.", benar: false }]} umpan="Hanya yang kedua benar. Piktogram adalah diagram gambar. Kunci wajib dibaca." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Ada 6 gambar. Satu gambar = 4 siswa. Banyak siswa..." visual={<Papan anak="6 gambar × 4" />} pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "24" }, { huruf: "D", teks: "4" }]} benar="C" umpan="6 kali 4 sama dengan 24 siswa." salah="Kalikan banyak gambar dengan kuncinya." />
        <Pilih id={idKuis("B", 0)} pertanyaan="Alat ke sekolah yang paling banyak dipakai siswa..." pilihan={[{ huruf: "A", teks: "Mobil" }, { huruf: "B", teks: "Sepeda motor" }, { huruf: "C", teks: "Becak" }, { huruf: "D", teks: "Jalan kaki" }]} benar="B" umpan="Sepeda motor dipakai 14 siswa. Itu yang paling banyak." salah="Bandingkan 14, 8, 5, dan 3." />
        <KuisCocok id={idKuis("B", 1)} perintah="Pasangkan hari dengan banyak bukunya." baris={[{ kiri: "Sabtu", pilihan: HARI_B, benar: "14 buku" }, { kiri: "Kamis", pilihan: HARI_B, benar: "3 buku" }, { kiri: "Selasa", pilihan: HARI_B, benar: "6 buku" }]} umpan="Sabtu 14, Kamis 3, Selasa 6." />
        <SusunToken id={idKuis("B", 2)} perintah="Susun benda di meja guru dari yang paling sedikit." acak={["3", "1", "4", "2"]} benar={["1", "2", "3", "4"]} umpan="1, 2, 3, 4. Taplak atau penghapus, pulpen, spidol, lalu buku." />
        <KuisBenarSalah id={idKuis("B", 3)} perintah="Pilih benar atau salah." baris={[{ teks: "Batang mendatar yang lebih panjang lebih banyak.", benar: true }, { teks: "Kelas V siswanya paling banyak.", benar: false }, { teks: "Data meja guru boleh disajikan sebagai gambar atau batang.", benar: true }]} umpan="Yang pertama dan ketiga benar. Kelas IV yang paling banyak, kelas V yang paling sedikit." />
        <Pilih id={idKuis("B", 4)} pertanyaan="Catur diikuti 5 siswa. Renang diikuti 2 siswa. Jumlahnya..." visual={<Papan anak="catur 5 + renang 2" />} pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "7" }, { huruf: "D", teks: "2" }]} benar="C" umpan="5 + 2 = 7 siswa." salah="Jumlahkan kedua lomba itu." />
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
        <TulisBebas id={idKuis("D", 0)} judul="1. Lomba matematika" visual={<Batang tinggi={90} />} pertanyaan="Tulis banyak siswa yang mengikuti lomba matematika." pesanSalah="Lihat batang lomba yang paling tinggi." bantuan="Lomba matematika diikuti 15 siswa." umpan="15 siswa." periksa={jumlahLimaBelas} alias={["15"]} konteks="Lomba matematika diikuti 15 siswa." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Mawar 5, kertas 9, sepatu 4, matahari 3. Bunga yang paling sedikit..." visual={<Papan anak="5 · 9 · 4 · 3" />} pilihan={[{ huruf: "A", teks: "Kertas" }, { huruf: "B", teks: "Matahari" }, { huruf: "C", teks: "Mawar" }, { huruf: "D", teks: "Sepatu" }]} benar="B" umpan="3 paling kecil. Itu bunga matahari." salah="Bandingkan keempat bunga itu." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Buku dari perpustakaan paling banyak pada hari Sabtu. Sebutkan angkanya." periksa={jumlahEmpatBelas} petunjuk="Hari itu ada 14 buku." benar="14 buku." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Piktogram juga disebut..." visual={<DeretMangga jumlah={3} />} pilihan={[{ huruf: "A", teks: "Diagram lingkaran" }, { huruf: "B", teks: "Diagram gambar" }, { huruf: "C", teks: "Tabel saja" }, { huruf: "D", teks: "Cerita" }]} benar="B" umpan="Piktogram adalah diagram gambar." salah="Piktogram memakai gambar." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan benda dengan banyaknya." baris={[{ kiri: "Kelereng Karel", pilihan: BANYAK_D, benar: "9" }, { kiri: "Hiasan dinding", pilihan: BANYAK_D, benar: "8" }, { kiri: "Jam dinding", pilihan: BANYAK_D, benar: "1" }]} umpan="Kelereng 9, hiasan 8, dan jam dinding 1." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Dua bunga" visual={<Papan anak="kertas 9 + anggrek 7" />} pertanyaan="Tulis jumlah bunga kertas dan bunga anggrek." pesanSalah="Jumlahkan kedua bunga itu." bantuan="9 ditambah 7 sama dengan 16." umpan="16 bunga." periksa={jumlahEnamBelas} alias={["16"]} konteks="Sembilan ditambah tujuh sama dengan 16 bunga." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Pada batang mendatar, batang yang lebih panjang berarti..." visual={<Papan anak="batang mendatar" />} pilihan={[{ huruf: "A", teks: "Lebih sedikit" }, { huruf: "B", teks: "Lebih banyak" }, { huruf: "C", teks: "Sama saja" }, { huruf: "D", teks: "Tidak ada data" }]} benar="B" umpan="Yang lebih panjang lebih banyak." salah="Baca panjang batangnya." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Meja guru: buku 4, taplak 1, spidol 3, penghapus 1, pulpen 2. Berapa kategori yang paling sedikit?" visual={<Papan anak="4 · 1 · 3 · 1 · 2" />} pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "4" }, { huruf: "D", teks: "3" }]} benar="B" umpan="Taplak dan penghapus sama-sama 1. Ada 2 kategori." salah="Cari angka yang paling kecil, lalu hitung berapa kategori." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Ada 6 gambar. Satu gambar = 4 siswa. Sebutkan banyak siswanya." periksa={jumlahDuaPuluhEmpat} petunjuk="Kalikan banyak gambar dengan kuncinya." benar="24 siswa." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Mobil 3, sepeda motor 14, becak 5, jalan kaki 8. Jumlah siswa kelas IV..." visual={<Papan anak="3 + 14 + 5 + 8" />} pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "11" }, { huruf: "C", teks: "30" }, { huruf: "D", teks: "8" }]} benar="C" umpan="3 + 14 + 5 + 8 = 30 siswa." salah="Jumlahkan keempat alat itu." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab6({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab6-poin.jpg", alt: "Igil dan tiga anak di lapak mangga memegang gambar mangga." }}
        cuplikan={cuplikanKalimat(["Piktogram adalah diagram gambar. Baca kuncinya dulu.", "Kelas IV: 8 gambar kali 4 sama dengan 32 siswa.", "Batang tegak yang lebih tinggi lebih banyak. Batang mendatar yang lebih panjang lebih banyak."])}
        poin={["Gambar dalam satu baris harus sama. Hiasan dinding ada 8.", "Warna kesukaan berjumlah 12 siswa. Merah paling banyak.", "Satu gambar kelas berarti 4 siswa. Kelas IV ada 32 siswa.", "Sepak bola 9 siswa. Lomba matematika 15 siswa. Puisi 3 siswa.", "Bunga kertas 9 dan matahari 3. Sepeda motor dipakai 14 siswa.", "Data yang sama boleh jadi piktogram, batang tegak, atau batang mendatar."]}
        penutup="Baca kunci atau ujung batang dulu, baru hitung."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
